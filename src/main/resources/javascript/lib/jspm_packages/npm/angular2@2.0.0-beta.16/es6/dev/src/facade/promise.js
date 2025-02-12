/* */ 
"format esm";
export class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
export class PromiseWrapper {
    static resolve(obj) { return Promise.resolve(obj); }
    static reject(obj, _) { return Promise.reject(obj); }
    // Note: We can't rename this method into `catch`, as this is not a valid
    // method name in Dart.
    static catchError(promise, onError) {
        return promise.catch(onError);
    }
    static all(promises) {
        if (promises.length == 0)
            return Promise.resolve([]);
        return Promise.all(promises);
    }
    static then(promise, success, rejection) {
        return promise.then(success, rejection);
    }
    static wrap(computation) {
        return new Promise((res, rej) => {
            try {
                res(computation());
            }
            catch (e) {
                rej(e);
            }
        });
    }
    static scheduleMicrotask(computation) {
        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, (_) => { });
    }
    static isPromise(obj) { return obj instanceof Promise; }
    static completer() { return new PromiseCompleter(); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOUQxaUdRVkcudG1wL2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtJQUtFO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUM7QUFFRDtJQUNFLE9BQU8sT0FBTyxDQUFJLEdBQU0sSUFBZ0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRFLE9BQU8sTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDLElBQWtCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RSx5RUFBeUU7SUFDekUsdUJBQXVCO0lBQ3ZCLE9BQU8sVUFBVSxDQUFJLE9BQW1CLEVBQ25CLE9BQTJDO1FBQzlELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLEdBQUcsQ0FBSSxRQUE0QjtRQUN4QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBTyxPQUFtQixFQUFFLE9BQXlDLEVBQzlELFNBQTJEO1FBQzNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUksV0FBb0I7UUFDakMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUc7WUFDMUIsSUFBSSxDQUFDO2dCQUNILEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3JCLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLGlCQUFpQixDQUFDLFdBQXNCO1FBQzdDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELE9BQU8sU0FBUyxDQUFDLEdBQVEsSUFBYSxNQUFNLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFdEUsT0FBTyxTQUFTLEtBQTZCLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixFQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIFByb21pc2VDb21wbGV0ZXI8Uj4ge1xuICBwcm9taXNlOiBQcm9taXNlPFI+O1xuICByZXNvbHZlOiAodmFsdWU/OiBSIHwgUHJvbWlzZUxpa2U8Uj4pID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yPzogYW55LCBzdGFja1RyYWNlPzogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb21pc2VXcmFwcGVyIHtcbiAgc3RhdGljIHJlc29sdmU8VD4ob2JqOiBUKTogUHJvbWlzZTxUPiB7IHJldHVybiBQcm9taXNlLnJlc29sdmUob2JqKTsgfVxuXG4gIHN0YXRpYyByZWplY3Qob2JqOiBhbnksIF8pOiBQcm9taXNlPGFueT4geyByZXR1cm4gUHJvbWlzZS5yZWplY3Qob2JqKTsgfVxuXG4gIC8vIE5vdGU6IFdlIGNhbid0IHJlbmFtZSB0aGlzIG1ldGhvZCBpbnRvIGBjYXRjaGAsIGFzIHRoaXMgaXMgbm90IGEgdmFsaWRcbiAgLy8gbWV0aG9kIG5hbWUgaW4gRGFydC5cbiAgc3RhdGljIGNhdGNoRXJyb3I8VD4ocHJvbWlzZTogUHJvbWlzZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogKGVycm9yOiBhbnkpID0+IFQgfCBQcm9taXNlTGlrZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKG9uRXJyb3IpO1xuICB9XG5cbiAgc3RhdGljIGFsbDxUPihwcm9taXNlczogKFQgfCBQcm9taXNlPFQ+KVtdKTogUHJvbWlzZTxUW10+IHtcbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09IDApIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBzdGF0aWMgdGhlbjxULCBVPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzdWNjZXNzOiAodmFsdWU6IFQpID0+IFUgfCBQcm9taXNlTGlrZTxVPixcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0aW9uPzogKGVycm9yOiBhbnksIHN0YWNrPzogYW55KSA9PiBVIHwgUHJvbWlzZUxpa2U8VT4pOiBQcm9taXNlPFU+IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKHN1Y2Nlc3MsIHJlamVjdGlvbik7XG4gIH1cblxuICBzdGF0aWMgd3JhcDxUPihjb21wdXRhdGlvbjogKCkgPT4gVCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcyhjb21wdXRhdGlvbigpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHNjaGVkdWxlTWljcm90YXNrKGNvbXB1dGF0aW9uOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKFByb21pc2VXcmFwcGVyLnJlc29sdmUobnVsbCksIGNvbXB1dGF0aW9uLCAoXykgPT4ge30pO1xuICB9XG5cbiAgc3RhdGljIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgUHJvbWlzZTsgfVxuXG4gIHN0YXRpYyBjb21wbGV0ZXI8VD4oKTogUHJvbWlzZUNvbXBsZXRlcjxUPiB7IHJldHVybiBuZXcgUHJvbWlzZUNvbXBsZXRlcjxUPigpOyB9XG59XG4iXX0=