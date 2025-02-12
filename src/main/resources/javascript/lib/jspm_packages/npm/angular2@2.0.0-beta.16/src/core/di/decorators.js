/* */ 
"format cjs";
'use strict';"use strict";
var metadata_1 = require('./metadata');
var decorators_1 = require('../util/decorators');
/**
 * Factory for creating {@link InjectMetadata}.
 */
exports.Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata);
/**
 * Factory for creating {@link OptionalMetadata}.
 */
exports.Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata);
/**
 * Factory for creating {@link InjectableMetadata}.
 */
exports.Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata);
/**
 * Factory for creating {@link SelfMetadata}.
 */
exports.Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata);
/**
 * Factory for creating {@link HostMetadata}.
 */
exports.Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata);
/**
 * Factory for creating {@link SkipSelfMetadata}.
 */
exports.SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2RpL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQU9PLFlBQVksQ0FBQyxDQUFBO0FBQ3BCLDJCQUFnRCxvQkFBb0IsQ0FBQyxDQUFBO0FBa0RyRTs7R0FFRztBQUNRLGNBQU0sR0FBMEIsK0JBQWtCLENBQUMseUJBQWMsQ0FBQyxDQUFDO0FBRTlFOztHQUVHO0FBQ1EsZ0JBQVEsR0FBNEIsK0JBQWtCLENBQUMsMkJBQWdCLENBQUMsQ0FBQztBQUVwRjs7R0FFRztBQUNRLGtCQUFVLEdBQ1UsMEJBQWEsQ0FBQyw2QkFBa0IsQ0FBQyxDQUFDO0FBRWpFOztHQUVHO0FBQ1EsWUFBSSxHQUF3QiwrQkFBa0IsQ0FBQyx1QkFBWSxDQUFDLENBQUM7QUFFeEU7O0dBRUc7QUFDUSxZQUFJLEdBQXdCLCtCQUFrQixDQUFDLHVCQUFZLENBQUMsQ0FBQztBQUV4RTs7R0FFRztBQUNRLGdCQUFRLEdBQTRCLCtCQUFrQixDQUFDLDJCQUFnQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RNZXRhZGF0YSxcbiAgT3B0aW9uYWxNZXRhZGF0YSxcbiAgSW5qZWN0YWJsZU1ldGFkYXRhLFxuICBTZWxmTWV0YWRhdGEsXG4gIEhvc3RNZXRhZGF0YSxcbiAgU2tpcFNlbGZNZXRhZGF0YVxufSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7bWFrZURlY29yYXRvciwgbWFrZVBhcmFtRGVjb3JhdG9yfSBmcm9tICcuLi91dGlsL2RlY29yYXRvcnMnO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBJbmplY3RNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0TWV0YWRhdGFGYWN0b3J5IHtcbiAgKHRva2VuOiBhbnkpOiBhbnk7XG4gIG5ldyAodG9rZW46IGFueSk6IEluamVjdE1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBPcHRpb25hbE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbE1ldGFkYXRhRmFjdG9yeSB7XG4gICgpOiBhbnk7XG4gIG5ldyAoKTogT3B0aW9uYWxNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgSW5qZWN0YWJsZU1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlTWV0YWRhdGFGYWN0b3J5IHtcbiAgKCk6IGFueTtcbiAgbmV3ICgpOiBJbmplY3RhYmxlTWV0YWRhdGE7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIFNlbGZNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZk1ldGFkYXRhRmFjdG9yeSB7XG4gICgpOiBhbnk7XG4gIG5ldyAoKTogU2VsZk1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBIb3N0TWV0YWRhdGF9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3RNZXRhZGF0YUZhY3Rvcnkge1xuICAoKTogYW55O1xuICBuZXcgKCk6IEhvc3RNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgU2tpcFNlbGZNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2tpcFNlbGZNZXRhZGF0YUZhY3Rvcnkge1xuICAoKTogYW55O1xuICBuZXcgKCk6IFNraXBTZWxmTWV0YWRhdGE7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEluamVjdE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IHZhciBJbmplY3Q6IEluamVjdE1ldGFkYXRhRmFjdG9yeSA9IG1ha2VQYXJhbURlY29yYXRvcihJbmplY3RNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIE9wdGlvbmFsTWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIE9wdGlvbmFsOiBPcHRpb25hbE1ldGFkYXRhRmFjdG9yeSA9IG1ha2VQYXJhbURlY29yYXRvcihPcHRpb25hbE1ldGFkYXRhKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgSW5qZWN0YWJsZU1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IHZhciBJbmplY3RhYmxlOiBJbmplY3RhYmxlTWV0YWRhdGFGYWN0b3J5ID1cbiAgICA8SW5qZWN0YWJsZU1ldGFkYXRhRmFjdG9yeT5tYWtlRGVjb3JhdG9yKEluamVjdGFibGVNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIFNlbGZNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgU2VsZjogU2VsZk1ldGFkYXRhRmFjdG9yeSA9IG1ha2VQYXJhbURlY29yYXRvcihTZWxmTWV0YWRhdGEpO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBIb3N0TWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIEhvc3Q6IEhvc3RNZXRhZGF0YUZhY3RvcnkgPSBtYWtlUGFyYW1EZWNvcmF0b3IoSG9zdE1ldGFkYXRhKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgU2tpcFNlbGZNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgU2tpcFNlbGY6IFNraXBTZWxmTWV0YWRhdGFGYWN0b3J5ID0gbWFrZVBhcmFtRGVjb3JhdG9yKFNraXBTZWxmTWV0YWRhdGEpOyJdfQ==