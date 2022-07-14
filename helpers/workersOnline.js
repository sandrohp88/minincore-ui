import PropTypes from "prop-types";
// Receives and object with workers and returns online/offline
// const workers = {
//   ShreK: {
//     hashrate: 285503606,
//     sharesPerSecond: 0.007,
//   },
//   Hellboy480: {
//     hashrate: 57100721,
//     sharesPerSecond: 0.001,
//   },
//   Hulk_GF30: {
//     hashrate: 1043767898,
//     sharesPerSecond: 0.023,
//   },
//   Deadpool: {
//     hashrate: 77042755,
//     sharesPerSecond: 0.006,
//   },
// };

// 1 kH/s	1000	One thousand
// 1 MH/s	1,000,000	One million
// 1 GH/s	1,000,000,000	One billion
// 1 TH/s	1,000,000,000,000	One trillion
// 1 PH/s	1.000.000.000.000.000	One quadrillion
// 1 EH/s	1.000.000.000.000.000.000	One quintillion
// 1 ZH/s	1.000.000.000.000.000.000.000	One sextillion

const performanceType = PropTypes.arrayOf(
  PropTypes.shape({
    created: PropTypes.string,
    workers: PropTypes.objectOf(
      PropTypes.shape({
        hashrate: PropTypes.number.isRequired,
        sharesPerSecond: PropTypes.number.isRequired,
      }),
    ),
  }),
).isRequired;

const workersType = PropTypes.objectOf(
  PropTypes.shape({
    hashrate: PropTypes.number.isRequired,
    sharesPerSecond: PropTypes.number.isRequired,
  }),
).isRequired;

const formatHashrateType = {
  hash: PropTypes.number.isRequired,
  decimals: PropTypes.number,
};

export function formatHashrate(hash, decimals = 2) {
  if (hash === 0) return "0 H";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["H/S", "KH/S", "MH/S", "GH/S", "TH/S", "PH/S"];

  const i = Math.floor(Math.log(hash) / Math.log(k));

  return `${parseFloat((hash / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function dayAvgHashrate(performance) {
  // performance is recorded every hour, only store one day
  let avgHashrate = 0;
  performance.forEach(({ workers }) => {
    const workersNames = Object.keys(workers);
    workersNames.forEach((workerName) => {
      avgHashrate += workers[workerName].hashrate;
    });
  });
  return formatHashrate(avgHashrate / 24);
}

export default function workersOnline(workers) {
  const workersNames = Object.keys(workers);
  let online = 0;
  let offline = 0;
  let hashrate = 0;

  workersNames.forEach((name) => {
    hashrate += workers[name].hashrate;
    if (workers[name].hashrate > 0) {
      online += 1;
    } else {
      offline += 1;
    }
  });
  return { online, offline, hashrate: formatHashrate(hashrate) };
}

dayAvgHashrate.propTypes = performanceType;
workersOnline.propTypes = workersType;
formatHashrate.propTypes = formatHashrateType;
