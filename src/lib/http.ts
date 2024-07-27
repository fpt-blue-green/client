type CustomRequest = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomRequest,
) => {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
  };

  const baseUrl = options?.baseUrl ?? process.env.NEXT_PUBLIC_API_ENDPOINT;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url.startsWith('http') ? url : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, { ...options, headers: { ...baseHeaders, ...options?.headers }, body, method });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new Error(`API request failed: ${data.status}`);
  }
  return data;
};

const http = {
  get: <Response>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('GET', url, options);
  },
  post: <Response>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('POST', url, { ...options, body });
  },
  put: <Response>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options, body });
  },
  patch: <Response>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete: <Response>(url: string, options?: Omit<CustomRequest, 'body'>) => {
    return request<Response>('PUT', url, { ...options });
  },
};

export default http;
