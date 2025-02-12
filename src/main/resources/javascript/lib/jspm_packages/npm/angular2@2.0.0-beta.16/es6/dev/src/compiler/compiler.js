/* */ 
"format esm";
export { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from 'angular2/src/core/platform_directives_and_pipes';
export * from 'angular2/src/compiler/template_ast';
export { TEMPLATE_TRANSFORMS } from 'angular2/src/compiler/template_parser';
export { CompilerConfig, RenderTypes } from './config';
export * from './compile_metadata';
export * from './offline_compiler';
export { RuntimeCompiler } from './runtime_compiler';
export * from 'angular2/src/compiler/url_resolver';
export * from 'angular2/src/compiler/xhr';
export { ViewResolver } from './view_resolver';
export { DirectiveResolver } from './directive_resolver';
export { PipeResolver } from './pipe_resolver';
import { assertionsEnabled, CONST_EXPR } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { TemplateParser } from 'angular2/src/compiler/template_parser';
import { HtmlParser } from 'angular2/src/compiler/html_parser';
import { DirectiveNormalizer } from 'angular2/src/compiler/directive_normalizer';
import { RuntimeMetadataResolver } from 'angular2/src/compiler/runtime_metadata';
import { StyleCompiler } from 'angular2/src/compiler/style_compiler';
import { ViewCompiler } from 'angular2/src/compiler/view_compiler/view_compiler';
import { CompilerConfig } from './config';
import { ComponentResolver } from 'angular2/src/core/linker/component_resolver';
import { RuntimeCompiler } from 'angular2/src/compiler/runtime_compiler';
import { ElementSchemaRegistry } from 'angular2/src/compiler/schema/element_schema_registry';
import { DomElementSchemaRegistry } from 'angular2/src/compiler/schema/dom_element_schema_registry';
import { UrlResolver, DEFAULT_PACKAGE_URL_PROVIDER } from 'angular2/src/compiler/url_resolver';
import { Parser } from './expression_parser/parser';
import { Lexer } from './expression_parser/lexer';
import { ViewResolver } from './view_resolver';
import { DirectiveResolver } from './directive_resolver';
import { PipeResolver } from './pipe_resolver';
function _createCompilerConfig() {
    return new CompilerConfig(assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
export const COMPILER_PROVIDERS = CONST_EXPR([
    Lexer,
    Parser,
    HtmlParser,
    TemplateParser,
    DirectiveNormalizer,
    RuntimeMetadataResolver,
    DEFAULT_PACKAGE_URL_PROVIDER,
    StyleCompiler,
    ViewCompiler,
    new Provider(CompilerConfig, { useFactory: _createCompilerConfig, deps: [] }),
    RuntimeCompiler,
    new Provider(ComponentResolver, { useExisting: RuntimeCompiler }),
    DomElementSchemaRegistry,
    new Provider(ElementSchemaRegistry, { useExisting: DomElementSchemaRegistry }),
    UrlResolver,
    ViewResolver,
    DirectiveResolver,
    PipeResolver
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTlEMWlHUVZHLnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUSxtQkFBbUIsRUFBRSxjQUFjLFFBQU8saURBQWlELENBQUM7QUFDcEcsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxTQUFRLG1CQUFtQixRQUFPLHVDQUF1QyxDQUFDO0FBQzFFLFNBQVEsY0FBYyxFQUFFLFdBQVcsUUFBTyxVQUFVLENBQUM7QUFDckQsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLFNBQVEsZUFBZSxRQUFPLG9CQUFvQixDQUFDO0FBQ25ELGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYywyQkFBMkIsQ0FBQztBQUUxQyxTQUFRLFlBQVksUUFBTyxpQkFBaUIsQ0FBQztBQUM3QyxTQUFRLGlCQUFpQixRQUFPLHNCQUFzQixDQUFDO0FBQ3ZELFNBQVEsWUFBWSxRQUFPLGlCQUFpQixDQUFDO09BRXRDLEVBQUMsaUJBQWlCLEVBQVEsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO09BQ3JFLEVBQVUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCO09BQy9DLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDO09BQzdELEVBQUMsVUFBVSxFQUFDLE1BQU0sbUNBQW1DO09BQ3JELEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0Q0FBNEM7T0FDdkUsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QztPQUN2RSxFQUFDLGFBQWEsRUFBQyxNQUFNLHNDQUFzQztPQUMzRCxFQUFDLFlBQVksRUFBQyxNQUFNLG1EQUFtRDtPQUN2RSxFQUFDLGNBQWMsRUFBQyxNQUFNLFVBQVU7T0FDaEMsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZDQUE2QztPQUN0RSxFQUFDLGVBQWUsRUFBQyxNQUFNLHdDQUF3QztPQUMvRCxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0RBQXNEO09BQ25GLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwwREFBMEQ7T0FDMUYsRUFBQyxXQUFXLEVBQUUsNEJBQTRCLEVBQUMsTUFBTSxvQ0FBb0M7T0FDckYsRUFBQyxNQUFNLEVBQUMsTUFBTSw0QkFBNEI7T0FDMUMsRUFBQyxLQUFLLEVBQUMsTUFBTSwyQkFBMkI7T0FDeEMsRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUI7T0FDckMsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQjtPQUMvQyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQjtBQUU1QztJQUNFLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsT0FBTyxNQUFNLGtCQUFrQixHQUFtQyxVQUFVLENBQUM7SUFDM0UsS0FBSztJQUNMLE1BQU07SUFDTixVQUFVO0lBQ1YsY0FBYztJQUNkLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGFBQWE7SUFDYixZQUFZO0lBQ1osSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUMzRSxlQUFlO0lBQ2YsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7SUFDL0Qsd0JBQXdCO0lBQ3hCLElBQUksUUFBUSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsV0FBVyxFQUFFLHdCQUF3QixFQUFDLENBQUM7SUFDNUUsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsWUFBWTtDQUNiLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7UExBVEZPUk1fRElSRUNUSVZFUywgUExBVEZPUk1fUElQRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzJztcbmV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9hc3QnO1xuZXhwb3J0IHtURU1QTEFURV9UUkFOU0ZPUk1TfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfcGFyc2VyJztcbmV4cG9ydCB7Q29tcGlsZXJDb25maWcsIFJlbmRlclR5cGVzfSBmcm9tICcuL2NvbmZpZyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi9vZmZsaW5lX2NvbXBpbGVyJztcbmV4cG9ydCB7UnVudGltZUNvbXBpbGVyfSBmcm9tICcuL3J1bnRpbWVfY29tcGlsZXInO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3VybF9yZXNvbHZlcic7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcblxuZXhwb3J0IHtWaWV3UmVzb2x2ZXJ9IGZyb20gJy4vdmlld19yZXNvbHZlcic7XG5leHBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICcuL2RpcmVjdGl2ZV9yZXNvbHZlcic7XG5leHBvcnQge1BpcGVSZXNvbHZlcn0gZnJvbSAnLi9waXBlX3Jlc29sdmVyJztcblxuaW1wb3J0IHthc3NlcnRpb25zRW5hYmxlZCwgVHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VGVtcGxhdGVQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9wYXJzZXInO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtEaXJlY3RpdmVOb3JtYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvZGlyZWN0aXZlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtSdW50aW1lTWV0YWRhdGFSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3J1bnRpbWVfbWV0YWRhdGEnO1xuaW1wb3J0IHtTdHlsZUNvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc3R5bGVfY29tcGlsZXInO1xuaW1wb3J0IHtWaWV3Q29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3ZpZXdfY29tcGlsZXInO1xuaW1wb3J0IHtDb21waWxlckNvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlcic7XG5pbXBvcnQge1J1bnRpbWVDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3J1bnRpbWVfY29tcGlsZXInO1xuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuaW1wb3J0IHtEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7VXJsUmVzb2x2ZXIsIERFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtQYXJzZXJ9IGZyb20gJy4vZXhwcmVzc2lvbl9wYXJzZXIvcGFyc2VyJztcbmltcG9ydCB7TGV4ZXJ9IGZyb20gJy4vZXhwcmVzc2lvbl9wYXJzZXIvbGV4ZXInO1xuaW1wb3J0IHtWaWV3UmVzb2x2ZXJ9IGZyb20gJy4vdmlld19yZXNvbHZlcic7XG5pbXBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICcuL2RpcmVjdGl2ZV9yZXNvbHZlcic7XG5pbXBvcnQge1BpcGVSZXNvbHZlcn0gZnJvbSAnLi9waXBlX3Jlc29sdmVyJztcblxuZnVuY3Rpb24gX2NyZWF0ZUNvbXBpbGVyQ29uZmlnKCkge1xuICByZXR1cm4gbmV3IENvbXBpbGVyQ29uZmlnKGFzc2VydGlvbnNFbmFibGVkKCksIGZhbHNlLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBBIHNldCBvZiBwcm92aWRlcnMgdGhhdCBwcm92aWRlIGBSdW50aW1lQ29tcGlsZXJgIGFuZCBpdHMgZGVwZW5kZW5jaWVzIHRvIHVzZSBmb3JcbiAqIHRlbXBsYXRlIGNvbXBpbGF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgQ09NUElMRVJfUFJPVklERVJTOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBDT05TVF9FWFBSKFtcbiAgTGV4ZXIsXG4gIFBhcnNlcixcbiAgSHRtbFBhcnNlcixcbiAgVGVtcGxhdGVQYXJzZXIsXG4gIERpcmVjdGl2ZU5vcm1hbGl6ZXIsXG4gIFJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyLFxuICBERUZBVUxUX1BBQ0tBR0VfVVJMX1BST1ZJREVSLFxuICBTdHlsZUNvbXBpbGVyLFxuICBWaWV3Q29tcGlsZXIsXG4gIG5ldyBQcm92aWRlcihDb21waWxlckNvbmZpZywge3VzZUZhY3Rvcnk6IF9jcmVhdGVDb21waWxlckNvbmZpZywgZGVwczogW119KSxcbiAgUnVudGltZUNvbXBpbGVyLFxuICBuZXcgUHJvdmlkZXIoQ29tcG9uZW50UmVzb2x2ZXIsIHt1c2VFeGlzdGluZzogUnVudGltZUNvbXBpbGVyfSksXG4gIERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSxcbiAgbmV3IFByb3ZpZGVyKEVsZW1lbnRTY2hlbWFSZWdpc3RyeSwge3VzZUV4aXN0aW5nOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9KSxcbiAgVXJsUmVzb2x2ZXIsXG4gIFZpZXdSZXNvbHZlcixcbiAgRGlyZWN0aXZlUmVzb2x2ZXIsXG4gIFBpcGVSZXNvbHZlclxuXSk7XG4iXX0=