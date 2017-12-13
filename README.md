# dynamic-tabs
A lightweight JavaScript library for tab UI elements, styled (somewhat) by material design principles.

## Usage

Install with npm:
```bash
npm install --save dynamic-tabs
```

The tabs component requires HTML markup with this kind of layout and these CSS classes:
```
<div id="section-tabs" class="dynamic-tabs">
    <div class="dynamic-tab-arrow arrow-left"><div class="material-icons" aria-label="scroll left">navigate_before</div></div>
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
    <div class="dynamic-tab-arrow arrow-right"><div class="material-icons" aria-label="scroll right">navigate_next</div></div>
</div>
```
To register the container of the tabs (here it is the div with `id="section-tabs"`), create the JavaScript tabs object with the constructor: `var myTabs = new DynamicTabs({container ID})`.

Create any number of tab elements inside `dynamic-tabs-list` and make sure each tab has the class `dynamic-tab`. If you'll be initializing them by providing an array of IDs to the `DynamicTabs` constructor function, then each of the tabs will need an ID. Each tab needs to be registered.

Look at the file `index.html` for an example of how to set up the tabs.

## Demo: https://dchenk.github.io/dynamic-tabs

## Methods available on the DynamicTabs object:

registerTabs(tabIDs: String[, idPrefix:String])

registerAllTabs()

registerTab(tab: HTMLElement[, refreshLayout: Boolean])

deregisterAllTabs()

deregisterTab(tabIndex: Number[, refreshLayout: Boolean])

setActiveTabIndex(newIndex: Number)

addSwitchCallback(callback: Callable(oldTabIndex, newTabIndex))

#### The following methods can be used directly, but you shouldn't need them because they are implemented to perform all the dynamic activity automatically. (If you find yourself needing to use any of them, please file an issue.)

refreshLayout()

scrollToActiveTab()

resetIndicator()

scrollLeft(framerWidths: Number)

scrollRight(framerWidths: Number)

setTabsOffset(offset: Number)

showArrow(leftRightAll: Enum("left", "right", "all"))

hideArrow(leftRightAll: Enum("left", "right", "all"))
