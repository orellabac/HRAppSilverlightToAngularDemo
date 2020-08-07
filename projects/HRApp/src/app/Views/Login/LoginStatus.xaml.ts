import { WebContext} from "../../Generated_Code/HRApp.Web.g";
import { DataBindingExtensions} from "../../Helpers/DataBindingExtensions";
import { ApplicationStrings} from "../../Assets/Resources/ApplicationStrings.Designer";
import { StringFormatValueConverter} from "../../Helpers/StringFormatValueConverter";
import { LoginRegistrationWindow} from "./LoginRegistrationWindow.xaml";
import { ErrorWindow} from "../ErrorWindow.xaml";
import { UserControl, AuthenticationService, TextBlock, WindowsAuthentication, VisualStateManager, syncComponentAndModel, Grid, VisualStateGroup, VisualState, StackPanel, ButtonModel, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "login-status",
   templateUrl : "LoginStatusComponent.html",
   styleUrls : ["LoginStatusComponent.css"]
})
export class LoginStatusComponent {
   @Input()
   model : LoginStatus;
   constructor (@Optional() private injectedModel : LoginStatus,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new LoginStatus())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class LoginStatus extends UserControl {
   angularComponent : any;
   public authService : AuthenticationService = WebContext.Current.Authentication;
   public constructor () {
      super();
      this.InitializeComponent();
      this.welcomeText.setBinding(TextBlock.TextProperty, DataBindingExtensions.CreateOneWayBinding__overload_1(WebContext.Current, "User.DisplayName", new StringFormatValueConverter (ApplicationStrings.WelcomeMessage)));
      this.authService.LoggedIn.addHandler((sender,e) => this.Authentication_LoggedIn(sender,e));
      this.authService.LoggedOut.addHandler((sender,e) => this.Authentication_LoggedOut(sender,e));
      this.UpdateLoginState();
      this.angularComponent = LoginStatusComponent
   }
   public LoginButton_Click (sender : any,e : any) : void {
      var loginWindow : LoginRegistrationWindow = new LoginRegistrationWindow ();
      loginWindow.Show();
   }
   public LogoutButton_Click (sender : any,e : any) : void {
      this.authService.Logout((logoutOperation) => {
         if (logoutOperation.HasError) {
            ErrorWindow.CreateNew__overload_1(logoutOperation.Error);
            logoutOperation.MarkErrorAsHandled();
         }
      }, null);
   }
   private Authentication_LoggedIn (sender : any,e : any) : void {
      this.UpdateLoginState();
   }
   private Authentication_LoggedOut (sender : any,e : any) : void {
      this.UpdateLoginState();
   }
   private UpdateLoginState () : void {
      if (WebContext.Current.User.IsAuthenticated) {
         VisualStateManager.GoToState(this, (WebContext.Current.Authentication instanceof WindowsAuthentication)?"windowsAuth":"loggedIn", true);
      } else {
         VisualStateManager.GoToState(this, "loggedOut", true);
      }
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\Login\LoginStatus.g.cs
   public LayoutRoot : Grid = null;
   public loginStates : VisualStateGroup = null;
   public windowsAuth : VisualState = null;
   public loggedIn : VisualState = null;
   public loggedOut : VisualState = null;
   public loginControls : StackPanel = null;
   public loginButton : ButtonModel = null;
   public logoutControls : StackPanel = null;
   public welcomeText : TextBlock = null;
   public logoutButton : ButtonModel = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Grid ().withName("LayoutRoot"),new VisualStateGroup ().withName("loginStates"),new VisualState ().withName("windowsAuth"),new VisualState ().withName("loggedIn"),new VisualState ().withName("loggedOut"),new StackPanel ().withName("loginControls"),new ButtonModel ().withName("loginButton"),new StackPanel ().withName("logoutControls"),new TextBlock ().withName("welcomeText"),new ButtonModel ().withName("logoutButton")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.loginStates = (<VisualStateGroup>(this.FindName("loginStates")));
      this.windowsAuth = (<VisualState>(this.FindName("windowsAuth")));
      this.loggedIn = (<VisualState>(this.FindName("loggedIn")));
      this.loggedOut = (<VisualState>(this.FindName("loggedOut")));
      this.loginControls = (<StackPanel>(this.FindName("loginControls")));
      this.loginButton = (<ButtonModel>(this.FindName("loginButton")));
      this.logoutControls = (<StackPanel>(this.FindName("logoutControls")));
      this.welcomeText = (<TextBlock>(this.FindName("welcomeText")));
      this.logoutButton = (<ButtonModel>(this.FindName("logoutButton")));
      this.initControlProperties()
   }
}