/* */ 
"format cjs";
'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var DefaultKeyValueDifferFactory = (function () {
    function DefaultKeyValueDifferFactory() {
    }
    DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || lang_1.isJsObject(obj); };
    DefaultKeyValueDifferFactory.prototype.create = function (cdRef) { return new DefaultKeyValueDiffer(); };
    DefaultKeyValueDifferFactory = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], DefaultKeyValueDifferFactory);
    return DefaultKeyValueDifferFactory;
}());
exports.DefaultKeyValueDifferFactory = DefaultKeyValueDifferFactory;
var DefaultKeyValueDiffer = (function () {
    function DefaultKeyValueDiffer() {
        this._records = new Map();
        this._mapHead = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
        get: function () {
            return this._additionsHead !== null || this._changesHead !== null ||
                this._removalsHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
        var record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
        var record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.diff = function (map) {
        if (lang_1.isBlank(map))
            map = collection_1.MapWrapper.createFromPairs([]);
        if (!(map instanceof Map || lang_1.isJsObject(map))) {
            throw new exceptions_1.BaseException("Error trying to diff '" + map + "'");
        }
        if (this.check(map)) {
            return this;
        }
        else {
            return null;
        }
    };
    DefaultKeyValueDiffer.prototype.onDestroy = function () { };
    DefaultKeyValueDiffer.prototype.check = function (map) {
        var _this = this;
        this._reset();
        var records = this._records;
        var oldSeqRecord = this._mapHead;
        var lastOldSeqRecord = null;
        var lastNewSeqRecord = null;
        var seqChanged = false;
        this._forEach(map, function (value, key) {
            var newSeqRecord;
            if (oldSeqRecord !== null && key === oldSeqRecord.key) {
                newSeqRecord = oldSeqRecord;
                if (!lang_1.looseIdentical(value, oldSeqRecord.currentValue)) {
                    oldSeqRecord.previousValue = oldSeqRecord.currentValue;
                    oldSeqRecord.currentValue = value;
                    _this._addToChanges(oldSeqRecord);
                }
            }
            else {
                seqChanged = true;
                if (oldSeqRecord !== null) {
                    oldSeqRecord._next = null;
                    _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                    _this._addToRemovals(oldSeqRecord);
                }
                if (records.has(key)) {
                    newSeqRecord = records.get(key);
                }
                else {
                    newSeqRecord = new KeyValueChangeRecord(key);
                    records.set(key, newSeqRecord);
                    newSeqRecord.currentValue = value;
                    _this._addToAdditions(newSeqRecord);
                }
            }
            if (seqChanged) {
                if (_this._isInRemovals(newSeqRecord)) {
                    _this._removeFromRemovals(newSeqRecord);
                }
                if (lastNewSeqRecord == null) {
                    _this._mapHead = newSeqRecord;
                }
                else {
                    lastNewSeqRecord._next = newSeqRecord;
                }
            }
            lastOldSeqRecord = oldSeqRecord;
            lastNewSeqRecord = newSeqRecord;
            oldSeqRecord = oldSeqRecord === null ? null : oldSeqRecord._next;
        });
        this._truncate(lastOldSeqRecord, oldSeqRecord);
        return this.isDirty;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var record;
            // Record the state of the mapping
            for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            // todo(vicb) once assert is supported
            // assert(() {
            //  var r = _changesHead;
            //  while (r != null) {
            //    var nextRecord = r._nextChanged;
            //    r._nextChanged = null;
            //    r = nextRecord;
            //  }
            //
            //  r = _additionsHead;
            //  while (r != null) {
            //    var nextRecord = r._nextAdded;
            //    r._nextAdded = null;
            //    r = nextRecord;
            //  }
            //
            //  r = _removalsHead;
            //  while (r != null) {
            //    var nextRecord = r._nextRemoved;
            //    r._nextRemoved = null;
            //    r = nextRecord;
            //  }
            //
            //  return true;
            //});
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = this._removalsTail = null;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._truncate = function (lastRecord, record) {
        while (record !== null) {
            if (lastRecord === null) {
                this._mapHead = null;
            }
            else {
                lastRecord._next = null;
            }
            var nextRecord = record._next;
            // todo(vicb) assert
            // assert((() {
            //  record._next = null;
            //  return true;
            //}));
            this._addToRemovals(record);
            lastRecord = record;
            record = nextRecord;
        }
        for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
            rec.previousValue = rec.currentValue;
            rec.currentValue = null;
            this._records.delete(rec.key);
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._isInRemovals = function (record) {
        return record === this._removalsHead || record._nextRemoved !== null ||
            record._prevRemoved !== null;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._addToRemovals = function (record) {
        // todo(vicb) assert
        // assert(record._next == null);
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        // assert(record._nextRemoved == null);
        // assert(record._prevRemoved == null);
        if (this._removalsHead === null) {
            this._removalsHead = this._removalsTail = record;
        }
        else {
            this._removalsTail._nextRemoved = record;
            record._prevRemoved = this._removalsTail;
            this._removalsTail = record;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._removeFromSeq = function (prev, record) {
        var next = record._next;
        if (prev === null) {
            this._mapHead = next;
        }
        else {
            prev._next = next;
        }
        // todo(vicb) assert
        // assert((() {
        //  record._next = null;
        //  return true;
        //})());
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._removeFromRemovals = function (record) {
        // todo(vicb) assert
        // assert(record._next == null);
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        record._prevRemoved = record._nextRemoved = null;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
        // todo(vicb): assert
        // assert(record._next == null);
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        // assert(record._nextRemoved == null);
        // assert(record._prevRemoved == null);
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
        // todo(vicb) assert
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        // assert(record._nextRemoved == null);
        // assert(record._prevRemoved == null);
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    };
    DefaultKeyValueDiffer.prototype.toString = function () {
        var items = [];
        var previous = [];
        var changes = [];
        var additions = [];
        var removals = [];
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            items.push(lang_1.stringify(record));
        }
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            previous.push(lang_1.stringify(record));
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            changes.push(lang_1.stringify(record));
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            additions.push(lang_1.stringify(record));
        }
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            removals.push(lang_1.stringify(record));
        }
        return "map: " + items.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" +
            "additions: " + additions.join(', ') + "\n" + "changes: " + changes.join(', ') + "\n" +
            "removals: " + removals.join(', ') + "\n";
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            collection_1.StringMapWrapper.forEach(obj, fn);
        }
    };
    return DefaultKeyValueDiffer;
}());
exports.DefaultKeyValueDiffer = DefaultKeyValueDiffer;
var KeyValueChangeRecord = (function () {
    function KeyValueChangeRecord(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextChanged = null;
    }
    KeyValueChangeRecord.prototype.toString = function () {
        return lang_1.looseIdentical(this.previousValue, this.currentValue) ?
            lang_1.stringify(this.key) :
            (lang_1.stringify(this.key) + '[' + lang_1.stringify(this.previousValue) + '->' +
                lang_1.stringify(this.currentValue) + ']');
    };
    return KeyValueChangeRecord;
}());
exports.KeyValueChangeRecord = KeyValueChangeRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRubzNaUXZPLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2RpZmZlcnMvZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJCQUEyQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzVFLHFCQUFvRSwwQkFBMEIsQ0FBQyxDQUFBO0FBQy9GLDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBSzdEO0lBQUE7SUFJQSxDQUFDO0lBSEMsK0NBQVEsR0FBUixVQUFTLEdBQVEsSUFBYSxNQUFNLENBQUMsR0FBRyxZQUFZLEdBQUcsSUFBSSxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RSw2Q0FBTSxHQUFOLFVBQU8sS0FBd0IsSUFBb0IsTUFBTSxDQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFKMUY7UUFBQyxZQUFLLEVBQUU7O29DQUFBO0lBS1IsbUNBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLG9DQUE0QiwrQkFJeEMsQ0FBQTtBQUVEO0lBQUE7UUFDVSxhQUFRLEdBQWtCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEMsYUFBUSxHQUF5QixJQUFJLENBQUM7UUFDdEMscUJBQWdCLEdBQXlCLElBQUksQ0FBQztRQUM5QyxpQkFBWSxHQUF5QixJQUFJLENBQUM7UUFDMUMsaUJBQVksR0FBeUIsSUFBSSxDQUFDO1FBQzFDLG1CQUFjLEdBQXlCLElBQUksQ0FBQztRQUM1QyxtQkFBYyxHQUF5QixJQUFJLENBQUM7UUFDNUMsa0JBQWEsR0FBeUIsSUFBSSxDQUFDO1FBQzNDLGtCQUFhLEdBQXlCLElBQUksQ0FBQztJQXVUckQsQ0FBQztJQXJUQyxzQkFBSSwwQ0FBTzthQUFY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c0NvbnRlbnQiOlsiaW1wb3J0IHtNYXBXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtzdHJpbmdpZnksIGxvb3NlSWRlbnRpY2FsLCBpc0pzT2JqZWN0LCBDT05TVCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuaW1wb3J0IHtLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJGYWN0b3J5fSBmcm9tICcuLi9kaWZmZXJzL2tleXZhbHVlX2RpZmZlcnMnO1xuXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIERlZmF1bHRLZXlWYWx1ZURpZmZlckZhY3RvcnkgaW1wbGVtZW50cyBLZXlWYWx1ZURpZmZlckZhY3Rvcnkge1xuICBzdXBwb3J0cyhvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgTWFwIHx8IGlzSnNPYmplY3Qob2JqKTsgfVxuXG4gIGNyZWF0ZShjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpOiBLZXlWYWx1ZURpZmZlciB7IHJldHVybiBuZXcgRGVmYXVsdEtleVZhbHVlRGlmZmVyKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRLZXlWYWx1ZURpZmZlciBpbXBsZW1lbnRzIEtleVZhbHVlRGlmZmVyIHtcbiAgcHJpdmF0ZSBfcmVjb3JkczogTWFwPGFueSwgYW55PiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBfbWFwSGVhZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9wcmV2aW91c01hcEhlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2hhbmdlc0hlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2hhbmdlc1RhaWw6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfYWRkaXRpb25zSGVhZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9hZGRpdGlvbnNUYWlsOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX3JlbW92YWxzSGVhZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9yZW1vdmFsc1RhaWw6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcblxuICBnZXQgaXNEaXJ0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkaXRpb25zSGVhZCAhPT0gbnVsbCB8fCB0aGlzLl9jaGFuZ2VzSGVhZCAhPT0gbnVsbCB8fFxuICAgICAgICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgIT09IG51bGw7XG4gIH1cblxuICBmb3JFYWNoSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX21hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0KSB7XG4gICAgICBmbihyZWNvcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hQcmV2aW91c0l0ZW0oZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9wcmV2aW91c01hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UHJldmlvdXMpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaENoYW5nZWRJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fY2hhbmdlc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0Q2hhbmdlZCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoQWRkZWRJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fYWRkaXRpb25zSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRBZGRlZCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoUmVtb3ZlZEl0ZW0oZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9yZW1vdmFsc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UmVtb3ZlZCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBkaWZmKG1hcDogTWFwPGFueSwgYW55Pik6IGFueSB7XG4gICAgaWYgKGlzQmxhbmsobWFwKSkgbWFwID0gTWFwV3JhcHBlci5jcmVhdGVGcm9tUGFpcnMoW10pO1xuICAgIGlmICghKG1hcCBpbnN0YW5jZW9mIE1hcCB8fCBpc0pzT2JqZWN0KG1hcCkpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgRXJyb3IgdHJ5aW5nIHRvIGRpZmYgJyR7bWFwfSdgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGVjayhtYXApKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgb25EZXN0cm95KCkge31cblxuICBjaGVjayhtYXA6IE1hcDxhbnksIGFueT4pOiBib29sZWFuIHtcbiAgICB0aGlzLl9yZXNldCgpO1xuICAgIHZhciByZWNvcmRzID0gdGhpcy5fcmVjb3JkcztcbiAgICB2YXIgb2xkU2VxUmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IHRoaXMuX21hcEhlYWQ7XG4gICAgdmFyIGxhc3RPbGRTZXFSZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgICB2YXIgbGFzdE5ld1NlcVJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAgIHZhciBzZXFDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB0aGlzLl9mb3JFYWNoKG1hcCwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHZhciBuZXdTZXFSZWNvcmQ7XG4gICAgICBpZiAob2xkU2VxUmVjb3JkICE9PSBudWxsICYmIGtleSA9PT0gb2xkU2VxUmVjb3JkLmtleSkge1xuICAgICAgICBuZXdTZXFSZWNvcmQgPSBvbGRTZXFSZWNvcmQ7XG4gICAgICAgIGlmICghbG9vc2VJZGVudGljYWwodmFsdWUsIG9sZFNlcVJlY29yZC5jdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgb2xkU2VxUmVjb3JkLnByZXZpb3VzVmFsdWUgPSBvbGRTZXFSZWNvcmQuY3VycmVudFZhbHVlO1xuICAgICAgICAgIG9sZFNlcVJlY29yZC5jdXJyZW50VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLl9hZGRUb0NoYW5nZXMob2xkU2VxUmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VxQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGlmIChvbGRTZXFSZWNvcmQgIT09IG51bGwpIHtcbiAgICAgICAgICBvbGRTZXFSZWNvcmQuX25leHQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21TZXEobGFzdE9sZFNlcVJlY29yZCwgb2xkU2VxUmVjb3JkKTtcbiAgICAgICAgICB0aGlzLl9hZGRUb1JlbW92YWxzKG9sZFNlcVJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlY29yZHMuaGFzKGtleSkpIHtcbiAgICAgICAgICBuZXdTZXFSZWNvcmQgPSByZWNvcmRzLmdldChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1NlcVJlY29yZCA9IG5ldyBLZXlWYWx1ZUNoYW5nZVJlY29yZChrZXkpO1xuICAgICAgICAgIHJlY29yZHMuc2V0KGtleSwgbmV3U2VxUmVjb3JkKTtcbiAgICAgICAgICBuZXdTZXFSZWNvcmQuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5fYWRkVG9BZGRpdGlvbnMobmV3U2VxUmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VxQ2hhbmdlZCkge1xuICAgICAgICBpZiAodGhpcy5faXNJblJlbW92YWxzKG5ld1NlcVJlY29yZCkpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tUmVtb3ZhbHMobmV3U2VxUmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdE5ld1NlcVJlY29yZCA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fbWFwSGVhZCA9IG5ld1NlcVJlY29yZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYXN0TmV3U2VxUmVjb3JkLl9uZXh0ID0gbmV3U2VxUmVjb3JkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsYXN0T2xkU2VxUmVjb3JkID0gb2xkU2VxUmVjb3JkO1xuICAgICAgbGFzdE5ld1NlcVJlY29yZCA9IG5ld1NlcVJlY29yZDtcbiAgICAgIG9sZFNlcVJlY29yZCA9IG9sZFNlcVJlY29yZCA9PT0gbnVsbCA/IG51bGwgOiBvbGRTZXFSZWNvcmQuX25leHQ7XG4gICAgfSk7XG4gICAgdGhpcy5fdHJ1bmNhdGUobGFzdE9sZFNlcVJlY29yZCwgb2xkU2VxUmVjb3JkKTtcbiAgICByZXR1cm4gdGhpcy5pc0RpcnR5O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuaXNEaXJ0eSkge1xuICAgICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG4gICAgICAvLyBSZWNvcmQgdGhlIHN0YXRlIG9mIHRoZSBtYXBwaW5nXG4gICAgICBmb3IgKHJlY29yZCA9IHRoaXMuX3ByZXZpb3VzTWFwSGVhZCA9IHRoaXMuX21hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0KSB7XG4gICAgICAgIHJlY29yZC5fbmV4dFByZXZpb3VzID0gcmVjb3JkLl9uZXh0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2NoYW5nZXNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dENoYW5nZWQpIHtcbiAgICAgICAgcmVjb3JkLnByZXZpb3VzVmFsdWUgPSByZWNvcmQuY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2FkZGl0aW9uc0hlYWQ7IHJlY29yZCAhPSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRBZGRlZCkge1xuICAgICAgICByZWNvcmQucHJldmlvdXNWYWx1ZSA9IHJlY29yZC5jdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRvZG8odmljYikgb25jZSBhc3NlcnQgaXMgc3VwcG9ydGVkXG4gICAgICAvLyBhc3NlcnQoKCkge1xuICAgICAgLy8gIHZhciByID0gX2NoYW5nZXNIZWFkO1xuICAgICAgLy8gIHdoaWxlIChyICE9IG51bGwpIHtcbiAgICAgIC8vICAgIHZhciBuZXh0UmVjb3JkID0gci5fbmV4dENoYW5nZWQ7XG4gICAgICAvLyAgICByLl9uZXh0Q2hhbmdlZCA9IG51bGw7XG4gICAgICAvLyAgICByID0gbmV4dFJlY29yZDtcbiAgICAgIC8vICB9XG4gICAgICAvL1xuICAgICAgLy8gIHIgPSBfYWRkaXRpb25zSGVhZDtcbiAgICAgIC8vICB3aGlsZSAociAhPSBudWxsKSB7XG4gICAgICAvLyAgICB2YXIgbmV4dFJlY29yZCA9IHIuX25leHRBZGRlZDtcbiAgICAgIC8vICAgIHIuX25leHRBZGRlZCA9IG51bGw7XG4gICAgICAvLyAgICByID0gbmV4dFJlY29yZDtcbiAgICAgIC8vICB9XG4gICAgICAvL1xuICAgICAgLy8gIHIgPSBfcmVtb3ZhbHNIZWFkO1xuICAgICAgLy8gIHdoaWxlIChyICE9IG51bGwpIHtcbiAgICAgIC8vICAgIHZhciBuZXh0UmVjb3JkID0gci5fbmV4dFJlbW92ZWQ7XG4gICAgICAvLyAgICByLl9uZXh0UmVtb3ZlZCA9IG51bGw7XG4gICAgICAvLyAgICByID0gbmV4dFJlY29yZDtcbiAgICAgIC8vICB9XG4gICAgICAvL1xuICAgICAgLy8gIHJldHVybiB0cnVlO1xuICAgICAgLy99KTtcbiAgICAgIHRoaXMuX2NoYW5nZXNIZWFkID0gdGhpcy5fY2hhbmdlc1RhaWwgPSBudWxsO1xuICAgICAgdGhpcy5fYWRkaXRpb25zSGVhZCA9IHRoaXMuX2FkZGl0aW9uc1RhaWwgPSBudWxsO1xuICAgICAgdGhpcy5fcmVtb3ZhbHNIZWFkID0gdGhpcy5fcmVtb3ZhbHNUYWlsID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF90cnVuY2F0ZShsYXN0UmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCwgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIHdoaWxlIChyZWNvcmQgIT09IG51bGwpIHtcbiAgICAgIGlmIChsYXN0UmVjb3JkID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX21hcEhlYWQgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFzdFJlY29yZC5fbmV4dCA9IG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgbmV4dFJlY29yZCA9IHJlY29yZC5fbmV4dDtcbiAgICAgIC8vIHRvZG8odmljYikgYXNzZXJ0XG4gICAgICAvLyBhc3NlcnQoKCgpIHtcbiAgICAgIC8vICByZWNvcmQuX25leHQgPSBudWxsO1xuICAgICAgLy8gIHJldHVybiB0cnVlO1xuICAgICAgLy99KSk7XG4gICAgICB0aGlzLl9hZGRUb1JlbW92YWxzKHJlY29yZCk7XG4gICAgICBsYXN0UmVjb3JkID0gcmVjb3JkO1xuICAgICAgcmVjb3JkID0gbmV4dFJlY29yZDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciByZWM6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gdGhpcy5fcmVtb3ZhbHNIZWFkOyByZWMgIT09IG51bGw7IHJlYyA9IHJlYy5fbmV4dFJlbW92ZWQpIHtcbiAgICAgIHJlYy5wcmV2aW91c1ZhbHVlID0gcmVjLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHJlYy5jdXJyZW50VmFsdWUgPSBudWxsO1xuICAgICAgdGhpcy5fcmVjb3Jkcy5kZWxldGUocmVjLmtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaXNJblJlbW92YWxzKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICByZXR1cm4gcmVjb3JkID09PSB0aGlzLl9yZW1vdmFsc0hlYWQgfHwgcmVjb3JkLl9uZXh0UmVtb3ZlZCAhPT0gbnVsbCB8fFxuICAgICAgICAgICByZWNvcmQuX3ByZXZSZW1vdmVkICE9PSBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWRkVG9SZW1vdmFscyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgLy8gdG9kbyh2aWNiKSBhc3NlcnRcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0ID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRBZGRlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0Q2hhbmdlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0UmVtb3ZlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9wcmV2UmVtb3ZlZCA9PSBudWxsKTtcbiAgICBpZiAodGhpcy5fcmVtb3ZhbHNIZWFkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgPSB0aGlzLl9yZW1vdmFsc1RhaWwgPSByZWNvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbW92YWxzVGFpbC5fbmV4dFJlbW92ZWQgPSByZWNvcmQ7XG4gICAgICByZWNvcmQuX3ByZXZSZW1vdmVkID0gdGhpcy5fcmVtb3ZhbHNUYWlsO1xuICAgICAgdGhpcy5fcmVtb3ZhbHNUYWlsID0gcmVjb3JkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlbW92ZUZyb21TZXEocHJldjogS2V5VmFsdWVDaGFuZ2VSZWNvcmQsIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICB2YXIgbmV4dCA9IHJlY29yZC5fbmV4dDtcbiAgICBpZiAocHJldiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWFwSGVhZCA9IG5leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXYuX25leHQgPSBuZXh0O1xuICAgIH1cbiAgICAvLyB0b2RvKHZpY2IpIGFzc2VydFxuICAgIC8vIGFzc2VydCgoKCkge1xuICAgIC8vICByZWNvcmQuX25leHQgPSBudWxsO1xuICAgIC8vICByZXR1cm4gdHJ1ZTtcbiAgICAvL30pKCkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVtb3ZlRnJvbVJlbW92YWxzKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICAvLyB0b2RvKHZpY2IpIGFzc2VydFxuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dEFkZGVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRDaGFuZ2VkID09IG51bGwpO1xuXG4gICAgdmFyIHByZXYgPSByZWNvcmQuX3ByZXZSZW1vdmVkO1xuICAgIHZhciBuZXh0ID0gcmVjb3JkLl9uZXh0UmVtb3ZlZDtcbiAgICBpZiAocHJldiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZhbHNIZWFkID0gbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldi5fbmV4dFJlbW92ZWQgPSBuZXh0O1xuICAgIH1cbiAgICBpZiAobmV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZhbHNUYWlsID0gcHJldjtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dC5fcHJldlJlbW92ZWQgPSBwcmV2O1xuICAgIH1cbiAgICByZWNvcmQuX3ByZXZSZW1vdmVkID0gcmVjb3JkLl9uZXh0UmVtb3ZlZCA9IG51bGw7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRUb0FkZGl0aW9ucyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgLy8gdG9kbyh2aWNiKTogYXNzZXJ0XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0QWRkZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dENoYW5nZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dFJlbW92ZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fcHJldlJlbW92ZWQgPT0gbnVsbCk7XG4gICAgaWYgKHRoaXMuX2FkZGl0aW9uc0hlYWQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZGl0aW9uc0hlYWQgPSB0aGlzLl9hZGRpdGlvbnNUYWlsID0gcmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNUYWlsLl9uZXh0QWRkZWQgPSByZWNvcmQ7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNUYWlsID0gcmVjb3JkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FkZFRvQ2hhbmdlcyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgLy8gdG9kbyh2aWNiKSBhc3NlcnRcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0QWRkZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dENoYW5nZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dFJlbW92ZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fcHJldlJlbW92ZWQgPT0gbnVsbCk7XG4gICAgaWYgKHRoaXMuX2NoYW5nZXNIZWFkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFuZ2VzSGVhZCA9IHRoaXMuX2NoYW5nZXNUYWlsID0gcmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jaGFuZ2VzVGFpbC5fbmV4dENoYW5nZWQgPSByZWNvcmQ7XG4gICAgICB0aGlzLl9jaGFuZ2VzVGFpbCA9IHJlY29yZDtcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHZhciBwcmV2aW91cyA9IFtdO1xuICAgIHZhciBjaGFuZ2VzID0gW107XG4gICAgdmFyIGFkZGl0aW9ucyA9IFtdO1xuICAgIHZhciByZW1vdmFscyA9IFtdO1xuICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuXG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9tYXBIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dCkge1xuICAgICAgaXRlbXMucHVzaChzdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgfVxuICAgIGZvciAocmVjb3JkID0gdGhpcy5fcHJldmlvdXNNYXBIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dFByZXZpb3VzKSB7XG4gICAgICBwcmV2aW91cy5wdXNoKHN0cmluZ2lmeShyZWNvcmQpKTtcbiAgICB9XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9jaGFuZ2VzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRDaGFuZ2VkKSB7XG4gICAgICBjaGFuZ2VzLnB1c2goc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgIH1cbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2FkZGl0aW9uc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0QWRkZWQpIHtcbiAgICAgIGFkZGl0aW9ucy5wdXNoKHN0cmluZ2lmeShyZWNvcmQpKTtcbiAgICB9XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9yZW1vdmFsc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UmVtb3ZlZCkge1xuICAgICAgcmVtb3ZhbHMucHVzaChzdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwibWFwOiBcIiArIGl0ZW1zLmpvaW4oJywgJykgKyBcIlxcblwiICsgXCJwcmV2aW91czogXCIgKyBwcmV2aW91cy5qb2luKCcsICcpICsgXCJcXG5cIiArXG4gICAgICAgICAgIFwiYWRkaXRpb25zOiBcIiArIGFkZGl0aW9ucy5qb2luKCcsICcpICsgXCJcXG5cIiArIFwiY2hhbmdlczogXCIgKyBjaGFuZ2VzLmpvaW4oJywgJykgKyBcIlxcblwiICtcbiAgICAgICAgICAgXCJyZW1vdmFsczogXCIgKyByZW1vdmFscy5qb2luKCcsICcpICsgXCJcXG5cIjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZvckVhY2gob2JqLCBmbjogRnVuY3Rpb24pIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAoPE1hcDxhbnksIGFueT4+b2JqKS5mb3JFYWNoKDxhbnk+Zm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gob2JqLCBmbik7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVZhbHVlQ2hhbmdlUmVjb3JkIHtcbiAgcHJldmlvdXNWYWx1ZTogYW55ID0gbnVsbDtcbiAgY3VycmVudFZhbHVlOiBhbnkgPSBudWxsO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRQcmV2aW91czogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0OiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRBZGRlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0UmVtb3ZlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9wcmV2UmVtb3ZlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0Q2hhbmdlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IGFueSkge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBsb29zZUlkZW50aWNhbCh0aGlzLnByZXZpb3VzVmFsdWUsIHRoaXMuY3VycmVudFZhbHVlKSA/XG4gICAgICAgICAgICAgICBzdHJpbmdpZnkodGhpcy5rZXkpIDpcbiAgICAgICAgICAgICAgIChzdHJpbmdpZnkodGhpcy5rZXkpICsgJ1snICsgc3RyaW5naWZ5KHRoaXMucHJldmlvdXNWYWx1ZSkgKyAnLT4nICtcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkodGhpcy5jdXJyZW50VmFsdWUpICsgJ10nKTtcbiAgfVxufVxuIl19