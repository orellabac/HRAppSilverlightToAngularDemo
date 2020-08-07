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

import { FrameworkElement } from '../basecomponentmodel';

export class DataPointSeries {
    DataPointStyle :  any;
    LegendItemStyle : any;
}


export class LineSeries extends DataPointSeries {

}
export class BarSeries  extends DataPointSeries  {

}

export class DataPoint {
   public static DependentValueStringFormatProperty : any;
}
export class LineDataPoint extends DataPoint {

}
export class ColumnDataPoint extends DataPoint {
    
}
export class BarDataPoint extends DataPoint {
    
}


export class ColumnSeries extends DataPointSeries {
    
}

export class DisplayAxis {

}

export class CategoryAxis {
    AxisLabelStyle : any;
}

export class Chart extends FrameworkElement {
    //stub properties
    Series : any;
    Axes : any;
    ActualAxes : any;
}