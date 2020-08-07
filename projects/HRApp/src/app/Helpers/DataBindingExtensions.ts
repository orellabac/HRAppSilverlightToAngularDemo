import { INotifyPropertyChanged, Binding, PropertyPath, ArgumentNullException} from "smcomponents";
import { PipeTransform} from "@angular/core";
/// <summary>
///     Provides extension methods for dealing with <see cref="Binding"/> objects
/// </summary>
export class DataBindingExtensions {
   /**
    * 
    *     Creates a new <see cref="Binding"/> whose <see cref="Binding.Source"/>
    *     is the object in which this method is being called, whose <see cref="Binding.Path"/> 
    *     property is initialized from <see cref="propertyPath"/>
    * 
    */
   public static CreateOneWayBinding__overload_0 (bindingSource : INotifyPropertyChanged,propertyPath : string) : Binding {
      return DataBindingExtensions.CreateOneWayBinding__overload_1(bindingSource, propertyPath, null);
   }
   /**
    * 
    *     Creates a new <see cref="Binding"/> whose <see cref="Binding.Source"/>
    *     is the object in which this method is being called, whose <see cref="Binding.Path"/> 
    *     property is initialized from <see cref="propertyPath"/> and whose <see cref="Binding.Converter"/>
    *     property is a one-way <see cref="LambdaValueConverter"/> object whose converter
    *     is given by <paramref name="converter"/>
    * 
    */
   public static CreateOneWayBinding__overload_1 (bindingSource : INotifyPropertyChanged,propertyPath : string,converter : PipeTransform) : Binding {
      var binding : Binding = new Binding ();
      binding.Source = bindingSource;
      binding.Path = new PropertyPath (propertyPath);
      binding.Converter = converter;
      return binding;
   }
   /**
    * 
    *     Creates a new <see cref="Binding"/> object by copying all properties
    *     from another <see cref="Binding"/> object
    * 
    * @param binding <see cref="Binding"/> from which property values will be copied
    */
   public static CreateCopy (binding : Binding) : Binding {
      if (binding == null) {
         throw new ArgumentNullException ("binding");
      }
      var newBinding : Binding = (() => {
         var NewTempObj : Binding = new Binding ();
         NewTempObj.BindsDirectlyToSource = binding.BindsDirectlyToSource
         NewTempObj.Converter = binding.Converter
         NewTempObj.ConverterParameter = binding.ConverterParameter
         NewTempObj.ConverterCulture = binding.ConverterCulture
         NewTempObj.Mode = binding.Mode
         NewTempObj.NotifyOnValidationError = binding.NotifyOnValidationError
         NewTempObj.Path = binding.Path
         NewTempObj.UpdateSourceTrigger = binding.UpdateSourceTrigger
         NewTempObj.ValidatesOnExceptions = binding.ValidatesOnExceptions
         return NewTempObj;
      })();
      if (binding.ElementName != null) {
         newBinding.ElementName = binding.ElementName;
      } else if (binding.RelativeSource != null) {
         newBinding.RelativeSource = binding.RelativeSource;
      } else {
         newBinding.Source = binding.Source;
      }
      return newBinding;
   }
}