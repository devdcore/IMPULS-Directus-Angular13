import { UserEntity } from '@shared/modules';


export class UserAuth {
  data?: {
    id?: string; //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    user_name?: number; // 9000    
  };
}



export class DirectusLoginResponse {
  data?: {
    access_token?: string; //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    expires?: number; // 9000
    refresh_token?: string; //nd1sIMTathGFJV3oLFmzqrNt_6ynvlnY8Z4...
  };
}

export class DirectusLogoutResponse {
  // data: {
  //   access_token: string, //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  //   expires: number, // 9000
  //   refresh_token: string; //nd1sIMTathGFJV3oLFmzqrNt_6ynvlnY8Z4...
  // };
}

export class DirectusUserResponse {
  data?: UserEntity;
}

/******************************************************************************** */

export class UserRegisterResponse {
  user_username?: string;
  user_password?: string;
  user_storeId?: string;
  user_id?: number;
  user_created?: string;
  user_updated?: string;
}

export class UserLoginTokenResponse {
  user_id?: number;
  access_token?: string;
}

export class UserLoginUserResponse {
  jwt?: string;
  user?: {
    id?: 1;
    username?: string;
    email?: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    profile?: any;
    role?: {
      id?: number;
      name?: string;
      description?: string;
      type?: string;
    };
    created_at?: string;
    updated_at?: string;
    firstName?: string;
    lastName?: string;
    reference?: string;
    termsAccepted?: boolean;
  };
}

export class ProductCategoryResponse {
  id = null; // 1,
  status = null; // published,
  sort = null; // null,
  date_created = null; // 2021-11-21T07:59:23.000Z,
  date_updated = null; // 2021-12-20T14:10:36.000Z,
  categoryName = null; // Floor plan,
  user_created = null; // null,
  user_updated = null; // null,
  categoryIcon = null; // null
}

export class ErrorResponse {
  code?: number;
  name?: string;
  errors?: [
    {
      path?: string;
      method?: string;
      message?: string;
      timestamp?: string;
    }
  ];
}
