import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Pool from "./Pool";

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
        networkHashRate: PropTypes.number.isRequired,
        networkDifficulty: PropTypes.number.isRequired,
      }),
      poolStats: PropTypes.shape({
        connectedMiners: PropTypes.number.isRequired,
        poolHashRate: PropTypes.number.isRequired,
      }),
    }),
  ),
};

const defaultProps = {
  pools: [],
};

export default function PoolList({ pools }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {pools.map((pool) => {
        return (
          <Grid item xs={4} key={pool.id}>
            <Pool {...pool} />
          </Grid>
        );
      })}
    </Grid>
  );
}

PoolList.propTypes = propTypes;
PoolList.defaultProps = defaultProps;
