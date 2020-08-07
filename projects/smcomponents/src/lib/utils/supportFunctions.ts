import { Subject } from 'rxjs';
import { MouseEventArgs } from '../models/events/MouseEventArgs';

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
export function simpleStringFormat(format : string, ...args : any[] ) {
    return format.replace(/{(\d+)}/g,
                          (match,index) => args[index]?.toString() ?? "");
 }
 
export function  observableFromSupportProperty(element : any, propertyName : string ) : Subject<any> {
    let result = new Subject<any>();
    if ((<any>element).PropertyChanged)  {
        (<any>element).PropertyChanged.addHandler((s, e) =>{
            if (e.PropertyName == propertyName) {
                result.next(element[propertyName]);
            }
        });
    }
    return result;
}


export function syncComponentAndModel(element : HTMLElement, model : any) {      
    if (model.MouseLeftButtonDown  && model.MouseLeftButtonDown.hasHandlers()) {
        element.addEventListener("mousedown", (evn: MouseEvent) => {
            model.MouseLeftButtonDown.fire([model, new MouseEventArgs(evn)]);
            return undefined;
        });
    }
    if (model.MouseLeftButtonUp  && model.MouseLeftButtonUp.hasHandlers()) {
        element.addEventListener("mouseup", (evn: MouseEvent) => {
            if (!model.capturedUpHandler) {
                model.MouseLeftButtonUp.fire([model, new MouseEventArgs(evn)]);
            }
            return undefined;
        });
    }
    if (model.MouseMove  && model.MouseMove.hasHandlers()) {
        element.addEventListener("mousemove", (evn: MouseEvent) => {
            if (!model.capturedMoveHandler) {
                model.MouseMove.fire([model, new MouseEventArgs(evn)]);
            }
            return undefined;
        });
    }
}

