import {
  createElement,
  ReactNode,
} from 'react';
import type { Config } from 'blueauth-client';
import { useIdentity } from './useIdentity';
import identityContext from './identityContext';

export default function BlueAuthProvider({
  children,
  config,
}: {
  children: ReactNode,
  config?: Config,
}) {
  return createElement(
    identityContext.Provider,
    { value: useIdentity(config) },
    children,
  );
}
