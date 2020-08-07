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

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WriteableBitmap } from '../helpers/WriteableBitmap';

@Pipe({
    name : "imagedatatobase64"
 })
 export class ImageDataToBase64 implements PipeTransform {
   constructor(private sanitizer : DomSanitizer){
   }
 
    public transform (value : any) : any {
      let data = [];
      if (value instanceof WriteableBitmap){
        data = value.data;
      } else if (value instanceof Array) {
        data = value;
      }
      /// WARNING btoa may not be available in all browsers
      var base64Text = 
           "data:image/gif;base64," + btoa( data.map((d) => String.fromCharCode(d)).join(""));
 
      return this.sanitizer.bypassSecurityTrustUrl(base64Text);
    }
 }
 