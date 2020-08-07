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
import { ToggleButtonModel } from "../../models";


 @Component({
     selector: 'sm-toggle-button',
     template: `
     <button>
        <ng-content></ng-content>
     </button>`
 })
 export class SmToggleButton {
    @Input()
    model : ToggleButtonModel;
    @Output()
    click : EventEmitter<any> = new EventEmitter();
    
    ngOnInit() {
        this.model = this.model ?? new ToggleButtonModel();
    }
 }