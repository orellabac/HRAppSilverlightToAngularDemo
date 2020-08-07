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

import { DependencyPropertyChangedEventArgs } from './DependencyProperty';

export class PropertyMetadata {
    defaultValue : unknown = null;
    changedHandler : ((sender : any,args : DependencyPropertyChangedEventArgs) => void) = null;
    
    constructor(arg1 : ((sender : any,args : DependencyPropertyChangedEventArgs) => void))
    constructor(arg1 : unknown)
    constructor(arg1 : unknown, arg2 : ((sender : any,args : DependencyPropertyChangedEventArgs) => void))
    constructor(arg1? : unknown, arg2? : unknown)
    {
       if (arg2 instanceof Function) {
           this.defaultValue = arg1;
           this.changedHandler = arg2 as ((sender : any,args : DependencyPropertyChangedEventArgs) => void);
       } else if (arg1 instanceof Function) {
           this.changedHandler = arg2 as ((sender : any,args : DependencyPropertyChangedEventArgs) => void);
       } else {
           this.defaultValue = arg1;
       }
    }
}
