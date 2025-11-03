import axios from "axios";
import Config from "../config";
import loggerService from "./logger.service";
import { getAuthToken } from '../utils/storage';

// Request methods
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

/**
* Set headers & base url
*/
export function getHttpHeader(){
  // Set default headers
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

  if (getAuthToken()) {
    headers['Authorization'] = `Bearer ${getAuthToken()}`;
  }
  return headers;
}

export const axiosBase = axios.create({
  baseURL: Config.graphExplorerBaseUrl,
  headers: getHttpHeader()
});

/**
* Http request
*/
export const request = async(method, path, httpParams, body, disableLoader = false) => {
  
  // Console request time
  consoleRequestResponseTime('request', Config.graphExplorerBaseUrl+''+path);

  // Check method
  switch (method) {
    // Get
    case GET:
      return axiosBase.get(path, { params: httpParams })
      .then(function (response) {
        // handle success
        const processedData = processResponseData('success', path, response);
        return processedData;
      })
      .catch(function (error) {
        // handle error
        processResponseData('failure', path, error);
        throw error;
      })
      .finally(function () {});
    
    // Post
    case POST:
      return axiosBase.post(path, body, { params: httpParams })
      .then(function (response) {
        // handle success
        const processedData = processResponseData('success', path, response);
        return processedData;
      })
      .catch(function (error) {
        // handle error
        processResponseData('failure', path, error);
        throw error;
      })
      .finally(function () {});

    // Put
    case PUT:
      return axiosBase.put(path, body, { params: httpParams })
      .then(function (response) {
        // handle success
        const processedData = processResponseData('success', path, response);
        return processedData;
      })
      .catch(function (error) {
        // handle error
        processResponseData('failure', path, error);
        throw error;
      })
      .finally(function () {});
  }
}

/**
* Process the response data
*/
export const processResponseData = (type, path, data) => {
  // If success and data is object
  if (type === 'success') {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog('Response Success');
      loggerService.showLog(['Request Url', Config.graphExplorerBaseUrl+''+path]);
      loggerService.showLog(['Body', data]);
    }
    return data;
  } else {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog('Response Failure');
      loggerService.showLog(['Url', Config.graphExplorerBaseUrl+''+path]);
      loggerService.showLog(['Body', data]);
    }

    /**
     * Show error msg if
     * 1. Message available in service
     * 2. Otherwise show custom error from each service request
     * 3. Otherwise, show default message 'Service Failure'
     */
    // Need to Confirm params
  }
}

/**
* Request / Response Time Tracker
*/
const consoleRequestResponseTime = (type, url) => {
  if (Config.trackHttpTimeInConsole) {
    if (type === 'request') {
      console.log('Request Url', url);
      console.log('Time Started', new Date());
    } else {
      console.log('Response Url', url);
      console.log('Time Ended', new Date());
    }
  }
}


export default {
  GET: (path, ...props) => request(GET, path, ...props),
  POST: (path, ...props) => request(POST, path, props.params, ...props),
  PUT: (path, ...props) => request(PUT, path, props.params, ...props),
};
