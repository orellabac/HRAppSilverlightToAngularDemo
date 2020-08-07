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

export class SubscriptionEvent<T> {
    public disabled : boolean = false;
    
    public toFunction(): T {
        return <T><any>((...args : any[]) => this.fire(args));
    }
    handlers : T[] = [];
    public addHandler(handler : T) : T {
       this.handlers.push(handler);
       return handler;
    }
    public removeHandler(handler : T) : void {
        let idx = this.handlers.indexOf(handler);
        if (idx >= 0) {
          this.handlers.splice(idx, 1);
        }
     }
    public fire(args: any[] ) : void {
        if (!this.disabled) {
            for(let handler of this.handlers) {
                if (handler instanceof Function) {
                    handler.apply(window, args);
                }
            }
        }
    }
    public hasHandlers() : boolean  {
        return this.handlers.length != 0;
    }
}