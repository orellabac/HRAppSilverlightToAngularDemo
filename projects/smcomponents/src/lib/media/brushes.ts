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

import { SimpleList } from '../baseframework/collections';
import { SmColor } from './color';
import { SmTransform } from './transforms';

export class Brush {
    public RelativeTransform : SmTransform;
}

export class GradientStop {
    public Offset : number;
    public Color : SmColor;
}

export class GradientBrush extends Brush {
    public GradientStops: SimpleList<GradientStop> = new SimpleList<GradientStop>();
}

export class RadialGradientBrush extends GradientBrush {
}

export class SolidColorBrush extends Brush {
   public Color : SmColor;
   constructor(color? : SmColor) {
       super();
       this.Color = color;
   }
}