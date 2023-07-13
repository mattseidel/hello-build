import axios from "axios";

export class Base {
  private readonly baseURL = "http://localhost:3000";
  constructor(private url: string) {}

  async add<T>(data: T): Promise<T> {
    const response = await axios.post<T>(`${this.baseURL}/${this.url}`, data);
    return response.data;
  }

  async get<T>(): Promise<T> {
    const response = await axios.get<T>(`${this.baseURL}/${this.url}`);
    return response.data;
  }

  async getOne<T>(id: string): Promise<T> {
    const response = await axios.get<T>(`${this.baseURL}/${this.url}/${id}`);
    return response.data;
  }

  async post<T>(data: T): Promise<T> {
    const response = await axios.post<T>(`${this.baseURL}/${this.url}`, data);
    return response.data;
  }

  async put<T>(id: string, data: T): Promise<T> {
    const response = await axios.put<T>(
      `${this.baseURL}/${this.url}/${id}`,
      data
    );
    return response.data;
  }

  async delete<T>(): Promise<T> {
    const response = await axios.delete<T>(`${this.baseURL}/${this.url}`);
    return response.data;
  }
}
