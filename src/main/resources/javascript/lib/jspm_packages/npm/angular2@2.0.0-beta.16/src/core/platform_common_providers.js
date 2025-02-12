/* */ 
"format cjs";
'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var console_1 = require('angular2/src/core/console');
var reflection_1 = require('./reflection/reflection');
var reflector_reader_1 = require('./reflection/reflector_reader');
var testability_1 = require('angular2/src/core/testability/testability');
var application_ref_1 = require('./application_ref');
function _reflector() {
    return reflection_1.reflector;
}
/**
 * A default set of providers which should be included in any Angular platform.
 */
exports.PLATFORM_COMMON_PROVIDERS = lang_1.CONST_EXPR([
    application_ref_1.PLATFORM_CORE_PROVIDERS,
    new di_1.Provider(reflection_1.Reflector, { useFactory: _reflector, deps: [] }),
    new di_1.Provider(reflector_reader_1.ReflectorReader, { useExisting: reflection_1.Reflector }),
    testability_1.TestabilityRegistry,
    console_1.Console
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFzRSwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pHLG1CQUF1RCxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlFLHdCQUFzQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2xELDJCQUFtQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQzdELGlDQUE4QiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzlELDRCQUFrQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQzlFLGdDQUFzQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRTFEO0lBQ0UsTUFBTSxDQUFDLHNCQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVEOztHQUVHO0FBQ1UsaUNBQXlCLEdBQW1DLGlCQUFVLENBQUM7SUFDbEYseUNBQXVCO0lBQ3ZCLElBQUksYUFBUSxDQUFDLHNCQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUMzRCxJQUFJLGFBQVEsQ0FBQyxrQ0FBZSxFQUFFLEVBQUMsV0FBVyxFQUFFLHNCQUFTLEVBQUMsQ0FBQztJQUN2RCxpQ0FBbUI7SUFDbkIsaUJBQU87Q0FDUixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzQmxhbmssIGlzUHJlc2VudCwgYXNzZXJ0aW9uc0VuYWJsZWQsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q29uc29sZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY29uc29sZSc7XG5pbXBvcnQge1JlZmxlY3RvciwgcmVmbGVjdG9yfSBmcm9tICcuL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9yZWFkZXInO1xuaW1wb3J0IHtUZXN0YWJpbGl0eVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge1BMQVRGT1JNX0NPUkVfUFJPVklERVJTfSBmcm9tICcuL2FwcGxpY2F0aW9uX3JlZic7XG5cbmZ1bmN0aW9uIF9yZWZsZWN0b3IoKTogUmVmbGVjdG9yIHtcbiAgcmV0dXJuIHJlZmxlY3Rvcjtcbn1cblxuLyoqXG4gKiBBIGRlZmF1bHQgc2V0IG9mIHByb3ZpZGVycyB3aGljaCBzaG91bGQgYmUgaW5jbHVkZWQgaW4gYW55IEFuZ3VsYXIgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCBjb25zdCBQTEFURk9STV9DT01NT05fUFJPVklERVJTOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBDT05TVF9FWFBSKFtcbiAgUExBVEZPUk1fQ09SRV9QUk9WSURFUlMsXG4gIG5ldyBQcm92aWRlcihSZWZsZWN0b3IsIHt1c2VGYWN0b3J5OiBfcmVmbGVjdG9yLCBkZXBzOiBbXX0pLFxuICBuZXcgUHJvdmlkZXIoUmVmbGVjdG9yUmVhZGVyLCB7dXNlRXhpc3Rpbmc6IFJlZmxlY3Rvcn0pLFxuICBUZXN0YWJpbGl0eVJlZ2lzdHJ5LFxuICBDb25zb2xlXG5dKTsiXX0=