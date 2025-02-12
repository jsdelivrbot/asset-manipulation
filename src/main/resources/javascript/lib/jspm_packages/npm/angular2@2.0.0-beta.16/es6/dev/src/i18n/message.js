/* */ 
"format esm";
import { isPresent, escape } from 'angular2/src/facade/lang';
/**
 * A message extracted from a template.
 *
 * The identity of a message is comprised of `content` and `meaning`.
 *
 * `description` is additional information provided to the translator.
 */
export class Message {
    constructor(content, meaning, description = null) {
        this.content = content;
        this.meaning = meaning;
        this.description = description;
    }
}
/**
 * Computes the id of a message
 */
export function id(m) {
    let meaning = isPresent(m.meaning) ? m.meaning : "";
    let content = isPresent(m.content) ? m.content : "";
    return escape(`$ng|${meaning}|${content}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOUQxaUdRVkcudG1wL2FuZ3VsYXIyL3NyYy9pMThuL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sMEJBQTBCO0FBRTFEOzs7Ozs7R0FNRztBQUNIO0lBQ0UsWUFBbUIsT0FBZSxFQUFTLE9BQWUsRUFBUyxXQUFXLEdBQVcsSUFBSTtRQUExRSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFlO0lBQUcsQ0FBQztBQUNuRyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxtQkFBbUIsQ0FBVTtJQUMzQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3BELElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgZXNjYXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIEEgbWVzc2FnZSBleHRyYWN0ZWQgZnJvbSBhIHRlbXBsYXRlLlxuICpcbiAqIFRoZSBpZGVudGl0eSBvZiBhIG1lc3NhZ2UgaXMgY29tcHJpc2VkIG9mIGBjb250ZW50YCBhbmQgYG1lYW5pbmdgLlxuICpcbiAqIGBkZXNjcmlwdGlvbmAgaXMgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBwcm92aWRlZCB0byB0aGUgdHJhbnNsYXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGVudDogc3RyaW5nLCBwdWJsaWMgbWVhbmluZzogc3RyaW5nLCBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IG51bGwpIHt9XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGlkIG9mIGEgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaWQobTogTWVzc2FnZSk6IHN0cmluZyB7XG4gIGxldCBtZWFuaW5nID0gaXNQcmVzZW50KG0ubWVhbmluZykgPyBtLm1lYW5pbmcgOiBcIlwiO1xuICBsZXQgY29udGVudCA9IGlzUHJlc2VudChtLmNvbnRlbnQpID8gbS5jb250ZW50IDogXCJcIjtcbiAgcmV0dXJuIGVzY2FwZShgJG5nfCR7bWVhbmluZ318JHtjb250ZW50fWApO1xufSJdfQ==