import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardHeader, List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const propTypes = {
  pool: PropTypes.shape({
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
};
const defaultProps = {
  pool: {},
};

export default function Pool(pool) {
  const coinType = pool.coin.type;
  const { payoutScheme, minimumPayment } = pool.paymentProcessing;
  const { networkHashRate, networkDifficulty } = pool.networkStats;
  const { connectedMiners, poolHashRate } = pool.poolStats;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        style={{ background: "#263238", color: "white" }}
        title={coinType}
        avatar={
          <Avatar>
            <AdbIcon />
          </Avatar>
        }
      />
      <CardContent>
        <List>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Pool hashrate" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={poolHashRate} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Miners Online" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={connectedMiners} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Minimum payout" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={minimumPayment} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Payout Scheme" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={payoutScheme} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Network Hashrate" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={networkHashRate} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Network Difficulty" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={networkDifficulty} />
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button size="small" color="secondary" variant="contained">
          Go to pool
        </Button>
      </CardActions>
    </Card>
  );
}

Pool.propTypes = propTypes;
Pool.defaultProps = defaultProps;
