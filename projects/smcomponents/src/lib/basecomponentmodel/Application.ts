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

import { ViewChild, ComponentFactoryResolver } from '@angular/core';
import { RootVisualDirective } from '../directives/rootvisual.directive';
import { HttpClient } from '@angular/common/http';
import { SubscriptionEvent } from '../utils/SubscriptionEvent';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Uri } from '../baseframework/Uri';

export class NativeContent {
    public Resized : SubscriptionEvent<(x:any, y:any) => void>;

    public ZoomFactor: number;
    public ActualWidth: number;
    public ActualHeight: number;
}
export class NativeHost {
    public Source: Uri;
    public Content: NativeContent;
}

export class Application {
    resources: { [key: string]: any } = {};

    @ViewChild(RootVisualDirective)
    rootVisualHost: RootVisualDirective;

    public static Current: Application = null;

    public angularHttpClient: HttpClient;

    public ngAfterViewInit() {
        this.startApp();
    }

    private innerRootVisual: any = null;
    public get RootVisual(): any {
        return this.innerRootVisual;
    }
    public set RootVisual(value: any) {
        this.changeRootVisual(value);
        this.innerRootVisual = value;
    }

    Startup = new SubscriptionEvent<(sender: any, e: any) => void>();
    Exit = new SubscriptionEvent<(sender: any, e: any) => void>();
    UnhandledException = new SubscriptionEvent<(sender: any, e: any) => void>();

    componentContents: any[];
    dialogService: DialogService;

    initControlProperties(): any {

    }
    getResourceByKey(key: string): any {
        return this.resources[key];
    }
    setResource(key: string, obj: any): any {
        return this.resources[key] = obj;
    }

    public changeRootVisual(component: any): any {
        if (component.angularComponent) {
            component = component.angularComponent;
        }
        if (component instanceof Function) {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            let viewContainerRef = (<any>this).rootVisualHost.viewContainerRef;
            viewContainerRef.clear();
            let componentRef = viewContainerRef.createComponent(componentFactory);

            return componentRef;
        } else if (component && component.constructor && component.constructor.visualType) {
            let componentRef = this.changeRootVisual(component.constructor.visualType);
            if (componentRef && componentRef.instance && componentRef.instance.performDynamicInit) {
                componentRef.instance.performDynamicInit(component);
            }
        } else {
            alert("ERROR: Cannot set root visual");
        }
    }

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }

    public startApp() {
        setTimeout(() => this.Startup.fire([]));
    }

    public get Host(): NativeHost {
        let result = new NativeHost();
        result.Source = new Uri(window.location.host);
        return result;
    }

}