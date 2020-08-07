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

export function smTryParseInt(numberStr: string, parsedIntFunc: (d: number) => void): boolean {
    let parsed = parseInt(numberStr);
    if (!Number.isNaN(parsed)) {
        parsedIntFunc(parsed);
        return true;
    } else {
        return false;
    }
}

export function smCompareNumbers(n1: number, n2: number): number {
    let comp = n1 - n2;
    return comp < 0 ? -1 : (comp > 0 ? 1 : 0);
}
