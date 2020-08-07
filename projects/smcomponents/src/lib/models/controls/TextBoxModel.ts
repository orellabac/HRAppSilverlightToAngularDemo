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
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';
import { DependencyProperty } from '../../basecomponentmodel/DependencyProperty';
import { Control } from '../../basecomponentmodel/Control';

export class TextBox extends Control {
    public PropertyChanged = new SubscriptionEvent<(s :any, e: {PropertyName:string}) => void>();
    TextChanged = new SubscriptionEvent<(sender: any, e: any) => void>();

    public FontSize : number;
    text: string = "";
    public get Text() {
        return this.text;
    }
    public set Text(value: string) {
        if (this.text !== value){
            this.text = value;
            var pt = this.PropertyChanged.toFunction();
            if(pt) {
                pt(this, { PropertyName: "Text" });
            }
        }
    }
    static TextProperty: DependencyProperty;

}