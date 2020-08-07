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

import { ICommunicationObject, EndpointAddress, CommunicationBinding } from './CommunicationSupport';
import { InnerChannel } from './ChannelBase';
import { AsyncCallback, IAsyncResult } from './AsyncResultSupport';

export interface IClientChannel {

}

export class ClientBase<T> implements ICommunicationObject {
  public serviceName: string;
  public url: string;

  protected InnerChannel = new InnerChannel();
  protected Channel: T;

  constructor()
  constructor(configurationName: string)
  constructor(configurationName: string, remoteAddress: string)
  constructor(configurationName: string, remoteAddress: EndpointAddress)
  constructor(binding: CommunicationBinding, remoteAddress: EndpointAddress)
  constructor(p1?: any, p2?: any) {
    if ((this as any).CreateChannel) {
      this.Channel = (this as any).CreateChannel();
    }
    if (typeof p1 === 'undefined' &&
      typeof p2 === 'undefined') {
      this.serviceName = this.constructor.name.replace(/Client$/, '.svc');
      this.url = window.location.origin.toString() + '/';
      this.url =  `${this.url}${this.serviceName}`;
    } else if (typeof p2 === "string") {
      this.url = p2;
    } else if (p2 instanceof EndpointAddress) {
      this.url = p2.address;
    }
  }

  InvokeAsync(beginOperationCallback: (v1: any[], v2: AsyncCallback, v3: any) => IAsyncResult,
              inputValue: any[],
              endOperationCallback: (v1: IAsyncResult) => any[],
              operationCompletedCallback: (v1: any) => void,
              userState: any): any {
    const result = beginOperationCallback(inputValue, endOperationCallback, userState);
    result.callback = operationCompletedCallback;
  }

  BeginOpen(callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error('Method not implemented.');
  }
  EndOpen(result: IAsyncResult) {
    throw new Error('Method not implemented.');
  }
  EndClose(result: IAsyncResult) {
    throw new Error('Method not implemented.');
  }
  BeginClose(callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error('Method not implemented.');
  }
  

  Abort(): void {
    throw new Error("Method not implemented.");
  }
  Open(timeout: number): void {
    throw new Error("Method not implemented.");
  }
  Close(timeout: number): void {
    throw new Error("Method not implemented.");
  }
  BeginCloseWithTimeout(timeout: number, callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error("Method not implemented.");
  }
  BeginOpenWithTimeout(timeout: number, callback: AsyncCallback, asyncState: any): IAsyncResult {
    throw new Error("Method not implemented.");
  }
  OpenWithTimeout(timeout: number): void {
    throw new Error("Method not implemented.");
  }
  CloseWithTimeout(timeout: number): void {
    throw new Error("Method not implemented.");
  }
}
