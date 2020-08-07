import { Entity, LoginParameters} from "smcomponents";
/// <summary>
///     This internal entity is used to ease the binding between the UI controls
///     (DataForm and the label displaying a validation error) and the log on
///     credentials entered by the user
/// </summary>
export class LoginInfo extends Entity {
   /*Could Not Transform the Attributes section*/
   private UserName0 : string;
   set UserName(value : string) {
      this.UserName0 = value
   }
   get UserName() : string {
      return this.UserName0;
   }
   /*Could Not Transform the Attributes section*/
   private Password1 : string;
   set Password(value : string) {
      this.Password1 = value
   }
   get Password() : string {
      return this.Password1;
   }
   /*Could Not Transform the Attributes section*/
   private RememberMe2 : boolean;
   set RememberMe(value : boolean) {
      this.RememberMe2 = value
   }
   get RememberMe() : boolean {
      return this.RememberMe2;
   }
   /**
    * 
    *     Creates a new <see cref="System.ServiceModel.DomainServices.Client.ApplicationServices.LoginParameters"/>
    *     using the data stored in this entity
    * 
    */
   public ToLoginParameters () : LoginParameters {
      return new LoginParameters (this.UserName, this.Password, this.RememberMe, null);
   }
}