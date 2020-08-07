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

import { Component, Input, Injector, Optional } from '@angular/core';
import { Control } from '../../basecomponentmodel/Control';
import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';

export class ContentControlModel extends  Control {
    angularComponent : any = SmContentComponent;   
    public Content : unknown;
}

@Component({
    selector: 'sm-content',
    template: `<div class="content">
                    <ng-container *ngIf="!innerContent; else elseBlock">
                    <ng-content></ng-content>
                    </ng-container>                    
                    <ng-template #elseBlock>
                    <ng-container  *ngComponentOutlet="innerContent.component; injector: innerContent.customInjector"></ng-container> 
                    </ng-template>
               </div>`,
    styles: []
})
export class SmContentComponent {
    @Input()
    model  : any;

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

    constructor(@Optional() protected injectedModel: ContentControlModel = null,
                private injector: Injector) {

    }
}

