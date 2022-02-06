import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import {
  AgencyEntity,
  DirectusLoginResponse,
  LeadEntity,
  PresentationEntity,
  ProductEntity,
  QuoteEntity,
  UpdateEntity,
  UserEntity,
} from '@shared/modules';

import { BuilderEntity } from '../';
import { OrganizationEntity } from './';
import { RoleEntity } from './shared.entity';

export class AccessControl {
  currentSession: DirectusLoginResponse = new DirectusLoginResponse();
  currentUser: UserEntity = new UserEntity();
  currentAgency: AgencyEntity = new AgencyEntity();
  currentOrganization: OrganizationEntity = new OrganizationEntity();
  currentLanguage: string = 'en';

  languages = ['es', 'en'];

  isLoading: boolean = false;
  isLogged: boolean = false;
  isTokenActive = true;
  isRefreshing: boolean = false;

  authorization: boolean = true;
  accessToken!: any;
  refreshToken!: any;
  refreshTokenSubject!: any;
  headers!: HttpHeaders;
}

export class NavigationControl {
  currentRoute!: string;
  currentName!: string;
  isSidebarVisible: boolean = true;
}

export class AgencyControl {
  agencyList = [new AgencyEntity()];
  agencySearchString = '';
  agencySelected = new AgencyEntity();
  agencyTotalCount = 0;
  agencyFilterCount = 0;
  agencyForm!: FormGroup;
  agencyMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
  isOptionMenu: 'option1' | 'option2' | 'option3' = 'option1';
  agencyFilterSting: string = '';
  // isOptionMenu!: 'option1' | 'option2' | 'option3'; == null
}

export class ProductControl {
  productList = [new ProductEntity()];
  productSearchString = '';
  productSelected = new ProductEntity();
  productTotalCount = 0;
  productFilterCount = 0;
  productForm!: FormGroup;
  productMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
}

export class QuoteControl {
  quoteList = [new QuoteEntity()];
  quoteSearchString = '';
  quoteSelected = new QuoteEntity();
  quoteTotalCount = 0;
  quoteFilterCount = 0;
  quoteForm!: FormGroup;
  quoteMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
}

export class UserControl {
  userList = [new UserEntity()];
  userSearchString = '';
  userSelected = new UserEntity();
  userTotalCount = 0;
  userFilterCount = 0;
  userForm!: FormGroup;
  userMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
  userRoleList = [new RoleEntity()];
  userAgencyList = [new AgencyEntity()];
  userSelectedAgency = new AgencyEntity();
}

export class LeadControl {
  leadList = [new LeadEntity()];
  leadSearchString = '';
  leadSelected = new LeadEntity();
  leadTotalCount = 0;
  leadFilterCount = 0;
  leadForm!: FormGroup;
  leadMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
}

export class UpdateControl {
  updateList = [new UpdateEntity()];
  updateSearchString = '';
  updateSelected = new UpdateEntity();
  updateTotalCount = 0;
  updateFilterCount = 0;
  updateForm!: FormGroup;
  updateMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
}

export class PresentationControl {
  presentationList = [new PresentationEntity()];
  presentationSearchString = '';
  presentationSelected = new PresentationEntity();
  presentationTotalCount = 0;
  presentationFilterCount = 0;
  presentationForm!: FormGroup;
  presentationMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
}

export class BuilderControl {
  builderList = [new BuilderEntity()];
  builderSearchString = '';
  builderSelected = new BuilderEntity();
  builderTotalCount = 0;
  builderFilterCount = 0;
  builderForm!: FormGroup;
  builderMode: 'view' | 'edit' | 'new' | 'archive' | 'delete' = 'new';
  isShowFilters: boolean = false;
  isOptionMenu: 'floor-plan' | 'exterior' | 'interior' | 'details' =
    'floor-plan';
  isShowSidebar: boolean = true;
  isShowMenu: boolean = true;
}

export class SidebarControl {
  isShowSidebar: boolean = true;
}
