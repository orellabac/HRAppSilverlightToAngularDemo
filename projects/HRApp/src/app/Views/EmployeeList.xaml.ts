import { WebContext, Employee, OrganizationContext} from "../Generated_Code/HRApp.Web.g";
import { LoginRegistrationWindow} from "./Login/LoginRegistrationWindow.xaml";
import { EmployeeRegistrationWindow} from "../EmployeeRegistrationWindow.xaml";
import { Page, observableFromSupportProperty, FilterDescriptor, SortDescriptor, syncComponentAndModel, Grid, TextBox, DomainDataSource, DataGrid, ButtonModel, DataForm, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
@Component({
   selector : "employee-list",
   templateUrl : "EmployeeListComponent.html",
   styleUrls : ["EmployeeListComponent.css"]
})
export class EmployeeListComponent {
   @Input()
   model : EmployeeList;
   constructor (@Optional() private injectedModel : EmployeeList,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new EmployeeList())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class EmployeeList extends Page {
   angularComponent : any;
   public constructor () {
      super();
      this.InitializeComponent();
      this.angularComponent = EmployeeListComponent
   }
   public submitButton_Click (sender : any,e : any) : void {
      this.employeeDataSource.SubmitChanges();
   }
   public approveSabbatical_Click (sender : any,e : any) : void {
      if (WebContext.Current.User.IsAuthenticated) {
         var luckyEmployee : Employee = <Employee>(this.dataGrid1.SelectedItem);
         luckyEmployee.ApproveSabbatical();
         this.employeeDataSource.SubmitChanges();
      } else {
         WebContext.Current.Authentication.LoggedIn.addHandler((sender,e) => this.Authentication_LoggedIn(sender,e));
         new LoginRegistrationWindow ().Show();
      }
   }
   private Authentication_LoggedIn (sender : any,e : any) : void {
      var luckyEmployee : Employee = <Employee>(this.dataGrid1.SelectedItem);
      luckyEmployee.ApproveSabbatical();
      this.employeeDataSource.SubmitChanges();
      WebContext.Current.Authentication.LoggedIn.removeHandler((sender,e) => this.Authentication_LoggedIn(sender,e));
   }
   public addNewEmployee_Click (sender : any,e : any) : void {
      var addEmp : EmployeeRegistrationWindow = new EmployeeRegistrationWindow ();
      addEmp.Closed.addHandler((x,y) => this.addEmp_Closed(x,y));
      addEmp.Show();
   }
   addEmp_Closed (sender : any,e : any) : void {
      var emp : EmployeeRegistrationWindow = <EmployeeRegistrationWindow>sender;
      if (emp.NewEmployee != null) {
         var _OrganizationContext : OrganizationContext = <OrganizationContext>(this.employeeDataSource.DomainContext);
         _OrganizationContext.Employees.Add(emp.NewEmployee);
         this.employeeDataSource.SubmitChanges();
      }
   }
   // Executes when the user navigates to this page.
   public OnNavigatedTo (e : any) : void {
   }
   initControlProperties () {
      this.employeeDataSource.QueryName = "GetSalariedEmployees";
      this.employeeDataSource.AutoLoad = true;
      this.employeeDataSource.DomainContext = new OrganizationContext();
      //this.employeeDataSource.DomainContext = new OrganizationContext(new Uri("http://localhost:29116/ClientBin/HRApp-Web-OrganizationService.svc"));
      this.employeeDataSource.DomainContext.servicesHost =  environment.serviceHost;
      this.employeeDataSource.DomainContext.endpoint = environment.serviceHost +  "ClientBin/HRApp-Web-OrganizationService.svc/json/";
      this.employeeDataSource.DomainContext.client.endpoint = environment.serviceHost + "ClientBin/HRApp-Web-OrganizationService.svc/json/"
      this.employeeDataSource.addFilterDescriptor(new FilterDescriptor({
         property : "VacationHours",
         operator : "IsGreaterThanOrEqualTo",
         ignoredValue : "",
         valueObservable : observableFromSupportProperty(this.vacationHoursText,"Text")
      }));
      this.employeeDataSource.addSortDescriptor(new SortDescriptor({
         property : "VacationHours",
         direction : "Ascending"
      }));
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\EmployeeList.g.cs
   public LayoutRoot : Grid = null;
   public vacationHoursText : TextBox = null;
   public employeeDataSource : DomainDataSource = null;
   public dataGrid1 : DataGrid = null;
   public addNewEmployee : ButtonModel = null;
   public dataForm1 : DataForm = null;
   public submitButton : ButtonModel = null;
   public approveSabbatical : ButtonModel = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Grid ().withName("LayoutRoot"),new TextBox ().withName("vacationHoursText"),new DomainDataSource ().withName("employeeDataSource"),new DataGrid ().withName("dataGrid1"),new ButtonModel ().withName("addNewEmployee"),new DataForm ().withName("dataForm1"),new ButtonModel ().withName("submitButton"),new ButtonModel ().withName("approveSabbatical")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.vacationHoursText = (<TextBox>(this.FindName("vacationHoursText")));
      this.employeeDataSource = (<DomainDataSource>(this.FindName("employeeDataSource")));
      this.dataGrid1 = (<DataGrid>(this.FindName("dataGrid1")));
      this.addNewEmployee = (<ButtonModel>(this.FindName("addNewEmployee")));
      this.dataForm1 = (<DataForm>(this.FindName("dataForm1")));
      this.submitButton = (<ButtonModel>(this.FindName("submitButton")));
      this.approveSabbatical = (<ButtonModel>(this.FindName("approveSabbatical")));
      this.initControlProperties()
   }
}