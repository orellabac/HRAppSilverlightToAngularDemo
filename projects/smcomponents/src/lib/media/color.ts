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


export class SmColor {
    A: number;
    R: number;
    G: number;
    B: number;
}

export function createColorFromArgb(alpha: number, red: number, green: number, blue: number): SmColor {
    return {
        A: alpha,
        R: red,
        G: green,
        B: blue
    };
}

export function smColorToCssColor(color: SmColor): string {
    let redText = color.R.toString(16);
    let greenText = color.G.toString(16);
    let blueText = color.B.toString(16);
    if (redText.length != 2) {
       redText = '0' + redText[redText.length - 1];
    }
    if (greenText.length != 2) {
        greenText = '0' + greenText[greenText.length - 1];
    }
    if (blueText.length != 2) {
        blueText = '0' + blueText[blueText.length - 1];
    }
    return ("#" + redText + greenText + blueText).toUpperCase();
}

export let SmColors = {
   Red : createColorFromArgb(255, 255,0, 0),
   Green : createColorFromArgb(255, 0, 255, 0),
   Blue : createColorFromArgb(255, 0, 0, 255),
   Black : createColorFromArgb(255, 0, 0, 0),
   White : createColorFromArgb(255, 255, 255, 255)
};