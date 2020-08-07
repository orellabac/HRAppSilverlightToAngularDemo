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

import { Component, Input, ChangeDetectorRef, Optional, Injector } from '@angular/core';
import { CanvasModel } from '../../models/controls/CanvasModel';
import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';

 
@Component({
    selector: 'sm-canvas-panel',
    template: `<div class="canvas-container" >
                    <ng-container  *ngFor="let child of nestedComponents">
                        <sm-canvas-item [itemInfo]="child.item">
                            <ng-container  *ngComponentOutlet="child.component; injector: child.customInjector">
                            </ng-container> 
                        </sm-canvas-item>
                    </ng-container>                 
               </div>`,
    styles: [`.canvas-container { 
        width: inherit;
        height: inherit;
        background-color: inherit;
        position: relative;
        overflow: hidden;
    }`]
})
export class SmCanvasPanel {
    @Input()
    public model: CanvasModel;
    nestedComponents : { item : FrameworkElement, component : any, customInjector: Injector }[] = [];

    public constructor(private changeDetectorRef: ChangeDetectorRef, 
                        @Optional() private injectedModel: CanvasModel,
                        private injector: Injector) {
        this.model = injectedModel;

    }
    ngOnInit() {
        this.model = this.model || this.injectedModel || new CanvasModel();
        this.model.change.addHandler(() =>{
            this.refresh();
        });
        this.refresh();
    }   
    
    private refresh() {
        this.nestedComponents = this.createNestedComponents();
    }

    public createNestedComponents() {
        if (this.model) {
            return this.model.children.map(child => {
                return {
                    item : child,
                    customInjector: Injector.create({ providers: [{ provide: (<any>child).constructor, useValue: child, deps: [] }], parent: this.injector }),
                    component: (<any>child).angularComponent
                }
            });
        } else {
            return [];
        }
    }
}

@Component({
    selector: 'sm-canvas-item',
    template: `<div style="position: absolute" [style.top]="top" [style.left]="left">
                     <ng-content></ng-content>
               </div>`
})
export class SmCanvasItem {
    @Input() 
    itemInfo : FrameworkElement;

    top : string = "0px";
    left : string = "0px";

    changeHandler : (name : string) => void;
    ngOnInit() {
        this.changeHandler = (name : string) => {
            this.sync(name);
        };
        this.itemInfo.change.addHandler(this.changeHandler);
        this.sync("canvas_left_property");
        this.sync("canvas_top_property");
    }
    private sync(name: string) {
        if (name === "canvas_left_property") {
            let value = parseInt(this.itemInfo.getValue("canvas_left_property")) || 0;
            this.left = `${value}px`;
        }
        else if (name === "canvas_top_property") {
            let value = parseInt(this.itemInfo.getValue("canvas_top_property")) || 0;
            this.top = `${value}px`;
        }
    }

    ngOnDestroy() {
       this.itemInfo.change.removeHandler(this.changeHandler);
    }
}