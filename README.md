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
    <div class="dynamic-tabs-arrow"><div class="material-icons" aria-label="scroll left">navigate_before</div></div>
    <div class="dynamic-tabs-framer">
        <nav class="dynamic-tabs-list">
            <div class="dynamic-tab" id="my-tab-first">FIRST</div>
            <div class="dynamic-tab" id="my-tab-second">THE SECOND</div>
            <div class="dynamic-tab" id="my-tab-third">THIRD THING</div>
            <div class="dynamic-tab" id="my-tab-fourth">FOURTH</div>
            <div class="dynamic-tab" id="my-tab-fifth">FIVE</div>
            <div class="dynamic-tab" id="my-tab-sixth">ELEMENT SIX</div>
            <div class="dynamic-tab" id="my-tab-seventh">SEVENTH</div>
        </nav>
        <div class="dynamic-tabs-indicator"><div class="dt-indicator-bar"></div></div>
    </div>
    <div class="dynamic-tabs-arrow"><div class="material-icons" aria-label="scroll right">navigate_next</div></div>
</div>
```
There needs to be a wrapping element with a `dynamic-tabs` class; an element as shown with class `dynamic-tabs-arrow`; a wrapper of the tabs with class `dynamic-tabs-list` containing direct children each with the class `dynamic-tab`; and after (and outside) that a `<div class="dynamic-tabs-indicator"><div class="dt-indicator-bar"></div></div>` element; and then outside of that an element as shown with the class `dynamic-tabs-arrow`.

Currently, if you're using this exact HTML markup, you need to also include `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">` in the document head.
In the next big release the left and right arrow icons will be inserted automatically, so this dependency won't be needed.

To register the container of the tabs (here it is the div with `id="section-tabs"`), create the tabs object using the `new` keyword: `const myTabs = new DynamicTabs(container-ID)`.

Create any number of tab elements inside `dynamic-tabs-list` and make sure each tab has the class `dynamic-tab`. If you'll be initializing them by providing an array of IDs to the `DynamicTabs` constructor function, then each of the tabs will need an ID. Each tab needs to be registered.

Look at the file at `docs/index.html` for an example of how to set up the tabs.

## Demo: https://dchenk.github.io/dynamic-tabs

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

This library is intended to be extremely lightweight. It thus loads fast and works smoothly. The animations are kept at the
CSS level where possible to ensure that the JavaScript thread is not used as much.

Why use the word *dynamic* in the name? It's not just about how the switching between the tabs works with the indicator bar
sliding with a smooth animation from tab to tab. The entire tabs component dynamically reacts to changes in its size, such
as when the window width changes or the container's parent element's size changes.
