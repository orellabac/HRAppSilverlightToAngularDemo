import { User} from "./Models/Shared/User.shared";
import { RegistrationData} from "../Models/RegistrationDataExtensions";
import { WebContextBase, KeyAttribute, RequiredAttribute, AuthenticationDomainContextBase, Uri, WebDomainClient, DomainClient, EntitySet, EntityQuery, SimpleDictionary, EntityContainer, AsyncCallback, IAsyncResult, QueryResult, ChangeSetEntry, EntitySetOperations, Entity, EntityCollection, EntityRef, Guid, DomainContext, propertyInfo, classInfo, defineCustomAttributeMetadata} from "smcomponents";
/// <summary>
/// Context for the RIA application.
/// </summary>
/// <remarks>
/// This context extends the base to make application services and types available
/// for consumption from code and xaml.
/// </remarks>
export class WebContext extends WebContextBase {
   public constructor () {
      super();
   }
   static get Current() : WebContext {
      return (<WebContext>(WebContextBase.Current));
   }
   get User() : User {
      return (<User>(this.User));
   }
}
/// <summary>
/// The DomainContext corresponding to the 'AuthenticationService' DomainService.
/// </summary>
export class AuthenticationContext extends AuthenticationDomainContextBase {
   constructor (p1 ?) {
      let initializerCase = -1;
      let initializerCaseArgs = [];
      if (p1 === undefined) {
         initializerCase = 0;
         initializerCaseArgs = [];
         p1 = new WebDomainClient <IAuthenticationServiceContract> (new Uri ("HRApp-Web-AuthenticationService.svc"));
      }
      if (p1 instanceof Uri) {
         initializerCase = 1;
         initializerCaseArgs = [p1];
         p1 = new WebDomainClient <IAuthenticationServiceContract> (p1);
      }
      if (p1 instanceof DomainClient) {
         let domainClient = <DomainClient>p1
         super(domainClient)
      } else {
         throw Error("Could not resolve constructor overload to call");
      }
      if (initializerCase === 0) {
      }
      if (initializerCase === 1) {
         let serviceUri = initializerCaseArgs[0]
      }
   }
   get Users() : EntitySet <User> {
      return this.EntityContainer.GetEntitySet <User>("User");
   }
   /**
    * 
    * Gets an EntityQuery instance that can be used to load <see cref="User"/> entity instances using the 'GetUser' query.
    * 
    * @returns An EntityQuery that can be loaded to retrieve <see cref="User"/> entity instances.
    */
   public GetUserQuery () : EntityQuery <User> {
      this.ValidateMethod("GetUserQuery", null);
      return super.CreateQuery <User>("GetUser", null, false, false, User);
   }
   /**
    * 
    * Gets an EntityQuery instance that can be used to load <see cref="User"/> entity instances using the 'Login' query.
    * 
    * @param userName The value for the 'userName' parameter of the query.
    * @param password The value for the 'password' parameter of the query.
    * @param isPersistent The value for the 'isPersistent' parameter of the query.
    * @param customData The value for the 'customData' parameter of the query.
    * @returns An EntityQuery that can be loaded to retrieve <see cref="User"/> entity instances.
    */
   public LoginQuery (userName : string,password : string,isPersistent : boolean,customData : string) : EntityQuery <User> {
      var parameters : SimpleDictionary <string, any> = new SimpleDictionary <string, any> ();
      parameters.addEntry("userName", userName);
      parameters.addEntry("password", password);
      parameters.addEntry("isPersistent", isPersistent);
      parameters.addEntry("customData", customData);
      this.ValidateMethod("LoginQuery", parameters);
      return super.CreateQuery <User>("Login", parameters, true, false, User);
   }
   /**
    * 
    * Gets an EntityQuery instance that can be used to load <see cref="User"/> entity instances using the 'Logout' query.
    * 
    * @returns An EntityQuery that can be loaded to retrieve <see cref="User"/> entity instances.
    */
   public LogoutQuery () : EntityQuery <User> {
      this.ValidateMethod("LogoutQuery", null);
      return super.CreateQuery <User>("Logout", null, true, false, User);
   }
   /**
    * 
    * Creates a new EntityContainer for this DomainContext's EntitySets.
    * 
    * @returns A new container instance.
    */
   public CreateEntityContainer () : EntityContainer {
      return new AuthenticationContextEntityContainer ();
   }
}
/*Could not transform the Attributes section*/
/*Could not transform the Modifiers section*/
export interface IAuthenticationServiceContract {
   BeginGetUser (callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndGetUser (result : IAsyncResult) : QueryResult <User>;
   BeginLogin (userName : string,password : string,isPersistent : boolean,customData : string,callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndLogin (result : IAsyncResult) : QueryResult <User>;
   BeginLogout (callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndLogout (result : IAsyncResult) : QueryResult <User>;
   BeginSubmitChanges (changeSet : Iterable <ChangeSetEntry>,callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndSubmitChanges (result : IAsyncResult) : Iterable <ChangeSetEntry>
}
export class AuthenticationContextEntityContainer extends EntityContainer {
   public constructor () {
      super();
      this.CreateEntitySet<User> (EntitySetOperations.Edit);
   }
}
/// <summary>
/// The 'Employee' entity class.
/// </summary>
//Could not Transform the Attributes Section
@classInfo
export class Employee extends Entity {
   private _birthDate : Date = null;
   private _contactID : number = 0;
   private _currentFlag : boolean = false;
   private _employee1 : EntityCollection <Employee> = null;
   private _employee2 : EntityRef <Employee> = null;
   private _employeeID : number = 0;
   private _gender : string = null;
   private _hireDate : Date = null;
   private _loginID : string = null;
   private _managerID : number = null;
   private _maritalStatus : string = null;
   private _modifiedDate : Date = null;
   private _nationalIDNumber : string = null;
   private _rowguid : Guid = null;
   private _salariedFlag : boolean = false;
   private _sickLeaveHours : number = 0;
   private _title : string = null;
   private _vacationHours : number = 0;
   public constructor () {
      super();
      this.entityNamespace = "HRApp.Web";
   }
   set BirthDate(value : Date) {
      if ((this._birthDate != value)) {
         this.RaiseDataMemberChanging("BirthDate");
         this.ValidateProperty("BirthDate", value);
         this._birthDate = value;
         this.RaiseDataMemberChanged("BirthDate");
      }
   }
   
   @propertyInfo()
   get BirthDate() : Date {
      return this._birthDate;
   }
   set ContactID(value : number) {
      if ((this._contactID != value)) {
         this.RaiseDataMemberChanging("ContactID");
         this.ValidateProperty("ContactID", value);
         this._contactID = value;
         this.RaiseDataMemberChanged("ContactID");
      }
   }
   get ContactID() : number {
      return this._contactID;
   }
   set CurrentFlag(value : boolean) {
      if ((this._currentFlag != value)) {
         this.RaiseDataMemberChanging("CurrentFlag");
         this.ValidateProperty("CurrentFlag", value);
         this._currentFlag = value;
         this.RaiseDataMemberChanged("CurrentFlag");
      }
   }
   get CurrentFlag() : boolean {
      return this._currentFlag;
   }
   get Employee1() : EntityCollection <Employee> {
      if ((this._employee1 == null)) {
         this._employee1 = new EntityCollection <Employee> (this, "Employee1", this.FilterEmployee1, this.AttachEmployee1, this.DetachEmployee1);
      }
      return this._employee1;
   }
   set Employee2(value : Employee) {
      var previous : Employee = this.Employee2;
      if ((previous != value)) {
         this.ValidateProperty("Employee2", value);
         if ((previous != null)) {
            this._employee2.Entity = null;
            previous.Employee1.Remove(this);
         }
         if ((value != null)) {
            this.ManagerID = value.EmployeeID;
         } else {
            this.ManagerID = null;
         }
         this._employee2.Entity = value;
         if ((value != null)) {
            value.Employee1.Add(this);
         }
         this.RaisePropertyChanged("Employee2");
      }
   }
   get Employee2() : Employee {
      if ((this._employee2 == null)) {
         this._employee2 = new EntityRef <Employee> (this, "Employee2", this.FilterEmployee2);
      }
      return this._employee2.Entity;
   }
   set EmployeeID(value : number) {
      if ((this._employeeID != value)) {
         this.ValidateProperty("EmployeeID", value);
         this._employeeID = value;
         this.RaisePropertyChanged("EmployeeID");
      }
   }
   @defineCustomAttributeMetadata(new KeyAttribute())
   get EmployeeID() : number {
      return this._employeeID;
   }
   set Gender(value : string) {
      if ((this._gender != value)) {
         this.RaiseDataMemberChanging("Gender");
         this.ValidateProperty("Gender", value);
         this._gender = value;
         this.RaiseDataMemberChanged("Gender");
      }
   }
   
   @defineCustomAttributeMetadata(new RequiredAttribute())
   get Gender() : string {
      return this._gender;
   }
   set HireDate(value : Date) {
      if ((this._hireDate != value)) {
         this.RaiseDataMemberChanging("HireDate");
         this.ValidateProperty("HireDate", value);
         this._hireDate = value;
         this.RaiseDataMemberChanged("HireDate");
      }
   }

   @propertyInfo()
   get HireDate() : Date {
      return this._hireDate;
   }
   set LoginID(value : string) {
      if ((this._loginID != value)) {
         this.RaiseDataMemberChanging("LoginID");
         this.ValidateProperty("LoginID", value);
         this._loginID = value;
         this.RaiseDataMemberChanged("LoginID");
      }
   }
   get LoginID() : string {
      return this._loginID;
   }
   set ManagerID(value : number) {
      if ((this._managerID != value)) {
         this.RaiseDataMemberChanging("ManagerID");
         this.ValidateProperty("ManagerID", value);
         this._managerID = value;
         this.RaiseDataMemberChanged("ManagerID");
      }
   }
   get ManagerID() : number {
      return this._managerID;
   }
   set MaritalStatus(value : string) {
      if ((this._maritalStatus != value)) {
         this.RaiseDataMemberChanging("MaritalStatus");
         this.ValidateProperty("MaritalStatus", value);
         this._maritalStatus = value;
         this.RaiseDataMemberChanged("MaritalStatus");
      }
   }
   @defineCustomAttributeMetadata(new RequiredAttribute())
   get MaritalStatus() : string {
      return this._maritalStatus;
   }
   set ModifiedDate(value : Date) {
      if ((this._modifiedDate != value)) {
         this.RaiseDataMemberChanging("ModifiedDate");
         this.ValidateProperty("ModifiedDate", value);
         this._modifiedDate = value;
         this.RaiseDataMemberChanged("ModifiedDate");
      }
   }
   @propertyInfo()
   get ModifiedDate() : Date {
      return this._modifiedDate;
   }
   set NationalIDNumber(value : string) {
      if ((this._nationalIDNumber != value)) {
         this.RaiseDataMemberChanging("NationalIDNumber");
         this.ValidateProperty("NationalIDNumber", value);
         this._nationalIDNumber = value;
         this.RaiseDataMemberChanged("NationalIDNumber");
      }
   }
   @defineCustomAttributeMetadata(new RequiredAttribute())
   get NationalIDNumber() : string {
      return this._nationalIDNumber;
   }
   set rowguid(value : Guid) {
      if ((this._rowguid != value)) {
         this.RaiseDataMemberChanging("rowguid");
         this.ValidateProperty("rowguid", value);
         this._rowguid = value;
         this.RaiseDataMemberChanged("rowguid");
      }
   }
   get rowguid() : Guid {
      return this._rowguid;
   }
   set SalariedFlag(value : boolean) {
      if ((this._salariedFlag != value)) {
         this.RaiseDataMemberChanging("SalariedFlag");
         this.ValidateProperty("SalariedFlag", value);
         this._salariedFlag = value;
         this.RaiseDataMemberChanged("SalariedFlag");
      }
   }
   get SalariedFlag() : boolean {
      return this._salariedFlag;
   }
   set SickLeaveHours(value : number) {
      if ((this._sickLeaveHours != value)) {
         this.RaiseDataMemberChanging("SickLeaveHours");
         this.ValidateProperty("SickLeaveHours", value);
         this._sickLeaveHours = value;
         this.RaiseDataMemberChanged("SickLeaveHours");
      }
   }
   get SickLeaveHours() : number {
      return this._sickLeaveHours;
   }
   set Title(value : string) {
      if ((this._title != value)) {
         this.RaiseDataMemberChanging("Title");
         this.ValidateProperty("Title", value);
         this._title = value;
         this.RaiseDataMemberChanged("Title");
      }
   }
   @defineCustomAttributeMetadata(new RequiredAttribute())
   get Title() : string {
      return this._title;
   }
   set VacationHours(value : number) {
      if ((this._vacationHours != value)) {
         this.RaiseDataMemberChanging("VacationHours");
         this.ValidateProperty("VacationHours", value);
         this._vacationHours = value;
         this.RaiseDataMemberChanged("VacationHours");
      }
   }
   get VacationHours() : number {
      return this._vacationHours;
   }
   get IsApproveSabbaticalInvoked() : boolean {
      return super.IsActionInvoked("ApproveSabbatical");
   }
   get CanApproveSabbatical() : boolean {
      return super.CanInvokeAction("ApproveSabbatical");
   }
   private AttachEmployee1 (entity : Employee) : void {
      entity.Employee2 = this;
   }
   private DetachEmployee1 (entity : Employee) : void {
      entity.Employee2 = null;
   }
   private FilterEmployee1 (entity : Employee) : boolean {
      return (entity.ManagerID == this.EmployeeID);
   }
   private FilterEmployee2 (entity : Employee) : boolean {
      return (entity.EmployeeID == this.ManagerID);
   }
   /**
    * 
    * Computes a value from the key fields that uniquely identifies this entity instance.
    * 
    * @returns An object instance that uniquely identifies this entity instance.
    */
   public GetIdentity () : any {
      return this._employeeID;
   }
   /**
    * 
    * Invokes the 'ApproveSabbatical' action on this entity.
    * 
    */
   public ApproveSabbatical () : void {
      super.InvokeAction("ApproveSabbatical");
   }
   public OnActionStateChanged () : void {
      super.UpdateActionState("ApproveSabbatical", "CanApproveSabbatical", "IsApproveSabbaticalInvoked");
   }
}


/// <summary>
/// The DomainContext corresponding to the 'OrganizationService' DomainService.
/// </summary>
export class OrganizationContext extends DomainContext {
   constructor (p1 ?) {
      let initializerCase = -1;
      let initializerCaseArgs = [];
      if (p1 === undefined) {
         initializerCase = 0;
         initializerCaseArgs = [];
         p1 = new WebDomainClient <IOrganizationServiceContract> (new Uri ("HRApp-Web-OrganizationService.svc"));
      }
      if (p1 instanceof Uri) {
         initializerCase = 1;
         initializerCaseArgs = [p1];
         p1 = new WebDomainClient <IOrganizationServiceContract> (p1);
      }
      if (p1 instanceof DomainClient) {
         let domainClient = <DomainClient>p1
         super(domainClient)
      } else {
         throw Error("Could not resolve constructor overload to call");
      }
      if (initializerCase === 0) {
      }
      if (initializerCase === 1) {
         let serviceUri = initializerCaseArgs[0]
      }
   }
   get Employees() : EntitySet <Employee> {
      return this.EntityContainer.GetEntitySet <Employee>("Employee");
   }
   /**
    * 
    * Gets an EntityQuery instance that can be used to load <see cref="Employee"/> entity instances using the 'GetEmployees' query.
    * 
    * @returns An EntityQuery that can be loaded to retrieve <see cref="Employee"/> entity instances.
    */
   public GetEmployeesQuery () : EntityQuery <Employee> {
      this.ValidateMethod("GetEmployeesQuery", null);
      return super.CreateQuery <Employee>("GetEmployees", null, false, true, Employee);
   }
   /**
    * 
    * Gets an EntityQuery instance that can be used to load <see cref="Employee"/> entity instances using the 'GetSalariedEmployees' query.
    * 
    * @returns An EntityQuery that can be loaded to retrieve <see cref="Employee"/> entity instances.
    */
   public GetSalariedEmployeesQuery () : EntityQuery <Employee> {
      this.ValidateMethod("GetSalariedEmployeesQuery", null);
      return super.CreateQuery <Employee>("GetSalariedEmployees", null, false, true, Employee);
   }
   /**
    * 
    * Invokes the 'ApproveSabbatical' method of the specified <see cref="Employee"/> entity.
    * 
    * @param current The <see cref="Employee"/> entity instance.
    */
   public ApproveSabbatical (current : Employee) : void {
      current.ApproveSabbatical();
   }
   /**
    * 
    * Creates a new EntityContainer for this DomainContext's EntitySets.
    * 
    * @returns A new container instance.
    */
   public CreateEntityContainer () : EntityContainer {
      return new OrganizationContextEntityContainer ();
   }
}
/*Could not transform the Attributes section*/
/*Could not transform the Modifiers section*/
export interface IOrganizationServiceContract {
   BeginGetEmployees (callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndGetEmployees (result : IAsyncResult) : QueryResult <Employee>;
   BeginGetSalariedEmployees (callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndGetSalariedEmployees (result : IAsyncResult) : QueryResult <Employee>;
   BeginSubmitChanges (changeSet : Iterable <ChangeSetEntry>,callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndSubmitChanges (result : IAsyncResult) : Iterable <ChangeSetEntry>
}
export class OrganizationContextEntityContainer extends EntityContainer {
   public constructor () {
      super();
      this.CreateEntitySet<Employee> ( null);
   }
}
/// <summary>
/// The 'RegistrationData' entity class.
/// </summary>
/// <summary>
/// The 'User' entity class.
/// </summary>
/// <summary>
/// The DomainContext corresponding to the 'UserRegistrationService' DomainService.
/// </summary>
export class UserRegistrationContext extends DomainContext {
   constructor (p1 ?) {
      let initializerCase = -1;
      let initializerCaseArgs = [];
      if (p1 === undefined) {
         initializerCase = 0;
         initializerCaseArgs = [];
         p1 = new WebDomainClient <IUserRegistrationServiceContract> (new Uri ("HRApp-Web-UserRegistrationService.svc"));
      }
      if (p1 instanceof Uri) {
         initializerCase = 1;
         initializerCaseArgs = [p1];
         p1 = new WebDomainClient <IUserRegistrationServiceContract> (p1);
      }
      if (p1 instanceof DomainClient) {
         let domainClient = <DomainClient>p1
         super(domainClient)
      } else {
         throw Error("Could not resolve constructor overload to call");
      }
      if (initializerCase === 0) {
      }
      if (initializerCase === 1) {
         let serviceUri = initializerCaseArgs[0]
      }
   }
   get RegistrationDatas() : EntitySet <RegistrationData> {
      return this.EntityContainer.GetEntitySet <RegistrationData>("RegistrationData");
   }
   /**
    * 
    * Gets an EntityQuery instance that can be used to load <see cref="RegistrationData"/> entity instances using the 'GetUsers' query.
    * 
    * @returns An EntityQuery that can be loaded to retrieve <see cref="RegistrationData"/> entity instances.
    */
   public GetUsersQuery () : EntityQuery <RegistrationData> {
      this.ValidateMethod("GetUsersQuery", null);
      return super.CreateQuery <RegistrationData>("GetUsers", null, false, true, RegistrationData);
   }
   /**
    * 
    * Creates a new EntityContainer for this DomainContext's EntitySets.
    * 
    * @returns A new container instance.
    */
   public CreateEntityContainer () : EntityContainer {
      return new UserRegistrationContextEntityContainer ();
   }
}
/*Could not transform the Attributes section*/
/*Could not transform the Modifiers section*/
export interface IUserRegistrationServiceContract {
   BeginGetUsers (callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndGetUsers (result : IAsyncResult) : QueryResult <RegistrationData>;
   BeginSubmitChanges (changeSet : Iterable <ChangeSetEntry>,callback : AsyncCallback,asyncState : any) : IAsyncResult;
   EndSubmitChanges (result : IAsyncResult) : Iterable <ChangeSetEntry>
}
export class UserRegistrationContextEntityContainer extends EntityContainer {
   public constructor () {
      super();
      this.CreateEntitySet<RegistrationData> (EntitySetOperations.Add);
   }
}