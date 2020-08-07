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

import { DependencyObject } from './DependencyObject';
import { SubscriptionEvent } from '../utils/SubscriptionEvent';
import { MouseEventArgs } from '../models/events/MouseEventArgs';

export class UIElement extends DependencyObject {
    public MouseLeftButtonDown: SubscriptionEvent<(s: any, e: MouseEventArgs) => void>;
    public MouseEnter: SubscriptionEvent<(s: any, e: MouseEventArgs) => void>;
    public MouseLeave: SubscriptionEvent<(s: any, e: MouseEventArgs) => void>;
    public MouseLeftButtonUp: SubscriptionEvent<(s: any, e: MouseEventArgs) => void>;
    public MouseMove: SubscriptionEvent<(s: any, e: MouseEventArgs) => void>;
    public KeyDown: SubscriptionEvent<(s: any, e: KeyboardEvent) => void>;
    public KeyUp: SubscriptionEvent<(s: any, e: KeyboardEvent) => void>;
  
    public Name : string = "";
 
    public  withName(name : string) : UIElement {
        this.Name = name;
        return this;
    }

    public TransformToVisual(obj : UIElement) : any {
        throw new Error('Not implemented');
    }
    public UpdateLayout() : void {
         // left blank
    }
    public RenderTransform : any;
    public Visibility : boolean;

    capturedUpHandler : (e:MouseEvent) => void;
    capturedMoveHandler : (e:MouseEvent) => void;
    public CaptureMouse() : boolean {
       this.capturedUpHandler = (evn) => {
          this.MouseLeftButtonUp.fire([this, new MouseEventArgs(evn)]);
       };
       this.capturedMoveHandler = (evn) => {
          this.MouseMove.fire([this, new MouseEventArgs(evn)]);
       };
       document.addEventListener("mouseup", this.capturedUpHandler);
       document.addEventListener("mousemove", this.capturedMoveHandler);
       return true;
    }
    public ReleaseMouseCapture() {
       document.removeEventListener("mouseup",this.capturedUpHandler);
       document.removeEventListener("mousemove", this.capturedMoveHandler);
       this.capturedUpHandler = undefined;
       this.capturedMoveHandler = undefined;
    }
 }