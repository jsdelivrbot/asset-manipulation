/* */ 
"format esm";
import { CONST_EXPR, IS_DART } from 'angular2/src/facade/lang';
import { Provider, OpaqueToken } from 'angular2/src/core/di';
import { XHR } from 'angular2/src/compiler/xhr';
import { PLATFORM_INITIALIZER, PLATFORM_DIRECTIVES, PLATFORM_PIPES, ExceptionHandler, RootRenderer, APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS } from "angular2/core";
import { COMMON_DIRECTIVES, COMMON_PIPES, FORM_PROVIDERS } from "angular2/common";
import { Testability } from 'angular2/src/core/testability/testability';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { DomEventsPlugin } from 'angular2/src/platform/dom/events/dom_events';
import { KeyEventsPlugin } from 'angular2/src/platform/dom/events/key_events';
import { HammerGesturesPlugin } from 'angular2/src/platform/dom/events/hammer_gestures';
import { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
import { DomRootRenderer, DomRootRenderer_ } from 'angular2/src/platform/dom/dom_renderer';
import { DomSharedStylesHost } from 'angular2/src/platform/dom/shared_styles_host';
import { SharedStylesHost } from "angular2/src/platform/dom/shared_styles_host";
import { BrowserDetails } from "angular2/src/animate/browser_details";
import { AnimationBuilder } from "angular2/src/animate/animation_builder";
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserGetTestability } from 'angular2/src/platform/browser/testability';
import { CachedXHR } from 'angular2/src/platform/browser/xhr_cache';
import { wtfInit } from 'angular2/src/core/profile/wtf_init';
import { EventManager, EVENT_MANAGER_PLUGINS } from "angular2/src/platform/dom/events/event_manager";
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from 'angular2/src/platform/dom/events/hammer_gestures';
import { ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/common_dom';
export { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
export { Title } from 'angular2/src/platform/browser/title';
export { ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, By } from 'angular2/platform/common_dom';
export { BrowserDomAdapter } from './browser/browser_adapter';
export { enableDebugTools, disableDebugTools } from 'angular2/src/platform/browser/tools/tools';
export { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from './dom/events/hammer_gestures';
export const BROWSER_PLATFORM_MARKER = CONST_EXPR(new OpaqueToken('BrowserPlatformMarker'));
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 */
export const BROWSER_PROVIDERS = CONST_EXPR([
    new Provider(BROWSER_PLATFORM_MARKER, { useValue: true }),
    PLATFORM_COMMON_PROVIDERS,
    new Provider(PLATFORM_INITIALIZER, { useValue: initDomAdapter, multi: true }),
]);
function _exceptionHandler() {
    // !IS_DART is required because we must rethrow exceptions in JS,
    // but must not rethrow exceptions in Dart
    return new ExceptionHandler(DOM, !IS_DART);
}
function _document() {
    return DOM.defaultDoc();
}
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 */
export const BROWSER_APP_COMMON_PROVIDERS = CONST_EXPR([
    APPLICATION_COMMON_PROVIDERS,
    FORM_PROVIDERS,
    new Provider(PLATFORM_PIPES, { useValue: COMMON_PIPES, multi: true }),
    new Provider(PLATFORM_DIRECTIVES, { useValue: COMMON_DIRECTIVES, multi: true }),
    new Provider(ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new Provider(DOCUMENT, { useFactory: _document, deps: [] }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: DomEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: KeyEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: HammerGesturesPlugin, multi: true }),
    new Provider(HAMMER_GESTURE_CONFIG, { useClass: HammerGestureConfig }),
    new Provider(DomRootRenderer, { useClass: DomRootRenderer_ }),
    new Provider(RootRenderer, { useExisting: DomRootRenderer }),
    new Provider(SharedStylesHost, { useExisting: DomSharedStylesHost }),
    DomSharedStylesHost,
    Testability,
    BrowserDetails,
    AnimationBuilder,
    EventManager,
    ELEMENT_PROBE_PROVIDERS
]);
export const CACHED_TEMPLATE_PROVIDER = CONST_EXPR([new Provider(XHR, { useClass: CachedXHR })]);
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    wtfInit();
    BrowserGetTestability.init();
}
