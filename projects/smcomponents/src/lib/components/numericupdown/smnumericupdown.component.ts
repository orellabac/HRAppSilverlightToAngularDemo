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

import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Control } from "../../basecomponentmodel/Control";

export class NumericUpDownModel extends Control {
    public Value: number = 0;
}

@Component({
    selector: 'sm-numeric-up-down',
    template: `
    <kendo-numerictextbox [(ngModel)]="innerValue" (valueChange)="onChange($event)">
    </kendo-numerictextbox>`
})
export class SmNumericUpDown {
    innerValue : number = 0;
    @Input()
    model: NumericUpDownModel;

    @Input()
    value: number;
    @Output()
    valueChange : EventEmitter<number> = new EventEmitter();

    @Output()
    valueChanged : EventEmitter<any> = new EventEmitter();

    onChange($event) {
        this.valueChange.emit($event);
        this.model.Value = $event;
        this.valueChanged.emit($event);
    }

    ngOnInit() {
        this.model = this.model ?? new NumericUpDownModel();
    }
}