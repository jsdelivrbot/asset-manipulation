/* */ 
"format cjs";
'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var o = require('../output/output_ast');
var constants_1 = require('./constants');
var compile_query_1 = require('./compile_query');
var compile_method_1 = require('./compile_method');
var compile_pipe_1 = require('./compile_pipe');
var view_type_1 = require('angular2/src/core/linker/view_type');
var compile_metadata_1 = require('../compile_metadata');
var util_1 = require('./util');
var CompileView = (function () {
    function CompileView(component, genConfig, pipeMetas, styles, viewIndex, declarationElement, templateVariableBindings) {
        var _this = this;
        this.component = component;
        this.genConfig = genConfig;
        this.pipeMetas = pipeMetas;
        this.styles = styles;
        this.viewIndex = viewIndex;
        this.declarationElement = declarationElement;
        this.templateVariableBindings = templateVariableBindings;
        this.nodes = [];
        // root nodes or AppElements for ViewContainers
        this.rootNodesOrAppElements = [];
        this.bindings = [];
        this.classStatements = [];
        this.eventHandlerMethods = [];
        this.fields = [];
        this.getters = [];
        this.disposables = [];
        this.subscriptions = [];
        this.purePipes = new Map();
        this.pipes = [];
        this.variables = new Map();
        this.literalArrayCount = 0;
        this.literalMapCount = 0;
        this.pipeCount = 0;
        this.createMethod = new compile_method_1.CompileMethod(this);
        this.injectorGetMethod = new compile_method_1.CompileMethod(this);
        this.updateContentQueriesMethod = new compile_method_1.CompileMethod(this);
        this.dirtyParentQueriesMethod = new compile_method_1.CompileMethod(this);
        this.updateViewQueriesMethod = new compile_method_1.CompileMethod(this);
        this.detectChangesInInputsMethod = new compile_method_1.CompileMethod(this);
        this.detectChangesRenderPropertiesMethod = new compile_method_1.CompileMethod(this);
        this.afterContentLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
        this.afterViewLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
        this.destroyMethod = new compile_method_1.CompileMethod(this);
        this.viewType = getViewType(component, viewIndex);
        this.className = "_View_" + component.type.name + viewIndex;
        this.classType = o.importType(new compile_metadata_1.CompileIdentifierMetadata({ name: this.className }));
        this.viewFactory = o.variable(util_1.getViewFactoryName(component, viewIndex));
        if (this.viewType === view_type_1.ViewType.COMPONENT || this.viewType === view_type_1.ViewType.HOST) {
            this.componentView = this;
        }
        else {
            this.componentView = this.declarationElement.view.componentView;
        }
        var viewQueries = new compile_metadata_1.CompileTokenMap();
        if (this.viewType === view_type_1.ViewType.COMPONENT) {
            var directiveInstance = o.THIS_EXPR.prop('context');
            collection_1.ListWrapper.forEachWithIndex(this.component.viewQueries, function (queryMeta, queryIndex) {
                var propName = "_viewQuery_" + queryMeta.selectors[0].name + "_" + queryIndex;
                var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, _this);
                var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, _this);
                compile_query_1.addQueryToTokenMap(viewQueries, query);
            });
            var constructorViewQueryCount = 0;
            this.component.type.diDeps.forEach(function (dep) {
                if (lang_1.isPresent(dep.viewQuery)) {
                    var queryList = o.THIS_EXPR.prop('declarationAppElement')
                        .prop('componentConstructorViewQueries')
                        .key(o.literal(constructorViewQueryCount++));
                    var query = new compile_query_1.CompileQuery(dep.viewQuery, queryList, null, _this);
                    compile_query_1.addQueryToTokenMap(viewQueries, query);
                }
            });
        }
        this.viewQueries = viewQueries;
        templateVariableBindings.forEach(function (entry) {
            _this.variables.set(entry[1], o.THIS_EXPR.prop('locals').key(o.literal(entry[0])));
        });
        if (!this.declarationElement.isNull()) {
            this.declarationElement.setEmbeddedView(this);
        }
    }
    CompileView.prototype.callPipe = function (name, input, args) {
        var compView = this.componentView;
        var pipe = compView.purePipes.get(name);
        if (lang_1.isBlank(pipe)) {
            pipe = new compile_pipe_1.CompilePipe(compView, name);
            if (pipe.pure) {
                compView.purePipes.set(name, pipe);
            }
            compView.pipes.push(pipe);
        }
        return pipe.call(this, [input].concat(args));
    };
    CompileView.prototype.getVariable = function (name) {
        if (name == constants_1.EventHandlerVars.event.name) {
            return constants_1.EventHandlerVars.event;
        }
        var currView = this;
        var result = currView.variables.get(name);
        while (lang_1.isBlank(result) && lang_1.isPresent(currView.declarationElement.view)) {
            currView = currView.declarationElement.view;
            result = currView.variables.get(name);
        }
        if (lang_1.isPresent(result)) {
            return util_1.getPropertyInView(result, this, currView);
        }
        else {
            return null;
        }
    };
    CompileView.prototype.createLiteralArray = function (values) {
        var proxyExpr = o.THIS_EXPR.prop("_arr_" + this.literalArrayCount++);
        var proxyParams = [];
        var proxyReturnEntries = [];
        for (var i = 0; i < values.length; i++) {
            var paramName = "p" + i;
            proxyParams.push(new o.FnParam(paramName));
            proxyReturnEntries.push(o.variable(paramName));
        }
        util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalArr(proxyReturnEntries))]), values.length, proxyExpr, this);
        return proxyExpr.callFn(values);
    };
    CompileView.prototype.createLiteralMap = function (entries) {
        var proxyExpr = o.THIS_EXPR.prop("_map_" + this.literalMapCount++);
        var proxyParams = [];
        var proxyReturnEntries = [];
        var values = [];
        for (var i = 0; i < entries.length; i++) {
            var paramName = "p" + i;
            proxyParams.push(new o.FnParam(paramName));
            proxyReturnEntries.push([entries[i][0], o.variable(paramName)]);
            values.push(entries[i][1]);
        }
        util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalMap(proxyReturnEntries))]), entries.length, proxyExpr, this);
        return proxyExpr.callFn(values);
    };
    CompileView.prototype.afterNodes = function () {
        var _this = this;
        this.pipes.forEach(function (pipe) { return pipe.create(); });
        this.viewQueries.values().forEach(function (queries) { return queries.forEach(function (query) { return query.afterChildren(_this.updateViewQueriesMethod); }); });
    };
    return CompileView;
}());
exports.CompileView = CompileView;
function getViewType(component, embeddedTemplateIndex) {
    if (embeddedTemplateIndex > 0) {
        return view_type_1.ViewType.EMBEDDED;
    }
    else if (component.type.isHost) {
        return view_type_1.ViewType.HOST;
    }
    else {
        return view_type_1.ViewType.COMPONENT;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZV92aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC00bm8zWlF2Ty50bXAvYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIvY29tcGlsZV92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBaUMsMEJBQTBCLENBQUMsQ0FBQTtBQUM1RCwyQkFBd0QsZ0NBQWdDLENBQUMsQ0FBQTtBQUV6RixJQUFZLENBQUMsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQzFDLDBCQUErQixhQUFhLENBQUMsQ0FBQTtBQUM3Qyw4QkFBZ0UsaUJBQWlCLENBQUMsQ0FBQTtBQUdsRiwrQkFBNEIsa0JBQWtCLENBQUMsQ0FBQTtBQUMvQyw2QkFBMEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMzQywwQkFBdUIsb0NBQW9DLENBQUMsQ0FBQTtBQUM1RCxpQ0FLTyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzdCLHFCQU1PLFFBQVEsQ0FBQyxDQUFBO0FBSWhCO0lBd0NFLHFCQUFtQixTQUFtQyxFQUFTLFNBQXlCLEVBQ3JFLFNBQWdDLEVBQVMsTUFBb0IsRUFDN0QsU0FBaUIsRUFBUyxrQkFBa0MsRUFDNUQsd0JBQW9DO1FBM0N6RCxpQkFnS0M7UUF4SG9CLGNBQVMsR0FBVCxTQUFTLENBQTBCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBZ0I7UUFDckUsY0FBUyxHQUFULFNBQVMsQ0FBdUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQzdELGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWdCO1FBQzVELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBWTtRQXZDaEQsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFDakMsK0NBQStDO1FBQ3hDLDJCQUFzQixHQUFtQixFQUFFLENBQUM7UUFFNUMsYUFBUSxHQUFxQixFQUFFLENBQUM7UUFFaEMs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QUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxvQkFBUSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsb0JBQVEsQ0FBQyxTQUFTLENBQUM7SUFDNUIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXIsIE1hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtFdmVudEhhbmRsZXJWYXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge0NvbXBpbGVRdWVyeSwgY3JlYXRlUXVlcnlMaXN0LCBhZGRRdWVyeVRvVG9rZW5NYXB9IGZyb20gJy4vY29tcGlsZV9xdWVyeSc7XG5pbXBvcnQge05hbWVSZXNvbHZlcn0gZnJvbSAnLi9leHByZXNzaW9uX2NvbnZlcnRlcic7XG5pbXBvcnQge0NvbXBpbGVFbGVtZW50LCBDb21waWxlTm9kZX0gZnJvbSAnLi9jb21waWxlX2VsZW1lbnQnO1xuaW1wb3J0IHtDb21waWxlTWV0aG9kfSBmcm9tICcuL2NvbXBpbGVfbWV0aG9kJztcbmltcG9ydCB7Q29tcGlsZVBpcGV9IGZyb20gJy4vY29tcGlsZV9waXBlJztcbmltcG9ydCB7Vmlld1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3R5cGUnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlUGlwZU1ldGFkYXRhLFxuICBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLFxuICBDb21waWxlVG9rZW5NYXBcbn0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge1xuICBnZXRWaWV3RmFjdG9yeU5hbWUsXG4gIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IsXG4gIGNyZWF0ZURpVG9rZW5FeHByZXNzaW9uLFxuICBnZXRQcm9wZXJ0eUluVmlldyxcbiAgY3JlYXRlUHVyZVByb3h5XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0NvbXBpbGVyQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtDb21waWxlQmluZGluZ30gZnJvbSAnLi9jb21waWxlX2JpbmRpbmcnO1xuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVZpZXcgaW1wbGVtZW50cyBOYW1lUmVzb2x2ZXIge1xuICBwdWJsaWMgdmlld1R5cGU6IFZpZXdUeXBlO1xuICBwdWJsaWMgdmlld1F1ZXJpZXM6IENvbXBpbGVUb2tlbk1hcDxDb21waWxlUXVlcnlbXT47XG5cbiAgcHVibGljIG5vZGVzOiBDb21waWxlTm9kZVtdID0gW107XG4gIC8vIHJvb3Qgbm9kZXMgb3IgQXBwRWxlbWVudHMgZm9yIFZpZXdDb250YWluZXJzXG4gIHB1YmxpYyByb290Tm9kZXNPckFwcEVsZW1lbnRzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuXG4gIHB1YmxpYyBiaW5kaW5nczogQ29tcGlsZUJpbmRpbmdbXSA9IFtdO1xuXG4gIHB1YmxpYyBjbGFzc1N0YXRlbWVudHM6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgcHVibGljIGNyZWF0ZU1ldGhvZDogQ29tcGlsZU1ldGhvZDtcbiAgcHVibGljIGluamVjdG9yR2V0TWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgdXBkYXRlQ29udGVudFF1ZXJpZXNNZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHB1YmxpYyBkaXJ0eVBhcmVudFF1ZXJpZXNNZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHB1YmxpYyB1cGRhdGVWaWV3UXVlcmllc01ldGhvZDogQ29tcGlsZU1ldGhvZDtcbiAgcHVibGljIGRldGVjdENoYW5nZXNJbklucHV0c01ldGhvZDogQ29tcGlsZU1ldGhvZDtcbiAgcHVibGljIGRldGVjdENoYW5nZXNSZW5kZXJQcm9wZXJ0aWVzTWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgYWZ0ZXJDb250ZW50TGlmZWN5Y2xlQ2FsbGJhY2tzTWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgYWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzTWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgZGVzdHJveU1ldGhvZDogQ29tcGlsZU1ldGhvZDtcbiAgcHVibGljIGV2ZW50SGFuZGxlck1ldGhvZHM6IG8uQ2xhc3NNZXRob2RbXSA9IFtdO1xuXG4gIHB1YmxpYyBmaWVsZHM6IG8uQ2xhc3NGaWVsZFtdID0gW107XG4gIHB1YmxpYyBnZXR0ZXJzOiBvLkNsYXNzR2V0dGVyW10gPSBbXTtcbiAgcHVibGljIGRpc3Bvc2FibGVzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICBwdWJsaWMgc3Vic2NyaXB0aW9uczogby5FeHByZXNzaW9uW10gPSBbXTtcblxuICBwdWJsaWMgY29tcG9uZW50VmlldzogQ29tcGlsZVZpZXc7XG4gIHB1YmxpYyBwdXJlUGlwZXMgPSBuZXcgTWFwPHN0cmluZywgQ29tcGlsZVBpcGU+KCk7XG4gIHB1YmxpYyBwaXBlczogQ29tcGlsZVBpcGVbXSA9IFtdO1xuICBwdWJsaWMgdmFyaWFibGVzID0gbmV3IE1hcDxzdHJpbmcsIG8uRXhwcmVzc2lvbj4oKTtcbiAgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY2xhc3NUeXBlOiBvLlR5cGU7XG4gIHB1YmxpYyB2aWV3RmFjdG9yeTogby5SZWFkVmFyRXhwcjtcblxuICBwdWJsaWMgbGl0ZXJhbEFycmF5Q291bnQgPSAwO1xuICBwdWJsaWMgbGl0ZXJhbE1hcENvdW50ID0gMDtcbiAgcHVibGljIHBpcGVDb3VudCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBwdWJsaWMgZ2VuQ29uZmlnOiBDb21waWxlckNvbmZpZyxcbiAgICAgICAgICAgICAgcHVibGljIHBpcGVNZXRhczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdLCBwdWJsaWMgc3R5bGVzOiBvLkV4cHJlc3Npb24sXG4gICAgICAgICAgICAgIHB1YmxpYyB2aWV3SW5kZXg6IG51bWJlciwgcHVibGljIGRlY2xhcmF0aW9uRWxlbWVudDogQ29tcGlsZUVsZW1lbnQsXG4gICAgICAgICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3M6IHN0cmluZ1tdW10pIHtcbiAgICB0aGlzLmNyZWF0ZU1ldGhvZCA9IG5ldyBDb21waWxlTWV0aG9kKHRoaXMpO1xuICAgIHRoaXMuaW5qZWN0b3JHZXRNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnRRdWVyaWVzTWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG4gICAgdGhpcy5kaXJ0eVBhcmVudFF1ZXJpZXNNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXdRdWVyaWVzTWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzSW5JbnB1dHNNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNSZW5kZXJQcm9wZXJ0aWVzTWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG5cbiAgICB0aGlzLmFmdGVyQ29udGVudExpZmVjeWNsZUNhbGxiYWNrc01ldGhvZCA9IG5ldyBDb21waWxlTWV0aG9kKHRoaXMpO1xuICAgIHRoaXMuYWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzTWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG4gICAgdGhpcy5kZXN0cm95TWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG5cbiAgICB0aGlzLnZpZXdUeXBlID0gZ2V0Vmlld1R5cGUoY29tcG9uZW50LCB2aWV3SW5kZXgpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gYF9WaWV3XyR7Y29tcG9uZW50LnR5cGUubmFtZX0ke3ZpZXdJbmRleH1gO1xuICAgIHRoaXMuY2xhc3NUeXBlID0gby5pbXBvcnRUeXBlKG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtuYW1lOiB0aGlzLmNsYXNzTmFtZX0pKTtcbiAgICB0aGlzLnZpZXdGYWN0b3J5ID0gby52YXJpYWJsZShnZXRWaWV3RmFjdG9yeU5hbWUoY29tcG9uZW50LCB2aWV3SW5kZXgpKTtcbiAgICBpZiAodGhpcy52aWV3VHlwZSA9PT0gVmlld1R5cGUuQ09NUE9ORU5UIHx8IHRoaXMudmlld1R5cGUgPT09IFZpZXdUeXBlLkhPU1QpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRoaXMuZGVjbGFyYXRpb25FbGVtZW50LnZpZXcuY29tcG9uZW50VmlldztcbiAgICB9XG4gICAgdmFyIHZpZXdRdWVyaWVzID0gbmV3IENvbXBpbGVUb2tlbk1hcDxDb21waWxlUXVlcnlbXT4oKTtcbiAgICBpZiAodGhpcy52aWV3VHlwZSA9PT0gVmlld1R5cGUuQ09NUE9ORU5UKSB7XG4gICAgICB2YXIgZGlyZWN0aXZlSW5zdGFuY2UgPSBvLlRISVNfRVhQUi5wcm9wKCdjb250ZXh0Jyk7XG4gICAgICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KHRoaXMuY29tcG9uZW50LnZpZXdRdWVyaWVzLCAocXVlcnlNZXRhLCBxdWVyeUluZGV4KSA9PiB7XG4gICAgICAgIHZhciBwcm9wTmFtZSA9IGBfdmlld1F1ZXJ5XyR7cXVlcnlNZXRhLnNlbGVjdG9yc1swXS5uYW1lfV8ke3F1ZXJ5SW5kZXh9YDtcbiAgICAgICAgdmFyIHF1ZXJ5TGlzdCA9IGNyZWF0ZVF1ZXJ5TGlzdChxdWVyeU1ldGEsIGRpcmVjdGl2ZUluc3RhbmNlLCBwcm9wTmFtZSwgdGhpcyk7XG4gICAgICAgIHZhciBxdWVyeSA9IG5ldyBDb21waWxlUXVlcnkocXVlcnlNZXRhLCBxdWVyeUxpc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCB0aGlzKTtcbiAgICAgICAgYWRkUXVlcnlUb1Rva2VuTWFwKHZpZXdRdWVyaWVzLCBxdWVyeSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBjb25zdHJ1Y3RvclZpZXdRdWVyeUNvdW50ID0gMDtcbiAgICAgIHRoaXMuY29tcG9uZW50LnR5cGUuZGlEZXBzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGRlcC52aWV3UXVlcnkpKSB7XG4gICAgICAgICAgdmFyIHF1ZXJ5TGlzdCA9IG8uVEhJU19FWFBSLnByb3AoJ2RlY2xhcmF0aW9uQXBwRWxlbWVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcmllcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAua2V5KG8ubGl0ZXJhbChjb25zdHJ1Y3RvclZpZXdRdWVyeUNvdW50KyspKTtcbiAgICAgICAgICB2YXIgcXVlcnkgPSBuZXcgQ29tcGlsZVF1ZXJ5KGRlcC52aWV3UXVlcnksIHF1ZXJ5TGlzdCwgbnVsbCwgdGhpcyk7XG4gICAgICAgICAgYWRkUXVlcnlUb1Rva2VuTWFwKHZpZXdRdWVyaWVzLCBxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnZpZXdRdWVyaWVzID0gdmlld1F1ZXJpZXM7XG4gICAgdGVtcGxhdGVWYXJpYWJsZUJpbmRpbmdzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICB0aGlzLnZhcmlhYmxlcy5zZXQoZW50cnlbMV0sIG8uVEhJU19FWFBSLnByb3AoJ2xvY2FscycpLmtleShvLmxpdGVyYWwoZW50cnlbMF0pKSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuZGVjbGFyYXRpb25FbGVtZW50LmlzTnVsbCgpKSB7XG4gICAgICB0aGlzLmRlY2xhcmF0aW9uRWxlbWVudC5zZXRFbWJlZGRlZFZpZXcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgY2FsbFBpcGUobmFtZTogc3RyaW5nLCBpbnB1dDogby5FeHByZXNzaW9uLCBhcmdzOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gICAgdmFyIGNvbXBWaWV3ID0gdGhpcy5jb21wb25lbnRWaWV3O1xuICAgIHZhciBwaXBlID0gY29tcFZpZXcucHVyZVBpcGVzLmdldChuYW1lKTtcbiAgICBpZiAoaXNCbGFuayhwaXBlKSkge1xuICAgICAgcGlwZSA9IG5ldyBDb21waWxlUGlwZShjb21wVmlldywgbmFtZSk7XG4gICAgICBpZiAocGlwZS5wdXJlKSB7XG4gICAgICAgIGNvbXBWaWV3LnB1cmVQaXBlcy5zZXQobmFtZSwgcGlwZSk7XG4gICAgICB9XG4gICAgICBjb21wVmlldy5waXBlcy5wdXNoKHBpcGUpO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZS5jYWxsKHRoaXMsIFtpbnB1dF0uY29uY2F0KGFyZ3MpKTtcbiAgfVxuXG4gIGdldFZhcmlhYmxlKG5hbWU6IHN0cmluZyk6IG8uRXhwcmVzc2lvbiB7XG4gICAgaWYgKG5hbWUgPT0gRXZlbnRIYW5kbGVyVmFycy5ldmVudC5uYW1lKSB7XG4gICAgICByZXR1cm4gRXZlbnRIYW5kbGVyVmFycy5ldmVudDtcbiAgICB9XG4gICAgdmFyIGN1cnJWaWV3OiBDb21waWxlVmlldyA9IHRoaXM7XG4gICAgdmFyIHJlc3VsdCA9IGN1cnJWaWV3LnZhcmlhYmxlcy5nZXQobmFtZSk7XG4gICAgd2hpbGUgKGlzQmxhbmsocmVzdWx0KSAmJiBpc1ByZXNlbnQoY3VyclZpZXcuZGVjbGFyYXRpb25FbGVtZW50LnZpZXcpKSB7XG4gICAgICBjdXJyVmlldyA9IGN1cnJWaWV3LmRlY2xhcmF0aW9uRWxlbWVudC52aWV3O1xuICAgICAgcmVzdWx0ID0gY3VyclZpZXcudmFyaWFibGVzLmdldChuYW1lKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChyZXN1bHQpKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlJblZpZXcocmVzdWx0LCB0aGlzLCBjdXJyVmlldyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUxpdGVyYWxBcnJheSh2YWx1ZXM6IG8uRXhwcmVzc2lvbltdKTogby5FeHByZXNzaW9uIHtcbiAgICB2YXIgcHJveHlFeHByID0gby5USElTX0VYUFIucHJvcChgX2Fycl8ke3RoaXMubGl0ZXJhbEFycmF5Q291bnQrK31gKTtcbiAgICB2YXIgcHJveHlQYXJhbXM6IG8uRm5QYXJhbVtdID0gW107XG4gICAgdmFyIHByb3h5UmV0dXJuRW50cmllczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcmFtTmFtZSA9IGBwJHtpfWA7XG4gICAgICBwcm94eVBhcmFtcy5wdXNoKG5ldyBvLkZuUGFyYW0ocGFyYW1OYW1lKSk7XG4gICAgICBwcm94eVJldHVybkVudHJpZXMucHVzaChvLnZhcmlhYmxlKHBhcmFtTmFtZSkpO1xuICAgIH1cbiAgICBjcmVhdGVQdXJlUHJveHkoby5mbihwcm94eVBhcmFtcywgW25ldyBvLlJldHVyblN0YXRlbWVudChvLmxpdGVyYWxBcnIocHJveHlSZXR1cm5FbnRyaWVzKSldKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCwgcHJveHlFeHByLCB0aGlzKTtcbiAgICByZXR1cm4gcHJveHlFeHByLmNhbGxGbih2YWx1ZXMpO1xuICB9XG5cbiAgY3JlYXRlTGl0ZXJhbE1hcChlbnRyaWVzOiBBcnJheTxBcnJheTxzdHJpbmcgfCBvLkV4cHJlc3Npb24+Pik6IG8uRXhwcmVzc2lvbiB7XG4gICAgdmFyIHByb3h5RXhwciA9IG8uVEhJU19FWFBSLnByb3AoYF9tYXBfJHt0aGlzLmxpdGVyYWxNYXBDb3VudCsrfWApO1xuICAgIHZhciBwcm94eVBhcmFtczogby5GblBhcmFtW10gPSBbXTtcbiAgICB2YXIgcHJveHlSZXR1cm5FbnRyaWVzOiBBcnJheTxBcnJheTxzdHJpbmcgfCBvLkV4cHJlc3Npb24+PiA9IFtdO1xuICAgIHZhciB2YWx1ZXM6IG8uRXhwcmVzc2lvbltdID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFyYW1OYW1lID0gYHAke2l9YDtcbiAgICAgIHByb3h5UGFyYW1zLnB1c2gobmV3IG8uRm5QYXJhbShwYXJhbU5hbWUpKTtcbiAgICAgIHByb3h5UmV0dXJuRW50cmllcy5wdXNoKFtlbnRyaWVzW2ldWzBdLCBvLnZhcmlhYmxlKHBhcmFtTmFtZSldKTtcbiAgICAgIHZhbHVlcy5wdXNoKDxvLkV4cHJlc3Npb24+ZW50cmllc1tpXVsxXSk7XG4gICAgfVxuICAgIGNyZWF0ZVB1cmVQcm94eShvLmZuKHByb3h5UGFyYW1zLCBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KG8ubGl0ZXJhbE1hcChwcm94eVJldHVybkVudHJpZXMpKV0pLFxuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzLmxlbmd0aCwgcHJveHlFeHByLCB0aGlzKTtcbiAgICByZXR1cm4gcHJveHlFeHByLmNhbGxGbih2YWx1ZXMpO1xuICB9XG5cbiAgYWZ0ZXJOb2RlcygpIHtcbiAgICB0aGlzLnBpcGVzLmZvckVhY2goKHBpcGUpID0+IHBpcGUuY3JlYXRlKCkpO1xuICAgIHRoaXMudmlld1F1ZXJpZXMudmFsdWVzKCkuZm9yRWFjaChcbiAgICAgICAgKHF1ZXJpZXMpID0+IHF1ZXJpZXMuZm9yRWFjaCgocXVlcnkpID0+IHF1ZXJ5LmFmdGVyQ2hpbGRyZW4odGhpcy51cGRhdGVWaWV3UXVlcmllc01ldGhvZCkpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRWaWV3VHlwZShjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgZW1iZWRkZWRUZW1wbGF0ZUluZGV4OiBudW1iZXIpOiBWaWV3VHlwZSB7XG4gIGlmIChlbWJlZGRlZFRlbXBsYXRlSW5kZXggPiAwKSB7XG4gICAgcmV0dXJuIFZpZXdUeXBlLkVNQkVEREVEO1xuICB9IGVsc2UgaWYgKGNvbXBvbmVudC50eXBlLmlzSG9zdCkge1xuICAgIHJldHVybiBWaWV3VHlwZS5IT1NUO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBWaWV3VHlwZS5DT01QT05FTlQ7XG4gIH1cbn1cbiJdfQ==