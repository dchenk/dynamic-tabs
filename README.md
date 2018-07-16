# DynamicTabs
This is a lightweight JavaScript library for tab UI elements, styled loosely by material design principles.

## Demo: [opensource.widerwebs.com/dynamic-tabs](https://opensource.widerwebs.com/dynamic-tabs/)

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

To register the container of the tabs (here it is the div with `id="section-tabs"`), create the tabs object using the `new` keyword:
```
const myTabs = new DynamicTabs(container-ID); // Or instead of the container ID pass in an HTMLElement.
```

Create any number of tab elements inside the `dynamic-tabs-list` element, and make sure each tab has the class `dynamic-tab`.
Each tab needs to be registered (you may use [`registerAllTabs`](https://github.com/dchenk/dynamic-tabs/blob/master/docs/docs.md#registeralltabs))
to appear in the layout and be used.

Look at the file at [docs/index.html](https://github.com/dchenk/dynamic-tabs/blob/master/docs/index.html) for an example of how you can set up the tabs.

**Complete documentation** is available at [docs/docs.md](https://github.com/dchenk/dynamic-tabs/blob/master/docs/docs.md)

Some methods of the DynamicTabs class are marked as private within the code (such as `refreshLayout` and `scrollLeft`); they
are used internally by the class to implement all the cool dynamic magic. If you find yourself needing to use any of these,
please file an issue.

## Goal and Features

This library is intended to be extremely lightweight so that it loads fast and works smoothly on all devices. The required
HTML is fairly minimal, and the animations are kept at the CSS level where possible to ensure that the JavaScript thread is
not used as much. Needless to say, the tabs are fully responsive on all screens and work on all popular browsers.

Why use the word *dynamic* in the name? It's not just about how the switching between the tabs works with the indicator bar
sliding with a smooth animation from tab to tab. The point is that the entire tabs component dynamically reacts to changes
in its size, such as when the window's or the container's parent element's width changes.
