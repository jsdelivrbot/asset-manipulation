/* */ 
"format cjs";
'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var reflective_key_1 = require('./reflective_key');
var metadata_1 = require('./metadata');
var reflective_exceptions_1 = require('./reflective_exceptions');
var forward_ref_1 = require('./forward_ref');
var provider_1 = require('./provider');
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
var ReflectiveDependency = (function () {
    function ReflectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
        this.key = key;
        this.optional = optional;
        this.lowerBoundVisibility = lowerBoundVisibility;
        this.upperBoundVisibility = upperBoundVisibility;
        this.properties = properties;
    }
    ReflectiveDependency.fromKey = function (key) {
        return new ReflectiveDependency(key, false, null, null, []);
    };
    return ReflectiveDependency;
}());
exports.ReflectiveDependency = ReflectiveDependency;
var _EMPTY_LIST = lang_1.CONST_EXPR([]);
var ResolvedReflectiveProvider_ = (function () {
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
        get: function () { return this.resolvedFactories[0]; },
        enumerable: true,
        configurable: true
    });
    return ResolvedReflectiveProvider_;
}());
exports.ResolvedReflectiveProvider_ = ResolvedReflectiveProvider_;
/**
 * An internal resolved representation of a factory function created by resolving {@link Provider}.
 */
