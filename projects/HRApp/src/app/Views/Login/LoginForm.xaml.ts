import { CustomDataForm} from "../../Controls/CustomDataForm";
import { LoginRegistrationWindow} from "./LoginRegistrationWindow.xaml";
import { LoginInfo} from "../../Models/LoginInfo";
import { WebContext} from "../../Generated_Code/HRApp.Web.g";
import { ErrorWindow} from "../ErrorWindow.xaml";
import { ErrorResources} from "../../ErrorResources.Designer";
import { DataBindingExtensions} from "../../Helpers/DataBindingExtensions";
import { NotOperatorValueConverter} from "../../Helpers/NotOperatorValueConverter";
import { StackPanel, LoginOperation, DataFormAutoGeneratingFieldEventArgs, TextBox, PasswordBox, ValidationSummaryItem, Binding, Activity, Control, syncComponentAndModel, HyperlinkButton, ButtonModel, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "login-form",
   templateUrl : "LoginFormComponent.html",
   styleUrls : ["LoginFormComponent.css"]
})
export class LoginFormComponent {
   @Input()
   model : LoginForm;
   constructor (@Optional() private injectedModel : LoginForm,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new LoginForm())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class LoginForm extends StackPanel {
   angularComponent : any;
   private parentWindow : LoginRegistrationWindow = null;
   private loginInfo : LoginInfo = new LoginInfo ();
   private lastLoginOperation : LoginOperation = null;
   public constructor () {
      super();
      this.InitializeComponent();
      this.loginForm.CurrentItem = this.loginInfo;
      this.angularComponent = LoginFormComponent
   }
   /**
    * <remarks>
    *     <see cref="LoginRegistrationWindow"/> will call this setter
    *     during its initialization
    * </remarks>
    */
   public SetParentWindow (window : LoginRegistrationWindow) : void {
      this.parentWindow = window;
   }
   /**
    * 
    *     Handles <see cref="DataForm.AutoGeneratingField"/>. Adds the necessary event listeners
    *     so that the OK button will only be enabled when both username and password are filled
    * 
    */
   private LoginForm_OnAutoGeneratingField (sender : any,e : DataFormAutoGeneratingFieldEventArgs) : void {
      if (e.PropertyName == "UserName") {
         (<TextBox>e.Field.Content).TextChanged.addHandler((sender,e) => this.EnableOrDisableOKButton(sender,e));
      } else if (e.PropertyName == "Password") {
         (<PasswordBox>e.Field.Content).PasswordChanged.addHandler((sender,e) => this.EnableOrDisableOKButton(sender,e));
      }
   }
   /**
    * 
    *     Enables the OK button if both username and password are not empty, disable it
    *     otherwise
    * 
    */
   private EnableOrDisableOKButton (sender : any,e : any) : void {
      this.loginButton.IsEnabled = !(!((<TextBox>this.loginForm.Fields.getItem("UserName").Content).Text.trim()) || !((<PasswordBox>this.loginForm.Fields.getItem("Password").Content).Password));
   }
   public LoginButton_Click (sender : any,e : any) : void {
      // If there was a validation error in a previously login attempt, clear it
      this.loginForm.ValidationSummary.Errors.clear();
      if (this.loginForm.ValidateItem()) {
         var loginOperation : LoginOperation = WebContext.Current.Authentication.Login(this.loginInfo.ToLoginParameters(), this.LoginOperation_Completed, null);
         this.BindUIToOperation(loginOperation);
         this.parentWindow.AddPendingOperation(loginOperation);
         this.lastLoginOperation = loginOperation;
      }
   }
   /**
    * 
    *     Handles <see cref="LoginOperation.Completed"/> event. If operation
    *     succeeds, it closes the window. If it has an error, we show an <see cref="ErrorWindow"/>
    *     and mark the error as handled. If it was not canceled, succeded but login failed, 
    *     it must have been because credentials were incorrect so we add a validation error 
    *     to notify the user
    * 
    */
   private LoginOperation_Completed (loginOperation : LoginOperation) : void {
      if (loginOperation.LoginSuccess) {
         this.parentWindow.Close();
      } else {
         if (loginOperation.HasError) {
            ErrorWindow.CreateNew__overload_1(loginOperation.Error);
            loginOperation.MarkErrorAsHandled();
         } else if (!loginOperation.IsCanceled) {
            this.loginForm.ValidationSummary.Errors.add(new ValidationSummaryItem (ErrorResources.ErrorBadUserNameOrPassword));
         }
         this.loginForm.BeginEdit();
      }
   }
   /**
    * 
    *     Binds UI so that controls will look disabled and activity control will
    *     be displaying while operation is in progress, and cancel button will
    *     be enabled only while the login operation can be cancelled
    * 
    */
   private BindUIToOperation (loginOperation : LoginOperation) : void {
      var isEnabledBinding : Binding = DataBindingExtensions.CreateOneWayBinding__overload_0(loginOperation, "IsComplete");
      var isActivityActiveBinding : Binding = DataBindingExtensions.CreateOneWayBinding__overload_1(loginOperation, "IsComplete", new NotOperatorValueConverter ());
      var isCancelEnabledBinding : Binding = DataBindingExtensions.CreateOneWayBinding__overload_0(loginOperation, "CanCancel");
      this.activity.setBinding(Activity.IsActiveProperty, isActivityActiveBinding);
      this.loginButton.setBinding(Control.IsEnabledProperty, isEnabledBinding);
      this.loginForm.setBinding(Control.IsEnabledProperty, isEnabledBinding);
      this.registerNow.setBinding(Control.IsEnabledProperty, isEnabledBinding);
      // The correct binding for the cancel button would be
      // IsEnabled = loginOperation.CanCancel || loginOperation.IsComplete
      //
      // However, this is a binding to two distinct properties which is
      // not supported, so we bind solely to CanCancel and remove the binding
      // once the operation is complete with a callback
      this.loginCancel.setBinding(Control.IsEnabledProperty, isCancelEnabledBinding);
      loginOperation.Completed.addHandler((sender,eventArgs) => this.ReEnableCancelButton(sender,eventArgs));
   }
   /**
    * 
    *     Removes the binding that the cancel button will have to <see cref="LoginOperation.CanCancel"/>
    *     while an operation is in progress and makes it enabled again
    * 
    */
   private ReEnableCancelButton (sender : any,eventArgs : any) : void {
      this.loginCancel.IsEnabled = true;
   }
   private RegisterNow_Click (sender : any,e : any) : void {
      this.parentWindow.NavigateToRegistration();
   }
   public CancelButton_Click (sender : any,e : any) : void {
      if (this.lastLoginOperation != null && this.lastLoginOperation.CanCancel) {
         this.lastLoginOperation.Cancel();
      } else {
         this.parentWindow.Close();
      }
   }
   /**
    * 
    *     Maps Esc to the cancel button and Enter to the
    *     OK button
    * 
    */
   private LoginPanel_KeyDown (sender : any,e : KeyboardEvent) : void {
      if (e.keyCode == 8) {
         this.CancelButton_Click(this.loginCancel, {
         });
      } else if (e.keyCode == 13 && this.loginButton.IsEnabled) {
         this.LoginButton_Click(this.loginButton, {
         });
      }
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\Login\LoginForm.g.cs
   public activity : Activity = null;
   public loginForm : CustomDataForm = null;
   public registerNow : HyperlinkButton = null;
   public loginCancel : ButtonModel = null;
   public loginButton : ButtonModel = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Activity ().withName("activity"),new CustomDataForm ().withName("loginForm"),new HyperlinkButton ().withName("registerNow"),new ButtonModel ().withName("loginCancel"),new ButtonModel ().withName("loginButton")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.activity = (<Activity>(this.FindName("activity")));
      this.loginForm = (<CustomDataForm>(this.FindName("loginForm")));
      this.registerNow = (<HyperlinkButton>(this.FindName("registerNow")));
      this.loginCancel = (<ButtonModel>(this.FindName("loginCancel")));
      this.loginButton = (<ButtonModel>(this.FindName("loginButton")));
      this.initControlProperties()
   }
}