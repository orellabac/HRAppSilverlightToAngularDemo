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

import { Component, Input, TemplateRef, ContentChildren, QueryList, Injector, Optional } from '@angular/core';
import { StackPanel } from '../../models/controls/StackPanelModel';
import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';

@Component({
    selector: 'sm-stack-panel',
    template: `<div style="position: relative; margin: inherit">
                <div *ngFor="let item of items">
                   <ng-container *ngIf="item.template; else elseBlock">
                       <ng-container *ngTemplateOutlet='item.template'></ng-container>
                   </ng-container>              
                   <ng-template #elseBlock>
                        <ng-container  *ngComponentOutlet="item.component; injector: item.customInjector"></ng-container> 
                   </ng-template>
                </div>
               </div>`
})
export class SmStackPanel {
    @Input()
    model : StackPanel; 
    @ContentChildren(TemplateRef) viewChildren: QueryList<TemplateRef<any>>;
    items : ({item : FrameworkElement, component? : any, template? : TemplateRef<any>, customInjector : Injector})[] = [];
    isInitialized : boolean = false;

    constructor(private injector: Injector, @Optional() injectedModel : StackPanel) {
        this.model = injectedModel;
    }

    ngAfterViewInit(){
        // if (!this.isInitialized) {
        //     let tmpItems = [];
        //     this.viewChildren.forEach((item) => {
        //         tmpItems.push({template: item});
        //     });
        //     this.isInitialized = true;        
        //     // the following timeout avoid runtime error
        //     setTimeout(() => {this.items = tmpItems;});
        // }
    }
    refresh() {
        if (this.model){
           if (this.items.length !== this.model.children.length) {
              this.items = [];
              
              for(let i = 0; i < this.model.children.length;i++) {
                  let child = this.model.children[i];
                  let customInjector =  Injector.create({
                    providers: [{ provide: child.constructor, useValue: child, deps: [] }], 
                    parent: this.injector }); 
                  this.items.push({ 
                       item: this.model.children[i], 
                       component: (<any>this.model.children[i]).angularComponent, 
                       customInjector });
              }
           }
        }
    }
    ngOnInit() {
        
        if (this.model) {
           this.model.change.addHandler(() => this.refresh());
           this.refresh();
        }      
    }
}
