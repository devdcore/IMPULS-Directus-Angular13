export class UserEntity {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  location?: string;
  title?: string;
  description?: string;
  tags?: any;
  avatar?: string;
  language?: string;
  theme?: string;
  tfa_secret?: any;
  status?: string;
  role?: string | RoleEntity;
  token?: string;
  last_access?: string;
  last_page?: string;
  provider?: string;
  external_identifier?: string;
  auth_data?: string;
  email_notifications?: boolean;
  agencyId?: number | string | null;
  userType?: string | null;
  phone?: string | null;
  confirmed?: boolean;

  constructor() {
    this.id = '-1';
    this.first_name = 'New User';
    this.last_name = '';
    this.email = '';
    this.password = '';
    this.location = '';
    this.title = '';
    this.description = '';
    this.tags = '';
    this.avatar = '';
    this.language = '';
    this.theme = '';
    this.tfa_secret = '';
    this.status = '';
    this.role = new RoleEntity();
    this.token = '';
    this.last_access = '';
    this.last_page = '';
    this.provider = '';
    this.external_identifier = '';
    this.auth_data = '';
    this.email_notifications = true;
    this.agencyId = '';
    this.userType = '';
    this.phone = '';
    this.confirmed = false;
  }
}

export class RoleEntity {
  id?: string;
  name?: string;
  icon?: string;
  description?: string;
  ip_access?: string;
  enforce_tfa?: string;
  admin_access?: string;
  app_access?: string;
  order?: string;
  group?: string;
  users?: [];

  constructor() {
    this.id = '-1';
    this.name = '';
    this.icon = '';
    this.description = '';
    this.ip_access = '';
    this.enforce_tfa = '';
    this.admin_access = '';
    this.app_access = '';
    this.order = '';
    this.group = '';
    this.users = [];
  }
}

export class AgencyEntity {
  id?: number;
  status?: string;
  sort?: string;
  user_created?: string | UserEntity;
  date_created?: string;
  user_updated?: string | UserEntity;
  date_updated?: string;
  name?: string;
  address?: string;
  suburb?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  website?: string;
  facebook?: string;
  logoUrl?: string;
  logoBgColor?: string;
  logoImage?: string;
  textColor?: string;
  titleColor?: string;
  accentColor?: string;
  contrastColor?: string;
  userId?: Array<UserEntity> = [new UserEntity()];
  agencyCommission?: number | string;
  agentCommission?: number | string;
  leadId?: Array<LeadEntity> = [new LeadEntity()];
  logoType?: 'url' | 'custom' = 'url';
  logoToShow?: string;

  constructor() {
    this.id = -1;
    this.status = '';
    this.sort = '';
    this.user_created = new UserEntity();
    this.date_created = '';
    this.user_updated = new UserEntity();
    this.date_updated = '';
    this.name = 'New Agency';
    this.address = '';
    this.suburb = '';
    this.state = '';
    this.country = '';
    this.postalCode = '';
    this.phone = '';
    this.website = 'http://';
    this.facebook = 'http://';
    this.logoUrl = 'http://';
    this.logoBgColor = '';
    this.logoImage = '';
    this.textColor = '';
    this.titleColor = '';
    this.accentColor = '';
    this.contrastColor = '';
    this.userId = [new UserEntity()];
    this.agencyCommission = '';
    this.agentCommission = '';
    this.leadId = [new LeadEntity()];
  }
}

export class OrganizationEntity {
  id?: number;
  status?: string;
  sort?: string;
  user_created?: string | UserEntity;
  date_created?: string;
  user_updated?: string | UserEntity;
  date_updated?: string;
  name?: string;
  address?: string;
  suburb?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  website?: string;
  facebook?: string;
  logoUrl?: string;
  logoBgColor?: string;
  logoImage?: string;
  textColor?: string;
  titleColor?: string;
  accentColor?: string;
  contrastColor?: string;
  userId?: Array<UserEntity> = [new UserEntity()];
  agencyCommission?: number | string;
  agentCommission?: number | string;
  leadId?: Array<LeadEntity> = [new LeadEntity()];
}

export class ImageEntity {
  id?: string;
  storage?: string;
  filename_disk?: string;
  filename_download?: string;
  title?: string;
  type?: string;
  folder?: string;
  uploaded_by?: string;
  uploaded_on?: string;
  modified_by?: string;
  modified_on?: string;
  charset?: string;
  filesize?: number;
  width?: number;
  height?: number;
  duration?: string;
  embed?: string;
  description?: string;
  location?: string;
  tags?: string;
  metadata?: {
    ihdr: ImageMetadatEntity;
  };
}

export class ImageMetadatEntity {
  ImageWidth?: number;
  ImageHeight?: number;
  BitDepth?: number;
  ColorType?: string;
  Compression?: string;
  Filter?: string;
  Interlace?: string;
}

export class ProductEntity {
  id?: number;
  status?: string;
  sort?: number;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  sku?: string;
  productName?: string;
  description?: string;
  productPrice?: string;
  subcategoryId?: number;
  productImage?: any;
  size?: any;
  depth?: any;
  width?: any;
  comments?: any;
}

export class QuoteEntity {
  id?: number;
  status?: string;
  sort?: string;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  quoteDate?: string;
  comments?: string;
  total?: string;
  unit?: string;
  validUntil?: string;
  quoteStatus?: string;
  leadId?: number;

  constructor() {
    this.id = -1;
    this.status = '';
    this.sort = '';
    this.user_created = '';
    this.date_created = '';
    this.user_updated = '';
    this.date_updated = '';
    this.quoteDate = '';
    this.comments = '';
    this.total = '';
    this.unit = '';
    this.validUntil = '';
    this.quoteStatus = '';
    this.leadId = -1;
  }
}

export class LeadEntity {
  id = null; // 1,
  status = null; // published,
  sort = null; // null,
  user_created = null; // 59abe665-749e-440c-be74-a2b195233e12,
  date_created = null; // 2022-01-03T06:06:07.000Z,
  user_updated = null; // 59abe665-749e-440c-be74-a2b195233e12,
  date_updated = null; // 2022-01-03T06:10:47.000Z,
  name = null; // Pedro Perez,
  email = null; // pedro@gmail.com,
  address = null; // null,
  suburb = null; // null,
  state = null; // null,
  country = null; // null,
  postalCode = null; // null,
  phone = null; // +61 1234567890,
  comments = null; // Client wants some information about Model T,
  agencyId = null; // 2,
  userId = null; // b871ff0c-9fa5-415c-8213-ac3c8140f54f,
  leadStatus = null; // received
  quoteId: any[] = [];
  updateId: any[] = [];
}

export class LeadStatusEntity {
  id = null; // null
  status = null; // null
  sort = null; // null
  user_created = null; // null
  date_created = null; // null
  user_updated = null; // null
  date_updated = null; // null
  statusText = null; // null
  displayColor = null; // null
}

export class PresentationEntity {
  id?: number;
  status?: string;
  sort?: string;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  name?: string;
  css?: string;
  html?: string;
  json?: string;
  uuid?: string;
  comments?: string;
}

export class BuilderEntity {
  id?: number;
  status?: string;
  sort?: number;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  sku?: string;
  productName?: string;
  description?: string;
  productPrice?: string;
  subcategoryId?: number;
}

export class UpdateEntity {
  id?: number;
  status?: string;
  sort?: string;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  updateDate?: string;
  comments?: string;
  nextAction?: string;
  dateNext?: string;
  leadId?: number;
}

export class ProductCategoryEntity {
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
