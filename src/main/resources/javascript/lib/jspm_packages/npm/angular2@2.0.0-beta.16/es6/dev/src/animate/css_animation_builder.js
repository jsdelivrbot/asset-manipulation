/* */ 
"format esm";
import { CssAnimationOptions } from './css_animation_options';
import { Animation } from './animation';
export class CssAnimationBuilder {
    /**
     * Accepts public properties for CssAnimationBuilder
     */
    constructor(browserDetails) {
        this.browserDetails = browserDetails;
        /** @type {CssAnimationOptions} */
        this.data = new CssAnimationOptions();
    }
    /**
     * Adds a temporary class that will be removed at the end of the animation
     * @param className
     */
    addAnimationClass(className) {
        this.data.animationClasses.push(className);
        return this;
    }
    /**
     * Adds a class that will remain on the element after the animation has finished
     * @param className
     */
    addClass(className) {
        this.data.classesToAdd.push(className);
        return this;
    }
    /**
     * Removes a class from the element
     * @param className
     */
    removeClass(className) {
        this.data.classesToRemove.push(className);
        return this;
    }
    /**
     * Sets the animation duration (and overrides any defined through CSS)
     * @param duration
     */
    setDuration(duration) {
        this.data.duration = duration;
        return this;
    }
    /**
     * Sets the animation delay (and overrides any defined through CSS)
     * @param delay
     */
    setDelay(delay) {
        this.data.delay = delay;
        return this;
    }
    /**
     * Sets styles for both the initial state and the destination state
     * @param from
     * @param to
     */
    setStyles(from, to) {
        return this.setFromStyles(from).setToStyles(to);
    }
    /**
     * Sets the initial styles for the animation
     * @param from
     */
    setFromStyles(from) {
        this.data.fromStyles = from;
        return this;
    }
    /**
     * Sets the destination styles for the animation
     * @param to
     */
    setToStyles(to) {
        this.data.toStyles = to;
        return this;
    }
    /**
     * Starts the animation and returns a promise
     * @param element
     */
    start(element) {
        return new Animation(element, this.data, this.browserDetails);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2FuaW1hdGlvbl9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC05RDFpR1FWRy50bXAvYW5ndWxhcjIvc3JjL2FuaW1hdGUvY3NzX2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUI7T0FDcEQsRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhO0FBR3JDO0lBSUU7O09BRUc7SUFDSCxZQUFtQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOakQsa0NBQWtDO1FBQ2xDLFNBQUksR0FBd0IsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0lBS0YsQ0FBQztJQUVyRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBQyxTQUFpQjtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxTQUFpQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsU0FBaUI7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLENBQUMsSUFBMEIsRUFBRSxFQUF3QjtRQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxJQUEwQjtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsRUFBd0I7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQW9CO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEUsQ0FBQztBQUNILENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q3NzQW5pbWF0aW9uT3B0aW9uc30gZnJvbSAnLi9jc3NfYW5pbWF0aW9uX29wdGlvbnMnO1xuaW1wb3J0IHtBbmltYXRpb259IGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJy4vYnJvd3Nlcl9kZXRhaWxzJztcblxuZXhwb3J0IGNsYXNzIENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAvKiogQHR5cGUge0Nzc0FuaW1hdGlvbk9wdGlvbnN9ICovXG4gIGRhdGE6IENzc0FuaW1hdGlvbk9wdGlvbnMgPSBuZXcgQ3NzQW5pbWF0aW9uT3B0aW9ucygpO1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHB1YmxpYyBwcm9wZXJ0aWVzIGZvciBDc3NBbmltYXRpb25CdWlsZGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYnJvd3NlckRldGFpbHM6IEJyb3dzZXJEZXRhaWxzKSB7fVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGVtcG9yYXJ5IGNsYXNzIHRoYXQgd2lsbCBiZSByZW1vdmVkIGF0IHRoZSBlbmQgb2YgdGhlIGFuaW1hdGlvblxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRBbmltYXRpb25DbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAgIHRoaXMuZGF0YS5hbmltYXRpb25DbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdGhhdCB3aWxsIHJlbWFpbiBvbiB0aGUgZWxlbWVudCBhZnRlciB0aGUgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZFxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAgIHRoaXMuZGF0YS5jbGFzc2VzVG9BZGQucHVzaChjbGFzc05hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgdGhpcy5kYXRhLmNsYXNzZXNUb1JlbW92ZS5wdXNoKGNsYXNzTmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uIChhbmQgb3ZlcnJpZGVzIGFueSBkZWZpbmVkIHRocm91Z2ggQ1NTKVxuICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICovXG4gIHNldER1cmF0aW9uKGR1cmF0aW9uOiBudW1iZXIpOiBDc3NBbmltYXRpb25CdWlsZGVyIHtcbiAgICB0aGlzLmRhdGEuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhbmltYXRpb24gZGVsYXkgKGFuZCBvdmVycmlkZXMgYW55IGRlZmluZWQgdGhyb3VnaCBDU1MpXG4gICAqIEBwYXJhbSBkZWxheVxuICAgKi9cbiAgc2V0RGVsYXkoZGVsYXk6IG51bWJlcik6IENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAgIHRoaXMuZGF0YS5kZWxheSA9IGRlbGF5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgc3R5bGVzIGZvciBib3RoIHRoZSBpbml0aWFsIHN0YXRlIGFuZCB0aGUgZGVzdGluYXRpb24gc3RhdGVcbiAgICogQHBhcmFtIGZyb21cbiAgICogQHBhcmFtIHRvXG4gICAqL1xuICBzZXRTdHlsZXMoZnJvbToge1trZXk6IHN0cmluZ106IGFueX0sIHRvOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAgIHJldHVybiB0aGlzLnNldEZyb21TdHlsZXMoZnJvbSkuc2V0VG9TdHlsZXModG8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGluaXRpYWwgc3R5bGVzIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSBmcm9tXG4gICAqL1xuICBzZXRGcm9tU3R5bGVzKGZyb206IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgdGhpcy5kYXRhLmZyb21TdHlsZXMgPSBmcm9tO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlc3RpbmF0aW9uIHN0eWxlcyBmb3IgdGhlIGFuaW1hdGlvblxuICAgKiBAcGFyYW0gdG9cbiAgICovXG4gIHNldFRvU3R5bGVzKHRvOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAgIHRoaXMuZGF0YS50b1N0eWxlcyA9IHRvO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgYW5pbWF0aW9uIGFuZCByZXR1cm5zIGEgcHJvbWlzZVxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKi9cbiAgc3RhcnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBBbmltYXRpb24ge1xuICAgIHJldHVybiBuZXcgQW5pbWF0aW9uKGVsZW1lbnQsIHRoaXMuZGF0YSwgdGhpcy5icm93c2VyRGV0YWlscyk7XG4gIH1cbn1cbiJdfQ==