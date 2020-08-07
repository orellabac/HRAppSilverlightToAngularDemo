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

import { ToggleButtonModel } from "../../models/controls/ToggleButtonModel";
import { Component, Input, Output, EventEmitter, Optional, Injector } from '@angular/core';

export class CheckBoxModel extends ToggleButtonModel {
    angularComponent = SmCheckBoxComponent;
}


@Component(
    {
        selector: 'sm-checkbox',
        template: `<div class="checkbox-container inner-checkbox-container">
        <label style="margin: 0px">
          <input #theCheckbox type='checkbox' [checked]='itemCheck' (change)="onChange($event)">
          <ng-container *ngIf="!innerContent; else elseBlock">
              <ng-content></ng-content>
          </ng-container>
          <ng-content></ng-content>
          <ng-template #elseBlock>
             <ng-container  *ngComponentOutlet="innerContent.component; injector: innerContent.customInjector"></ng-container> 
          </ng-template>
        </label>
    </div>`,
styles: [`.inner-checkbox-container { 
        width: inherit;
        height: inherit;
        background-color: inherit;
 }`]
    })
export class SmCheckBoxComponent {
    private cachedInnerContent : { component : any, customInjector : Injector } = null;

    @Input()
    model: CheckBoxModel;

    @Input()
    itemCheck : boolean;
    @Output()
    itemCheckChange : EventEmitter<any> = new EventEmitter();

    @Output()
    checked : EventEmitter<any> = new EventEmitter();
    @Output()
    unchecked : EventEmitter<any> = new EventEmitter();


    onChange($event) {
        if ($event.target?.checked === true) {
            this.model.IsChecked = true;
            this.itemCheckChange.emit(true);
            this.checked.emit(this.model);
            this.model.Checked.fire([]);
        } else {
            this.model.IsChecked = false;
            this.itemCheckChange.emit(false);
            this.unchecked.emit(this.model);
        }
    }

    get innerContent() : { component : any, customInjector : Injector } {
        if (this.cachedInnerContent) {
            return this.cachedInnerContent;
        }
        if (this.model?.Content && this.model?.Content.angularComponent) {
            let customInjector =  Injector.create({
                 providers: [{ provide: this.model?.Content.constructor, useValue: this.model.Content, deps: [] }], 
                 parent: this.injector });
            this.cachedInnerContent =  { component: this.model?.Content.angularComponent,                
                                         customInjector: customInjector };
            return this.innerContent;
        } else {
            return undefined;
        }
      }

    public constructor(@Optional() protected injectedModel: CheckBoxModel = null, 
                       private injector: Injector) {
        this.model = injectedModel;
    }
    
    ngOnInit() {
       this.model = this.model ?? new CheckBoxModel();
       this.itemCheck = this.model.IsChecked == true;
    }
}

