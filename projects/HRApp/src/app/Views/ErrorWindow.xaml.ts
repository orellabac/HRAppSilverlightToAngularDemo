import { ChildWindow, Exception, ArgumentNullException, StackTrace, Application, Grid, TextBlock, StackPanel, TextBox, ButtonModel, Uri} from "smcomponents";
export enum StackTracePolicy {
   OnlyWhenDebuggingOrRunningLocally,
   Always,
   Never
   }
export class ErrorWindow extends ChildWindow {
   protected constructor (message : string,errorDetails : string) {
      super();
      this.InitializeComponent();
      this.IntroductoryText.Text = message;
      this.ErrorTextBox.Text = errorDetails;
   }
   /**
    * 
    *     Creates a new Error Window given an error message.
    *     Current stack trace will be displayed if app is running under
    *     debug or on the local machine
    * 
    */
   public static CreateNew__overload_0 (message : string) : void {
      ErrorWindow.CreateNew__overload_2(message, StackTracePolicy.OnlyWhenDebuggingOrRunningLocally);
   }
   /**
    * 
    *     Creates a new Error Window given an exception.
    *     Current stack trace will be displayed if app is running under
    *     debug or on the local machine
    *     
    *     The exception is converted onto a message using
    *     <see cref="ConvertExceptionToMessage"/>
    * 
    */
   public static CreateNew__overload_1 (exception : Exception) : void {
      ErrorWindow.CreateNew__overload_3(exception, StackTracePolicy.OnlyWhenDebuggingOrRunningLocally);
   }
   /**
    * 
    *     Creates a new Error Window given an exception. The exception is converted onto a message using
    *     <see cref="ConvertExceptionToMessage"/>
    *     
    *     @param policy When to display the stack trace, see <see cref="StackTracePolicy"/>
    * 
    */
   public static CreateNew__overload_3 (exception : Exception,policy : StackTracePolicy) : void {
      if (exception == null) {
         throw new ArgumentNullException ("exception");
      }
      var fullStackTrace : string = exception.StackTrace;
      var innerException : Exception = exception.InnerException;
      while ( innerException != null ) {
         fullStackTrace += "\nCaused by: " + exception.Message + "\n\n" + exception.StackTrace;
         innerException = innerException.InnerException;
      }
      ErrorWindow.CreateNew__overload_4(ErrorWindow.ConvertExceptionToMessage(exception), fullStackTrace, policy);
   }
   /**
    * 
    *     Creates a new Error Window given an error message.
    *     
    *     @param policy When to display the stack trace, see <see cref="StackTracePolicy"/>
    * 
    */
   public static CreateNew__overload_2 (message : string,policy : StackTracePolicy) : void {
      ErrorWindow.CreateNew__overload_4(message, new StackTrace ().toString(), policy);
   }
   /**
    * 
    *     All other factory methods will result in a call to this one
    * 
    * 
    * @param message Which message to display
    * @param stackTrace The associated stack trace
    * @param policy In which situations the stack trace should be appended to the message
    */
   private static CreateNew__overload_4 (message : string,stackTrace : string,policy : StackTracePolicy) : void {
      var errorDetails : string = "";
      if (policy == StackTracePolicy.Always || policy == StackTracePolicy.OnlyWhenDebuggingOrRunningLocally && ErrorWindow.IsRunningUnderDebugOrLocalhost) {
         errorDetails = (stackTrace ?? "");
      }
      var window : ErrorWindow = new ErrorWindow (message, errorDetails);
      window.Show();
   }
   static get IsRunningUnderDebugOrLocalhost() : boolean {
      if (false) {
         return true;
      } else {
         var hostUrl : string = Application.Current.Host.Source.Host;
         return (hostUrl.indexOf("::1") !== -1) || (hostUrl.indexOf("localhost") !== -1) || (hostUrl.indexOf("127.0.0.1") !== -1);
      }
   }
   /**
    * 
    *     Creates a user friendly message given an Exception. Currently this simply
    *     takes the Exception.Message value, optionally  but you might want to change this to treat
    *     some specific Exception classes differently
    * 
    */
   private static ConvertExceptionToMessage (e : Exception) : string {
      return e.Message;
   }
   private OKButton_Click (sender : any,e : any) : void {
      this.DialogResult = true;
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\ErrorWindow.g.cs
   public LayoutRoot : Grid = null;
   public IntroductoryText : TextBlock = null;
   public ContentStackPanel : StackPanel = null;
   public LabelText : TextBlock = null;
   public ErrorTextBox : TextBox = null;
   public OKButton : ButtonModel = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Grid ().withName("LayoutRoot"),new TextBlock ().withName("IntroductoryText"),new StackPanel ().withName("ContentStackPanel"),new TextBlock ().withName("LabelText"),new TextBox ().withName("ErrorTextBox"),new ButtonModel ().withName("OKButton")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.IntroductoryText = (<TextBlock>(this.FindName("IntroductoryText")));
      this.ContentStackPanel = (<StackPanel>(this.FindName("ContentStackPanel")));
      this.LabelText = (<TextBlock>(this.FindName("LabelText")));
      this.ErrorTextBox = (<TextBox>(this.FindName("ErrorTextBox")));
      this.OKButton = (<ButtonModel>(this.FindName("OKButton")));
      this.initControlProperties()
   }
}