import { WebStorage } from 'redux-persist';

export interface PersistConfig {
  key: string;
  storage: WebStorage;
}
