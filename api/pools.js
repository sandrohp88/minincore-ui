import sendRequest from "./sendRequest";

const BASE_PATH = "/pools";

export const getPoolsListApiMethod = () =>
  sendRequest(BASE_PATH, {
    method: "GET",
  });
