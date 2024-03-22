interface RequestHeaders {
  "Content-Type"?: string;
  Authorization?: string;
  [key: string]: string | undefined;
}

class ApiService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:4000/api";
  }

  async get<T>(url: string, headers: RequestHeaders = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
        ...headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  async post<T>(
    url: string,
    data: any,
    headers: RequestHeaders = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
        ...headers,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  async put<T>(
    url: string,
    data: any,
    headers: RequestHeaders = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
        ...headers,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  async delete<T>(url: string, headers: RequestHeaders = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
        ...headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }
}

export default ApiService;
