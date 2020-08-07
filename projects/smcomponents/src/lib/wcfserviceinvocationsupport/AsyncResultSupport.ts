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

import { Exception } from '../baseframework/Exceptions';

 export interface IAsyncResult {
    AsyncState : any;
    IsCompleted : boolean;
    callback? : (x:any) => void;
}

export type AsyncCallback = (ar  : IAsyncResult) => void;

export class AsyncCompletedEventArgs {
  constructor(public Error : Exception, public cancelled : boolean,public  UserState : any){      
  }

  public RaiseExceptionIfNecessary() {

  }
}

export class InvokeAsyncCompletedEventArgs  {
  public Results : any[];
  public Error : Exception;
  public Cancelled : boolean;
  public UserState : any;
}