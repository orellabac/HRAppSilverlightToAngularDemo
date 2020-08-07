import { RegistrationData} from "../../../Models/RegistrationDataExtensions";
import { WebContextBase, AuthenticationDomainContextBase, Uri, WebDomainClient, DomainClient, EntitySet, EntityQuery, SimpleDictionary, EntityContainer, AsyncCallback, IAsyncResult, QueryResult, ChangeSetEntry, EntitySetOperations, Entity, EntityCollection, EntityRef, Guid, DomainContext, EntityKey, IIdentity, IPrincipal} from "smcomponents";
/// <summary>
///     Partial class extending the User type that adds shared properties and methods
///     that will be available both to the server app and the client app
/// </summary>
export class User extends Entity {
   get DisplayName() : string {
      if (!!(this.FriendlyName)) {
         return this.FriendlyName;
      } else {
         return this.Name;
      }
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\Generated_Code\HRApp.Web.g.cs
   private _friendlyName : string = null;
   private _name : string = "";
   private _roles : Iterable <string> = null;
   /**
    * 
    * This method is invoked from the constructor once initialization is complete and
    * can be used for further object setup.
    * 
    */
   public constructor () {
      super();
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
   // set Name(value : string) {
   //    if ((this._name != value)) {
   //       this.ValidateProperty("Name", value);
   //       this._name = value;
   //       this.RaisePropertyChanged("Name");
   //       this.RaisePropertyChanged("IsAuthenticated");
   //    }
   // }
   // get Name() : string {
   //    return this._name;
   // }
   set Roles(value : Iterable <string>) {
      if ((this._roles != value)) {
         this.ValidateProperty("Roles", value);
         this._roles = value;
         this.RaisePropertyChanged("Roles");
      }
   }
   get Roles() : Iterable <string> {
      return this._roles;
   }
   get AuthenticationType() : string {
      return "";
   }
   get IsAuthenticated() : boolean {
      return (true != !(this.Name));
   }
   get Name() : string {
      return this.Name;
   }
   get Identity() : IIdentity {
      return this;
   }
   /**
    * 
    * Computes a value from the key fields that uniquely identifies this entity instance.
    * 
    * @returns An object instance that uniquely identifies this entity instance.
    */
   public GetIdentity () : any {
      return this._name;
   }
   /**
    * 
    * Return whether the principal is in the role.
    * 
    * <remarks>
    * Returns whether the specified role is contained in the roles.
    * This implementation is case sensitive.
    * </remarks>
    * @param role The name of the role for which to check membership.
    * @returns Whether the principal is in the role.
    */
   public IsInRole (role : string) : boolean {
      if ((this.Roles == null)) {
         return false;
      }
      return false;// (this.Roles.indexOf(role) !== -1);
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\Models\UserExtensions.cs
   public OnPropertyChanged (e : {
      PropertyName : string
   }) : void {
      if (e == null) {
         //throw new ArgumentNullException ("e");
      }
      super.OnPropertyChanged(e);
      if (e.PropertyName == "Name" || e.PropertyName == "FriendlyName") {
         this.RaisePropertyChanged("DisplayName");
      }
   }
}