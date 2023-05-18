import 'pinia';

declare module 'pinia' {
  interface DefineSetupStoreOptions {
    persist?: { paths: string[] };
  }
  interface DefineStoreOptionsInPlugin {
    persist?: { paths: string[] };
  }
}
