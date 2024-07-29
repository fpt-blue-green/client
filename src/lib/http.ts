import { toast } from 'sonner';
import { constants } from './utils';
import config from '@/config';

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

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`;
    }
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

export default http;
