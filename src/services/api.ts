/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ----------------------------------------------------
// Core API Service (Mocking the real NestJS Backend)
// ----------------------------------------------------

// Simulated delay for realistic OS feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    await delay(300);
    console.log(`[GET] ${endpoint}`);
    // Mock response based on endpoint
    return {} as T;
  },

  post: async <T>(endpoint: string, body: any): Promise<T> => {
    await delay(500);
    console.log(`[POST] ${endpoint}`, body);
    return {} as T;
  },

  put: async <T>(endpoint: string, body: any): Promise<T> => {
    await delay(500);
    console.log(`[PUT] ${endpoint}`, body);
    return {} as T;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    await delay(400);
    console.log(`[DELETE] ${endpoint}`);
    return {} as T;
  }
};
