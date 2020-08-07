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

import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Optional } from '@angular/core';
import { Rectangle } from '../../models/controls/RectangleModel';

@Component({
    selector: 'sm-rectangle',
    template: `<div [ngStyle]="getStyle()" (click)="clickHandler($event)"></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmRectangle {

    @Input()
    public model: Rectangle;
    public getStyle() {
        var result = {
            width: this.model.Width ? ((this.model.Width || 0).toString() + "px") : "100%",
            height: this.model.Height ? ((this.model.Height || 0).toString() + "px") : "100%",
            "background-color": this.model.Fill
        };
        return result;
    }
    public clickHandler($event) {
        if (this.model && this.model.MouseLeftButtonDown) {
            this.model.MouseLeftButtonDown.fire([this.model, {}]);
        }
        $event.preventDefault();
        $event.stopPropagation();
        return false;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef, @Optional() private injectedModel: Rectangle) {
        this.model = injectedModel;

    }
    ngOnInit() {
        this.model = this.model || this.injectedModel;
        if (this.model) {
            this.model.refreshCallBack = () => { this.changeDetectorRef.detectChanges(); };
        }
    }
}