/* */ 
"format esm";
import { XHR } from 'angular2/src/compiler/xhr';
import { BaseException } from 'angular2/src/facade/exceptions';
import { global } from 'angular2/src/facade/lang';
import { PromiseWrapper } from 'angular2/src/facade/promise';
/**
 * An implementation of XHR that uses a template cache to avoid doing an actual
 * XHR.
 *
 * The template cache needs to be built and loaded into window.$templateCache
 * via a separate mechanism.
 */
export class CachedXHR extends XHR {
    constructor() {
        super();
        this._cache = global.$templateCache;
        if (this._cache == null) {
            throw new BaseException('CachedXHR: Template cache was not found in $templateCache.');
        }
    }
    get(url) {
        if (this._cache.hasOwnProperty(url)) {
            return PromiseWrapper.resolve(this._cache[url]);
        }
        else {
            return PromiseWrapper.reject('CachedXHR: Did not find cached template for ' + url, null);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2NhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC05RDFpR1FWRy50bXAvYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sMkJBQTJCO09BQ3RDLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO09BQ3JELEVBQUMsTUFBTSxFQUFDLE1BQU0sMEJBQTBCO09BQ3hDLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCO0FBRTFEOzs7Ozs7R0FNRztBQUNILCtCQUErQixHQUFHO0lBR2hDO1FBQ0UsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBUyxNQUFPLENBQUMsY0FBYyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksYUFBYSxDQUFDLDREQUE0RCxDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNILENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsOENBQThDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNGLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtnbG9iYWx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIFhIUiB0aGF0IHVzZXMgYSB0ZW1wbGF0ZSBjYWNoZSB0byBhdm9pZCBkb2luZyBhbiBhY3R1YWxcbiAqIFhIUi5cbiAqXG4gKiBUaGUgdGVtcGxhdGUgY2FjaGUgbmVlZHMgdG8gYmUgYnVpbHQgYW5kIGxvYWRlZCBpbnRvIHdpbmRvdy4kdGVtcGxhdGVDYWNoZVxuICogdmlhIGEgc2VwYXJhdGUgbWVjaGFuaXNtLlxuICovXG5leHBvcnQgY2xhc3MgQ2FjaGVkWEhSIGV4dGVuZHMgWEhSIHtcbiAgcHJpdmF0ZSBfY2FjaGU6IHtbdXJsOiBzdHJpbmddOiBzdHJpbmd9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2FjaGUgPSAoPGFueT5nbG9iYWwpLiR0ZW1wbGF0ZUNhY2hlO1xuICAgIGlmICh0aGlzLl9jYWNoZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignQ2FjaGVkWEhSOiBUZW1wbGF0ZSBjYWNoZSB3YXMgbm90IGZvdW5kIGluICR0ZW1wbGF0ZUNhY2hlLicpO1xuICAgIH1cbiAgfVxuXG4gIGdldCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKHRoaXMuX2NhY2hlLmhhc093blByb3BlcnR5KHVybCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKHRoaXMuX2NhY2hlW3VybF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVqZWN0KCdDYWNoZWRYSFI6IERpZCBub3QgZmluZCBjYWNoZWQgdGVtcGxhdGUgZm9yICcgKyB1cmwsIG51bGwpO1xuICAgIH1cbiAgfVxufVxuIl19