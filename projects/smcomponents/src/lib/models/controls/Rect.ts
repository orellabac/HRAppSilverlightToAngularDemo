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

import { Point } from './Point';
import { Size } from './Size';


export class Rect {
    public Top: number;
    public Left: number;
    public Width: number;
    public Height: number;

    constructor(p: Point, size: Size)
    constructor(left: number, top: number, width: number, height: number)
    constructor(arg1: unknown, arg2: unknown, arg3?: unknown, arg4?: unknown) {
        if (typeof arg1 === "number" &&
            typeof arg2 === "number" &&
            typeof arg3 === "number" &&
            typeof arg4 === "number") {
            this.Left = arg1;
            this.Top = arg2;
            this.Width = arg3;
            this.Height = arg4;
        } else if (arg1  instanceof Point && arg2 instanceof Size) {
            this.Top = arg1.Y;
            this.Left = arg1.X;
            this.Width = arg2.Width;
            this.Height = arg2.Height;
        }
    }

    public Intersect(other: Rect) {
        throw new Error("Not implemented");
    }
}