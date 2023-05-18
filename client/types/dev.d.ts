import { StateTree } from 'pinia';

declare global {
  interface Window {
    __INITIAL_STATE__: { [key: string]: StateTree };
  }
}
