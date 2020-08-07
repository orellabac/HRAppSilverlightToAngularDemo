import { PipeTransform, Pipe} from "@angular/core";
import { RuntimeTypeInfo} from "smcomponents";
// @Pipe({
//    name : "notoperatorvalueconverter"
// })
/// <summary>
///     Two way IValueConverter that lets you bind the inverse of a boolean property
///     to a dependency property
/// </summary>
export class NotOperatorValueConverter implements PipeTransform {
   public transform (value : any,targetType : RuntimeTypeInfo,parameter : any,culture : any) : any {
      return !(<boolean>value);
   }
   public ConvertBack (value : any,targetType : RuntimeTypeInfo,parameter : any,culture : any) : any {
      return !(<boolean>value);
   }
}