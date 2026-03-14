import { TMDB_CONFIG } from '../lib/constants';

export class ApiError extends Error {
  status?: number;
  statusText?: string;

  constructor(
    message: string,
    status?: number,
    statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

export interface ApiRequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);

    // Add API key
    url.searchParams.append('api_key', this.apiKey);

    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const { params, body, headers = {} } = options;

    const url = this.buildURL(endpoint, params);

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
      config.method = 'POST';
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.status_message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }

  async get<T>(endpoint: string, params?: ApiRequestOptions['params']): Promise<T> {
    return this.request<T>(endpoint, { params });
  }

  async post<T>(endpoint: string, body?: unknown, headers?: ApiRequestOptions['headers']): Promise<T> {
    return this.request<T>(endpoint, { body, headers });
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(TMDB_CONFIG.BASE_URL, TMDB_CONFIG.API_KEY);
