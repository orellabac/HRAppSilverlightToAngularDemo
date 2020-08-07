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
import { DependencyProperty } from '../../basecomponentmodel/DependencyProperty';
import { ContainerChildrenContainer } from '../../basecomponentmodel/ContainerChildrenContainer';

export class CanvasModel extends FrameworkElement {
    public static LeftProperty = new DependencyProperty("canvas_left_property", 0, Math.abs);
    public static TopProperty = new DependencyProperty("canvas_top_property", 0, Math.abs);

    public static SetTop(element : FrameworkElement, value : number ) {
        element.setValue(CanvasModel.TopProperty, value);
    }

    public static SetLeft(element : FrameworkElement, value : number ) {
        element.setValue(CanvasModel.LeftProperty, value);        
    }

    public readonly Children: ContainerChildrenContainer;
    public readonly children: FrameworkElement[] = [];

    public constructor(){
        super();
        this.Children = new ContainerChildrenContainer(this);
    }
    public addChild(child : FrameworkElement) {
        this.children.push(child);
        this.change.fire(["Children"]); 
     }
}
