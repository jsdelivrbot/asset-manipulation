/* */ 
"format esm";
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isBlank } from 'angular2/src/facade/lang';
export class Tree {
    constructor(_nodes) {
        this._nodes = _nodes;
    }
    get root() { return this._nodes[0]; }
    parent(t) {
        let index = this._nodes.indexOf(t);
        return index > 0 ? this._nodes[index - 1] : null;
    }
    children(t) {
        let index = this._nodes.indexOf(t);
        return index > -1 && index < this._nodes.length - 1 ? [this._nodes[index + 1]] : [];
    }
    firstChild(t) {
        let index = this._nodes.indexOf(t);
        return index > -1 && index < this._nodes.length - 1 ? this._nodes[index + 1] : null;
    }
    pathToRoot(t) {
        let index = this._nodes.indexOf(t);
        return index > -1 ? this._nodes.slice(0, index + 1) : null;
    }
}
export class UrlSegment {
    constructor(segment, parameters, outlet) {
        this.segment = segment;
        this.parameters = parameters;
        this.outlet = outlet;
    }
}
export class RouteSegment {
    constructor(urlSegments, parameters, outlet, type, componentFactory) {
        this.urlSegments = urlSegments;
        this.outlet = outlet;
        this._type = type;
        this._componentFactory = componentFactory;
        this._parameters = parameters;
    }
    getParam(param) { return this._parameters[param]; }
    get type() { return this._type; }
}
export function equalSegments(a, b) {
    if (isBlank(a) && !isBlank(b))
        return false;
    if (!isBlank(a) && isBlank(b))
        return false;
    return a._type === b._type && StringMapWrapper.equals(a._parameters, b._parameters);
}
export function routeSegmentComponentFactory(a) {
    return a._componentFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTlEMWlHUVZHLnRtcC9hbmd1bGFyMi9zcmMvYWx0X3JvdXRlci9zZWdtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FDTyxFQUFDLGdCQUFnQixFQUFjLE1BQU0sZ0NBQWdDO09BQ3JFLEVBQU8sT0FBTyxFQUFDLE1BQU0sMEJBQTBCO0FBRXREO0lBQ0UsWUFBb0IsTUFBVztRQUFYLFdBQU0sR0FBTixNQUFNLENBQUs7SUFBRyxDQUFDO0lBRW5DLElBQUksSUFBSSxLQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QyxNQUFNLENBQUMsQ0FBSTtRQUNULElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNuRCxDQUFDO0lBRUQsUUFBUSxDQUFDLENBQUk7UUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0RixDQUFDO0lBRUQsVUFBVSxDQUFDLENBQUk7UUFDYixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RGLENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBSTtRQUNiLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0QsQ0FBQztBQUNILENBQUM7QUFFRDtJQUNFLFlBQW1CLE9BQWUsRUFBUyxVQUFtQyxFQUMzRCxNQUFjO1FBRGQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQzNELFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0FBQ3ZDLENBQUM7QUFFRDtJQVVFLFlBQW1CLFdBQXlCLEVBQUUsVUFBbUMsRUFDOUQsTUFBYyxFQUFFLElBQVUsRUFBRSxnQkFBa0M7UUFEOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLElBQUksSUFBSSxLQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsOEJBQThCLENBQWUsRUFBRSxDQUFlO0lBQzVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUM1QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBRUQsNkNBQTZDLENBQWU7SUFDMUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1R5cGUsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbm9kZXM6IFRbXSkge31cblxuICBnZXQgcm9vdCgpOiBUIHsgcmV0dXJuIHRoaXMuX25vZGVzWzBdOyB9XG5cbiAgcGFyZW50KHQ6IFQpOiBUIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9ub2Rlcy5pbmRleE9mKHQpO1xuICAgIHJldHVybiBpbmRleCA+IDAgPyB0aGlzLl9ub2Rlc1tpbmRleCAtIDFdIDogbnVsbDtcbiAgfVxuXG4gIGNoaWxkcmVuKHQ6IFQpOiBUW10ge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX25vZGVzLmluZGV4T2YodCk7XG4gICAgcmV0dXJuIGluZGV4ID4gLTEgJiYgaW5kZXggPCB0aGlzLl9ub2Rlcy5sZW5ndGggLSAxID8gW3RoaXMuX25vZGVzW2luZGV4ICsgMV1dIDogW107XG4gIH1cblxuICBmaXJzdENoaWxkKHQ6IFQpOiBUIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9ub2Rlcy5pbmRleE9mKHQpO1xuICAgIHJldHVybiBpbmRleCA+IC0xICYmIGluZGV4IDwgdGhpcy5fbm9kZXMubGVuZ3RoIC0gMSA/IHRoaXMuX25vZGVzW2luZGV4ICsgMV0gOiBudWxsO1xuICB9XG5cbiAgcGF0aFRvUm9vdCh0OiBUKTogVFtdIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9ub2Rlcy5pbmRleE9mKHQpO1xuICAgIHJldHVybiBpbmRleCA+IC0xID8gdGhpcy5fbm9kZXMuc2xpY2UoMCwgaW5kZXggKyAxKSA6IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVybFNlZ21lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VnbWVudDogc3RyaW5nLCBwdWJsaWMgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgIHB1YmxpYyBvdXRsZXQ6IHN0cmluZykge31cbn1cblxuZXhwb3J0IGNsYXNzIFJvdXRlU2VnbWVudCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3R5cGU6IFR5cGU7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTtcblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXJsU2VnbWVudHM6IFVybFNlZ21lbnRbXSwgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgIHB1YmxpYyBvdXRsZXQ6IHN0cmluZywgdHlwZTogVHlwZSwgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5O1xuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuICB9XG5cbiAgZ2V0UGFyYW0ocGFyYW06IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzW3BhcmFtXTsgfVxuXG4gIGdldCB0eXBlKCk6IFR5cGUgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxTZWdtZW50cyhhOiBSb3V0ZVNlZ21lbnQsIGI6IFJvdXRlU2VnbWVudCk6IGJvb2xlYW4ge1xuICBpZiAoaXNCbGFuayhhKSAmJiAhaXNCbGFuayhiKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzQmxhbmsoYSkgJiYgaXNCbGFuayhiKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYS5fdHlwZSA9PT0gYi5fdHlwZSAmJiBTdHJpbmdNYXBXcmFwcGVyLmVxdWFscyhhLl9wYXJhbWV0ZXJzLCBiLl9wYXJhbWV0ZXJzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRlU2VnbWVudENvbXBvbmVudEZhY3RvcnkoYTogUm91dGVTZWdtZW50KTogQ29tcG9uZW50RmFjdG9yeSB7XG4gIHJldHVybiBhLl9jb21wb25lbnRGYWN0b3J5O1xufSJdfQ==