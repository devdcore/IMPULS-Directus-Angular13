import {
  AccessControl,
  AgencyControl,
  AngularError,
  BuilderControl,
  LeadControl,
  NavigationControl,
  PresentationControl,
  ProductControl,
  QuoteControl,
  UpdateControl,
  UserControl,
} from '@shared/modules';

import { SidebarControl } from './shared.control';

export class SharedState {
  // Error
  angularError = new AngularError();
  angularMessage: string | null = null;

  // Base
  accessControl: AccessControl = new AccessControl();
  navigationControl: NavigationControl = new NavigationControl();

  // Custom
  agencyControl: AgencyControl = new AgencyControl();
  userControl: UserControl = new UserControl();
  leadControl: LeadControl = new LeadControl();
  presentationControl: PresentationControl = new PresentationControl();
  productControl: ProductControl = new ProductControl();
  quoteControl: QuoteControl = new QuoteControl();
  builderControl: BuilderControl = new BuilderControl();
  updateControl: UpdateControl = new UpdateControl();
  sidebarControl: SidebarControl = new SidebarControl();
  test: string = 'verde';
  danielControl: DanielControl = new DanielControl();

  clearErrorAndMessage() {
    this.angularError = new AngularError();
    this.angularMessage = null;
  }
}

export class DanielControl{
  userName?: string;
  registerDate?: Date;

}