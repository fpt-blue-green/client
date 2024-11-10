import { constants } from './utils';
import config from '@/config';
import { getSession } from 'next-auth/react';
import { getServerSession, Session } from 'next-auth';

type CustomRequest = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
  noToken?: boolean;
  next?: NextFetchRequestConfig;
};

type CustomResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
};

export const isClient = () => typeof window !== 'undefined';
const isBoolean = (value: string): boolean => value === 'true' || value === 'false';
const isNumber = (value: string): boolean => !isNaN(Number(value));

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomRequest,
): Promise<CustomResponse<Response>> => {
  const body =
    options?.body instanceof FormData ? options.body : options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders: { [key: string]: string } = {
    'ngrok-skip-browser-warning': '1', // * Test ngrok env
  };
  if (!(options?.body instanceof FormData)) {
    baseHeaders['Content-Type'] = 'application/json; charset=utf-8';
  }

  let session: Session | null;

  if (!options?.noToken) {
    if (isClient()) {
      session = await getSession();
    } else {
      session = await getServerSession(config.auth);
    }

    if (session?.user.accessToken) {
      baseHeaders.Authorization = `Bearer ${session?.user.accessToken}`;
    }
  }

  const baseUrl = options?.baseUrl ?? config.env.API_ENDPOINT;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url.startsWith('http') ? url : `${baseUrl}/${url}`;

  try {
    const res = await fetch(fullUrl, { ...options, headers: { ...baseHeaders, ...options?.headers }, body, method });

    let data: any;

    if (res.headers.get('Content-Type')?.startsWith('application/octet-stream')) {
      data = await res.blob();
    } else {
      data = await res.text();
      if (data.startsWith('{') || data.startsWith('[')) {
        data = JSON.parse(data);
      } else if (data === 'null') {
        data = null;
      } else if (isBoolean(data)) {
        data = data === 'true';
      } else if (isNumber(data)) {
        data = Number(data);
      }
    }

    if (!res.ok) {
      return Promise.reject(data);
    }

    const payload: CustomResponse<Response> = {
      statusCode: res.status,
      data,
    };

    return payload;
  } catch (error) {
    return Promise.reject({ statusCode: 500, message: constants.sthWentWrong, data: error });
  }
};

const http = {
  get: <Response = any>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('GET', url, options);
  },
  post: <Response = any>(url: string, body?: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('POST', url, { ...options, body });
  },
  put: <Response = any>(url: string, body?: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options, body });
  },
  patch: <Response = any>(url: string, body?: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PATCH', url, { ...options, body });
  },
  delete: <Response = any>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('DELETE', url, { ...options });
  },
};

export const fetcher = (url: string) => http.get(url).then((response) => response.data);

export default http;
