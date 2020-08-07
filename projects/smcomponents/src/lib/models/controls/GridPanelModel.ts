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

import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';
import { ContainerChildrenContainer } from '../../basecomponentmodel/ContainerChildrenContainer';
import { DependencyObject } from '../../basecomponentmodel/DependencyObject';

export class GridRowDefinition {
    public Height: GridLength;

}

export class GridColumnDefinition {
    public Width: GridLength;

}

export class GridColumnDefinitions {
    columns: Array<GridColumnDefinition>;
    constructor(private grid: Grid) {
        this.columns = [];
    }
    public Clear() {
        this.columns = [];
    }
    public Add(col: GridColumnDefinition) {
        this.columns.push(col);
    }
}

export class GridRowDefinitions {
    rows: Array<GridRowDefinition>;
    constructor(private grid: Grid) {
        this.rows = [];
    }
    public Clear() {
        this.rows = [];
    }
    public Add(row: GridRowDefinition) {
        this.rows.push(row);
    }
}

export class GridLength {
    constructor(public length: number) {

    }
}


export class Grid extends FrameworkElement {
    public attachedComponentInstance;
    public readonly ColumnDefinitions: GridColumnDefinitions;
    public readonly RowDefinitions: GridRowDefinitions;
    public readonly Children: ContainerChildrenContainer;
    public children: FrameworkElement[] = [];
    constructor() {
        super();
        this.ColumnDefinitions = new GridColumnDefinitions(this);
        this.RowDefinitions = new GridRowDefinitions(this);
        this.Children = new ContainerChildrenContainer(this);
    }

    public static getColumnInformation(cell: any): number {
        return cell.getValue("grid_column_number");

    }
    public static getRowInformation(cell: any): number {
        return cell.getValue("grid_row_number");
    }
    public static setRowInformation(cell: DependencyObject, row: number) {
        cell.setValue("grid_row_number", row);
    }
    public static setColumnInformation(cell: DependencyObject, column: number) {
        cell.setValue("grid_column_number", column);
    }
    public clear() {
        this.children = [];
    }
    public addChild(child : FrameworkElement) {
       this.children.push(child);
       if(this.attachedComponentInstance) {
           this.attachedComponentInstance.refresh();
       }
    }

}