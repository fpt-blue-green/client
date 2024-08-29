import { toast } from 'sonner';
import { constants } from './utils';
import config from '@/config';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

type CustomRequest = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
};

type CustomResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
};

export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomRequest,
): Promise<CustomResponse<Response>> => {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  let session;

  if (isClient()) {
    session = await getSession();
  } else {
    session = await getServerSession();
  }

  if (session?.user.accessToken) {
    baseHeaders.Authorization = `Bearer ${session?.user.accessToken}`;
  }

  const baseUrl = options?.baseUrl ?? config.env.API_ENDPOINT;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url.startsWith('http') ? url : `${baseUrl}/${url}`;

  try {
    const res = await fetch(fullUrl, { ...options, headers: { ...baseHeaders, ...options?.headers }, body, method });

    const data: CustomResponse<Response> = await res.json();

    if (!res.ok) {
      if (isClient()) {
        toast.error(data.message || constants.sthWentWrong);
      }

      throw new Error(`API request failed: ${data.statusCode}`);
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
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
    return request<Response>('PUT', url, { ...options, body });
  },
  delete: <Response = any>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options });
  },
};

export const fetcher = (url: string) => http.get(url).then((response) => response.data);

export default http;
