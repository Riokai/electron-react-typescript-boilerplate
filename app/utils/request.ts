import axios, { AxiosPromise } from 'axios'

export enum HttpMethod {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  option = 'OPTION'
}

interface RequestOptions {
  url: string;
  // method 和 auth 均有默认值，不需要强制检查，所以加上 ?
  method?: HttpMethod;
  auth?: boolean;
  headers?: any;
  params?: any;
}

export default function request({
  url,
  auth = true,
  method = HttpMethod.get,
}: RequestOptions): AxiosPromise {
  return axios({ url, method });
}