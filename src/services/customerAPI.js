import axios from "axios";
import Config from "../config";
import loggerService from "./logger.service";
import { issetAuthToken, getAuthToken } from "../utils/storage";

// Request methods
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

//Set headers & base url
export function getHttpHeader() {
  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  return headers;
}

export const axiosBase = axios.create({
  baseURL: Config.customerBaseUrl,
  headers: getHttpHeader(),
});

// Create an Axios request interceptor
axiosBase.interceptors.request.use(
  (config) => {
    // Get the user's authentication status (you can use a state management library like Redux or React Context)

    // Update the headers based on the user's authentication status
    if (issetAuthToken()) {
      config.headers["Authorization"] = `Bearer ${getAuthToken()}`;
    } else {
      // Remove the Authorization header if the user is not authenticated
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Http request
 */
export const request = async (
  method,
  path,
  httpParams,
  body,
  disableLoader = false
) => {
  // Console request time
  consoleRequestResponseTime("request", Config.customerBaseUrl + "" + path);

  // Check method
  switch (method) {
    // Get
    case GET:
      return axiosBase
        .get(path, { params: httpParams })
        .then(function (response) {
          // handle success
          const processedData = processResponseData("success", path, response);
          return processedData;
        })
        .catch(function (error) {
          // handle error
          processResponseData("failure", path, error);
          throw error;
        })
        .finally(function () {});

    // Post
    case POST:
      return axiosBase
        .post(path, body, { params: httpParams })
        .then(function (response) {
          // handle success
          const processedData = processResponseData("success", path, response);
          return processedData;
        })
        .catch(function (error) {
          // handle error
          processResponseData("failure", path, error);
          throw error;
        })
        .finally(function () {});

    // Put
    case PUT:
      return axiosBase
        .put(path, body, { params: httpParams })
        .then(function (response) {
          // handle success
          const processedData = processResponseData("success", path, response);
          return processedData;
        })
        .catch(function (error) {
          // handle error
          processResponseData("failure", path, error);
          throw error;
        })
        .finally(function () {});
  }
};

/**
 * Process the response data
 */
export const processResponseData = (type, path, data) => {
  // If success and data is object
  if (type === "success") {
    // data = convertNulltoEmpty(data);
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Success");
      loggerService.showLog([
        "Request Url",
        Config.customerBaseUrl + "" + path,
      ]);
      loggerService.showLog(["Body", data]);
    }
    return data;
  } else {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Failure");
      loggerService.showLog(["Url", Config.customerBaseUrl + "" + path]);
      loggerService.showLog(["Body", data]);
    }
  }
};

/**
 * Convert json null to empty write console
 */
export const convertNulltoEmpty = (data) => {
  let stringifyData = JSON.stringify(data).replace(/null/i, '""');
  stringifyData = stringifyData.replace(/null/g, '""');
  const json = JSON.parse(stringifyData);
  return json;
};

/**
 * Request / Response Time Tracker
 */
const consoleRequestResponseTime = (type, url) => {
  if (Config.trackHttpTimeInConsole) {
    if (type === "request") {
      console.log("Request Url", url);
      console.log("Time Started", new Date());
    } else {
      console.log("Response Url", url);
      console.log("Time Ended", new Date());
    }
  }
};

export default {
  GET: (path, ...props) => request(GET, path, ...props),
  POST: (path, ...props) => request(POST, path, props.params, ...props),
  PUT: (path, ...props) => request(PUT, path, props.params, ...props),
};
