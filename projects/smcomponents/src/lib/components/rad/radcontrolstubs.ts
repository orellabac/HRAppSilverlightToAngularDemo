import { Control } from '../../basecomponentmodel/Control';
import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';
import { RadioButtonModel } from '../../models/controls/RadioButtonModel';
import { INotifyPropertyChanged } from '../../basecomponentmodel/INotifyPropertyChanged';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';
import { SimpleList } from '../../baseframework/collections';



export class SmRdLinearSparkline extends Control {

}

export class SmRdTimeBar extends Control {

}

export class SmRdBusyIndicator extends Control {

}

export class SmRdGridView extends Control {

}

export class SmThumb extends FrameworkElement {
    Opacity : any;
    DragStarted : SubscriptionEvent<any> = new  SubscriptionEvent();
}

export class SmRdSlider extends Control {
    public Value : any;
    public Maximum : any;
    public Minimum : any;
    ValueChanged : SubscriptionEvent<any> = new SubscriptionEvent();
}

export class SmRdButton extends Control {

}

export class SmSeriesMapping {
   public ChartArea : SmRdChartArea;
}

export class SmRdChart extends Control {
     public SeriesMappings : SmSeriesMapping[] = [];
}

export class SmRdAxis {
    AxisLabelsVisibility : boolean;
}

export class SmRdChartArea extends Control {
    public AxisX : SmRdAxis;
}

export class SmRdToggleButton extends Control {

}

export class SmPath extends FrameworkElement {

}

export class SmRdRadioButton extends RadioButtonModel {

}

export class SmRdViewModelBase implements INotifyPropertyChanged{

    PropertyChanged : SubscriptionEvent<(o : any, args: { PropertyName : string}) => void> = new SubscriptionEvent();

    protected  OnPropertyChanged( propertyName : string) :  void {
        this.PropertyChanged.fire([this, { PropertyName: propertyName }]);
    }
    
}


export class SmRdSelectionRange<T> {
    constructor(public Start : T, public End : T) {

    }
}

export class SmRdVirtualQueryableCollectionView extends SimpleList<unknown> {

}
