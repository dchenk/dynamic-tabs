# DynamicTabs
This is a lightweight JavaScript library for tab UI elements, styled loosely by material design principles.

## Usage

Install with npm:
```
npm install dynamic-tabs
```

In your code, import the main JavaScript file:
```
import DynamicTabs from "dynamic-tabs" // the DynamicTabs identifier can be anything
```
and the required CSS file:
```
import "dynamic-tabs/dist/tabs.css"
```

The tabs component requires HTML markup with this kind of layout and these CSS classes:
```
<div id="section-tabs" class="dynamic-tabs">
    <div class="dynamic-tabs-arrow"></div>
    <div class="dynamic-tabs-framer">
        <nav class="dynamic-tabs-list">
            <div class="dynamic-tab">FIRST</div>
            <div class="dynamic-tab">THE SECOND</div>
            <div class="dynamic-tab">THIRD THING</div>
            <div class="dynamic-tab">FOURTH</div>
            <div class="dynamic-tab">FIVE</div>
            <div class="dynamic-tab">ELEMENT SIX</div>
            <div class="dynamic-tab">SEVENTH</div>
        </nav>
        <div class="dynamic-tabs-indicator"><div class="dt-indicator-bar"></div></div>
    </div>
    <div class="dynamic-tabs-arrow"></div>
</div>
```
There needs to be a wrapping element with a `dynamic-tabs` class; an element as shown with class `dynamic-tabs-arrow`; a wrapper of the tabs with class `dynamic-tabs-list` containing children each with the class `dynamic-tab`; and after (and outside) that a `<div class="dynamic-tabs-indicator"><div class="dt-indicator-bar"></div></div>` element; and then outside of that an element as shown with the class `dynamic-tabs-arrow`.

To register the container of the tabs (here it is the div with `id="section-tabs"`), create the tabs object using the `new` keyword: `const myTabs = new DynamicTabs(container-ID)`.

Create any number of tab elements inside `dynamic-tabs-list` and make sure each tab has the class `dynamic-tab`. If you'll be initializing them by providing an array of IDs to the `DynamicTabs` constructor function, then each of the tabs will need an ID. Each tab needs to be registered.

Look at the file at [docs/index.html](https://github.com/dchenk/dynamic-tabs/blob/master/docs/index.html) for an example of how you can set up the tabs.

## Demo: [opensource.widerwebs.com/dynamic-tabs](https://opensource.widerwebs.com/dynamic-tabs/)

## Methods available on the DynamicTabs object:

registerTabs(tabIDs: String[, idPrefix: String])

registerAllTabs()

registerTab(tab: HTMLElement[, refreshLayout: Boolean])

deregisterAllTabs()

deregisterTab(tabIndex: Number[, refreshLayout: Boolean])

setActiveTabIndex(newIndex: Number)

addSwitchCallback(callback: Callable(oldTabIndex, newTabIndex))

### Other methods (private)

*The following methods can be used directly, but you shouldn't need them because they are used by the library for all of the
dynamic magic. If you find yourself needing to use any of these, please file an issue.*

refreshLayout()

scrollToActiveTab()

resetIndicator()

scrollLeft(framerWidths: Number)

scrollRight(framerWidths: Number)

setTabsOffset(offset: Number)

showArrow(leftRightAll: Enum("left", "right", "all"))

hideArrow(leftRightAll: Enum("left", "right", "all"))

## Goal and Features

This library is intended to be extremely lightweight so that it loads fast and works smoothly on all devices. The required
HTML is fairly minimal, and the animations are kept at the CSS level where possible to ensure that the JavaScript thread is
not used as much. Needless to say, the tabs are fully responsive on all screens and work on all popular browsers.

Why use the word *dynamic* in the name? It's not just about how the switching between the tabs works with the indicator bar
sliding with a smooth animation from tab to tab. The point is that the entire tabs component dynamically reacts to changes
in its size, such as when the window's or the container's parent element's width changes.
