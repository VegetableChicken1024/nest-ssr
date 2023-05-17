import { resolve } from 'path';

export const resolveClientPath = (...pathSegments: string[]) =>
  resolve(__dirname, '..', '..', 'client', ...pathSegments);

export const resolveDistPath = (...pathSegments: string[]) =>
  resolve(__dirname, '..', '..', 'dist', ...pathSegments);
