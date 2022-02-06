/**************************
 * DTO
 * Data Transfer Objects
 * Used to send data as expected to the backend
 */

export class DirectusLoginDTO {
  email!: string;
  password!: string;
  otp?: string;
  mode?: string;
}

export class DirectusLogoutDto {
  refresh_token!: string;
}

export class DirectusTokenRefreshDto {
  refresh_token!: string;
}

export class DirectusPasswordRequestDto {
  email!: string;
}

export class DirectusPasswordResetDto {
  token!: string;
  password!: string;
}

export class AgencyDto {
  id?: number | null;
  status: 'draft' | 'published' | 'archived' = 'published';
  name?: string | null;
  address?: string | null;
  suburb?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  website?: string | null = 'http://';
  facebook?: string | null = 'http://';
  logoUrl?: string | null = 'http://';
  logoBgColor?: string | null;
  logoImage?: string | null;
  textColor?: string | null;
  titleColor?: string | null;
  accentColor?: string | null;
  contrastColor?: string | null;
  agencyCommission?: number | string;
  agentCommission?: number | string;
  logoType?: string | null;
}
export class LeadDto {
  id?: number | null;
  status?: string | null;
  sort?: string | null;
  user_created?: string | null;
  date_created?: string | null;
  user_updated?: string | null;
  date_updated?: string | null;
  name?: string | null;
  email?: string | null;
  address?: string | null;
  suburb?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  comments?: string | null;
  agencyId?: string | null;
  userId?: string | null;
  leadStatus?: string | null;
}

export class PresentationDto {
  id?: number | null;
  status?: string | null;
  sort?: string | null;
  user_created?: string | null;
  date_created?: string | null;
  user_updated?: string | null;
  date_updated?: string | null;
  name?: string | null;
  css?: string | null;
  html?: string | null;
  json?: string | null;
  uuid?: string | null;
  comments?: string | null;
}

export class ProductDto {
  id?: number | null;
  status?: string | null;
  sort?: number | null;
  user_created?: string | null;
  date_created?: string | null;
  user_updated?: string | null;
  date_updated?: string | null;
  sku?: string | null;
  productName?: string | null;
  description?: string | null;
  productPrice?: string | null;
  subcategoryId?: number | null;
  productImage?: any;
  size?: any;
  depth?: number | null;
  width?: number | null;
  comments?: string | null;
}

export class QuoteDto {
  id?: number | null;
  status?: string | null;
  sort?: string | null;
  user_created?: string | null;
  date_created?: string | null;
  user_updated?: string | null;
  date_updated?: string | null;
  quoteDate?: string | null;
  comments?: string | null;
  total?: string | null;
  unit?: string | null;
  validUntil?: string | null;
  quoteStatus?: string | null;
  leadId?: number | null;
}

/************************************************************************************************ */
export class UserAccessRegisterDTO {
  id?: string;
  username?: string;
  email?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean = false;
  firstName?: string;
  lastName?: string;
  reference?: string;
  termsAccepted?: boolean = false;
  role?: {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    permissions?: [string];
    users?: [string];
    created_by?: string;
    updated_by?: string;
  };
  profile?: {
    id?: string;
    avatar_path?: string;
    gender?: string;
    expertice_level?: string;
    interest_markets?: any;
    profile_user?: string;
    published_at?: string;
    created_by?: string;
    updated_by?: string;
  };
}

export class UserAccessLoginDTO {
  identifier?: string;
  password?: string;
}

export class UserDto {
  id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
  location?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: string | null;
  avatar?: string | null;
  language?: string | null;
  theme?: string | null;
  tfa_secret?: string | null;
  status?: string | null;
  role?: string | null;
  token?: string | null;
  last_access?: string | null;
  last_page?: string | null;
  provider?: string | null;
  external_identifier?: string | null;
  auth_data?: string | null;
  email_notifications?: string | null;
  agencyId?: string | number | null;
  userType?: string | null;
  phone?: string | null;
  confirmed?: boolean;
}

export class BuilderDto {
  id?: number | null;
  status?: string | null;
  sort?: number | null;
  user_created?: string | null;
  date_created?: string | null;
  user_updated?: string | null;
  date_updated?: string | null;
  sku?: string | null;
  productName?: string | null;
  description?: string | null;
  productPrice?: number | null;
  subcategoryId?: number | null;
}

export class UpdateDto {
  id?: number | null;
  status?: number | null;
  sort?: number | null;
  user_created?: number | null;
  date_created?: number | null;
  user_updated?: number | null;
  date_updated?: number | null;
  updateDate?: number | null;
  comments?: number | null;
  nextAction?: number | null;
  dateNext?: number | null;
  leadId?: number | null;
}
