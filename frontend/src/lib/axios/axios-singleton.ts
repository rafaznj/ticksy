import axios, { type AxiosInstance } from "axios";
import { injectable } from "inversify";

import { onRequestFulfilled, onRequestRejected } from "@/infrastructure/interceptors/request";
import { onResponseFulfilled, onResponseRejected } from "@/infrastructure/interceptors/response";
import { transformRequest } from "@/infrastructure/interceptors/transform-request";
import { transformResponse } from "@/infrastructure/interceptors/transform-response";

@injectable()
export class AxiosSingleton {
  public client: AxiosInstance;

  constructor() {
    const transformResponseArray = [transformResponse];
    const transformRequestArray = [transformRequest];

    if (axios.defaults.transformResponse) {
      if (Array.isArray(axios.defaults.transformResponse)) {
        transformResponseArray.push(...axios.defaults.transformResponse);
      } else {
        transformResponseArray.push(axios.defaults.transformResponse);
      }
    }

    if (axios.defaults.transformRequest) {
      if (Array.isArray(axios.defaults.transformRequest)) {
        transformRequestArray.push(...axios.defaults.transformRequest);
      } else {
        transformRequestArray.push(axios.defaults.transformRequest);
      }
    }

    this.client = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
      transformRequest: transformRequestArray,
      transformResponse: transformResponseArray,
    });

    this.client.interceptors.request.use(onRequestFulfilled, onRequestRejected);
    this.client.interceptors.response.use(onResponseFulfilled, onResponseRejected);
  }
}
