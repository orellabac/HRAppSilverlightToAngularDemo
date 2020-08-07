import { User} from "../Generated_Code/Models/Shared/User.shared";
import { ErrorResources} from "../ErrorResources.Designer";
import { ValidationResult, ArgumentNullException, LoginParameters, WebContextBase, AuthenticationDomainContextBase, Uri, WebDomainClient, DomainClient, EntitySet, EntityQuery, SimpleDictionary, EntityContainer, AsyncCallback, IAsyncResult, QueryResult, ChangeSetEntry, EntitySetOperations, Entity, EntityCollection, EntityRef, Guid, DomainContext, EntityKey, IIdentity, IPrincipal} from "smcomponents";
export class RegistrationData extends Entity {
   private _passwordConfirmation : string = null;
   /*Could Not Transform the Attributes section*/
   private ActualPassword0 : string;
   set ActualPassword(value : string) {
      this.ActualPassword0 = value
   }
   get ActualPassword() : string {
      return this.ActualPassword0;
   }
   set PasswordConfirmation(value : string) {
      this.ValidateProperty("PasswordConfirmation", value);
      this._passwordConfirmation = value;
      this.RaisePropertyChanged("PasswordConfirmation");
   }
   get PasswordConfirmation() : string {
      return this._passwordConfirmation;
   }
   public static CheckPasswordConfirmation (passwordConfirmation : string,validationContext : any) : ValidationResult {
      if (validationContext == null) {
         throw new ArgumentNullException ("validationContext");
      }
      var registrationData : RegistrationData = <RegistrationData>validationContext.ObjectInstance;
      if (registrationData.ActualPassword == passwordConfirmation) {
         return ValidationResult.Success;
      }
      return new ValidationResult (ErrorResources.ValidationErrorPasswordConfirmationMismatch, ["PasswordConfirmation"]);
   }
   public OnPropertyChanged (e : {
      PropertyName : string
   }) : void {
      if (e == null) {
         throw new ArgumentNullException ("e");
      }
      super.OnPropertyChanged(e);
      if (e.PropertyName == "UserName" || e.PropertyName == "FriendlyName") {
         this.RaisePropertyChanged("DisplayName");
      }
   }
   /**
    * 
    *     Creates a new <see cref="System.ServiceModel.DomainServices.Client.ApplicationServices.LoginParameters"/>
    *     initialized with this entity's data (IsPersistent will default to false)
    * 
    */
   public ToLoginParameters () : LoginParameters {
      return new LoginParameters (this.UserName, this.Password, false, null);
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\Generated_Code\HRApp.Web.g.cs
   private _answer : string = null;
   private _email : string = null;
   private _friendlyName : string = null;
   private _password : string = null;
   private _question : string = null;
   private _userName : string = null;
   /**
    * 
    * This method is invoked from the constructor once initialization is complete and
    * can be used for further object setup.
    * 
    */
   public constructor () {
      super();
   }
   set Answer(value : string) {
      if ((this._answer != value)) {
         this.RaiseDataMemberChanging("Answer");
         this.ValidateProperty("Answer", value);
         this._answer = value;
         this.RaiseDataMemberChanged("Answer");
      }
   }
   get Answer() : string {
      return this._answer;
   }
   set Email(value : string) {
      if ((this._email != value)) {
         this.ValidateProperty("Email", value);
         this._email = value;
         this.RaisePropertyChanged("Email");
      }
   }
   get Email() : string {
      return this._email;
   }
   set FriendlyName(value : string) {
      if ((this._friendlyName != value)) {
         this.RaiseDataMemberChanging("FriendlyName");
         this.ValidateProperty("FriendlyName", value);
         this._friendlyName = value;
         this.RaiseDataMemberChanged("FriendlyName");
      }
   }
   get FriendlyName() : string {
      return this._friendlyName;
   }
   set Password(value : string) {
      if ((this._password != value)) {
         this.RaiseDataMemberChanging("Password");
         this.ValidateProperty("Password", value);
         this._password = value;
         this.RaiseDataMemberChanged("Password");
      }
   }
   get Password() : string {
      return this._password;
   }
   set Question(value : string) {
      if ((this._question != value)) {
         this.RaiseDataMemberChanging("Question");
         this.ValidateProperty("Question", value);
         this._question = value;
         this.RaiseDataMemberChanged("Question");
      }
   }
   get Question() : string {
      return this._question;
   }
   set UserName(value : string) {
      if ((this._userName != value)) {
         this.ValidateProperty("UserName", value);
         this._userName = value;
         this.RaisePropertyChanged("UserName");
      }
   }
   get UserName() : string {
      return this._userName;
   }
   /**
    * 
    * Computes a value from the key fields that uniquely identifies this entity instance.
    * 
    * @returns An object instance that uniquely identifies this entity instance.
    */
   public GetIdentity () : any {
      if (((this._email == null) || (this._userName == null))) {
         return null;
      }
      return EntityKey.Create(this._email, this._userName);
   }
}