import { WebContext} from "./Generated_Code/HRApp.Web.g";
import { MainPage} from "./MainPage.xaml";
import { ApplicationStrings} from "./Assets/Resources/ApplicationStrings.Designer";
import { ErrorWindow} from "./Views/ErrorWindow.xaml";
import { ResourceWrapper} from "./Helpers/ResourceWrapper";
import { NotOperatorValueConverter} from "./Helpers/NotOperatorValueConverter";
import { Application, Activity, LoadUserOperation, HorizontalAlignment, VerticalAlignment, RootVisualDirective, Uri} from "smcomponents";
import { Component, ComponentFactoryResolver, ViewChild} from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { DialogService} from "@progress/kendo-angular-dialog";
@Component({
   selector : "app",
   templateUrl : "App.html"
})
export class App extends Application {
   private progressIndicator : Activity = null;
   public constructor (private angularHttp : HttpClient,componentFactoryResolver : ComponentFactoryResolver,dialogService : DialogService) {
      super(componentFactoryResolver);
      this.InitializeComponent();
      this.angularHttpClient = this.angularHttp;
      this.dialogService = dialogService;
      Application.Current = this;
      this.startApp();
   }
   private Application_Startup (sender : any,e : any) : void {
      // This will enable you to bind controls in XAML files to WebContext.Current
      // properties
      (this.resources)["WebContext"] = WebContext.Current;
      // This will automatically authenticate a user when using windows authentication
      // or when the user chose "Keep me signed in" on a previous login attempt
      WebContext.Current.Authentication.LoadUser(this.Application_UserLoaded, null);
      // Show some UI to the user while LoadUser is in progress
      this.InitializeRootVisual();
   }
   /**
    * 
    *     Invoked when the <see cref="LoadUserOperation"/> completes. Use this
    *     event handler to switch from the "loading UI" you created in
    *     <see cref="InitializeRootVisual"/> to the "application UI"
    * 
    */
   private Application_UserLoaded (operation : LoadUserOperation) : void {
      this.progressIndicator.IsActive = false;
   }
   /**
    * 
    *     Initializes the <see cref="Application.RootVisual"/> property. The
    *     initial UI will be displayed before the LoadUser operation has completed
    *     (The LoadUser operation will cause user to be logged automatically if
    *     using windows authentication or if the user had selected the "keep
    *     me signed in" option on a previous login).
    * 
    */
   public InitializeRootVisual () : void {
      this.progressIndicator = new Activity ();
      this.progressIndicator.ContentType = MainPage;
      //this.progressIndicator.IsActive = true;
      this.progressIndicator.HorizontalContentAlignment = HorizontalAlignment.Stretch;
      this.progressIndicator.VerticalContentAlignment = VerticalAlignment.Stretch;
      // Let the user now we're trying to authenticate him
      this.progressIndicator.ActiveContent = ApplicationStrings.ActivityLoadingUser;
      //this.changeRootVisual(this.progressIndicator);
      this.changeRootVisual(new MainPage());
   }
   private Application_UnhandledException (sender : any,e : any) : void {
      // If the app is running outside of the debugger then report the exception using
      // a ChildWindow control.
      if (!false) {
         // NOTE: This will allow the application to continue running after an exception has been thrown
         // but not handled. 
         // For production applications this error handling should be replaced with something that will 
         // report the error to the website and stop the application.
         e.Handled = true;
         ErrorWindow.CreateNew__overload_1(e.ExceptionObject);
      }
   }
   initControlProperties () {
      this.setResource("ResourceWrapper",new ResourceWrapper());
      this.setResource("NotOperatorValueConverter",new NotOperatorValueConverter());
      this.Startup.addHandler((s,e) => this.Application_Startup(s,e));
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\App.g.cs
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = []
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.initControlProperties()
   }
}