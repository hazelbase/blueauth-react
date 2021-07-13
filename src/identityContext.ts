import {
  createContext,
} from 'react';
import type { Sdk } from 'blueauth-client';
import type { UseIdentityReturn } from './useIdentity';

const useIdentityDefault: UseIdentityReturn = {
  identity: null,
  user: null,
  loading: false,
  client: {} as Sdk,
};

export default createContext<UseIdentityReturn>(useIdentityDefault);
