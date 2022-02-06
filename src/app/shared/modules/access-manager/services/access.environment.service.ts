import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

// import * from '/assets/environment/env.js'

@Injectable( {
  providedIn: "root",
} )
export class AccessEnvironmentService {
  // Host
  public host = environment.host;

  // API url
  public apiUrl = environment.apiUrl;

  // API url
  public utilityUrl = environment.utilityUrl;

  // Report url
  public reportUrl = environment.reportUrl;

  // Version
  public version = environment.version;

  // Whether or not to enable debug mode
  public enableDebug = environment.enableDebug;

  constructor() { }
}
