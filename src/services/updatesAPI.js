import axios from "axios";
import Config from "../config";
import loggerService from "./logger.service";
import { issetAuthToken, getAuthToken } from "../utils/storage";

// Request methods
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

/**
 * Set headers & base url
 */
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
  baseURL: Config.updatesBaseUrl,
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
  consoleRequestResponseTime("request", Config.updatesBaseUrl + "" + path);

  // Check method
  // eslint-disable-next-line default-case
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
    // DELETE
    case DELETE:
      return axiosBase
        .delete(path, body, { params: httpParams })
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
export const processResponseData = (type, path, data, failureMsg) => {
  // If success and data is object
  if (type === "success") {
    // data = convertNulltoEmpty(data);
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Success");
      loggerService.showLog(["Request Url", Config.updatesBaseUrl + "" + path]);
      loggerService.showLog(["Body", data]);
    }
    return data;
  } else {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Failure");
      loggerService.showLog(["Url", Config.updatesBaseUrl + "" + path]);
      loggerService.showLog(["Body", data]);
    }

    /**
     * Show error msg if
     * 1. Message available in service
     * 2. Otherwise show custom error from each service request
     * 3. Otherwise, show default message 'Service Failure'
     */
    // Need to Confirm params
    console.log(failureMsg);
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

/**
 * File upload handler
 */
export const doFileUpload = async (url, params) => {
  try {
    const formData = new FormData();
    if (params[0].body?.pageType === "ticket") {
      formData.append("files", params[0].file);
      formData.append("ticket_id", params[0].body?.ticketId);
    } else if (params[0].body?.pageType === "tool") {
      formData.append("files", params[0].file);
      formData.append("TicketId", params[0].body?.ticketId);
      formData.append("ToolId", params[0].body?.toolId);
      formData.append("tool_ticket_id", params[0].body?.tool_ticket_id);
    } else if (params[0].body?.pageType === "comment") {
      params[0].file.forEach((val) => {
        formData.append(`attachedFiles`, val);
      });
      formData.append("ticket_id", params[0].body?.ticket_id);
      formData.append("tool_id", params[0].body?.tool_id);
      formData.append("tool_ticket_id", params[0].body?.tool_ticket_id);
      formData.append("comment_id", params[0].body?.comment_id);
      formData.append("content", params[0].body?.content);
      formData.append("mentions", params[0].body?.mentions);
      // formData.append("activeWorkSpace", params[0].body?.activeWorkSpace);
      // formData.append('deleted_attachments', params[0].body?.deleted_attachments );
      const deletedAttachmentIds = params[0].body?.deleted_attachments.join(
        ","
      );
      formData.append("deleted_attachments", deletedAttachmentIds);
    }

    // if (params[0]) {
    //   formData.append('data', JSON.stringify(params[0]));
    // }
    const createXHR = () => new XMLHttpRequest();
    const response = await axios.post(url, formData, {
      baseURL: Config.updatesBaseUrl,
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAuthToken()}`, // Include your auth token if needed
      },
      httpAgent: createXHR,
    });

    const validResponse = response.data;
    const processedData = processResponseData("success", url, validResponse);
    return processedData;
  } catch (error) {
    console.error("Error during file upload:", error);
    // processResponseData('failure', url, error.response.data, failureMsg);
    throw error;
  }
};

/**
 * File Download
 */
export const doFileDownload = async (
  path,
  httpParams,
  body,
  disableLoader = false
) => {
  // Console request time
  consoleRequestResponseTime("request", Config.updatesBaseUrl + "" + path);

  try {
    return axiosBase
      .post(path, body, { params: httpParams, responseType: "blob" })
      .then((res) => {
        if (res?.data) {
          const blobData = new Blob([res?.data]);
          const blobUrl = URL.createObjectURL(blobData);
          var a = document.createElement("a");
          a.href = blobUrl;
          a.download = body.file_name;
          a.click(); //Downloaded file

          // Revoke the Blob URL to free up memory
          URL.revokeObjectURL(blobUrl);
        }
      })
      .catch(function (error) {
        // handle error
        processResponseData("failure", path, error);
        throw error;
      })
      .finally(function () {});
  } catch (error) {
    console.error("Error during file upload:", error);
    // processResponseData('failure', url, error.response.data, failureMsg);
    throw error;
  }
};

export default {
  GET: (path, ...props) => request(GET, path, ...props),
  POST: (path, ...props) => request(POST, path, props.params, ...props),
  PUT: (path, ...props) => request(PUT, path, props.params, ...props),
  DELETE: (path, ...props) => request(DELETE, path, props.params, ...props),
  FILEUPLOAD: (path, ...props) => doFileUpload(path, props),
  FILEDOWNLOAD: (path, ...props) =>
    doFileDownload(path, props.params, ...props),
};
