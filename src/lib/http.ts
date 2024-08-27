import { toast } from 'sonner';
import { constants } from './utils';
import config from '@/config';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

type CustomRequest = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
};

export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomRequest,
) => {
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

  if (session?.user.token) {
    baseHeaders.Authorization = `Bearer ${session?.user.token}`;
  }

  const baseUrl = options?.baseUrl ?? config.env.NEXT_PUBLIC_API_ENDPOINT;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url.startsWith('http') ? url : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, { ...options, headers: { ...baseHeaders, ...options?.headers }, body, method });

  const payload: Response | any = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (isClient()) {
      toast.error(payload.message || constants.sthWentWrong);
    }
    throw new Error(`API request failed: ${data.status}`);
  }
  return data;
};

const http = {
  get: <Response>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('GET', url, options);
  },
  post: <Response>(url: string, body?: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('POST', url, { ...options, body });
  },
  put: <Response>(url: string, body?: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options, body });
  },
  patch: <Response>(url: string, body?: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete: <Response>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options });
  },
};

export const fetcher = (url: string) => http.get(url).then((response) => response.payload);

export default http;
