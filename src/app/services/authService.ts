class AuthService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:4000/api";
  }

  async login(credentials: {
    username: string;
    hash_password: string;
  }): Promise<any> {
    const response = await fetch(`${this.baseUrl}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}`);
    }

    const { data } = await response.json();
    this.setToken(data.token);
    return data;
  }

  async signup(userData: {
    username: string;
    hash_password: string;
  }): Promise<any> {
    const response = await fetch(`${this.baseUrl}/accounts/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: userData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Signup failed with status ${response.status}`);
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  async verifyToken(token: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/accounts/verify_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}`);
    }

    const { data } = await response.json();
    this.setToken(data.token);
    return data;
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.setToken(null);
  }
}

export default AuthService;
