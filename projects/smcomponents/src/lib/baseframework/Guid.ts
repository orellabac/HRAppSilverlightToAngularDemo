/*****************************************************************************
 * Copyright (C) MobiliFe.Net <info@mobilize.net> - All Rights Reserved
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

 export class Guid {
    public static readonly empty = new Guid("00000000-0000-0000-0000-000000000000");
    private static GuidRegex = /^[0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F]-[0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F]-[0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F]-[0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F]-[0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F][0-9|A-F]$/i;
    private constructor(private value : string) {
    }
    public static newGuid() {
        // see https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
        let guid=  'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        return new Guid(guid);
    }
    public equals(other : Guid) : boolean {
        return this.value.toLowerCase() == other.value.toLowerCase();
    }
    public static tryParse(value  : string, valueFunc : (x : Guid) => void) : boolean {
        if (this.GuidRegex.test(value)) {
           valueFunc(new Guid(value));
           return true;
        } else {
            return false;
        }
    }

    public static parse(value  : string) : Guid {
         if (this.GuidRegex.test(value)) {
            return new Guid(value);
         } else {
             throw Error("Invalid Guid");
         }
    }
 }

