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

import { Component, Input, EventEmitter, Injector, Optional } from '@angular/core';
import { ButtonModel } from '../../models/controls/ButtonModel';

@Component({
    selector: 'sm-button',
    template: `<button (click)="clickHandler()" [disabled]="isDisabled()">
                   <ng-content></ng-content>
               </button>`,
    styles: []
})
export class SmButton {
    @Input()
    public model : ButtonModel;
    

    @Input()
    click : EventEmitter<any> = new EventEmitter();

    public constructor(@Optional() protected injectedModel: ButtonModel = null, 
                       private injector: Injector) {
           this.model = injectedModel;
    }

    triggerClick() {
        this.clickHandler();
    }

    clickHandler() {
        this.model?.OnClick();        
        this.click.emit(this);
    }

    isDisabled() : boolean {
        return this.model?.IsEnabled === false;
    }

    ngOnInit() {
        this.model = this.model || this.injectedModel || new ButtonModel();
    }
}
