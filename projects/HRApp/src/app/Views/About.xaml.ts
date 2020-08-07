import { ApplicationStrings} from "../Assets/Resources/ApplicationStrings.Designer";
import { Page, syncComponentAndModel, Grid, ScrollViewer, StackPanel, TextBlock, Uri, Application} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "about",
   templateUrl : "AboutComponent.html",
   styleUrls : ["AboutComponent.css"]
})
export class AboutComponent {
   @Input()
   model : About;
   constructor (@Optional() private injectedModel : About,private element : ElementRef <HTMLElement>) {
   }
   ngOnInit () {
      this.model = this.model || (this.injectedModel || new About())
      syncComponentAndModel(this.element.nativeElement,this.model);
   }
}
export class About extends Page {
   angularComponent : any;
   public constructor () {
      super();
      this.InitializeComponent();
      this.Title = ApplicationStrings.AboutPageTitle;
      this.angularComponent = AboutComponent
   }
   /**
    * 
    *     Executes when the user navigates to this page.
    * 
    */
   public OnNavigatedTo (e : any) : void {
   }
   initControlProperties () {
      this.ContentText.Text = "About page content";
   }
   //Partial class contents from S:\slhtml5\samples\riawalkt\C#Modified\HRApp\obj\Debug\Views\About.g.cs
   public LayoutRoot : Grid = null;
   public PageScrollViewer : ScrollViewer = null;
   public ContentStackPanel : StackPanel = null;
   public HeaderText : TextBlock = null;
   public ContentText : TextBlock = null;
   private _contentLoaded : boolean = false;
   /**
    * 
    * InitializeComponent
    * 
    */
   public InitializeComponent () : void {
      this.componentContents = [new Grid ().withName("LayoutRoot"),new ScrollViewer ().withName("PageScrollViewer"),new StackPanel ().withName("ContentStackPanel"),new TextBlock ().withName("HeaderText"),new TextBlock ().withName("ContentText")]
      if (this._contentLoaded) {
         return;
      }
      this._contentLoaded = true;
      this.LayoutRoot = (<Grid>(this.FindName("LayoutRoot")));
      this.PageScrollViewer = (<ScrollViewer>(this.FindName("PageScrollViewer")));
      this.ContentStackPanel = (<StackPanel>(this.FindName("ContentStackPanel")));
      this.HeaderText = (<TextBlock>(this.FindName("HeaderText")));
      this.ContentText = (<TextBlock>(this.FindName("ContentText")));
      this.initControlProperties()
   }
}