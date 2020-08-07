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

import { Component, Input, Injector } from '@angular/core';
import { Grid } from '../../models/controls/GridPanelModel';

@Component({
    selector: 'sm-grid-panel',
    template: `<div [ngStyle]="getCalculatedStyle()">
                   <ng-container  *ngFor="let child of nestedComponents">
                     <div [ngStyle]="child.style">
                       <ng-container  *ngComponentOutlet="child.component; injector: child.customInjector">
                       </ng-container>
                     </div>
                   </ng-container>
               </div>`
})
export class SmGridPanel {

    @Input()
    public model: Grid;

    isRefreshScheduled : boolean;
    public refresh() {
        if (!this.isRefreshScheduled) {
            this.isRefreshScheduled  = true;
            setTimeout(() => {
                this.nestedComponents = this.calcNestedComponents();
                this.isRefreshScheduled = false;
            });
        }
    }
    constructor(private injector: Injector) {
    }
    ngOnInit() {
        if (this.model) {
            this.model.attachedComponentInstance = this;
            this.refresh();
        }
    }

    nestedComponents : any[] = [];

    calcNestedComponents(): any[] {
        if (this.model) {
            return this.model.children.map(child => {
                let row = (child.getValue("grid_row_number") ?? 0) + 1;
                let column = (child.getValue("grid_column_number") ?? 0) + 1;
                return {
                    style: {
                        'grid-row': row,
                        'grid-column': column
                    },
                    customInjector: Injector.create({ providers: [{ provide: (<any>child).constructor, useValue: child, deps: [] }], parent: this.injector }),
                    component: (<any>child).angularComponent
                }

            });
        } else {
            return [];
        }
    }

    public getCalculatedStyle() {
        let columns: string = "";
        if (this.model) {
            columns = this.model.ColumnDefinitions.columns.map(colDef => colDef.Width.length.toString() + "px").join(' ');
        }
        let rows: string = "";
        if (this.model) {
            rows = this.model.RowDefinitions.rows.map(rowDef => rowDef.Height.length.toString() + "px").join(' ');
        }
        if (columns === "") {
            columns = "100%";
        }

        if (rows === "") {
            rows = "100%";
        }
        var result = {
            'display': 'grid',
            'grid-template-columns': columns,
            'grid-template-rows': rows,
            'height': 'inherit',
            'width' : 'inherit'
        };

        return result;
    }
}