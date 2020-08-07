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

import { INotifyPropertyChanged } from './INotifyPropertyChanged';

export class PropertyPath {
    constructor(public prop : string){}
  }
  export class Binding {
      Source: INotifyPropertyChanged;
      BindsDirectlyToSource: boolean;
      Converter: any;
      ConverterParameter: any;
      ConverterCulture: any;
      Mode: any;
      NotifyOnValidationError: boolean;
      Path: PropertyPath;
      UpdateSourceTrigger: any;
      ValidatesOnExceptions: boolean;
      ElementName: any;
      RelativeSource: any;
      constructor(path? : string) {
          if (typeof path != "undefined") {
             this.Path = new PropertyPath(path);
          }
      }
  }
  