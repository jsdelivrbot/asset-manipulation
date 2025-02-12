/* */ 
"format esm";
/**
 * This is a set of DOM related classes and objects that can be used both in the browser and on the
 * server.
 */
export { DOM, setRootDomAdapter, DomAdapter } from 'angular2/src/platform/dom/dom_adapter';
export { DomRenderer } from 'angular2/src/platform/dom/dom_renderer';
export { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
export { SharedStylesHost, DomSharedStylesHost } from 'angular2/src/platform/dom/shared_styles_host';
export { DomEventsPlugin } from 'angular2/src/platform/dom/events/dom_events';
export { EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin } from 'angular2/src/platform/dom/events/event_manager';
export * from 'angular2/src/platform/dom/debug/by';
export * from 'angular2/src/platform/dom/debug/ng_probe';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX2RvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOUQxaUdRVkcudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsU0FBUSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxRQUFPLHVDQUF1QyxDQUFDO0FBQ3pGLFNBQVEsV0FBVyxRQUFPLHdDQUF3QyxDQUFDO0FBQ25FLFNBQVEsUUFBUSxRQUFPLHNDQUFzQyxDQUFDO0FBQzlELFNBQVEsZ0JBQWdCLEVBQUUsbUJBQW1CLFFBQU8sOENBQThDLENBQUM7QUFDbkcsU0FBUSxlQUFlLFFBQU8sNkNBQTZDLENBQUM7QUFDNUUsU0FDRSxxQkFBcUIsRUFDckIsWUFBWSxFQUNaLGtCQUFrQixRQUNiLGdEQUFnRCxDQUFDO0FBQ3hELGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYywwQ0FBMEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBpcyBhIHNldCBvZiBET00gcmVsYXRlZCBjbGFzc2VzIGFuZCBvYmplY3RzIHRoYXQgY2FuIGJlIHVzZWQgYm90aCBpbiB0aGUgYnJvd3NlciBhbmQgb24gdGhlXG4gKiBzZXJ2ZXIuXG4gKi9cbmV4cG9ydCB7RE9NLCBzZXRSb290RG9tQWRhcHRlciwgRG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5leHBvcnQge0RvbVJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5leHBvcnQge0RPQ1VNRU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMnO1xuZXhwb3J0IHtTaGFyZWRTdHlsZXNIb3N0LCBEb21TaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5leHBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5leHBvcnQge1xuICBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gIEV2ZW50TWFuYWdlcixcbiAgRXZlbnRNYW5hZ2VyUGx1Z2luXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9ieSc7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RlYnVnL25nX3Byb2JlJztcbiJdfQ==