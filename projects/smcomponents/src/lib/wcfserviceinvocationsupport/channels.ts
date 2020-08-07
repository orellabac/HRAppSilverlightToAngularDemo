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

import { Uri } from '../baseframework/Uri';
import { EndpointAddress, ICommunicationObject, CommunicationBinding } from './CommunicationSupport';
import { AsyncCallback, IAsyncResult } from './AsyncResultSupport';
import { SimpleList } from '../baseframework/collections';

export interface WcfMessage {

}

export interface IRequestChannel extends ICommunicationObject {
    Via: Uri;
    RemoteAddress: EndpointAddress;
    BeginRequest(message: WcfMessage, callback: AsyncCallback, state: any);
    BeginRequestWithTimeout(message: WcfMessage, timeout: number, callback: AsyncCallback, state: any);
    EndRequest(result: IAsyncResult): any;    
    Abort();
    
}

export interface IChannelFactory<T> extends ICommunicationObject {
    CreateChannel(to: EndpointAddress, via: Uri): any;
    GetProperty<T>(TParam : Function): T;
}

export class WcfChannelFactoryBase<T> implements IChannelFactory<T> {
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
    CreateChannel(to: EndpointAddress, via: Uri) {
        throw new Error("Method not implemented.");
    }
    GetProperty<T>(TParam : Function): T {
        throw new Error("Method not implemented.");
    }

}

export class WcfBindingContext {
   public BuildInnerChannelFactory() : any {
    throw new Error("Method not implemented.");
   }
   public GetInnerProperty() : any {
    throw new Error("Method not implemented.");
   }
   CanBuildInnerChannelFactory() : boolean {
    throw new Error("Method not implemented.");
   }
}

export class WcfBindingElement {

}

export class HttpTransportBindingElement extends WcfBindingElement {
    public MaxBufferSize: number = 0;
    public MaxReceivedMessageSize: number = 0;
}

export class HttpsTransportBindingElement extends HttpTransportBindingElement {

}


export class BinaryMessageEncodingBindingElement {

}

export class BindingElementCollection extends SimpleList<WcfBindingElement> {

}

export interface WcfBindignContext {
    BuildInnerChannelFactory<T>() : IChannelFactory<T>;
    GetInnerProperty<T>() : any;
    CanBuildInnerChannelFactory() : boolean;
}

export class WcfCustomBinding extends CommunicationBinding {
    Elements : BindingElementCollection = new BindingElementCollection();
    CreateBindingElements() : any {
        throw Error("Not implemented");
    }
}