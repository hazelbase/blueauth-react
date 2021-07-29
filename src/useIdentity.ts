import { useState, useEffect } from 'react';
import type { Config, Sdk } from 'blueauth-client';
import blueauthClient from 'blueauth-client';

export interface UseIdentityReturn {
  identity: any;
  user: any;
  loading: boolean;
  client: Sdk,
}
export const useIdentity = (config?: Config): UseIdentityReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [identity, setIdentity] = useState<any>(null);

  const completeSetIdentity = (payload: any) => {
    if (localStorage) localStorage.setItem('blueauth.identity', JSON.stringify(payload));
    setIdentity(payload);
  };

  const clientBasic = blueauthClient(config);

  const whoamiBasic = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await clientBasic.getSelf();
      completeSetIdentity(data.whoami);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('blueauth error', err);
      completeSetIdentity(null);
    }
    setLoading(false);
  };

  const wrappedConfig: Config = {
    sdkFunctionWrapper: async (action) => {
      setLoading(true);
      const actionResult = await <any>action();

      const isWhoami = Object.keys(actionResult).includes('whoami');
      if (!isWhoami) {
        whoamiBasic();
        return actionResult;
      }

      completeSetIdentity(actionResult.whoami);
      setLoading(false);
      return actionResult;
    },
  };

  const clientWrapped = blueauthClient({ ...wrappedConfig, ...config });

  useEffect(() => {
    whoamiBasic();

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key !== 'blueauth.identity') return;
      const newIdentity = event.newValue;
      setIdentity(newIdentity ? JSON.parse(newIdentity) : null);
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  return {
    identity,
    user: identity,
    loading,
    client: clientWrapped,
  };
};
