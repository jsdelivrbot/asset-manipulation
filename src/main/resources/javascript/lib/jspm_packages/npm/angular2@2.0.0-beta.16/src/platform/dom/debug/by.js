/* */ 
"format cjs";
'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 */
var By = (function () {
    function By() {
    }
    /**
     * Match all elements.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
     */
    By.all = function () { return function (debugElement) { return true; }; };
    /**
     * Match elements by the given CSS selector.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
     */
    By.css = function (selector) {
        return function (debugElement) {
            return lang_1.isPresent(debugElement.nativeElement) ?
                dom_adapter_1.DOM.elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    };
    /**
     * Match elements that have the given directive present.
     *
     * ## Example
     *
     * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
     */
    By.directive = function (type) {
        return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
    };
    return By;
}());
exports.By = By;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRubzNaUXZPLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RlYnVnL2J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBdUMsMEJBQTBCLENBQUMsQ0FBQTtBQUVsRSw0QkFBa0IsdUNBQXVDLENBQUMsQ0FBQTtBQUcxRDs7R0FFRztBQUNIO0lBQUE7SUFtQ0EsQ0FBQztJQWxDQzs7Ozs7O09BTUc7SUFDSSxNQUFHLEdBQVYsY0FBd0MsTUFBTSxDQUFDLFVBQUMsWUFBWSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEU7Ozs7OztPQU1HO0lBQ0ksTUFBRyxHQUFWLFVBQVcsUUFBZ0I7UUFDekIsTUFBTSxDQUFDLFVBQUMsWUFBWTtZQUNsQixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO2dCQUNqQyxpQkFBRyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztnQkFDeEQsS0FBSyxDQUFDO1FBQ25CLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxZQUFTLEdBQWhCLFVBQWlCLElBQVU7UUFDekIsTUFBTSxDQUFDLFVBQUMsWUFBWSxJQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsU0FBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7QUFuQ1ksVUFBRSxLQW1DZCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1ByZWRpY2F0ZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RGVidWdFbGVtZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuLyoqXG4gKiBQcmVkaWNhdGVzIGZvciB1c2Ugd2l0aCB7QGxpbmsgRGVidWdFbGVtZW50fSdzIHF1ZXJ5IGZ1bmN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJ5IHtcbiAgLyoqXG4gICAqIE1hdGNoIGFsbCBlbGVtZW50cy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2J5L2J5LnRzIHJlZ2lvbj0nYnlfYWxsJ31cbiAgICovXG4gIHN0YXRpYyBhbGwoKTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4geyByZXR1cm4gKGRlYnVnRWxlbWVudCkgPT4gdHJ1ZTsgfVxuXG4gIC8qKlxuICAgKiBNYXRjaCBlbGVtZW50cyBieSB0aGUgZ2l2ZW4gQ1NTIHNlbGVjdG9yLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS9kb20vZGVidWcvdHMvYnkvYnkudHMgcmVnaW9uPSdieV9jc3MnfVxuICAgKi9cbiAgc3RhdGljIGNzcyhzZWxlY3Rvcjogc3RyaW5nKTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4ge1xuICAgIHJldHVybiAoZGVidWdFbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KGRlYnVnRWxlbWVudC5uYXRpdmVFbGVtZW50KSA/XG4gICAgICAgICAgICAgICAgIERPTS5lbGVtZW50TWF0Y2hlcyhkZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudCwgc2VsZWN0b3IpIDpcbiAgICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXRjaCBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGRpcmVjdGl2ZSBwcmVzZW50LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS9kb20vZGVidWcvdHMvYnkvYnkudHMgcmVnaW9uPSdieV9kaXJlY3RpdmUnfVxuICAgKi9cbiAgc3RhdGljIGRpcmVjdGl2ZSh0eXBlOiBUeXBlKTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4ge1xuICAgIHJldHVybiAoZGVidWdFbGVtZW50KSA9PiB7IHJldHVybiBkZWJ1Z0VsZW1lbnQucHJvdmlkZXJUb2tlbnMuaW5kZXhPZih0eXBlKSAhPT0gLTE7IH07XG4gIH1cbn1cbiJdfQ==