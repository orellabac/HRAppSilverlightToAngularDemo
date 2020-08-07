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

import { DependencyProperty } from './DependencyProperty';

export class DependencyObject {
    protected properties = {};
    public clearValue(property : DependencyProperty) {
        this.setValue(property, null);
    }
    public getValue(property : DependencyProperty);
    public getValue(property : string);
    public getValue(property: string | DependencyProperty): any {
        if (typeof property === "string") {
           return this.properties[property];
        } else {
            let value = this.properties[property.name];
            if (typeof value === "undefined") {
                return property.defaultValue;
            } else {
                return value;
            }            
        }
    }
    public setValue(property : DependencyProperty, value : any);
    public setValue(property : string, value : any)
    public setValue(property: string | DependencyProperty, value: any) {
        if (typeof property === "string") {
           this.properties[property] = value;
        } else {
            if (property.changedCallback) {
                property.changedCallback(this, value);
            }
            this.properties[property.name] = value;
            /// TODO review the strategy for notifying property changes
            if ((<any>this).change) {
                (<any>this).change.fire([property.name]);
            }
        }
    }
}