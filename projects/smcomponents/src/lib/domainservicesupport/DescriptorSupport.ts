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

import { Subject } from 'rxjs';

export class FilterDescriptor {
    getUrlFragment(): string {
        let result = "";
        if (this.value != this.ignoredValue 
            && typeof this.value !== "undefined"
            && this.operator == "IsGreaterThanOrEqualTo"
            && this.property) {
           result = `(it.${this.property}.CompareTo(${this.value}) >= 0)`;
        }
        return result;
    }
    setParent(parent: any): any {
        if (this.valueObservable) {
            this.valueObservable.subscribe(
                (value) => {
                   this.value = value; 
                   if (this.value != this.ignoredValue) {
                      parent.performLoad();
                   }
                }
            )
        }
    }
    property: string;
    operator: string;
    ignoredValue: string;
    value: string;
    valueObservable: Subject<any>;
    constructor(values: {
        property? : string,
        operator? : string,
        ignoredValue? : string,
        value? : string,
        valueObservable? : Subject<any>
     }) {

        if (values.property !== undefined) {
            this.property = values.property;
        }
        if (values.operator !== undefined) {
            this.operator = values.operator;
        }
        this.ignoredValue = values.ignoredValue || "";
        if (values.value == undefined) {
            this.value = values.value;
        }
        if (values.valueObservable !== undefined) {
            this.valueObservable = values.valueObservable;
        }

     }
}


export class SortDescriptor {
    getUrlFragment(): string {
        let result = "";
        if (typeof this.property !== "undefined") {
            result = `it.${this.property}`; 
        }
        return result;
    }
    
    property: string;
    direction: string;
    constructor(values: {
                    property? : string,
                    direction : string
                }) {

        if (values.property !== undefined) {
            this.property = values.property;
        }
        if (values.direction !== undefined) {
            this.direction = values.direction;
        }
     }
}
