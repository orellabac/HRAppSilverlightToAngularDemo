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

import { Component, ChangeDetectionStrategy, Input, Optional, ElementRef, ChangeDetectorRef } from '@angular/core';
import { EllipseModel } from '../../models/controls/EllipseModel';
import { syncComponentAndModel } from '../../utils/supportFunctions';

@Component(
    {
        selector: "sm-ellipse",
        template: `<div class="ellipsediv" [ngStyle]="getStyle()"></div>`,
        styles: [`.ellipsediv { 
            width: inherit;
            height: inherit;
            background-color: inherit;
            border-radius: 50%;
     }`],
        changeDetection: ChangeDetectionStrategy.OnPush        
    }
)
export class SmEllipseComponent {
    @Input()
    model: EllipseModel;
    constructor(@Optional() injectedModel : EllipseModel, 
               private element : ElementRef<HTMLElement>,
               private changeDetectorRef: ChangeDetectorRef) {
        this.model = injectedModel;
    }
    getStyle() {
        var resultStyle : { [prop:string] : string } = {};
        if (this.model) {
            if (this.model.Fill !== undefined) {
                resultStyle['background-color'] = this.model.Fill;
            }
            if (this.model.width !== undefined) {
                resultStyle['width'] = this.model.width.toString() + "px";
            }
            if (this.model.height !== undefined) {
                resultStyle['height'] = this.model.height.toString() + "px";
            }
        }
        return resultStyle;
    }
    ngOnInit() {                
        this.model = this.model || new EllipseModel();
        syncComponentAndModel(this.element.nativeElement, this.model);
        this.model.change.addHandler((propertyName) => {
            this.changeDetectorRef.markForCheck();
        });
    }
}