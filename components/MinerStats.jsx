import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";
import workersOnline, { dayAvgHashrate } from "../helpers/workersOnline";

const propTypes = {
  miner: PropTypes.shape({
    pendingBalance: PropTypes.number.isRequired,
    performance: PropTypes.shape({
      created: PropTypes.string,
      workers: PropTypes.objectOf(
        PropTypes.shape({
          hashrate: PropTypes.number.isRequired,
          sharesPerSecond: PropTypes.number.isRequired,
        }),
      ),
    }),
    performanceSamples: PropTypes.arrayOf(
      PropTypes.shape({
        created: PropTypes.string,
        workers: PropTypes.objectOf(
          PropTypes.shape({
            hashrate: PropTypes.number.isRequired,
            sharesPerSecond: PropTypes.number.isRequired,
          }),
        ),
      }),
    ).isRequired,
  }).isRequired,
  minerId: PropTypes.string.isRequired,
};

function MinerStats({ miner, minerId }) {
  const [activeWorkers, setActiveWorkers] = useState(0);
  const [inactiveWorkers, setInactiveWorkers] = useState(0);
  const [currentHashrate, setCurrentHashrate] = useState(0);
  const [hashrate24HAvg, setHashrate24HAvg] = useState(0);

  useEffect(() => {
    const { online, offline, hashrate } = workersOnline(miner.performance.workers);
    const dayAvg = dayAvgHashrate(miner.performanceSamples);
    setActiveWorkers(online);
    setInactiveWorkers(offline);
    setCurrentHashrate(hashrate);
    setHashrate24HAvg(dayAvg);
  }, [miner.performance.workers, miner.performanceSamples]);

  return (
    <div className="flex">
      <div className="justify-center w-3/4 py-5">
        <Card variant="outlined" className="text-center py-5">
          {minerId}
        </Card>
        <div className="flex gap-4 text-center content-center ">
          <Card className="basis-1/2  h-40">
            <Typography className="content-center">Workers Online/Offline:</Typography>
            <Typography className="content-center">
              {`${activeWorkers}/${inactiveWorkers}`}
            </Typography>
          </Card>
          <Card className="basis-1/2  h-40">
            <Typography>{`Unpaid Valance: ${miner.pendingBalance}`}</Typography>
          </Card>
        </div>
        <div className="flex gap-4 text-center content-center ">
          <Card className="basis-1/2  h-40">
            <div className="grid grid-cols-3 gap-2 text-left">
              <div className="col-span-3 ">Hashrate</div>
              <div className="">{`${currentHashrate}`}</div>
              <div className="">{`${hashrate24HAvg}`}</div>
              <div className="">0 H/s</div>
              <div className="">Current Effective</div>
              <div className="">24h Avg Effective</div>
              <div className="">Reported</div>
            </div>
          </Card>
          <Card className="basis-1/2  h-40">
            <Typography>{`Unpaid Valance: ${miner.pendingBalance}`}</Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}
MinerStats.propTypes = propTypes;
export default MinerStats;
