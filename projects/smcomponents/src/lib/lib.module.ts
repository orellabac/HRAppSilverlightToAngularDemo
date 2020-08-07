import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { HttpClientModule } from '@angular/common/http';
import { RootVisualDirective } from './directives/rootvisual.directive';
import { SmSimpleComboBox } from './components/combobox/smcombobox.component';
import { SmGridPanel } from './components/gridpanel/smgridpanel.component';
import { SmCanvasPanel, SmCanvasItem } from './components/canvas/smcanvas.component';
import { SmRectangle } from './components/rectangle/smrectangle.component';
import { SmContentComponent } from './components/contentcontrol/smcontent.component';
import { SmButton } from './components/button/smbutton.component';
import { SmRadioButton } from './components/radiobutton/smradiobutton.component';
import { GenerateRadioGroupDirective } from './directives/generateradiogroup.directive';
import { SmStackPanel } from './components/stackpanel/smstackpanel.component';
import { SmEllipseComponent } from './components/ellipse/smellipse.component';
import { ActiveRowGridSelection } from './directives/activerowgridselection.directive';
import { SmTabControl, SmTabItem } from './components/tabcontrol/smtabcontrol.component';
import { SmNumericUpDown } from './components/numericupdown/smnumericupdown.component';
import { SmToggleButton } from './components/togglebutton/smtogglebutton.component';
import { SmCheckBoxComponent } from './components/checkbox/smcheckbox.component';
import { DataPagerHelper } from './components/datapager/smdatapager.component';
import { DataPagerHelperBindingDirective } from './directives/datapagerhelper.directive';


@NgModule({
    declarations: [
         RootVisualDirective, SmSimpleComboBox, SmCheckBoxComponent, SmGridPanel, SmCanvasPanel, SmRectangle, SmNumericUpDown,
         SmStackPanel, GenerateRadioGroupDirective, SmRadioButton, SmButton, SmContentComponent, 
         SmEllipseComponent, SmCanvasItem, ActiveRowGridSelection, SmTabControl, SmTabItem, SmToggleButton,
         DataPagerHelper, DataPagerHelperBindingDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,        
        GridModule,
        LayoutModule,
        NumericTextBoxModule,
        DropDownsModule,
        BrowserAnimationsModule,
        DialogsModule,
    ],
    providers: [],
    exports: [
        SmSimpleComboBox, SmGridPanel, SmCanvasPanel, SmCheckBoxComponent, SmNumericUpDown, SmRectangle, GenerateRadioGroupDirective,
        RootVisualDirective, SmButton, SmContentComponent, SmEllipseComponent, SmStackPanel, SmRadioButton, ActiveRowGridSelection, 
        SmTabControl, SmTabItem,SmToggleButton, DataPagerHelper, DataPagerHelperBindingDirective
    ]
})
export class ConversionSupportModule { }