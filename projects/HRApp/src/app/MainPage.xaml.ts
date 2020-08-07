import { LoginStatus} from "./Views/Login/LoginStatus.xaml";
import { ErrorWindow} from "./Views/ErrorWindow.xaml";
import { UserControl, HyperlinkButton, VisualStateManager, syncComponentAndModel, Grid, Border, Frame, StackPanel, TextBlock, Rectangle, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "main-page",
   templateUrl : "MainPageComponent.html",
   styleUrls : ["MainPageComponent.css"]
})
export class MainPageComponent {
   @Input()
   model : MainPage;
   constructor (@Optional() private injectedModel : MainPage,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new MainPage())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class MainPage extends UserControl {
   angularComponent : any;
   public constructor () {
      super();
      this.InitializeComponent();
      this.loginContainer.ContentType = LoginStatus;
      this.angularComponent = MainPageComponent
   }
   /**
    * 
    *     After the Frame navigates, ensure the <see cref="HyperlinkButton"/> representing the current page is selected
    * 
    */
   private ContentFrame_Navigated (sender : any,e : any) : void {
      for(let child of this.LinksStackPanel.Children) {
         var hb : HyperlinkButton = (child instanceof HyperlinkButton?<HyperlinkButton>child:null);
         if (hb != null && hb.NavigateUri != null) {
            if (hb.NavigateUri.toString() === e.Uri.toString()) {
               VisualStateManager.GoToState(hb, "ActiveLink", true);
            } else {
               VisualStateManager.GoToState(hb, "InactiveLink", true);
            }
         }
      }
   }
   /**
    * 
    *     If an error occurs during navigation, show an error window
    * 
    */
   private ContentFrame_NavigationFailed (sender : any,e : any) : void {
      e.Handled = true;
      ErrorWindow.CreateNew__overload_1(e.Exception);
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\MainPage.g.cs
   public LayoutRoot : Grid = null;
   public ContentBorder : Border = null;
   public ContentFrame : Frame = null;
   public NavigationGrid : Grid = null;
   public BrandingBorder : Border = null;
   public BrandingStackPanel : StackPanel = null;
   public ApplicationNameTextBlock : TextBlock = null;
   public LinksBorder : Border = null;
   public LinksStackPanel : StackPanel = null;
   public Link1 : HyperlinkButton = null;
   public Divider1 : Rectangle = null;
   public Link3 : HyperlinkButton = null;
   public Divider2 : Rectangle = null;
   public Link2 : HyperlinkButton = null;
   public loginContainer : Border = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Grid ().withName("LayoutRoot"),new Border ().withName("ContentBorder"),new Frame ().withName("ContentFrame"),new Grid ().withName("NavigationGrid"),new Border ().withName("BrandingBorder"),new StackPanel ().withName("BrandingStackPanel"),new TextBlock ().withName("ApplicationNameTextBlock"),new Border ().withName("LinksBorder"),new StackPanel ().withName("LinksStackPanel"),new HyperlinkButton ().withName("Link1"),new Rectangle ().withName("Divider1"),new HyperlinkButton ().withName("Link3"),new Rectangle ().withName("Divider2"),new HyperlinkButton ().withName("Link2"),new Border ().withName("loginContainer")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.ContentBorder = (<Border>(this.FindName("ContentBorder")));
      this.ContentFrame = (<Frame>(this.FindName("ContentFrame")));
      this.NavigationGrid = (<Grid>(this.FindName("NavigationGrid")));
      this.BrandingBorder = (<Border>(this.FindName("BrandingBorder")));
      this.BrandingStackPanel = (<StackPanel>(this.FindName("BrandingStackPanel")));
      this.ApplicationNameTextBlock = (<TextBlock>(this.FindName("ApplicationNameTextBlock")));
      this.LinksBorder = (<Border>(this.FindName("LinksBorder")));
      this.LinksStackPanel = (<StackPanel>(this.FindName("LinksStackPanel")));
      this.Link1 = (<HyperlinkButton>(this.FindName("Link1")));
      this.Divider1 = (<Rectangle>(this.FindName("Divider1")));
      this.Link3 = (<HyperlinkButton>(this.FindName("Link3")));
      this.Divider2 = (<Rectangle>(this.FindName("Divider2")));
      this.Link2 = (<HyperlinkButton>(this.FindName("Link2")));
      this.loginContainer = (<Border>(this.FindName("loginContainer")));
      this.initControlProperties()
   }
}