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

import { Component, Input, Optional } from '@angular/core';
import { TextBlock } from '../../models/controls/TextBlockModel';

@Component({
    selector: 'sm-text-block',
    template: `<span>{{text}}</span>`,
    styles: [`.inner-radio-button-container { 
                   width: inherit;
                   height: inherit;
                   background-color: inherit;
            }`]
})
export class SmTextBlock {
    @Input()
    public model : TextBlock;
        
    get text() {
        return this.model?.Text;
    }

    public constructor(@Optional() private injectedModel: TextBlock) {
        this.model = injectedModel;

    }
    ngOnInit() {        
        this.model = this.model || this.injectedModel;
    }
}