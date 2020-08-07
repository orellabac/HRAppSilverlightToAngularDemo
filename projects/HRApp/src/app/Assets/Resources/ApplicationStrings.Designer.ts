import { ResourceManager} from "smcomponents";
/// <summary>
///   A strongly-typed resource class, for looking up localized strings, etc.
/// </summary>
// This class was auto-generated by the StronglyTypedResourceBuilder
// class via a tool like ResGen or Visual Studio.
// To add or remove a member, edit your .ResX file then rerun ResGen
// with the /str option, or rebuild your VS project.
//Could not Transform the Attributes Section
export class ApplicationStrings {
   private static resourceMan : ResourceManager = null;
   private static resourceCulture : any = null;
   /*Could not transform the Attributes section*/
   public constructor () {
   }
   static get ResourceManager() : ResourceManager {
      if (ApplicationStrings.resourceMan === null) {
         var temp : ResourceManager = new ResourceManager ("HRApp.Assets.Resources.ApplicationStrings");
         ApplicationStrings.resourceMan = temp;
      }
      return ApplicationStrings.resourceMan;
   }
   static set Culture(value : any) {
      ApplicationStrings.resourceCulture = value;
   }
   static get Culture() : any {
      return ApplicationStrings.resourceCulture;
   }
   static get AboutPageTitle() : string {
      return ApplicationStrings.ResourceManager.GetString("AboutPageTitle", ApplicationStrings.resourceCulture);
   }
   static get ActivityLoadingUser() : string {
      return ApplicationStrings.ResourceManager.GetString("ActivityLoadingUser", ApplicationStrings.resourceCulture);
   }
   static get ActivityLoggingIn() : string {
      return ApplicationStrings.ResourceManager.GetString("ActivityLoggingIn", ApplicationStrings.resourceCulture);
   }
   static get ActivityRegisteringUser() : string {
      return ApplicationStrings.ResourceManager.GetString("ActivityRegisteringUser", ApplicationStrings.resourceCulture);
   }
   static get AlreadyRegisteredLabel() : string {
      return ApplicationStrings.ResourceManager.GetString("AlreadyRegisteredLabel", ApplicationStrings.resourceCulture);
   }
   static get ApplicationName() : string {
      return ApplicationStrings.ResourceManager.GetString("ApplicationName", ApplicationStrings.resourceCulture);
   }
   static get BackToLoginButton() : string {
      return ApplicationStrings.ResourceManager.GetString("BackToLoginButton", ApplicationStrings.resourceCulture);
   }
   static get CancelButton() : string {
      return ApplicationStrings.ResourceManager.GetString("CancelButton", ApplicationStrings.resourceCulture);
   }
   static get ErrorBadUserNameOrPassword() : string {
      return ApplicationStrings.ResourceManager.GetString("ErrorBadUserNameOrPassword", ApplicationStrings.resourceCulture);
   }
   static get ErrorLoginAfterRegistrationFailed() : string {
      return ApplicationStrings.ResourceManager.GetString("ErrorLoginAfterRegistrationFailed", ApplicationStrings.resourceCulture);
   }
   static get ErrorWindowErrorDetails() : string {
      return ApplicationStrings.ResourceManager.GetString("ErrorWindowErrorDetails", ApplicationStrings.resourceCulture);
   }
   static get ErrorWindowGenericError() : string {
      return ApplicationStrings.ResourceManager.GetString("ErrorWindowGenericError", ApplicationStrings.resourceCulture);
   }
   static get ErrorWindowTitle() : string {
      return ApplicationStrings.ResourceManager.GetString("ErrorWindowTitle", ApplicationStrings.resourceCulture);
   }
   static get HomePageTitle() : string {
      return ApplicationStrings.ResourceManager.GetString("HomePageTitle", ApplicationStrings.resourceCulture);
   }
   static get LoginButton() : string {
      return ApplicationStrings.ResourceManager.GetString("LoginButton", ApplicationStrings.resourceCulture);
   }
   static get LoginWindowTitle() : string {
      return ApplicationStrings.ResourceManager.GetString("LoginWindowTitle", ApplicationStrings.resourceCulture);
   }
   static get LogOffButton() : string {
      return ApplicationStrings.ResourceManager.GetString("LogOffButton", ApplicationStrings.resourceCulture);
   }
   static get NotRegisteredYetLabel() : string {
      return ApplicationStrings.ResourceManager.GetString("NotRegisteredYetLabel", ApplicationStrings.resourceCulture);
   }
   static get OKButton() : string {
      return ApplicationStrings.ResourceManager.GetString("OKButton", ApplicationStrings.resourceCulture);
   }
   static get RegisterNowButton() : string {
      return ApplicationStrings.ResourceManager.GetString("RegisterNowButton", ApplicationStrings.resourceCulture);
   }
   static get RegistrationFormHeader() : string {
      return ApplicationStrings.ResourceManager.GetString("RegistrationFormHeader", ApplicationStrings.resourceCulture);
   }
   static get RegistrationWindowTitle() : string {
      return ApplicationStrings.ResourceManager.GetString("RegistrationWindowTitle", ApplicationStrings.resourceCulture);
   }
   static get RememberMeLabel() : string {
      return ApplicationStrings.ResourceManager.GetString("RememberMeLabel", ApplicationStrings.resourceCulture);
   }
   static get WelcomeMessage() : string {
      return ApplicationStrings.ResourceManager.GetString("WelcomeMessage", ApplicationStrings.resourceCulture);
   }
}