/* eslint-disable no-console */
import { useIdentity } from './useIdentity';
import identityContext from './identityContext';
import BlueAuthProvider from './provider';

export {
  useIdentity,
  useIdentity as useUser,
  identityContext,
  identityContext as userContext,
  BlueAuthProvider,
};
