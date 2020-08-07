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

import { RuntimeTypeInfo } from '../baseframework/ReflectionSupport';
import { PropertyMetadata } from './PropertyMetadata';

export class DependencyProperty {
    static registerNewProperty(propertyName: string, 
                               propertyType: RuntimeTypeInfo,
                               declaringType: RuntimeTypeInfo,
                               metadata: PropertyMetadata): DependencyProperty {
        return new DependencyProperty(propertyName, undefined, <any>metadata?.changedHandler);
    }
    constructor(public name : string, 
                public defaultValue : any,
                public changedCallback : (sender : any,args : any) => any){
 
    }
 }

 
export class DependencyPropertyChangedEventArgs {
    public NewValue : any;
    public OldValue : any;
}
