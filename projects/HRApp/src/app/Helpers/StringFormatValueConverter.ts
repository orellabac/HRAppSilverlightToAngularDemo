import { PipeTransform, Pipe} from "@angular/core";
import { RuntimeTypeInfo, simpleStringFormat, NotSupportedException} from "smcomponents";
// @Pipe({
//    name : "stringformatvalueconverter"
// })
/// <summary>
///     Two way IValueConverter that lets you bind a property on a bindable object
///     that can be an empty string value to a dependency property that should 
///     be set to null in that case
/// </summary>
export class StringFormatValueConverter implements PipeTransform {
   public formatString : string = null;
   public constructor (formatString : string) {
      this.formatString = formatString;
   }
   public transform (value : any,targetType : RuntimeTypeInfo,parameter : any,culture : any) : any {
      return simpleStringFormat(this.formatString,value);
   }
   public ConvertBack (value : any,targetType : RuntimeTypeInfo,parameter : any,culture : any) : any {
      throw new NotSupportedException ();
   }
}