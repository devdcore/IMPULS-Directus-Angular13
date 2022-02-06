/**************************
 * GUARD
 * Used to protect routes.
 * Can implement functions like:
 * canActivate, canactivateChild, and others
 */

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable( {
  providedIn: 'root',
} )
export class AuthGuard implements CanActivate {
  constructor( private router: Router ) { }

  canActivate () {
    if ( this.isLogged() ) {
      return true;
    }
    this.router.navigate( ['/access-denied'] );
    return false;
  }

  canActivateChild () {
    if ( this.isLogged() ) {
      return true;
    }
    this.router.navigate( ['/access-denied'] );
    return false;
  }

  isLogged () {
    let result = false;

    const temp = JSON.parse( sessionStorage.getItem( 'currentUser' ) as string );

    if ( temp && temp.jwt ) {
      result = true;
    }
    return result;
  }
}
