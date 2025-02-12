/* */ 
"format esm";
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { NgControlName } from './directives/ng_control_name';
import { NgFormControl } from './directives/ng_form_control';
import { NgModel } from './directives/ng_model';
import { NgControlGroup } from './directives/ng_control_group';
import { NgFormModel } from './directives/ng_form_model';
import { NgForm } from './directives/ng_form';
import { DefaultValueAccessor } from './directives/default_value_accessor';
import { CheckboxControlValueAccessor } from './directives/checkbox_value_accessor';
import { NumberValueAccessor } from './directives/number_value_accessor';
import { RadioControlValueAccessor } from './directives/radio_control_value_accessor';
import { NgControlStatus } from './directives/ng_control_status';
import { SelectControlValueAccessor, NgSelectOption } from './directives/select_control_value_accessor';
import { RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator } from './directives/validators';
export { NgControlName } from './directives/ng_control_name';
export { NgFormControl } from './directives/ng_form_control';
export { NgModel } from './directives/ng_model';
export { NgControlGroup } from './directives/ng_control_group';
export { NgFormModel } from './directives/ng_form_model';
export { NgForm } from './directives/ng_form';
export { DefaultValueAccessor } from './directives/default_value_accessor';
export { CheckboxControlValueAccessor } from './directives/checkbox_value_accessor';
export { RadioControlValueAccessor, RadioButtonState } from './directives/radio_control_value_accessor';
export { NumberValueAccessor } from './directives/number_value_accessor';
export { NgControlStatus } from './directives/ng_control_status';
export { SelectControlValueAccessor, NgSelectOption } from './directives/select_control_value_accessor';
export { RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator } from './directives/validators';
export { NgControl } from './directives/ng_control';
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 */
export const FORM_DIRECTIVES = CONST_EXPR([
    NgControlName,
    NgControlGroup,
    NgFormControl,
    NgModel,
    NgFormModel,
    NgForm,
    NgSelectOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    CheckboxControlValueAccessor,
    SelectControlValueAccessor,
    RadioControlValueAccessor,
    NgControlStatus,
    RequiredValidator,
    MinLengthValidator,
    MaxLengthValidator,
    PatternValidator
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOUQxaUdRVkcudG1wL2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFPLFVBQVUsRUFBQyxNQUFNLDBCQUEwQjtPQUNsRCxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QjtPQUNuRCxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QjtPQUNuRCxFQUFDLE9BQU8sRUFBQyxNQUFNLHVCQUF1QjtPQUN0QyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQjtPQUNyRCxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QjtPQUMvQyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQjtPQUNwQyxFQUFDLG9CQUFvQixFQUFDLE1BQU0scUNBQXFDO09BQ2pFLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxzQ0FBc0M7T0FDMUUsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG9DQUFvQztPQUMvRCxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDO09BQzVFLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDO09BQ3ZELEVBQ0wsMEJBQTBCLEVBQzFCLGNBQWMsRUFDZixNQUFNLDRDQUE0QztPQUM1QyxFQUNMLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNqQixNQUFNLHlCQUF5QjtBQUVoQyxTQUFRLGFBQWEsUUFBTyw4QkFBOEIsQ0FBQztBQUMzRCxTQUFRLGFBQWEsUUFBTyw4QkFBOEIsQ0FBQztBQUMzRCxTQUFRLE9BQU8sUUFBTyx1QkFBdUIsQ0FBQztBQUM5QyxTQUFRLGNBQWMsUUFBTywrQkFBK0IsQ0FBQztBQUM3RCxTQUFRLFdBQVcsUUFBTyw0QkFBNEIsQ0FBQztBQUN2RCxTQUFRLE1BQU0sUUFBTyxzQkFBc0IsQ0FBQztBQUM1QyxTQUFRLG9CQUFvQixRQUFPLHFDQUFxQyxDQUFDO0FBQ3pFLFNBQVEsNEJBQTRCLFFBQU8sc0NBQXNDLENBQUM7QUFDbEYsU0FDRSx5QkFBeUIsRUFDekIsZ0JBQWdCLFFBQ1gsMkNBQTJDLENBQUM7QUFDbkQsU0FBUSxtQkFBbUIsUUFBTyxvQ0FBb0MsQ0FBQztBQUN2RSxTQUFRLGVBQWUsUUFBTyxnQ0FBZ0MsQ0FBQztBQUMvRCxTQUNFLDBCQUEwQixFQUMxQixjQUFjLFFBQ1QsNENBQTRDLENBQUM7QUFDcEQsU0FDRSxpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixnQkFBZ0IsUUFDWCx5QkFBeUIsQ0FBQztBQUNqQyxTQUFRLFNBQVMsUUFBTyx5QkFBeUIsQ0FBQztBQUdsRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxPQUFPLE1BQU0sZUFBZSxHQUFXLFVBQVUsQ0FBQztJQUNoRCxhQUFhO0lBQ2IsY0FBYztJQUVkLGFBQWE7SUFDYixPQUFPO0lBQ1AsV0FBVztJQUNYLE1BQU07SUFFTixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQiw0QkFBNEI7SUFDNUIsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6QixlQUFlO0lBRWYsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0NBQ2pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TmdDb250cm9sTmFtZX0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfbmFtZSc7XG5pbXBvcnQge05nRm9ybUNvbnRyb2x9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtX2NvbnRyb2wnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfbW9kZWwnO1xuaW1wb3J0IHtOZ0NvbnRyb2xHcm91cH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfZ3JvdXAnO1xuaW1wb3J0IHtOZ0Zvcm1Nb2RlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm1fbW9kZWwnO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtJztcbmltcG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWZhdWx0X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7Q2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWJlcl92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1JhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TmdDb250cm9sU3RhdHVzfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9zdGF0dXMnO1xuaW1wb3J0IHtcbiAgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5nU2VsZWN0T3B0aW9uXG59IGZyb20gJy4vZGlyZWN0aXZlcy9zZWxlY3RfY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1xuICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgTWluTGVuZ3RoVmFsaWRhdG9yLFxuICBNYXhMZW5ndGhWYWxpZGF0b3IsXG4gIFBhdHRlcm5WYWxpZGF0b3Jcbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuXG5leHBvcnQge05nQ29udHJvbE5hbWV9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUnO1xuZXhwb3J0IHtOZ0Zvcm1Db250cm9sfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybV9jb250cm9sJztcbmV4cG9ydCB7TmdNb2RlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX21vZGVsJztcbmV4cG9ydCB7TmdDb250cm9sR3JvdXB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX2dyb3VwJztcbmV4cG9ydCB7TmdGb3JtTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtX21vZGVsJztcbmV4cG9ydCB7TmdGb3JtfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybSc7XG5leHBvcnQge0RlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge0NoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge1xuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0J1dHRvblN0YXRlXG59IGZyb20gJy4vZGlyZWN0aXZlcy9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWJlcl92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge05nQ29udHJvbFN0YXR1c30gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfc3RhdHVzJztcbmV4cG9ydCB7XG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOZ1NlbGVjdE9wdGlvblxufSBmcm9tICcuL2RpcmVjdGl2ZXMvc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtcbiAgUmVxdWlyZWRWYWxpZGF0b3IsXG4gIE1pbkxlbmd0aFZhbGlkYXRvcixcbiAgTWF4TGVuZ3RoVmFsaWRhdG9yLFxuICBQYXR0ZXJuVmFsaWRhdG9yXG59IGZyb20gJy4vZGlyZWN0aXZlcy92YWxpZGF0b3JzJztcbmV4cG9ydCB7TmdDb250cm9sfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbCc7XG5leHBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5cbi8qKlxuICpcbiAqIEEgbGlzdCBvZiBhbGwgdGhlIGZvcm0gZGlyZWN0aXZlcyB1c2VkIGFzIHBhcnQgb2YgYSBgQENvbXBvbmVudGAgYW5ub3RhdGlvbi5cbiAqXG4gKiAgVGhpcyBpcyBhIHNob3J0aGFuZCBmb3IgaW1wb3J0aW5nIHRoZW0gZWFjaCBpbmRpdmlkdWFsbHkuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICogICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXVxuICogfSlcbiAqIGNsYXNzIE15QXBwIHt9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IEZPUk1fRElSRUNUSVZFUzogVHlwZVtdID0gQ09OU1RfRVhQUihbXG4gIE5nQ29udHJvbE5hbWUsXG4gIE5nQ29udHJvbEdyb3VwLFxuXG4gIE5nRm9ybUNvbnRyb2wsXG4gIE5nTW9kZWwsXG4gIE5nRm9ybU1vZGVsLFxuICBOZ0Zvcm0sXG5cbiAgTmdTZWxlY3RPcHRpb24sXG4gIERlZmF1bHRWYWx1ZUFjY2Vzc29yLFxuICBOdW1iZXJWYWx1ZUFjY2Vzc29yLFxuICBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTmdDb250cm9sU3RhdHVzLFxuXG4gIFJlcXVpcmVkVmFsaWRhdG9yLFxuICBNaW5MZW5ndGhWYWxpZGF0b3IsXG4gIE1heExlbmd0aFZhbGlkYXRvcixcbiAgUGF0dGVyblZhbGlkYXRvclxuXSk7XG4iXX0=