import type { ApiResponse, PaginatedRequest, ApiMeta } from '@studyai/types';

export interface StudyAIClientConfig {
  baseUrl: string;
  getToken: () => Promise<string> | string;
}

export class StudyAIClient {
  private baseUrl: string;
  private getToken: () => Promise<string> | string;

  constructor(config: StudyAIClientConfig) {
    this.baseUrl = config.baseUrl;
    this.getToken = config.getToken;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const token = await this.getToken();
    
    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return response.json();
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', path, undefined, params);
  }

  async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', path, body);
  }

  async patch<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', path, body);
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', path);
  }
}