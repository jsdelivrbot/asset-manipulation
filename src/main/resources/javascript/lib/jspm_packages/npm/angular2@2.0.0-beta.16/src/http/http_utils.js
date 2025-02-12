/* */ 
"format cjs";
'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var enums_1 = require('./enums');
var exceptions_1 = require('angular2/src/facade/exceptions');
function normalizeMethodName(method) {
    if (lang_1.isString(method)) {
        var originalMethod = method;
        method = method
            .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        });
        method = enums_1.RequestMethod[method];
        if (typeof method !== 'number')
            throw exceptions_1.makeTypeError("Invalid request method. The method \"" + originalMethod + "\" is not supported.");
    }
    return method;
}
exports.normalizeMethodName = normalizeMethodName;
exports.isSuccess = function (status) { return (status >= 200 && status < 300); };
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return;
}
exports.getResponseURL = getResponseURL;
var lang_2 = require('angular2/src/facade/lang');
exports.isJsObject = lang_2.isJsObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL3NyYy9odHRwL2h0dHBfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUF1QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xELHNCQUE0QixTQUFTLENBQUMsQ0FBQTtBQUN0QywyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUc3RCw2QkFBb0MsTUFBOEI7SUFDaEUsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDNUIsTUFBTSxHQUFZLE1BQU87YUFDWCxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVO1lBQy9CLE9BQUEsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sR0FBa0MscUJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7WUFDN0IsTUFBTSwwQkFBYSxDQUNmLDBDQUF1QyxjQUFjLHlCQUFxQixDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNELE1BQU0sQ0FBZ0IsTUFBTSxDQUFDO0FBQy9CLENBQUM7QUFaZSwyQkFBbUIsc0JBWWxDLENBQUE7QUFFWSxpQkFBUyxHQUFHLFVBQUMsTUFBYyxJQUFjLE9BQUEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQztBQUV0Rix3QkFBK0IsR0FBUTtJQUNyQyxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELE1BQU0sQ0FBQztBQUNULENBQUM7QUFSZSxzQkFBYyxpQkFRN0IsQ0FBQTtBQUVELHFCQUF5QiwwQkFBMEIsQ0FBQztBQUE1Qyx1Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzU3RyaW5nfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSZXF1ZXN0TWV0aG9kfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7bWFrZVR5cGVFcnJvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4vc3RhdGljX3Jlc3BvbnNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZE5hbWUobWV0aG9kOiBzdHJpbmcgfCBSZXF1ZXN0TWV0aG9kKTogUmVxdWVzdE1ldGhvZCB7XG4gIGlmIChpc1N0cmluZyhtZXRob2QpKSB7XG4gICAgdmFyIG9yaWdpbmFsTWV0aG9kID0gbWV0aG9kO1xuICAgIG1ldGhvZCA9ICg8c3RyaW5nPm1ldGhvZClcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHcpKFxcdyopL2csIChnMDogc3RyaW5nLCBnMTogc3RyaW5nLCBnMjogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnMS50b1VwcGVyQ2FzZSgpICsgZzIudG9Mb3dlckNhc2UoKSk7XG4gICAgbWV0aG9kID0gPG51bWJlcj4oPHtba2V5OiBzdHJpbmddOiBhbnl9PlJlcXVlc3RNZXRob2QpW21ldGhvZF07XG4gICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdudW1iZXInKVxuICAgICAgdGhyb3cgbWFrZVR5cGVFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCByZXF1ZXN0IG1ldGhvZC4gVGhlIG1ldGhvZCBcIiR7b3JpZ2luYWxNZXRob2R9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcbiAgfVxuICByZXR1cm4gPFJlcXVlc3RNZXRob2Q+bWV0aG9kO1xufVxuXG5leHBvcnQgY29uc3QgaXNTdWNjZXNzID0gKHN0YXR1czogbnVtYmVyKTogYm9vbGVhbiA9PiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzcG9uc2VVUkwoeGhyOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIpIHtcbiAgICByZXR1cm4geGhyLnJlc3BvbnNlVVJMO1xuICB9XG4gIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpO1xuICB9XG4gIHJldHVybjtcbn1cblxuZXhwb3J0IHtpc0pzT2JqZWN0fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuIl19