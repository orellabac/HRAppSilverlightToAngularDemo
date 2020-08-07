/*****************************************************************************
 * Copyright (C) Mobilize.Net <info@mobilize.net> - All Rights Reserved
 *
 * This file is part of the Mobilize Frameworks, which is
 * proprietary and confidential.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Mobilize.Net Corporation.
 * The intellectual and technical concepts contained herein are
 * proprietary to Mobilize.Net Corporation and may be covered
 * by U.S. Patents, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Mobilize.Net Corporation.
 ******************************************************************************/

import { Component, Input, ContentChild, TemplateRef, ContentChildren, QueryList, Injector,  ViewChild } from '@angular/core';
import { ContentControlModel } from '../contentcontrol/smcontent.component';
import { ItemsControlModel } from '../../models/controls/ItemsControlModel';
import { TabStripComponent } from '@progress/kendo-angular-layout';
import { SubscriptionEvent } from '../../utils';


export class TabItemModel extends ContentControlModel {
    private _header : any;

    public templateRef : TemplateRef<any>;

    public get isSelected() : boolean {
        return this.Parent instanceof TabControlModel && this.Parent.selectedItem === this;
    }
    public set isSelected(value : boolean) {
        if (value && this.Parent instanceof TabControlModel ) {
            this.Parent.selectedItem = this;
        }
    }

    public get header() {
        return this._header;
    }
    public set header(value: any) {
        this._header = value;
    }
}


export class TabControlModel extends ItemsControlModel {
    wasInSyncWithDesign = false;
    selectedTabIndex : number = -1;
    public SelectionChanged: SubscriptionEvent<((sender : any,e : any) => void )>;
    get selectedContent() : any {
        return this.selectedIndex > 0 ? (this.selectedItem as TabItemModel).Content : null;
    }
    get selectedItem() : any {
        if (this.selectedTabIndex > 0) {
            return this.items.getItem(this.selectedTabIndex);
        } else {
            return null;
        }
    }
    set selectedItem(value : any)  {
        let idx = this.items.indexOf(value);
        if (idx > 0) {
            this.selectedIndex = idx;
        }
    }
    get selectedIndex() {
        return this.selectedTabIndex;
    }
    set selectedIndex(value : number) {
        if (this.selectedTabIndex !== value) {
            this.selectedTabIndex = value;
            this.change.fire(['selectedIndex']);
        }
    }
    syncWithDesignItems(existingItems : Iterable<TabItemModel>) {
        if (!this.wasInSyncWithDesign) {
            for(let item of existingItems) {
               this.items.add(item);           
            }
            this.wasInSyncWithDesign = true;
        }
    }
}


@Component({
    selector: 'sm-tabitem',
    template: `<div></div>`
})
export class SmTabItem {
    @Input()
    model : TabItemModel;

    @Input()
    title : string = "";

    @ContentChild('itemContentTemplate', {static: true})
    itemContentTemplate: TemplateRef<any>;

    ngOnInit() {
        this.model = this.model ?? new TabItemModel();
        this.model.header = this.title !== '' ? this.title : this.model.header;
        this.model.templateRef = this.itemContentTemplate;
    }
}

@Component({
    selector: 'sm-tabcontrol',
    template: `
    <kendo-tabstrip (tabSelect)="onTabSelected($event)">
        <kendo-tabstrip-tab
                 *ngFor="let item of items let i=index"
                [title]="item.header" 
                [selected]="item.isSelected">
           <ng-template kendoTabContent="" >
               <ng-container *ngIf="item.templateRef; else elseBlock">
                    <ng-container *ngTemplateOutlet="item.templateRef"></ng-container>
               </ng-container> 
               <ng-template #elseBlock>
                    <sm-content [model]="item"></sm-content>
               </ng-template>
           </ng-template>     
        </kendo-tabstrip-tab>  
    </kendo-tabstrip>`
}) 
export class SmTabControl {
   isInitialized : boolean = false;

   @Input()
   model : TabControlModel; 
   @ContentChildren(SmTabItem) viewChildren: QueryList<SmTabItem>; 
   @ViewChild(TabStripComponent) tabComponent : TabStripComponent;
   
   items : any[] = [];
   private collectionChangeHandlerToRemove : () => void;
   private modelChangeHandlerToRemove : (string) => void;

   constructor(private injector: Injector) {       
   }
   
   ngOnInit() {
       this.model = this.model ?? new TabControlModel();
       
       this.collectionChangeHandlerToRemove = 
            this.model.items.collectionChangeEvent.addHandler(() => this.synchWithModel());
       this.modelChangeHandlerToRemove = this.model.change.addHandler((property) => {
           if (property === "selectedIndex") {
               this.changeSelectedTab(this.model.selectedIndex);
           }
       });
       this.synchWithModel();
   }

   ngAfterViewInit(){ 
    if (!this.isInitialized) {
        let tmpItems = [];
        this.viewChildren.forEach((item) => {
            tmpItems.push(item.model);
        });
        this.isInitialized = true;         
        // the following timeout avoid runtime error
        setTimeout(() => { this.model.syncWithDesignItems(tmpItems) });
    }
   }

   ngOnDestroy() {
       this.model.items.collectionChangeEvent.removeHandler(this.collectionChangeHandlerToRemove);
       this.model.change.removeHandler(this.modelChangeHandlerToRemove);
   }

   onTabSelected($event) {
       if (typeof $event.index === 'number') {
          this.model.selectedTabIndex = $event.index;
       }
   }

   changeSelectedTab(index : number) {       
      this.tabComponent?.selectTab(index);
   }
 
   private synchWithModel() {
       this.items = this.model.items.internalArray;      
   }
}

