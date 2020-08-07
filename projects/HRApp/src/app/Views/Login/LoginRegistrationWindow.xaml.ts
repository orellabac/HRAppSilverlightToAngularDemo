import { RegistrationForm} from "./RegistrationForm.xaml";
import { LoginForm} from "./LoginForm.xaml";
import { ApplicationStrings} from "../../Assets/Resources/ApplicationStrings.Designer";
import { ChildWindow, IList, OperationBase, SimpleList, VisualStateManager, syncComponentAndModel, Grid, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "login-registration-window",
   templateUrl : "LoginRegistrationWindowComponent.html",
   styleUrls : ["LoginRegistrationWindowComponent.css"]
})
export class LoginRegistrationWindowComponent {
   @Input()
   model : LoginRegistrationWindow;
   constructor (@Optional() private injectedModel : LoginRegistrationWindow,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new LoginRegistrationWindow())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class LoginRegistrationWindow extends ChildWindow {
   angularComponent : any;
   private possiblyPendingOperations : IList <OperationBase> = new SimpleList <OperationBase> ();
   public constructor () {
      super();
      this.InitializeComponent();
      this.registrationForm.SetParentWindow(this);
      this.loginForm.SetParentWindow(this);
      this.LayoutUpdated.addHandler((sender,eventArgs) => this.GoToInitialState(sender,eventArgs));
      this.LayoutUpdated.addHandler((sender,eventArgs) => this.UpdateTitle(sender,eventArgs));
      this.angularComponent = LoginRegistrationWindowComponent
   }
   /**
    * 
    *     Initializes the <see cref="VisualStateManager"/> for this component
    *     by putting it into the "AtLogin" state
    * 
    */
   private GoToInitialState (sender : any,eventArgs : any) : void {
      VisualStateManager.GoToState(this, "AtLogin", false);
      this.LayoutUpdated.removeHandler((sender,eventArgs) => this.GoToInitialState(sender,eventArgs));
   }
   /**
    * 
    *     Updates the window title according to which panel
    *     (registration / login) is currently being displayed
    * 
    */
   private UpdateTitle (sender : any,eventArgs : any) : void {
      this.Title = (this.registrationForm.Visibility == true)?ApplicationStrings.RegistrationWindowTitle:ApplicationStrings.LoginWindowTitle;
   }
   /**
    * 
    *     Notifies the <see cref="LoginRegistrationWindow"/> window that it can only close
    *     if <paramref name="operation"/> is finished or can be cancelled
    * 
    * @param operation The pending operation to monitor
    */
   public AddPendingOperation (operation : OperationBase) : void {
      this.possiblyPendingOperations.add(operation);
   }
   public NavigateToLogin () : void {
      VisualStateManager.GoToState(this, "AtLogin", true);
   }
   public NavigateToRegistration () : void {
      VisualStateManager.GoToState(this, "AtRegistration", true);
   }
   /**
    * 
    *     Prevents the window from closing while there are operations in progress
    * 
    */
   private LoginWindow_Closing (sender : any,eventArgs : any) : void {
      for(let operation of this.possiblyPendingOperations) {
         if (!operation.IsComplete) {
            if (operation.CanCancel) {
               operation.Cancel();
            } else {
               eventArgs.Cancel = true;
            }
         }
      }
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\Login\LoginRegistrationWindow.g.cs
   public childWindow : ChildWindow = null;
   public LayoutRoot : Grid = null;
   public loginForm : LoginForm = null;
   public registrationForm : RegistrationForm = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new ChildWindow ().withName("childWindow"),new Grid ().withName("LayoutRoot"),new LoginForm ().withName("loginForm"),new RegistrationForm ().withName("registrationForm")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.childWindow = (<ChildWindow>(this.FindName("childWindow")));
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.loginForm = (<LoginForm>(this.FindName("loginForm")));
      this.registrationForm = (<RegistrationForm>(this.FindName("registrationForm")));
      this.initControlProperties()
   }
}