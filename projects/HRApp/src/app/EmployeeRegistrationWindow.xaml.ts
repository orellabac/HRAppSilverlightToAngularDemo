import { Employee} from "./Generated_Code/HRApp.Web.g";
import { ChildWindow, syncComponentAndModel, Grid, DataForm, ButtonModel, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "employee-registration-window",
   templateUrl : "EmployeeRegistrationWindowComponent.html",
   styleUrls : ["EmployeeRegistrationWindowComponent.css"]
})
export class EmployeeRegistrationWindowComponent {
   @Input()
   model : EmployeeRegistrationWindow;
   constructor (@Optional() private injectedModel : EmployeeRegistrationWindow,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new EmployeeRegistrationWindow())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class EmployeeRegistrationWindow extends ChildWindow {
   angularComponent : any;
   public constructor () {
      super();
      this.InitializeComponent();
      this.NewEmployee = new Employee ();
      this.addEmployeeDataForm.CurrentItem = this.NewEmployee;
      this.addEmployeeDataForm.BeginEdit();
      this.angularComponent = EmployeeRegistrationWindowComponent
   }
   public OKButton_Click (sender : any,e : any) : void {
      this.addEmployeeDataForm.CommitEdit();
      this.DialogResult = true;
   }
   public CancelButton_Click (sender : any,e : any) : void {
      this.NewEmployee = null;
      this.addEmployeeDataForm.CancelEdit();
      this.DialogResult = false;
   }
   private NewEmployee0 : Employee;
   set NewEmployee(value : Employee) {
      this.NewEmployee0 = value
   }
   get NewEmployee() : Employee {
      return this.NewEmployee0;
   }
   initControlProperties () {
      this.Title = "EmployeeRegistrationWindow"
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\EmployeeRegistrationWindow.g.cs
   public LayoutRoot : Grid = null;
   public addEmployeeDataForm : DataForm = null;
   public CancelButton : ButtonModel = null;
   public OKButton : ButtonModel = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Grid ().withName("LayoutRoot"),new DataForm ().withName("addEmployeeDataForm"),new ButtonModel ().withName("CancelButton"),new ButtonModel ().withName("OKButton")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.addEmployeeDataForm = (<DataForm>(this.FindName("addEmployeeDataForm")));
      this.CancelButton = (<ButtonModel>(this.FindName("CancelButton")));
      this.OKButton = (<ButtonModel>(this.FindName("OKButton")));
      this.initControlProperties()
   }
}