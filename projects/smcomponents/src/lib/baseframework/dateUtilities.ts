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

import { GlobalizationHelper } from './globalization';



export function smParseDate(date: string): Date {
   throw Error("Not implemented");
}

export function smTryParseDate(date: string, parsedDateFunc: (d: Date) => void): boolean {
   throw Error("Not implemented");
}

export function smFormatDate(dateToFormat: Date, settings: GlobalizationHelper) : string
export function smFormatDate(dateToFormat: Date, date: string): string
export function smFormatDate(dateToFormat: unknown, p2: unknown): string {
   throw Error("Not implemented");
}