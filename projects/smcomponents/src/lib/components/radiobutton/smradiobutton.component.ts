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

import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, Optional, Injector } from '@angular/core';
import { RadioButtonModel } from '../../models/controls/RadioButtonModel';
import { Subscription } from 'rxjs';
import { DataContextService } from '../../services/datacontextprovider.service';
import { RadioNameService } from '../../services/radiobuttonsnames.service';

@Component({
    selector: 'sm-radio-button',
    template: `<div class="radio-button-container inner-radio-button-container">
                   <label style="margin: 0px">
                     <input #theRadio type='radio' [name]='name' [checked]='itemCheck' (change)="onChange($event)">
                     <ng-container *ngIf="!innerContent; else elseBlock">
                         <ng-content></ng-content>
                     </ng-container>
                     <ng-content></ng-content>
                     <ng-template #elseBlock>
                        <ng-container  *ngComponentOutlet="innerContent.component; injector: innerContent.customInjector"></ng-container> 
                     </ng-template>
                   </label>
               </div>`,
    styles: [`.inner-radio-button-container { 
                   width: inherit;
                   height: inherit;
                   background-color: inherit;
            }`]
})
export class SmRadioButton {
    private pendingItemCheckInit : boolean = undefined;;

    @ViewChild("theRadio", {static: true })
    theRadio : ElementRef<HTMLInputElement>;

    @Input()
    model  : RadioButtonModel;

    @Input()
    name : string = "";

    @Input()
    get itemCheck() : boolean  {
        return this.model?.IsChecked === true;
    }
    set itemCheck(value : boolean) {
        // if (this.itemChangeConverter) {
        //     value =  this.itemChangeConverter.transform(value);
        //  }
        if (this.model && this.model.IsChecked !== value) {
            this.synching = true;
            this.model.IsChecked = value;
            this.synching = false;
            this.notifyOfChange(value);
            if (value) {    
                this.fireCheckedEvent();
            } else {
                this.fireUncheckedEvent();
            }
        } else {
            this.pendingItemCheckInit = value;
        }
    }

    get innerContent() : any {
      if (this.model?.Content && this.model?.Content.angularComponent) {
          let customInjector =  Injector.create({
               providers: [{ provide: this.model?.Content.constructor, useValue: this.model.Content, deps: [] }], 
               parent: this.injector });
          return { component: this.model?.Content.angularComponent,
                   customInjector: customInjector };
      } else {
          return undefined;
      }
    }

    @Output()
    itemCheckChange : EventEmitter<any> = new EventEmitter();

    @Output()
    checked  : EventEmitter<any> = new EventEmitter();

    @Output()
    unchecked  : EventEmitter<any> = new EventEmitter();

    @Input()
    itemCheckConverter : any;

    @Input()
    itemCheckConverterParameter : any;

    private synching = false;

    private notifyOfChange(value: boolean) {
        if (this.itemCheckConverter) {
           value =  this.itemCheckConverter.ConvertBack(value);
        }
        this.itemCheckChange.emit(value);
        setTimeout(() => {
            this.radioService.sync.emit(null);
        });
    }

    onChange($event) {    
       this.itemCheck = this.theRadio?.nativeElement?.checked;
    }    
    
    syncSubscription : Subscription;

    public constructor(@Optional() protected injectedModel: RadioButtonModel = null, 
                       @Optional() private selfContext : DataContextService,
                       private injector: Injector,
                       private radioService : RadioNameService) {
        this.model = injectedModel;
        this.name = radioService.getNewName();
        this.syncSubscription = radioService.sync.subscribe( () => {
            if (this.itemCheck === true && this.theRadio?.nativeElement?.checked === false) {
                this.itemCheck = false;
            } 
        });
    }

    ngOnInit() {
        this.model = this.model || this.injectedModel || new RadioButtonModel();
        this.model.DataContext = this.selfContext?.dataContext;
        this.model.change.addHandler((propertyName : string) => {
            if (propertyName === "IsChecked" && !this.synching) {
                this.notifyOfChange(this.model.IsChecked);
            }
        });
        if(this.pendingItemCheckInit === true) {
            this.model.IsChecked = this.pendingItemCheckInit;
            this.pendingItemCheckInit = undefined;
        }
    }
    fireCheckedEvent() {
       this.checked.emit(this.model);
       this.model.Checked.fire([this]);
    }
    fireUncheckedEvent() {
        this.unchecked.emit(this.model);
    }
    ngOnDestroy() {
        // this is very important to avoid leaking sync information
        this.syncSubscription.unsubscribe();
    }
} 
