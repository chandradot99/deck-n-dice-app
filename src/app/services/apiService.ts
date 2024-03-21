interface RequestHeaders {
  "Content-Type"?: string;
  Authorization?: string;
  [key: string]: string | undefined;
}

class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    method: string,
    url: string,
    data: any = {},
    headers: RequestHeaders = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  get<T>(url: string): Promise<T> {
    return this.request<T>("GET", url);
  }

  post<T>(url: string, data: any): Promise<T> {
    return this.request<T>("POST", url, data);
  }

  put<T>(url: string, data: any): Promise<T> {
    return this.request<T>("PUT", url, data);
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>("DELETE", url);
  }

  getToken(): string | null {
    // Implement logic to retrieve auth token from cookies, local storage, etc.
    // Replace with your specific logic
    return null;
  }
}

export default ApiService;
