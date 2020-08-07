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

import { RuntimeTypeInfo } from '../baseframework';

 export interface ISimpleDIContainer {
     Resolve(typeInfo : RuntimeTypeInfo) : any;
 }

 export interface ISimpleDIServiceLocator {
    Resolve(typeInfo : RuntimeTypeInfo) : any;
 }

 export class SimpleDIServiceLocator implements ISimpleDIServiceLocator {
    public static Current : ISimpleDIServiceLocator = new SimpleDIServiceLocator();

     Resolve(typeInfo: RuntimeTypeInfo) {
         throw new Error("Method not implemented.");
     }
 }