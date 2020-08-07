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

import { Component, ChangeDetectionStrategy, TemplateRef, ContentChild, Input, Output, EventEmitter, Optional } from '@angular/core';
import { ComboBox } from '../../models/controls/ComboxModel';

@Component({
    selector: 'sm-simple-combobox',
    template: `    
    <ng-container *ngIf="itemsTemplate; else elseBlock">
        <kendo-dropdownlist 
            [data]='internalData || model._items'
            [textField]="textField || 'content'"
            [valueField]="valueField || 'content'"
            (selectionChange)="onChange($event)">                     
            <ng-template kendoDropDownListItemTemplate="" let-dataItem="">
                 <ng-container *ngTemplateOutlet="itemsTemplate; context: { $implicit: dataItem} "></ng-container>
            </ng-template>     
            <ng-template kendoDropDownListValueTemplate="" let-dataItem="">
                 <ng-container *ngTemplateOutlet="listValueTemplate; context: { $implicit: dataItem} "></ng-container>
            </ng-template>     
            
        </kendo-dropdownlist>
    </ng-container>                    
    <ng-template #elseBlock>
                <kendo-dropdownlist 
                     [data]='internalData || model._items'
                     [textField]="textField || 'content'"
                     [valueField]="valueField || 'content'"
                     (selectionChange)="onChange($event)">                                          
                </kendo-dropdownlist>
    </ng-template>
              `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmSimpleComboBox {
    internalData : Array<any>;

    @ContentChild('itemsTemplate', {static: true})
    itemsTemplate: TemplateRef<any>;

    @ContentChild('listValueTemplate', {static: true})
    listValueTemplate: TemplateRef<any>;

    @Input()
    model  : ComboBox;

    @Input()
    selectedValue : any;

    @Input()
    textField : string;

    @Input()
    valueField : string;

    @Input()
    get data() : any {
        return this.internalData;
    }

    set data(value : any) {
        if (typeof value['internalArray'] !== 'undefined') {
            this.internalData = value['internalArray'];
        } else {
            this.internalData = value;
        }
    }

    @Output()
    selectedValueChange : EventEmitter<any> = new EventEmitter();

    public constructor(@Optional() protected injectedModel: ComboBox = null) {
        this.model = injectedModel;

    }
    onChange($event) {
        // for some reason kendo sends the actual object
        if ($event) {
            if (this.data) {
               this.model.selectedIndex = this.data.indexOf($event);
            } else {
               for (let i = 0;i < this.model?._items?.length;i++) {
                   if (this.model._items[i].content === $event.content) {
                        this.model.selectedIndex  = i;
                        break; 
                   }
               }
            }
        }
        this.model.SelectionChanged.fire([]);
        
        if ($event){
            let valueToEmit = 
               this.data ? ((typeof this.valueField !== "undefined") ? $event[this.valueField] : $event) : $event['contents'];
            this.selectedValueChange.emit(valueToEmit);
        }
    }
    ngOnInit() {
        this.model = this.model || this.injectedModel || new ComboBox();
    }
    
}
 