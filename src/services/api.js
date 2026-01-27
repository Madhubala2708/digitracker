import axios from "axios";
import Config from "../config";
import loggerService from "./logger.service";
import {
  issetAuthToken,
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  setRefreshToken,
} from "../utils/storage";

// Request methods
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

// Create axios instance
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: Config.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  let justLoggedIn = false;
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
    });
    failedQueue = [];
  };

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (issetAuthToken()) {
        config.headers["Authorization"] = `Bearer ${getAuthToken()}`;
      } else {
        delete config.headers["Authorization"];
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor with refresh logic
  instance.interceptors.response.use(
    (response) => {
      justLoggedIn = false;
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          document.dispatchEvent(new Event("session_expired"));
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axios.post(
            `${Config.apiBaseUrl}/api/Login/refresh-token`,
            {
              refreshToken: refreshToken,
            }
          );

          const newToken = res.data?.Token;
          const newRefreshToken = res.data?.RefreshToken;

          if (newToken && newRefreshToken) {
            await setAuthToken(newToken);
            await setRefreshToken(newRefreshToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return axios(originalRequest);
          } else {
            throw new Error("Invalid refresh response");
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          document.dispatchEvent(new Event("session_expired"));
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return {
    instance,
    setJustLoggedIn: (value) => {
      justLoggedIn = value;
    },
  };
};

const { instance: axiosBase, setJustLoggedIn } = createAxiosInstance();

/** Http Request */
export const request = async (
  method,
  path,
  httpParams,
  body,
  disableLoader = false
) => {
  consoleRequestResponseTime("request", Config.apiBaseUrl + path);
  try {
    let response;
    switch (method) {
      case GET:
        response = await axiosBase.get(path, { params: httpParams });
        break;
      case POST:
        response = await axiosBase.post(path, body, { params: httpParams });
        break;
      case PUT:
        response = await axiosBase.put(path, body, { params: httpParams });
        break;
      case DELETE:
        response = await axiosBase.delete(path, {
          params: httpParams,
          data: body,
        });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    return processResponseData("success", path, response);
  } catch (error) {
    processResponseData("failure", path, error);
    throw error;
  }
};

/** Process API Response */
export const processResponseData = (type, path, data, failureMsg) => {
  if (type === "success") {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Success");
      loggerService.showLog(["Request Url", Config.apiBaseUrl + path]);
      loggerService.showLog(["Body", data]);
    }
    return data;
  } else {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Failure");
      loggerService.showLog(["Url", Config.apiBaseUrl + path]);
      loggerService.showLog(["Body", data]);
    }
    console.log(failureMsg);
  }
};

/** JSON Null to Empty Converter */
export const convertNulltoEmpty = (data) => {
  return JSON.parse(JSON.stringify(data).replace(/null/gi, '""'));
};

/** API Timing Logs */
const consoleRequestResponseTime = (type, url) => {
  if (Config.trackHttpTimeInConsole) {
    console.log(`${type === "request" ? "Request" : "Response"} Url`, url);
    console.log(`Time ${type === "request" ? "Started" : "Ended"}`, new Date());
  }
};

/** File Upload */
export const doFileUpload = async (url, params) => {
  try {
    const formData = new FormData();
    const body = params[0]?.body;
    const file = params[0]?.file;

    if (body?.pageType === "ticket") {
      formData.append("files", file);
      formData.append("ticket_id", body.ticketId);
    } else if (body?.pageType === "tool") {
      formData.append("files", file);
      formData.append("TicketId", body.ticketId);
      formData.append("ToolId", body.toolId);
      formData.append("tool_ticket_id", body.tool_ticket_id);
    } else if (body?.pageType === "comment") {
      file.forEach((val) => formData.append("attachedFiles", val));
      formData.append("ticket_id", body.ticket_id);
      formData.append("tool_id", body.tool_id);
      formData.append("tool_ticket_id", body.tool_ticket_id);
      formData.append("comment_id", body.comment_id);
      formData.append("content", body.content);
      formData.append("mentions", body.mentions);
      formData.append(
        "deleted_attachments",
        body.deleted_attachments.join(",")
      );
    }

    const response = await axios.post(url, formData, {
      baseURL: Config.apiBaseUrl,
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return processResponseData("success", url, response.data);
  } catch (error) {
    console.error("Error during file upload:", error);
    throw error;
  }
};

/** File Download */
export const doFileDownload = async (
  path,
  httpParams,
  body,
  disableLoader = false
) => {
  consoleRequestResponseTime("request", Config.apiBaseUrl + path);
  try {
    const response = await axiosBase.post(path, body, {
      params: httpParams,
      responseType: "blob",
    });

    if (response?.data) {
      const blobUrl = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = body.file_name;
      a.click();
      URL.revokeObjectURL(blobUrl);
    }
  } catch (error) {
    processResponseData("failure", path, error);
    throw error;
  }
};

export { setJustLoggedIn };

export default {
  GET: (path, httpParams = {}, disableLoader = false) =>
    request(GET, path, httpParams, null, disableLoader),

  POST: (path, body = {}, httpParams = {}, disableLoader = false) =>
    request(POST, path, httpParams, body, disableLoader),

  PUT: (path, body = {}, httpParams = {}, disableLoader = false) =>
    request(PUT, path, httpParams, body, disableLoader),

  DELETE: (path, body = {}, httpParams = {}, disableLoader = false) =>
    request(DELETE, path, httpParams, body, disableLoader),

  FILEUPLOAD: (path, params) => doFileUpload(path, params),

  FILEDOWNLOAD: (path, body, httpParams = {}, disableLoader = false) =>
    doFileDownload(path, httpParams, body, disableLoader),
};
