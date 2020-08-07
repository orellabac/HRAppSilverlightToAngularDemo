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

import { simpleStringFormat } from '../utils';

export function createStringWithChar(baseString: string, count: number) {
    if (count > 0) {
        let array = new Array(count);
        for (let i = 0; i < count; i++) {
            array[i] = baseString;
        }
        return array.join("");
    }
    else {
        return baseString;
    }
}

export function removeCharsFromString(str : string, start : number, length? : number) : string  {
    if (typeof length == "undefined") {
        length = str.length;
    }
    return str.substr(0, start) + str.substr(start + length);
}

export function concatStringsSequence(separator : string, strings : Iterable<string>) : string {
    return [...strings].join(separator);
}


export function stringNullOrWhitespace(str: string) {
    if (str === null || typeof str === 'undefined') {
        return true;
    } else {
        for (let i = 0; i < str.length; i++) {
            if (!(str[i] === ' ' || str[i] === '\t')) {
                return false;
            }
        }
        return true;
    }
}

export function stringTrimLeftChar(str: string, charToTrim: string)  : string  {
    let i = 0;
    for (i = 0; i < str.length; i++) {
       if (str[i] !== charToTrim[0]) {
           break;
       }
    }
    if (i < str.length) {
        return str.substr(i);
    } else if (i === str.length) {
        return '';
    } else {
        return str;
    }
}

export function stringTrimRightChar(str: string, charToTrim: string) : string {
    let i = 0;
    for (i = str.length - 1; i >= 0; i--) {
       if (str[i] !== charToTrim[0]) {
           break;
       }
    }
    if (i <= str.length - 1) {
        return str.substr(0, i + 1);
    } else {
        return str;
    }
}

export function stringInsert(str: string, idx : number, strToInsert: string)  : string  {
    if (idx >= 0 && idx < str.length) {
        return str.substring(0, idx) + strToInsert + str.substr(idx, str.length - idx);
    } else {
        return str;
    }
}

export class StringBuilder {
    private contents: string[];
    private contentIndex: number;
    constructor(init?: string | number) {
        if (typeof init == 'number') {
            this.contents = new Array(init);
            this.contentIndex = 0;
        } else if (typeof init == "string") {
            this.contentIndex = init.length;
            this.contents = [...init];
        } else {
            this.contents = new Array(10);
            this.contentIndex = 0;
        }
    }

    public get length() {
        return this.contentIndex;
    }

    public getItem(index: number) {
        return this.contents[index];
    }

    public setItem(index: number, value: string) {
        this.contents[index] = value[0];
    }

    public appendLine(value?: string): StringBuilder {
        if (typeof value !== 'undefined') {
            this.append(value);
        }
        this.append('\r\n');
        return this;
    }
    public append(value: any) {
        let str = value.toString() ?? "";
        if (str.length > 0) {
            if ((this.contents.length - this.contentIndex) >= str.length) {
                let i: number;
                for (i = 0; i < str.length; i++) {
                    this.contents[this.contentIndex + i] = str[i];
                }
                this.contentIndex += i;
            } else {
                let newSize = str.length + this.contents.length + Math.trunc(this.contents.length / 2);
                let newContents = new Array(newSize);
                let i = 0;
                for (i = 0; i < this.contents.length; i++) {
                    newContents[i] = this.contents[i];
                }
                i = this.contentIndex;
                for (let j = 0; j < str.length; j++) {
                    newContents[i] = str[j];
                    i++;
                }
                this.contents = newContents;
                this.contentIndex = i;
            }
        }
    }
    public appendFormat(format: string, ...args: any[]) {
        this.append(simpleStringFormat(format, args));
    }
    public toString() {
        return this.contents.join("");
    }
}