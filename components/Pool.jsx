/* eslint-disable react/jsx-no-bind */
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardHeader, List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AdbIcon from "@mui/icons-material/Adb";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { formatHashrate } from "../helpers/workersOnline";

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
      networkHashrate: PropTypes.number.isRequired,
      networkDifficulty: PropTypes.number.isRequired,
    }),
    poolStats: PropTypes.shape({
      connectedMiners: PropTypes.number.isRequired,
      poolHashrate: PropTypes.number.isRequired,
    }),
  }),
};
const defaultProps = {
  pool: {},
};

export default function Pool(pool) {
  const coinType = pool.coin.type;
  const { payoutScheme, minimumPayment } = pool.paymentProcessing;
  const { networkHashrate, networkDifficulty } = pool.networkStats;
  const { connectedMiners, poolHashrate } = pool.poolStats;
  const router = useRouter();
  const [search, setSearch] = useState();
  function onClickHandler() {
    router.push(`/miner/${search}`);
  }
  function searchInputHandler(event) {
    setSearch(event.target.value);
  }
  return (
    <Card sx={{ minWidth: 275 }} className="rounded-lg">
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
                <ListItemText primary={formatHashrate(poolHashrate)} />
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
                <ListItemText primary={formatHashrate(networkHashrate * 1000000000)} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <ListItemText primary="Network Difficulty" />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <ListItemText primary={formatHashrate(networkDifficulty)} />
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </CardContent>
      <CardActions className="justify-center pt-0 ">
        <InputBase className="rounded-lg bg-slate-200 w-full" onInput={searchInputHandler} />
        <Button onClick={onClickHandler} variant="contained" className=" bg-slate-400">
          <SearchIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

Pool.propTypes = propTypes;
Pool.defaultProps = defaultProps;
