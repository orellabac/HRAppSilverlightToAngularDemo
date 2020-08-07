import { CustomDataForm} from "../../Controls/CustomDataForm";
import { RegistrationData} from "../../Models/RegistrationDataExtensions";
import { UserRegistrationContext, WebContext} from "../../Generated_Code/HRApp.Web.g";
import { LoginRegistrationWindow} from "./LoginRegistrationWindow.xaml";
import { DataFieldExtensions} from "../../Helpers/DataFieldExtensions";
import { TargetNullValueConverter} from "../../Helpers/TargetNullValueConverter";
import { SecurityQuestions} from "../../Assets/Resources/SecurityQuestions.Designer";
import { ErrorWindow} from "../ErrorWindow.xaml";
import { DataBindingExtensions} from "../../Helpers/DataBindingExtensions";
import { NotOperatorValueConverter} from "../../Helpers/NotOperatorValueConverter";
import { ApplicationStrings} from "../../Assets/Resources/ApplicationStrings.Designer";
import { StackPanel, DataFormAutoGeneratingFieldEventArgs, PasswordBox, EntityState, ComboBox, TextBox, iuSelect, iuWhere, ReflectionHelper, SubmitOperation, LoginOperation, OperationBase, Binding, Activity, Control, simpleStringFormat, syncComponentAndModel, HyperlinkButton, ButtonModel, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "registration-form",
   templateUrl : "RegistrationFormComponent.html",
   styleUrls : ["RegistrationFormComponent.css"]
})
export class RegistrationFormComponent {
   @Input()
   model : RegistrationForm;
   constructor (@Optional() private injectedModel : RegistrationForm,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new RegistrationForm())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class RegistrationForm extends StackPanel {
   angularComponent : any;
   private registrationData : RegistrationData = new RegistrationData ();
   private userRegistrationContext : UserRegistrationContext = new UserRegistrationContext ();
   private parentWindow : LoginRegistrationWindow = null;
   public constructor () {
      super();
      this.InitializeComponent();
      this.userRegistrationContext.RegistrationDatas.Add(this.registrationData);
      this.registerForm.CurrentItem = this.registrationData;
      this.registerForm.AutoGeneratingField.addHandler((dataForm,e) => this.RegisterForm_AutoGeneratingField(dataForm,e));
      this.angularComponent = RegistrationFormComponent
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
    *     Adds some additional behaviors to some of the DataForm's fields
    * 
    */
   private RegisterForm_AutoGeneratingField (dataForm : any,e : DataFormAutoGeneratingFieldEventArgs) : void {
      if (e.PropertyName == "Password") {
         var passwordBox : PasswordBox = <PasswordBox>e.Field.Content;
         passwordBox.PasswordChanged.addHandler((sender,eventArgs) => {
            // If the password is invalid, the entity property doesn't get updated.
            // Thus, we keep a separate password copy (the ActualPassword property)
            // that is guaranteed to match what the user typed
            (<RegistrationData>this.registerForm.CurrentItem).ActualPassword = (<PasswordBox>sender).Password;
         });
         passwordBox.LostFocus.addHandler((sender,eventArgs) => {
            // Prevent this from having any effect after a submission
            if (this.registrationData.EntityState == EntityState.Unmodified) {
               return;
            }
            // If there is something typed on the password confirmation box
            // then we need to re-validate it
            if (!!((<PasswordBox>this.registerForm.Fields.getItem("PasswordConfirmation").Content).Password)) {
               this.registerForm.Fields.getItem("PasswordConfirmation").Validate();
            }
         });
      } else if (e.PropertyName == "Question") {
         var comboBoxWithSecurityQuestions : ComboBox = RegistrationForm.CreateComboBoxWithSecurityQuestions();
         // Replace the control
         // Note: Since TextBox.Text treats empty text as string.Empty and ComboBox.SelectedItem
         // treats an empty selection as null, we need to use a converter on the binding
         DataFieldExtensions.ReplaceTextBox__overload_1(e.Field, comboBoxWithSecurityQuestions, ComboBox.SelectedItemProperty, (binding) => binding.Converter = new TargetNullValueConverter ());
      } else if (e.PropertyName == "UserName") {
         var userNameTextBox : TextBox = <TextBox>e.Field.Content;
         userNameTextBox.LostFocus.addHandler((sender,eventArgs) => {
            // Prevent this from having any effect after a submission
            if (this.registrationData.EntityState == EntityState.Unmodified) {
               return;
            }
            var friendlyNameTextBox : TextBox = <TextBox>this.registerForm.Fields.getItem("FriendlyName").Content;
            if (!(friendlyNameTextBox.Text)) {
               friendlyNameTextBox.Text = userNameTextBox.Text;
            }
         });
      }
   }
   /**
    * @returns 
    *   Returns a <see cref="ComboBox" /> object whose <see cref="ComboBox.ItemsSource" /> property
    *   is initialized with the resource strings defined in <see cref="SecurityQuestions" />
    * 
    */
   private static CreateComboBoxWithSecurityQuestions () : ComboBox {
      var availableQuestions : Iterable <string> = iuSelect((propertyInfo) => {
         return <string>propertyInfo.getValue(null, null);
      }, iuWhere((propertyInfo) => propertyInfo.propertyType === (ReflectionHelper.getTypeInfo(String)), ReflectionHelper.getTypeInfo(SecurityQuestions).getProperties()));
      var comboBox : ComboBox = new ComboBox ();
      comboBox.ItemsSource = availableQuestions;
      return comboBox;
   }
   public RegisterButton_Click (sender : any,e : any) : void {
      if (this.registerForm.ValidateItem() && this.registerForm.CommitEdit()) {
         var regOp : SubmitOperation = this.userRegistrationContext.SubmitChanges(this.RegistrationOperation_Completed, null);
         this.BindUIToOperation(regOp);
         this.parentWindow.AddPendingOperation(regOp);
      }
   }
   /**
    * 
    *     Handles <see cref="SubmitOperation.Completed"/> for a userRegistrationContext
    *     operation. If there was an error, an <see cref="ErrorWindow"/> is
    *     displayed to the user. Otherwise, this triggers a <see cref="LoginOperation"/>
    *     that will automatically log in the just registered user
    * 
    */
   private RegistrationOperation_Completed (asyncResult : SubmitOperation) : void {
      if (asyncResult.HasError) {
         ErrorWindow.CreateNew__overload_1(asyncResult.Error);
         asyncResult.MarkErrorAsHandled();
         this.registerForm.BeginEdit();
      } else {
         var loginOperation : LoginOperation = WebContext.Current.Authentication.Login(this.registrationData.ToLoginParameters(), this.LoginOperation_Completed, null);
         this.BindUIToOperation(loginOperation);
         this.parentWindow.AddPendingOperation(loginOperation);
      }
   }
   /**
    * 
    *     Binds UI so that controls will look disabled and activity will be
    *     displayed while operation is in progress. For simplicity Cancel button 
    *     will be disabled during the operation even if it is cancellable
    * 
    * @param operation 
    */
   private BindUIToOperation (operation : OperationBase) : void {
      var isActivityActiveBinding : Binding = DataBindingExtensions.CreateOneWayBinding__overload_1(operation, "IsComplete", new NotOperatorValueConverter ());
      var isEnabledBinding : Binding = DataBindingExtensions.CreateOneWayBinding__overload_0(operation, "IsComplete");
      this.activity.setBinding(Activity.IsActiveProperty, isActivityActiveBinding);
      this.registerForm.setBinding(Control.IsEnabledProperty, isEnabledBinding);
      this.registerButton.setBinding(Control.IsEnabledProperty, isEnabledBinding);
      this.registerCancel.setBinding(Control.IsEnabledProperty, isEnabledBinding);
      this.backToLogin.setBinding(Control.IsEnabledProperty, isEnabledBinding);
   }
   /**
    * 
    *     Handles <see cref="LoginOperation.Completed"/> event for
    *     the login operation that is sent right after a successful
    *     userRegistrationContext. This will close the window. On the unexpected
    *     event that this operation failed (the user was just added so
    *     why wouldn't it be authenticated successfully) an 
    *     <see cref="ErrorWindow"/> is created and will display the
    *     error message.
    * 
    * @param loginOperation 
    */
   private LoginOperation_Completed (loginOperation : LoginOperation) : void {
      this.parentWindow.Close();
      if (loginOperation.HasError) {
         ErrorWindow.CreateNew__overload_0(simpleStringFormat(ApplicationStrings.ErrorLoginAfterRegistrationFailed,loginOperation.Error.Message));
         loginOperation.MarkErrorAsHandled();
      } else if (loginOperation.LoginSuccess == false) {
         // ApplicationStrings.ErrorBadUserNameOrPassword is the correct error message as operation succeeded but login failed
         ErrorWindow.CreateNew__overload_0(simpleStringFormat(ApplicationStrings.ErrorLoginAfterRegistrationFailed,ApplicationStrings.ErrorBadUserNameOrPassword));
      }
   }
   private BackToLogin_Click (sender : any,e : any) : void {
      this.parentWindow.NavigateToLogin();
   }
   public CancelButton_Click (sender : any,e : any) : void {
      this.parentWindow.Close();
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\Login\RegistrationForm.g.cs
   public activity : Activity = null;
   public registerForm : CustomDataForm = null;
   public backToLogin : HyperlinkButton = null;
   public registerCancel : ButtonModel = null;
   public registerButton : ButtonModel = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Activity ().withName("activity"),new CustomDataForm ().withName("registerForm"),new HyperlinkButton ().withName("backToLogin"),new ButtonModel ().withName("registerCancel"),new ButtonModel ().withName("registerButton")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.activity = (<Activity>(this.FindName("activity")));
      this.registerForm = (<CustomDataForm>(this.FindName("registerForm")));
      this.backToLogin = (<HyperlinkButton>(this.FindName("backToLogin")));
      this.registerCancel = (<ButtonModel>(this.FindName("registerCancel")));
      this.registerButton = (<ButtonModel>(this.FindName("registerButton")));
      this.initControlProperties()
   }
}