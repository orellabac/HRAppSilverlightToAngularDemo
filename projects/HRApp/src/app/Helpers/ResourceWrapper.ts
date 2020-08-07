import { ApplicationStrings} from "../Assets/Resources/ApplicationStrings.Designer";
import { SecurityQuestions} from "../Assets/Resources/SecurityQuestions.Designer";
/// <summary>
///     Wraps access to the strongly typed resource classes so that you can bind
///     control properties to resource strings in XAML
/// </summary>
export class ResourceWrapper {
   private static applicationStrings : ApplicationStrings = new ApplicationStrings ();
   private static securityQuestions : SecurityQuestions = new SecurityQuestions ();
   get ApplicationStrings() : ApplicationStrings {
      return ApplicationStrings;
   }
   get SecurityQuestions() : SecurityQuestions {
      return ResourceWrapper.securityQuestions;
   }
}