var ResolvedReflectiveFactory = (function () {
    function ResolvedReflectiveFactory(
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
}());
exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
/**
 * Resolve a single provider.
 */
function resolveReflectiveFactory(provider) {
    var factoryFn;
    var resolvedDeps;
    if (lang_1.isPresent(provider.useClass)) {
        var useClass = forward_ref_1.resolveForwardRef(provider.useClass);
        factoryFn = reflection_1.reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (lang_1.isPresent(provider.useExisting)) {
        factoryFn = function (aliasInstance) { return aliasInstance; };
        resolvedDeps = [ReflectiveDependency.fromKey(reflective_key_1.ReflectiveKey.get(provider.useExisting))];
    }
    else if (lang_1.isPresent(provider.useFactory)) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.dependencies);
    }
    else {
        factoryFn = function () { return provider.useValue; };
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
exports.resolveReflectiveFactory = resolveReflectiveFactory;
/**
 * Converts the {@link Provider} into {@link ResolvedProvider}.
 *
 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
 * convenience provider syntax.
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(reflective_key_1.ReflectiveKey.get(provider.token), [resolveReflectiveFactory(provider)], provider.multi);
}
exports.resolveReflectiveProvider = resolveReflectiveProvider;
/**
 * Resolve a list of Providers.
 */
function resolveReflectiveProviders(providers) {
    var normalized = _normalizeProviders(providers, []);
    var resolved = normalized.map(resolveReflectiveProvider);
    return collection_1.MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
}
exports.resolveReflectiveProviders = resolveReflectiveProviders;
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var i = 0; i < providers.length; i++) {
        var provider = providers[i];
        var existing = normalizedProvidersMap.get(provider.key.id);
        if (lang_1.isPresent(existing)) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new reflective_exceptions_1.MixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (var j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, collection_1.ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
exports.mergeResolvedReflectiveProviders = mergeResolvedReflectiveProviders;
function _normalizeProviders(providers, res) {
    providers.forEach(function (b) {
        if (b instanceof lang_1.Type) {
            res.push(provider_1.provide(b, { useClass: b }));
        }
        else if (b instanceof provider_1.Provider) {
            res.push(b);
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else if (b instanceof provider_1.ProviderBuilder) {
            throw new reflective_exceptions_1.InvalidProviderError(b.token);
        }
        else {
            throw new reflective_exceptions_1.InvalidProviderError(b);
        }
    });
    return res;
}
function constructDependencies(typeOrFunc, dependencies) {
    if (lang_1.isBlank(dependencies)) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        var params = dependencies.map(function (t) { return [t]; });
        return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params); });
    }
}
exports.constructDependencies = constructDependencies;
function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
        return [];
    if (params.some(lang_1.isBlank)) {
        throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
    return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
}
function _extractToken(typeOrFunc, metadata /*any[] | any*/, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    if (!lang_1.isArray(metadata)) {
        if (metadata instanceof metadata_1.InjectMetadata) {
            return _createDependency(metadata.token, optional, null, null, depProps);
        }
        else {
            return _createDependency(metadata, optional, null, null, depProps);
        }
    }
    var lowerBoundVisibility = null;
    var upperBoundVisibility = null;
    for (var i = 0; i < metadata.length; ++i) {
        var paramMetadata = metadata[i];
        if (paramMetadata instanceof lang_1.Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.InjectMetadata) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof metadata_1.OptionalMetadata) {
            optional = true;
        }
        else if (paramMetadata instanceof metadata_1.SelfMetadata) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.HostMetadata) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.SkipSelfMetadata) {
            lowerBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.DependencyMetadata) {
            if (lang_1.isPresent(paramMetadata.token)) {
                token = paramMetadata.token;
            }
            depProps.push(paramMetadata);
        }
    }
    token = forward_ref_1.resolveForwardRef(token);
    if (lang_1.isPresent(token)) {
        return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    }
    else {
        throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
}
function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
    return new ReflectiveDependency(reflective_key_1.ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2RpL3JlZmxlY3RpdmVfcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQVFPLDBCQUEwQixDQUFDLENBQUE7QUFDbEMsMkJBQXNDLGdDQUFnQyxDQUFDLENBQUE7QUFDdkUsMkJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsK0JBQTRCLGtCQUFrQixDQUFDLENBQUE7QUFDL0MseUJBUU8sWUFBWSxDQUFDLENBQUE7QUFDcEIsc0NBSU8seUJBQXlCLENBQUMsQ0FBQTtBQUNqQyw0QkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQseUJBQWlELFlBQVksQ0FBQyxDQUFBO0FBRTlEOzs7R0FHRztBQUNIO0lBQ0UsOEJBQW1CLEdBQWtCLEVBQVMsUUFBaUIsRUFBUyxvQkFBeUIsRUFDOUUsb0JBQXlCLEVBQVMsVUFBaUI7UUFEbkQsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBUyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQUs7UUFDOUUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFLO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztJQUFHLENBQUM7SUFFbkUsNEJBQU8sR0FBZCxVQUFlLEdBQWtCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQVBZLDRCQUFvQix1QkFPaEMsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHLGlCQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUEwQ25DO0lBQ0UscUNBQW1CLEdBQWtCLEVBQVMsaUJBQThDLEVBQ3pFLGFBQXNCO1FBRHRCLFFBQUcsR0FBSCxHQUFHLENBQWU7UUFBUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQ3pFLGtCQUFhLEdBQWIsYUFBYSxDQUFTO0lBQUcsQ0FBQztJQUU3QyxzQkFBSSx3REFBZTthQUFuQixjQUFtRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDeEYsa0NBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLG1DQUEyQiw4QkFLdkMsQ0FBQTtBQUVEOztHQUVHO0FBQ0g7SUFDRTtRQUNJOztXQUVHO1FBQ0ksT0FBaUI7UUFFeEI7O1dBRUc7UUFDSSxZQUFvQztRQUxwQyxZQUFPLEdBQVAsT0FBTyxDQUFVO1FBS2pCLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtJQUFHLENBQUM7SUFDckQsZ0NBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVhZLGlDQUF5Qiw0QkFXckMsQ0FBQTtBQUdEOztHQUVHO0FBQ0gsa0NBQXlDLFFBQWtCO0lBQ3pELElBQUksU0FBbUIsQ0FBQztJQUN4QixJQUFJLFlBQVksQ0FBQztJQUNqQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxRQUFRLEdBQUcsK0JBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELFNBQVMsR0FBRyxzQkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsU0FBUyxHQUFHLFVBQUMsYUFBYSxJQUFLLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQztRQUM3QyxZQUFZLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsOEJBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxZQUFZLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sU0FBUyxHQUFHLGNBQU0sT0FBQSxRQUFRLENBQUMsUUFBUSxFQUFqQixDQUFpQixDQUFDO1FBQ3BDLFlBQVksR0FBRyxXQUFXLENBQUM7SUFDN0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBbEJlLGdDQUF3QiwyQkFrQnZDLENBQUE7QUFFRDs7Ozs7R0FLRztBQUNILG1DQUEwQyxRQUFrQjtJQUMxRCxNQUFNLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyw4QkFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ2pDLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0YsQ0FBQztBQUhlLGlDQUF5Qiw0QkFHeEMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsb0NBQ0ksU0FBeUM7SUFDM0MsSUFBSSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQ3BCLGdDQUFnQyxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBc0MsQ0FBQyxDQUFDLENBQUM7QUFDakcsQ0FBQztBQU5lLGtDQUEwQiw2QkFNekMsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDSCwwQ0FDSSxTQUF1QyxFQUN2QyxzQkFBK0Q7SUFFakUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sSUFBSSxxRUFBNkMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDM0QsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEQsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksZ0JBQWdCLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLGdCQUFnQixHQUFHLElBQUksMkJBQTJCLENBQzlDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsd0JBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDOUIsQ0FBQztZQUNELHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLHNCQUFzQixDQUFDO0FBQ2hDLENBQUM7QUE5QmUsd0NBQWdDLG1DQThCL0MsQ0FBQTtBQUVELDZCQUE2QixTQUEyRCxFQUMzRCxHQUFlO0lBQzFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxXQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLG1CQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlCLG1CQUFtQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSwwQkFBZSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksNENBQW9CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSw0Q0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELCtCQUFzQyxVQUFlLEVBQ2YsWUFBbUI7SUFDdkQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxNQUFNLEdBQVksWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FBRyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDSCxDQUFDO0FBUmUsNkJBQXFCLHdCQVFwQyxDQUFBO0FBRUQsMEJBQTBCLFVBQWU7SUFDdkMsSUFBSSxNQUFNLEdBQUcsc0JBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixNQUFNLElBQUkseUNBQWlCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQVEsSUFBSyxPQUFBLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVELHVCQUF1QixVQUFVLEVBQUUsUUFBUSxDQUFDLGVBQWUsRUFDcEMsTUFBZTtJQUNwQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVyQixFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLHlCQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNoQyxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUVoQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxZQUFZLFdBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUV4QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsWUFBWSx5QkFBYyxDQUFDLENBQUMsQ0FBQztZQUNuRCxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUU5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsWUFBWSwyQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDckQsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVsQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsWUFBWSx1QkFBWSxDQUFDLENBQUMsQ0FBQztZQUNqRCxvQkFBb0IsR0FBRyxhQUFhLENBQUM7UUFFdkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksdUJBQVksQ0FBQyxDQUFDLENBQUM7WUFDakQsb0JBQW9CLEdBQUcsYUFBYSxDQUFDO1FBRXZDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxZQUFZLDJCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyRCxvQkFBb0IsR0FBRyxhQUFhLENBQUM7UUFFdkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksNkJBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDOUIsQ0FBQztZQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLEdBQUcsK0JBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxJQUFJLHlDQUFpQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0FBQ0gsQ0FBQztBQUVELDJCQUEyQixLQUFLLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUMzRCxRQUFRO0lBQ2pDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLDhCQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFDeEQsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFR5cGUsXG4gIGlzQmxhbmssXG4gIGlzUHJlc2VudCxcbiAgQ09OU1QsXG4gIENPTlNUX0VYUFIsXG4gIGlzQXJyYXksXG4gIGlzVHlwZVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtSZWZsZWN0aXZlS2V5fSBmcm9tICcuL3JlZmxlY3RpdmVfa2V5JztcbmltcG9ydCB7XG4gIEluamVjdE1ldGFkYXRhLFxuICBJbmplY3RhYmxlTWV0YWRhdGEsXG4gIE9wdGlvbmFsTWV0YWRhdGEsXG4gIFNlbGZNZXRhZGF0YSxcbiAgSG9zdE1ldGFkYXRhLFxuICBTa2lwU2VsZk1ldGFkYXRhLFxuICBEZXBlbmRlbmN5TWV0YWRhdGFcbn0gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQge1xuICBOb0Fubm90YXRpb25FcnJvcixcbiAgTWl4aW5nTXVsdGlQcm92aWRlcnNXaXRoUmVndWxhclByb3ZpZGVyc0Vycm9yLFxuICBJbnZhbGlkUHJvdmlkZXJFcnJvclxufSBmcm9tICcuL3JlZmxlY3RpdmVfZXhjZXB0aW9ucyc7XG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcbmltcG9ydCB7UHJvdmlkZXIsIFByb3ZpZGVyQnVpbGRlciwgcHJvdmlkZX0gZnJvbSAnLi9wcm92aWRlcic7XG5cbi8qKlxuICogYERlcGVuZGVuY3lgIGlzIHVzZWQgYnkgdGhlIGZyYW1ld29yayB0byBleHRlbmQgREkuXG4gKiBUaGlzIGlzIGludGVybmFsIHRvIEFuZ3VsYXIgYW5kIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmxlY3RpdmVEZXBlbmRlbmN5IHtcbiAgY29uc3RydWN0b3IocHVibGljIGtleTogUmVmbGVjdGl2ZUtleSwgcHVibGljIG9wdGlvbmFsOiBib29sZWFuLCBwdWJsaWMgbG93ZXJCb3VuZFZpc2liaWxpdHk6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIHVwcGVyQm91bmRWaXNpYmlsaXR5OiBhbnksIHB1YmxpYyBwcm9wZXJ0aWVzOiBhbnlbXSkge31cblxuICBzdGF0aWMgZnJvbUtleShrZXk6IFJlZmxlY3RpdmVLZXkpOiBSZWZsZWN0aXZlRGVwZW5kZW5jeSB7XG4gICAgcmV0dXJuIG5ldyBSZWZsZWN0aXZlRGVwZW5kZW5jeShrZXksIGZhbHNlLCBudWxsLCBudWxsLCBbXSk7XG4gIH1cbn1cblxuY29uc3QgX0VNUFRZX0xJU1QgPSBDT05TVF9FWFBSKFtdKTtcblxuLyoqXG4gKiBBbiBpbnRlcm5hbCByZXNvbHZlZCByZXByZXNlbnRhdGlvbiBvZiBhIHtAbGluayBQcm92aWRlcn0gdXNlZCBieSB0aGUge0BsaW5rIEluamVjdG9yfS5cbiAqXG4gKiBJdCBpcyB1c3VhbGx5IGNyZWF0ZWQgYXV0b21hdGljYWxseSBieSBgSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZWAuXG4gKlxuICogSXQgY2FuIGJlIGNyZWF0ZWQgbWFudWFsbHksIGFzIGZvbGxvd3M6XG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L1JmRW5oaDhrVUVJMEczcXNuSWVUP3AlM0RwcmV2aWV3JnA9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdmFyIHJlc29sdmVkUHJvdmlkZXJzID0gSW5qZWN0b3IucmVzb2x2ZShbbmV3IFByb3ZpZGVyKCdtZXNzYWdlJywge3VzZVZhbHVlOiAnSGVsbG8nfSldKTtcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhyZXNvbHZlZFByb3ZpZGVycyk7XG4gKlxuICogZXhwZWN0KGluamVjdG9yLmdldCgnbWVzc2FnZScpKS50b0VxdWFsKCdIZWxsbycpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIge1xuICAvKipcbiAgICogQSBrZXksIHVzdWFsbHkgYSBgVHlwZWAuXG4gICAqL1xuICBrZXk6IFJlZmxlY3RpdmVLZXk7XG5cbiAgLyoqXG4gICAqIEZhY3RvcnkgZnVuY3Rpb24gd2hpY2ggY2FuIHJldHVybiBhbiBpbnN0YW5jZSBvZiBhbiBvYmplY3QgcmVwcmVzZW50ZWQgYnkgYSBrZXkuXG4gICAqL1xuICByZXNvbHZlZEZhY3RvcmllczogUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeVtdO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHByb3ZpZGVyIGlzIGEgbXVsdGktcHJvdmlkZXIgb3IgYSByZWd1bGFyIHByb3ZpZGVyLlxuICAgKi9cbiAgbXVsdGlQcm92aWRlcjogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBTZWUge0BsaW5rIFJlc29sdmVkUHJvdmlkZXJ9IGluc3RlYWQuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXNvbHZlZFJlZmxlY3RpdmVCaW5kaW5nIGV4dGVuZHMgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIge31cblxuZXhwb3J0IGNsYXNzIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyXyBpbXBsZW1lbnRzIFJlc29sdmVkUmVmbGVjdGl2ZUJpbmRpbmcge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBSZWZsZWN0aXZlS2V5LCBwdWJsaWMgcmVzb2x2ZWRGYWN0b3JpZXM6IFJlc29sdmVkUmVmbGVjdGl2ZUZhY3RvcnlbXSxcbiAgICAgICAgICAgICAgcHVibGljIG11bHRpUHJvdmlkZXI6IGJvb2xlYW4pIHt9XG5cbiAgZ2V0IHJlc29sdmVkRmFjdG9yeSgpOiBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5IHsgcmV0dXJuIHRoaXMucmVzb2x2ZWRGYWN0b3JpZXNbMF07IH1cbn1cblxuLyoqXG4gKiBBbiBpbnRlcm5hbCByZXNvbHZlZCByZXByZXNlbnRhdGlvbiBvZiBhIGZhY3RvcnkgZnVuY3Rpb24gY3JlYXRlZCBieSByZXNvbHZpbmcge0BsaW5rIFByb3ZpZGVyfS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc29sdmVkUmVmbGVjdGl2ZUZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKlxuICAgICAgICogRmFjdG9yeSBmdW5jdGlvbiB3aGljaCBjYW4gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGFuIG9iamVjdCByZXByZXNlbnRlZCBieSBhIGtleS5cbiAgICAgICAqL1xuICAgICAgcHVibGljIGZhY3Rvcnk6IEZ1bmN0aW9uLFxuXG4gICAgICAvKipcbiAgICAgICAqIEFyZ3VtZW50cyAoZGVwZW5kZW5jaWVzKSB0byB0aGUgYGZhY3RvcnlgIGZ1bmN0aW9uLlxuICAgICAgICovXG4gICAgICBwdWJsaWMgZGVwZW5kZW5jaWVzOiBSZWZsZWN0aXZlRGVwZW5kZW5jeVtdKSB7fVxufVxuXG5cbi8qKlxuICogUmVzb2x2ZSBhIHNpbmdsZSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVSZWZsZWN0aXZlRmFjdG9yeShwcm92aWRlcjogUHJvdmlkZXIpOiBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5IHtcbiAgdmFyIGZhY3RvcnlGbjogRnVuY3Rpb247XG4gIHZhciByZXNvbHZlZERlcHM7XG4gIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlQ2xhc3MpKSB7XG4gICAgdmFyIHVzZUNsYXNzID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIudXNlQ2xhc3MpO1xuICAgIGZhY3RvcnlGbiA9IHJlZmxlY3Rvci5mYWN0b3J5KHVzZUNsYXNzKTtcbiAgICByZXNvbHZlZERlcHMgPSBfZGVwZW5kZW5jaWVzRm9yKHVzZUNsYXNzKTtcbiAgfSBlbHNlIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlRXhpc3RpbmcpKSB7XG4gICAgZmFjdG9yeUZuID0gKGFsaWFzSW5zdGFuY2UpID0+IGFsaWFzSW5zdGFuY2U7XG4gICAgcmVzb2x2ZWREZXBzID0gW1JlZmxlY3RpdmVEZXBlbmRlbmN5LmZyb21LZXkoUmVmbGVjdGl2ZUtleS5nZXQocHJvdmlkZXIudXNlRXhpc3RpbmcpKV07XG4gIH0gZWxzZSBpZiAoaXNQcmVzZW50KHByb3ZpZGVyLnVzZUZhY3RvcnkpKSB7XG4gICAgZmFjdG9yeUZuID0gcHJvdmlkZXIudXNlRmFjdG9yeTtcbiAgICByZXNvbHZlZERlcHMgPSBjb25zdHJ1Y3REZXBlbmRlbmNpZXMocHJvdmlkZXIudXNlRmFjdG9yeSwgcHJvdmlkZXIuZGVwZW5kZW5jaWVzKTtcbiAgfSBlbHNlIHtcbiAgICBmYWN0b3J5Rm4gPSAoKSA9PiBwcm92aWRlci51c2VWYWx1ZTtcbiAgICByZXNvbHZlZERlcHMgPSBfRU1QVFlfTElTVDtcbiAgfVxuICByZXR1cm4gbmV3IFJlc29sdmVkUmVmbGVjdGl2ZUZhY3RvcnkoZmFjdG9yeUZuLCByZXNvbHZlZERlcHMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB7QGxpbmsgUHJvdmlkZXJ9IGludG8ge0BsaW5rIFJlc29sdmVkUHJvdmlkZXJ9LlxuICpcbiAqIHtAbGluayBJbmplY3Rvcn0gaW50ZXJuYWxseSBvbmx5IHVzZXMge0BsaW5rIFJlc29sdmVkUHJvdmlkZXJ9LCB7QGxpbmsgUHJvdmlkZXJ9IGNvbnRhaW5zXG4gKiBjb252ZW5pZW5jZSBwcm92aWRlciBzeW50YXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUmVmbGVjdGl2ZVByb3ZpZGVyKHByb3ZpZGVyOiBQcm92aWRlcik6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyIHtcbiAgcmV0dXJuIG5ldyBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcl8oUmVmbGVjdGl2ZUtleS5nZXQocHJvdmlkZXIudG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVzb2x2ZVJlZmxlY3RpdmVGYWN0b3J5KHByb3ZpZGVyKV0sIHByb3ZpZGVyLm11bHRpKTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGEgbGlzdCBvZiBQcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUmVmbGVjdGl2ZVByb3ZpZGVycyhcbiAgICBwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyW10ge1xuICB2YXIgbm9ybWFsaXplZCA9IF9ub3JtYWxpemVQcm92aWRlcnMocHJvdmlkZXJzLCBbXSk7XG4gIHZhciByZXNvbHZlZCA9IG5vcm1hbGl6ZWQubWFwKHJlc29sdmVSZWZsZWN0aXZlUHJvdmlkZXIpO1xuICByZXR1cm4gTWFwV3JhcHBlci52YWx1ZXMoXG4gICAgICBtZXJnZVJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVycyhyZXNvbHZlZCwgbmV3IE1hcDxudW1iZXIsIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyPigpKSk7XG59XG5cbi8qKlxuICogTWVyZ2VzIGEgbGlzdCBvZiBSZXNvbHZlZFByb3ZpZGVycyBpbnRvIGEgbGlzdCB3aGVyZVxuICogZWFjaCBrZXkgaXMgY29udGFpbmVkIGV4YWN0bHkgb25jZSBhbmQgbXVsdGkgcHJvdmlkZXJzXG4gKiBoYXZlIGJlZW4gbWVyZ2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcnMoXG4gICAgcHJvdmlkZXJzOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcltdLFxuICAgIG5vcm1hbGl6ZWRQcm92aWRlcnNNYXA6IE1hcDxudW1iZXIsIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyPik6XG4gICAgTWFwPG51bWJlciwgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXI+IHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJvdmlkZXIgPSBwcm92aWRlcnNbaV07XG4gICAgdmFyIGV4aXN0aW5nID0gbm9ybWFsaXplZFByb3ZpZGVyc01hcC5nZXQocHJvdmlkZXIua2V5LmlkKTtcbiAgICBpZiAoaXNQcmVzZW50KGV4aXN0aW5nKSkge1xuICAgICAgaWYgKHByb3ZpZGVyLm11bHRpUHJvdmlkZXIgIT09IGV4aXN0aW5nLm11bHRpUHJvdmlkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1peGluZ011bHRpUHJvdmlkZXJzV2l0aFJlZ3VsYXJQcm92aWRlcnNFcnJvcihleGlzdGluZywgcHJvdmlkZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHByb3ZpZGVyLm11bHRpUHJvdmlkZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwcm92aWRlci5yZXNvbHZlZEZhY3Rvcmllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGV4aXN0aW5nLnJlc29sdmVkRmFjdG9yaWVzLnB1c2gocHJvdmlkZXIucmVzb2x2ZWRGYWN0b3JpZXNbal0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtYWxpemVkUHJvdmlkZXJzTWFwLnNldChwcm92aWRlci5rZXkuaWQsIHByb3ZpZGVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlc29sdmVkUHJvdmlkZXI7XG4gICAgICBpZiAocHJvdmlkZXIubXVsdGlQcm92aWRlcikge1xuICAgICAgICByZXNvbHZlZFByb3ZpZGVyID0gbmV3IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyXyhcbiAgICAgICAgICAgIHByb3ZpZGVyLmtleSwgTGlzdFdyYXBwZXIuY2xvbmUocHJvdmlkZXIucmVzb2x2ZWRGYWN0b3JpZXMpLCBwcm92aWRlci5tdWx0aVByb3ZpZGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmVkUHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICAgIH1cbiAgICAgIG5vcm1hbGl6ZWRQcm92aWRlcnNNYXAuc2V0KHByb3ZpZGVyLmtleS5pZCwgcmVzb2x2ZWRQcm92aWRlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBub3JtYWxpemVkUHJvdmlkZXJzTWFwO1xufVxuXG5mdW5jdGlvbiBfbm9ybWFsaXplUHJvdmlkZXJzKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgUHJvdmlkZXJCdWlsZGVyIHwgYW55W10+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXM6IFByb3ZpZGVyW10pOiBQcm92aWRlcltdIHtcbiAgcHJvdmlkZXJzLmZvckVhY2goYiA9PiB7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICByZXMucHVzaChwcm92aWRlKGIsIHt1c2VDbGFzczogYn0pKTtcblxuICAgIH0gZWxzZSBpZiAoYiBpbnN0YW5jZW9mIFByb3ZpZGVyKSB7XG4gICAgICByZXMucHVzaChiKTtcblxuICAgIH0gZWxzZSBpZiAoYiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBfbm9ybWFsaXplUHJvdmlkZXJzKGIsIHJlcyk7XG5cbiAgICB9IGVsc2UgaWYgKGIgaW5zdGFuY2VvZiBQcm92aWRlckJ1aWxkZXIpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUHJvdmlkZXJFcnJvcihiLnRva2VuKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFByb3ZpZGVyRXJyb3IoYik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0RGVwZW5kZW5jaWVzKHR5cGVPckZ1bmM6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBhbnlbXSk6IFJlZmxlY3RpdmVEZXBlbmRlbmN5W10ge1xuICBpZiAoaXNCbGFuayhkZXBlbmRlbmNpZXMpKSB7XG4gICAgcmV0dXJuIF9kZXBlbmRlbmNpZXNGb3IodHlwZU9yRnVuYyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcmFtczogYW55W11bXSA9IGRlcGVuZGVuY2llcy5tYXAodCA9PiBbdF0pO1xuICAgIHJldHVybiBkZXBlbmRlbmNpZXMubWFwKHQgPT4gX2V4dHJhY3RUb2tlbih0eXBlT3JGdW5jLCB0LCBwYXJhbXMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVwZW5kZW5jaWVzRm9yKHR5cGVPckZ1bmM6IGFueSk6IFJlZmxlY3RpdmVEZXBlbmRlbmN5W10ge1xuICB2YXIgcGFyYW1zID0gcmVmbGVjdG9yLnBhcmFtZXRlcnModHlwZU9yRnVuYyk7XG4gIGlmIChpc0JsYW5rKHBhcmFtcykpIHJldHVybiBbXTtcbiAgaWYgKHBhcmFtcy5zb21lKGlzQmxhbmspKSB7XG4gICAgdGhyb3cgbmV3IE5vQW5ub3RhdGlvbkVycm9yKHR5cGVPckZ1bmMsIHBhcmFtcyk7XG4gIH1cbiAgcmV0dXJuIHBhcmFtcy5tYXAoKHA6IGFueVtdKSA9PiBfZXh0cmFjdFRva2VuKHR5cGVPckZ1bmMsIHAsIHBhcmFtcykpO1xufVxuXG5mdW5jdGlvbiBfZXh0cmFjdFRva2VuKHR5cGVPckZ1bmMsIG1ldGFkYXRhIC8qYW55W10gfCBhbnkqLyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBhbnlbXVtdKTogUmVmbGVjdGl2ZURlcGVuZGVuY3kge1xuICB2YXIgZGVwUHJvcHMgPSBbXTtcbiAgdmFyIHRva2VuID0gbnVsbDtcbiAgdmFyIG9wdGlvbmFsID0gZmFsc2U7XG5cbiAgaWYgKCFpc0FycmF5KG1ldGFkYXRhKSkge1xuICAgIGlmIChtZXRhZGF0YSBpbnN0YW5jZW9mIEluamVjdE1ldGFkYXRhKSB7XG4gICAgICByZXR1cm4gX2NyZWF0ZURlcGVuZGVuY3kobWV0YWRhdGEudG9rZW4sIG9wdGlvbmFsLCBudWxsLCBudWxsLCBkZXBQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfY3JlYXRlRGVwZW5kZW5jeShtZXRhZGF0YSwgb3B0aW9uYWwsIG51bGwsIG51bGwsIGRlcFByb3BzKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbG93ZXJCb3VuZFZpc2liaWxpdHkgPSBudWxsO1xuICB2YXIgdXBwZXJCb3VuZFZpc2liaWxpdHkgPSBudWxsO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyYW1NZXRhZGF0YSA9IG1ldGFkYXRhW2ldO1xuXG4gICAgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICB0b2tlbiA9IHBhcmFtTWV0YWRhdGE7XG5cbiAgICB9IGVsc2UgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBJbmplY3RNZXRhZGF0YSkge1xuICAgICAgdG9rZW4gPSBwYXJhbU1ldGFkYXRhLnRva2VuO1xuXG4gICAgfSBlbHNlIGlmIChwYXJhbU1ldGFkYXRhIGluc3RhbmNlb2YgT3B0aW9uYWxNZXRhZGF0YSkge1xuICAgICAgb3B0aW9uYWwgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChwYXJhbU1ldGFkYXRhIGluc3RhbmNlb2YgU2VsZk1ldGFkYXRhKSB7XG4gICAgICB1cHBlckJvdW5kVmlzaWJpbGl0eSA9IHBhcmFtTWV0YWRhdGE7XG5cbiAgICB9IGVsc2UgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBIb3N0TWV0YWRhdGEpIHtcbiAgICAgIHVwcGVyQm91bmRWaXNpYmlsaXR5ID0gcGFyYW1NZXRhZGF0YTtcblxuICAgIH0gZWxzZSBpZiAocGFyYW1NZXRhZGF0YSBpbnN0YW5jZW9mIFNraXBTZWxmTWV0YWRhdGEpIHtcbiAgICAgIGxvd2VyQm91bmRWaXNpYmlsaXR5ID0gcGFyYW1NZXRhZGF0YTtcblxuICAgIH0gZWxzZSBpZiAocGFyYW1NZXRhZGF0YSBpbnN0YW5jZW9mIERlcGVuZGVuY3lNZXRhZGF0YSkge1xuICAgICAgaWYgKGlzUHJlc2VudChwYXJhbU1ldGFkYXRhLnRva2VuKSkge1xuICAgICAgICB0b2tlbiA9IHBhcmFtTWV0YWRhdGEudG9rZW47XG4gICAgICB9XG4gICAgICBkZXBQcm9wcy5wdXNoKHBhcmFtTWV0YWRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYodG9rZW4pO1xuXG4gIGlmIChpc1ByZXNlbnQodG9rZW4pKSB7XG4gICAgcmV0dXJuIF9jcmVhdGVEZXBlbmRlbmN5KHRva2VuLCBvcHRpb25hbCwgbG93ZXJCb3VuZFZpc2liaWxpdHksIHVwcGVyQm91bmRWaXNpYmlsaXR5LCBkZXBQcm9wcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IE5vQW5ub3RhdGlvbkVycm9yKHR5cGVPckZ1bmMsIHBhcmFtcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZURlcGVuZGVuY3kodG9rZW4sIG9wdGlvbmFsLCBsb3dlckJvdW5kVmlzaWJpbGl0eSwgdXBwZXJCb3VuZFZpc2liaWxpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBQcm9wcyk6IFJlZmxlY3RpdmVEZXBlbmRlbmN5IHtcbiAgcmV0dXJuIG5ldyBSZWZsZWN0aXZlRGVwZW5kZW5jeShSZWZsZWN0aXZlS2V5LmdldCh0b2tlbiksIG9wdGlvbmFsLCBsb3dlckJvdW5kVmlzaWJpbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlckJvdW5kVmlzaWJpbGl0eSwgZGVwUHJvcHMpO1xufVxuIl19