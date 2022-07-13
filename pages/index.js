import PropTypes from "prop-types";
import PoolList from "../components/PoolList";
import { getPoolsListApiMethod } from "../api/pools";
import notify from "../helpers/notify";
import Miner from "./miner/[minerId]";
// Type check
const defaultProps = { pools: [] };
const propTypes = {
  pools: PropTypes.arrayOf(
    PropTypes.shape({
      coin: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }),
      paymentProcessing: PropTypes.shape({
        minimumPayment: PropTypes.number.isRequired,
        payoutScheme: PropTypes.string.isRequired,
      }),
      networkStats: PropTypes.shape({
        networkHashrate: PropTypes.number.isRequired,
        networkDifficulty: PropTypes.number.isRequired,
      }),
      poolStats: PropTypes.shape({
        connectedMiners: PropTypes.number.isRequired,
        poolHashrate: PropTypes.number.isRequired,
      }),
    }),
  ),
};

export default function Home({ pools }) {
  return <PoolList pools={pools} />;
}
// This gets called on every request
export async function getServerSideProps() {
  // Call an external API endpoint to get pools
  try {
    const { pools } = await getPoolsListApiMethod();
    // Pass data to the page via props
    return { props: { pools } };
  } catch (error) {
    notify(error);
    return { props: {} };
  }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
