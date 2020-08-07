import { PipeTransform, Pipe} from "@angular/core";
import { RuntimeTypeInfo} from "smcomponents";
@Pipe({
   name : "targetnullvalueconverter"
})
/// <summary>
///     Two way IValueConverter that lets you bind a property on a bindable object
///     that can be an empty string value to a dependency property that should 
///     be set to null in that case
/// </summary>
export class TargetNullValueConverter implements PipeTransform {
   public transform (value : any,targetType : RuntimeTypeInfo,parameter : any,culture : any) : any {
      return !(<string>value)?null:value;
   }
   public ConvertBack (value : any,targetType : RuntimeTypeInfo,parameter : any,culture : any) : any {
      return (value ?? "");
   }
}