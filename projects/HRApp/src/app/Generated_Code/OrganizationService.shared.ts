import { ValidationResult} from "smcomponents";
export class GenderValidator {
   public static IsGenderValid (gender : string,context : any) : ValidationResult {
      if (gender == "M" || gender == "m" || gender == "F" || gender == "f") {
         return ValidationResult.Success;
      } else {
         return new ValidationResult ("The Gender field only has two valid values 'M'/'F'", ["Gender"]);
      }
   }
}