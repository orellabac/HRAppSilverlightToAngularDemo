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

export class EndpointAddress {
  constructor(public address? : string) {}
}
export class CommunicationBinding {
}

export interface ICommunicationObject {
  EndClose(result: IAsyncResult): any;
  BeginClose(callback: AsyncCallback, asyncState: any): IAsyncResult;
  BeginCloseWithTimeout(timeout: number, callback: AsyncCallback, asyncState: any): IAsyncResult;

  EndOpen(result: IAsyncResult): any;
  BeginOpen(callback: AsyncCallback, asyncState: any): IAsyncResult;
  BeginOpenWithTimeout(timeout: number, callback: AsyncCallback, asyncState: any): IAsyncResult;
  Abort() : void;
  OpenWithTimeout(timeout : number) : void;
  CloseWithTimeout(timeout : number) : void;

  EndClose(result : IAsyncResult);
}

export class WcfCommunicationObject implements ICommunicationObject {
  EndClose(result: IAsyncResult);
  EndClose(result: IAsyncResult);
  EndClose(result: any) {
    throw new Error("Method not implemented.");
  }
  BeginClose(callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error("Method not implemented.");
  }
  BeginCloseWithTimeout(timeout: number, callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error("Method not implemented.");
  }
  EndOpen(result: IAsyncResult) {
    throw new Error("Method not implemented.");
  }
  BeginOpen(callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error("Method not implemented.");
  }
  BeginOpenWithTimeout(timeout: number, callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error("Method not implemented.");
  }
  Abort(): void {
    throw new Error("Method not implemented.");
  }
  OpenWithTimeout(timeout: number): void {
    throw new Error("Method not implemented.");
  }
  CloseWithTimeout(timeout: number): void {
    throw new Error("Method not implemented.");
  }

}

export class WcfChannelBase extends WcfCommunicationObject {
  DefaultSendTimeout : number;
   constructor(channelManager : WcfChannelManagerBase) { super(); }
}

export class WcfChannelManagerBase {

}


export enum CommunicationState {
  Created, Opening, Opened, Closing, Closed, Faulted
}