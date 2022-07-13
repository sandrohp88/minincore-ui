import sendRequest from "./sendRequest";

const BASE_PATH = "/api/pools";

export const getPoolsListApiMethod = () =>
  sendRequest(BASE_PATH, {
    method: "GET",
  });
