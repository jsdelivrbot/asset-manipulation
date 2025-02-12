/* */ 
"format cjs";
'use strict';"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * Starting point to import all public core APIs.
 */
__export(require('./src/core/metadata'));
__export(require('./src/core/util'));
__export(require('./src/core/prod_mode'));
__export(require('./src/core/di'));
__export(require('./src/facade/facade'));
var lang_1 = require('angular2/src/facade/lang');
exports.enableProdMode = lang_1.enableProdMode;
var application_ref_1 = require('./src/core/application_ref');
exports.createPlatform = application_ref_1.createPlatform;
exports.assertPlatform = application_ref_1.assertPlatform;
exports.disposePlatform = application_ref_1.disposePlatform;
exports.getPlatform = application_ref_1.getPlatform;
exports.coreBootstrap = application_ref_1.coreBootstrap;
exports.coreLoadAndBootstrap = application_ref_1.coreLoadAndBootstrap;
exports.createNgZone = application_ref_1.createNgZone;
exports.PlatformRef = application_ref_1.PlatformRef;
exports.ApplicationRef = application_ref_1.ApplicationRef;
var application_tokens_1 = require('./src/core/application_tokens');
exports.APP_ID = application_tokens_1.APP_ID;
exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
exports.PACKAGE_ROOT_URL = application_tokens_1.PACKAGE_ROOT_URL;
exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
__export(require('./src/core/zone'));
__export(require('./src/core/render'));
__export(require('./src/core/linker'));
var debug_node_1 = require('./src/core/debug/debug_node');
exports.DebugElement = debug_node_1.DebugElement;
exports.DebugNode = debug_node_1.DebugNode;
exports.asNativeElements = debug_node_1.asNativeElements;
__export(require('./src/core/testability/testability'));
__export(require('./src/core/change_detection'));
__export(require('./src/core/platform_directives_and_pipes'));
__export(require('./src/core/platform_common_providers'));
__export(require('./src/core/application_common_providers'));
__export(require('./src/core/reflection/reflection'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0dBSUc7QUFDSCxpQkFBYyxxQkFBcUIsQ0FBQyxFQUFBO0FBQ3BDLGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFDaEMsaUJBQWMsc0JBQXNCLENBQUMsRUFBQTtBQUNyQyxpQkFBYyxlQUFlLENBQUMsRUFBQTtBQUM5QixpQkFBYyxxQkFBcUIsQ0FBQyxFQUFBO0FBQ3BDLHFCQUE2QiwwQkFBMEIsQ0FBQztBQUFoRCwrQ0FBZ0Q7QUFDeEQsZ0NBVU8sNEJBQTRCLENBQUM7QUFUbEMsMERBQWM7QUFDZCwwREFBYztBQUNkLDREQUFlO0FBQ2Ysb0RBQVc7QUFDWCx3REFBYTtBQUNiLHNFQUFvQjtBQUNwQixzREFBWTtBQUNaLG9EQUFXO0FBQ1gsMERBQ2tDO0FBQ3BDLG1DQUtPLCtCQUErQixDQUFDO0FBSnJDLDZDQUFNO0FBQ04sK0RBQWU7QUFDZixpRUFBZ0I7QUFDaEIseUVBQ3FDO0FBQ3ZDLGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFDaEMsaUJBQWMsbUJBQW1CLENBQUMsRUFBQTtBQUNsQyxpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLDJCQUF3RCw2QkFBNkIsQ0FBQztBQUE5RSxpREFBWTtBQUFFLDJDQUFTO0FBQUUseURBQXFEO0FBQ3RGLGlCQUFjLG9DQUFvQyxDQUFDLEVBQUE7QUFDbkQsaUJBQWMsNkJBQTZCLENBQUMsRUFBQTtBQUM1QyxpQkFBYywwQ0FBMEMsQ0FBQyxFQUFBO0FBQ3pELGlCQUFjLHNDQUFzQyxDQUFDLEVBQUE7QUFDckQsaUJBQWMseUNBQXlDLENBQUMsRUFBQTtBQUN4RCxpQkFBYyxrQ0FBa0MsQ0FBQyxFQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN0YXJ0aW5nIHBvaW50IHRvIGltcG9ydCBhbGwgcHVibGljIGNvcmUgQVBJcy5cbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9tZXRhZGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3V0aWwnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9wcm9kX21vZGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9kaSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9mYWNhZGUvZmFjYWRlJztcbmV4cG9ydCB7ZW5hYmxlUHJvZE1vZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5leHBvcnQge1xuICBjcmVhdGVQbGF0Zm9ybSxcbiAgYXNzZXJ0UGxhdGZvcm0sXG4gIGRpc3Bvc2VQbGF0Zm9ybSxcbiAgZ2V0UGxhdGZvcm0sXG4gIGNvcmVCb290c3RyYXAsXG4gIGNvcmVMb2FkQW5kQm9vdHN0cmFwLFxuICBjcmVhdGVOZ1pvbmUsXG4gIFBsYXRmb3JtUmVmLFxuICBBcHBsaWNhdGlvblJlZlxufSBmcm9tICcuL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3JlZic7XG5leHBvcnQge1xuICBBUFBfSUQsXG4gIEFQUF9JTklUSUFMSVpFUixcbiAgUEFDS0FHRV9ST09UX1VSTCxcbiAgUExBVEZPUk1fSU5JVElBTElaRVJcbn0gZnJvbSAnLi9zcmMvY29yZS9hcHBsaWNhdGlvbl90b2tlbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS96b25lJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvcmVuZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvbGlua2VyJztcbmV4cG9ydCB7RGVidWdFbGVtZW50LCBEZWJ1Z05vZGUsIGFzTmF0aXZlRWxlbWVudHN9IGZyb20gJy4vc3JjL2NvcmUvZGVidWcvZGVidWdfbm9kZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvcGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL2FwcGxpY2F0aW9uX2NvbW1vbl9wcm92aWRlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuIl19