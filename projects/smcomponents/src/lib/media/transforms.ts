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

import { Point } from '../models/controls/Point';
import { SimpleList } from '../baseframework/collections';
import { DependencyObject } from '../basecomponentmodel/DependencyObject';

export class SmTransform extends DependencyObject {
   withName(name : string) {
       return this;
   }
}

export class ScaleTransform extends SmTransform {
    public CenterX : number;
    public CenterY : number;
    public ScaleX : number;
    public ScaleY : number;
}

export class TranslateTransform extends SmTransform {
    public X : number;
    public Y : number;
}

export class TransformGroup extends SmTransform {
   public Children : SimpleList<SmTransform> = new SimpleList();
}

export class GeneralTransform {
    public Transform(p : Point) : Point {
        throw Error("Not implemented");
    }
}