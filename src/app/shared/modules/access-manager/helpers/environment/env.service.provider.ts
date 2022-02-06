/**************************
 * ENVIRONMENT SERVICE PROVIDER
 * Allows to implement an env variable
 * that holds global values
 */

import {
  AccessEnvironmentService,
} from '@shared/modules/access-manager/services';

// Use global variable for sso
declare global {
  interface Window {
    __env: any;
    SSOisRequiredLogin: any;
    SSOloged: any;
    GLOBAL: any;
  }
}

// Use factory to export environment service
export const AccessControlEnvironmentServiceFactory = () => {
  // Create env
  const env = new AccessEnvironmentService();


  // Read environment variables from window
  const browserWindow = window || { __env: '' };
  const browserWindowEnv = browserWindow.__env || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the AccessControlEnvironmentService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.

  /*
  for ( const key in browserWindowEnv ) {
    if ( browserWindowEnv.hasOwnProperty( key ) ) {
      env[key] = window.__env[key];
    }
  }
  */

  return env;
};


export const AccessControlEnvironmentServiceProvider = {
  provide: AccessEnvironmentService,
  useFactory: AccessControlEnvironmentServiceFactory,
  deps: [],
};