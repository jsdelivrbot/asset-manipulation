/* */ 
"format esm";
import { PromiseWrapper } from 'angular2/src/facade/async';
import { isPresent } from 'angular2/src/facade/lang';
import { RouteData, BLANK_ROUTE_DATA } from '../../instruction';
export class SyncRouteHandler {
    constructor(componentType, data) {
        this.componentType = componentType;
        /** @internal */
        this._resolvedComponent = null;
        this._resolvedComponent = PromiseWrapper.resolve(componentType);
        this.data = isPresent(data) ? new RouteData(data) : BLANK_ROUTE_DATA;
    }
    resolveComponentType() { return this._resolvedComponent; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY19yb3V0ZV9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC05RDFpR1FWRy50bXAvYW5ndWxhcjIvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9oYW5kbGVycy9zeW5jX3JvdXRlX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkI7T0FDakQsRUFBQyxTQUFTLEVBQU8sTUFBTSwwQkFBMEI7T0FHakQsRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUI7QUFHN0Q7SUFNRSxZQUFtQixhQUFtQixFQUFFLElBQTJCO1FBQWhELGtCQUFhLEdBQWIsYUFBYSxDQUFNO1FBSHRDLGdCQUFnQjtRQUNoQix1QkFBa0IsR0FBaUIsSUFBSSxDQUFDO1FBR3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxvQkFBb0IsS0FBbUIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge2lzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtSb3V0ZUhhbmRsZXJ9IGZyb20gJy4vcm91dGVfaGFuZGxlcic7XG5pbXBvcnQge1JvdXRlRGF0YSwgQkxBTktfUk9VVEVfREFUQX0gZnJvbSAnLi4vLi4vaW5zdHJ1Y3Rpb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBTeW5jUm91dGVIYW5kbGVyIGltcGxlbWVudHMgUm91dGVIYW5kbGVyIHtcbiAgcHVibGljIGRhdGE6IFJvdXRlRGF0YTtcblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlZENvbXBvbmVudDogUHJvbWlzZTxhbnk+ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50VHlwZTogVHlwZSwgZGF0YT86IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgdGhpcy5fcmVzb2x2ZWRDb21wb25lbnQgPSBQcm9taXNlV3JhcHBlci5yZXNvbHZlKGNvbXBvbmVudFR5cGUpO1xuICAgIHRoaXMuZGF0YSA9IGlzUHJlc2VudChkYXRhKSA/IG5ldyBSb3V0ZURhdGEoZGF0YSkgOiBCTEFOS19ST1VURV9EQVRBO1xuICB9XG5cbiAgcmVzb2x2ZUNvbXBvbmVudFR5cGUoKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3Jlc29sdmVkQ29tcG9uZW50OyB9XG59XG4iXX0=