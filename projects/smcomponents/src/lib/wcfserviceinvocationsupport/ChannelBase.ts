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

import { IAsyncResult, AsyncCallback } from './AsyncResultSupport';
import { Application } from '../basecomponentmodel/Application';
import { catchError } from 'rxjs/operators';
import { ClientBase } from './ClientBase';

export class ChannelBase<T> {
    EndInvoke(methodName: string, _args: any[], result: IAsyncResult, classConstructor? : any) : any {
        let resultToTransfer =  (typeof result.AsyncState.d == "undefined") ? result.AsyncState : result.AsyncState.d;
        if (typeof classConstructor !== "undefined") {        
          var resultInstance = new classConstructor();
          Object.assign(resultInstance, resultToTransfer);
          return resultInstance;
        } else {
          return resultToTransfer;
        }
    }
    BeginInvoke(methodName: string, _args: any[], callback: AsyncCallback, asyncState: any): IAsyncResult {
      let actualArguments : string =      
            _args.map(
                (arg) => (typeof arg.name != "undefined" && typeof arg.value != "undefined") 
                        ? (arg.name + "=" + arg.value) : "p=" + arg.toString()).
                  join(";");
       //var finalUrl = `${this.client.url}${this.client.serviceName}/json/${methodName}?${actualArguments}`;
       var finalUrl = `${this.client.url}/json/${methodName}?${actualArguments}`;
       console.log(finalUrl);
       var localResult = {
        AsyncState: null,
        IsCompleted: false,
        callback: (x) => {}
       };
  
       let request = Application.Current.angularHttpClient.get(
            finalUrl   
          ).pipe( catchError((e, y) =>
          {
              console.error(e);
              return  [];
          })).subscribe( (result) => {
            console.log("result "+ result);
            var endOperationResult = callback({
              AsyncState: result,
              IsCompleted: true
            });
            if (localResult.callback) {
                localResult.callback({ Results: endOperationResult });
            }
          });
          return localResult;
  
    }
     constructor(private client : ClientBase<T>){
       
     }
  }
  
export class InnerChannel {
    public GetProperty<T>(TParam : Function) {
        return null;
    }
}