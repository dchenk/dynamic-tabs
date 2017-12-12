function DynamicTabs(containerID) {

	if (!containerID) {
		console.log("ERROR: To register dynamic tabs, pass in the ID of a node containing the tabs");
		return
	}

	this.container = document.getElementById(containerID);

	this.registeredTabs = [];

	this.activeTabIndex = 0;

	this.switchCallbacks = [];

	this.framer = this.container.getElementsByClassName("dynamic-tabs-framer")[0];

	this.framerShift = 0; // the amount in pixels that the tabs have been scrolled

	this.framerWidth = 0;

	this.totalTabsWidth = 0;

	this.indicatorBar = this.container.getElementsByClassName("dt-indicator-bar")[0];

	this.arrowLeft = this.container.getElementsByClassName("arrow-left")[0];

	this.arrowRight = this.container.getElementsByClassName("arrow-right")[0];

	this.arrowLeft.addEventListener("click", this.scrollLeft.bind(this, 0.85));

	this.arrowRight.addEventListener("click", this.scrollRight.bind(this, 0.85));

	window.addEventListener("resize", this.refreshLayout.bind(this));

}

// register the tabs with the IDs in the tabsIDs array; optionally include a prefix to prepend before each ID
DynamicTabs.prototype.registerTabs = function(tabIDs, idPrefix) {

	if (tabIDs === undefined || tabIDs.length === 0) {
		console.log("ERROR: Must pass in an array of tab IDs to register")
		return;
	}

	// console.log("REGISTERING TABS. Current tabs:", JSON.stringify(this.registeredTabs))

	// The idPrefix parameter can be set to prefix each targeted tab element by ID with the string.
	if (idPrefix === undefined) {
		idPrefix = "";
	}

	for (let i = 0; i < tabIDs.length; i++) {
		this.registerTab(document.getElementById(idPrefix+tabIDs[i]))
	}

	// console.log("tabs registered; the object:", this)
	// console.log("tabs registered; the tabs:", JSON.parse(JSON.stringify(this.registeredTabs)));

	setActiveHighlight.call(this, 0); // always reset when registering new tabs; avoid resetting indicator now
	this.refreshLayout();

}

// register all tabs (elements inside of the container that have the class "dynamic-tab")
DynamicTabs.prototype.registerAllTabs = function() {

	"use strict";

	const tabs = this.container.getElementsByClassName("dynamic-tab")

	if (tabs.length === 0) {
		console.log("ERROR: There are no tabs to register")
		return;
	}

	for (let i = 0; i < tabs.length; i++) {
		this.registerTab(tabs[i]);
	}

	setActiveHighlight.call(this, 0); // always reset when registering new tabs; avoid resetting indicator now
	this.refreshLayout();

}

// pass in the tab element itself to register it (add to registeredTabs array)
DynamicTabs.prototype.registerTab = function(tab, refreshLayout) {

	"use strict";

	// remove the display:none style
	tab.setAttribute("data-dtr", "y");

	// The length of the registeredTabs array will be the index of the new tab.
	const newTabIndex = this.registeredTabs.length;

	// initialize
	this.registeredTabs.push({
		el: tab,
		rect: {
			left: 0,
			width: 0
		},
		oc: function() { // onclick callback named
			this.setActiveTabIndex(newTabIndex);
			for (let i = 0; i < this.switchCallbacks.length; i++) {
				this.switchCallbacks[i](this.activeTabIndex, newTabIndex);
			}
		}
	})

	// add click listener to fire off callback upon switching tabs
	tab.addEventListener("click", this.registeredTabs[newTabIndex].oc.bind(this));

	// when registering a single tab programmatically, pass in true for refreshLayout
	if (refreshLayout !== undefined && refreshLayout) {
		this.refreshLayout();
	}

}

DynamicTabs.prototype.deregisterAllTabs = function() {
	for (let i = this.registeredTabs.length; i > 0; i--) {
		this.deregisterTab(0);
	}
	this.switchCallbacks = [];
	this.refreshLayout();
}

DynamicTabs.prototype.deregisterTab = function(tabIndex, refreshLayout) {

	"use strict";

	// remove event listener
	this.registeredTabs[tabIndex].el.removeEventListener("click", this.registeredTabs[tabIndex].oc)

	// remove data-dtr to hide
	this.registeredTabs[tabIndex].el.removeAttribute("data-dtr");

	// remove active attribute (in case it is active)
	this.registeredTabs[tabIndex].el.removeAttribute("data-dtactive");

	const ml = this.registeredTabs[tabIndex].el.style["margin-left"];
	if (ml !== "0px" && ml !== "") {
		this.registeredTabs[tabIndex].el.style["margin-left"] = "0px";
	}

	// splice it out of the array
	this.registeredTabs.splice(tabIndex, 1);

	if (this.registeredTabs.length === 0) {
		this.indicatorBar.style.width = "0";
	}

	// when registering a single component programmatically, pass in true for refreshLayout
	if (refreshLayout !== undefined && refreshLayout) {
		this.refreshLayout();
	}

}

DynamicTabs.prototype.addSwitchCallback = function(callback) {
	this.switchCallbacks.push(callback);
}

DynamicTabs.prototype.refreshLayout = function() {

	"use strict";

	if (this.registeredTabs.length === 0) {
		return;
	}

	// console.log("REFRESHING layout; this.activeTabIndex:", this.activeTabIndex)

	this.framerWidth = this.framer.getBoundingClientRect().width;

	this.totalTabsWidth = 0;
	let widths = this.registeredTabs.map(tab => {
		const w = tab.el.getBoundingClientRect().width;
		this.totalTabsWidth += w
		return w
	})
	// console.log("All widths", widths)

	// console.log("TOTAL TABS WIDTH:", this.totalTabsWidth)

	if (this.totalTabsWidth > this.framerWidth) {
		this.framer.style["text-align"] = "left";
		// console.log("framer shift", this.framerShift)
		resetRects.call(this, 0, widths);
		this.scrollToActiveTab(); // indicator will be reset
	} else {
		this.framer.style["text-align"] = "center";
		this.setTabsOffset(0); // reset the scroll amount (margin-left of the first tab) to 0
		resetRects.call(this, (this.framerWidth - this.totalTabsWidth) / 2, widths);
		this.resetIndicator(); // reset with new tab dimensions (Vue will run setActiveTabIndex anyway, but that's okay)
		this.hideArrow();
	}

}

// in the app you shouldn't ever have to provide true for the "force" parameter; it's just there for the library to ensure that the active tab is always set correctly
DynamicTabs.prototype.setActiveTabIndex = function(newIndex) {

	// console.log("this.registeredTabs.length before setActiveTabIndex", this.registeredTabs.length)
	// console.log("this.activeTabIndex before setActiveTabIndex", this.activeTabIndex)

	// Reset if there are no registered tabs.
	if (this.registeredTabs.length === 0) {
		this.activeTabIndex = 0;
		return;
	}

	// If something weird is happening, we don't want an invalid index of an array accessed.
	if (newIndex >= this.registeredTabs.length) {
		console.log("ERROR: Invalid tab index failed to set");
		return;
	}

	this.activeTabIndex = newIndex;
	this.setActiveHighlight(newIndex);
	this.scrollToActiveTab(); // Re-position the indicator

	// console.log("this.registeredTabs.length after setActiveTabIndex", this.registeredTabs.length)
	// console.log("this.activeTabIndex after setActiveTabIndex", this.activeTabIndex)

}

DynamicTabs.prototype.scrollToActiveTab = function() {

	// return if there's no need to scroll anywhere
	if (this.totalTabsWidth <= this.framerWidth) { // the total number of framer widths that equal the length of totalTabsWidth
		this.resetIndicator();
		return;
	}

	let activeTab = this.registeredTabs[this.activeTabIndex];

	// pixels to the left edge, relative to the left edge of framer
	const leftEdge = activeTab.rect.left + this.framerShift;

	// pixels to the right edge, relative to the left edge of framer
	const rightEdge = activeTab.rect.left + activeTab.rect.width + this.framerShift;

	if (leftEdge < 0) { // scroll to the left

		// console.log("leftEdge", leftEdge);

		// the left edge of activeTab is in the negative nThFrame
		const nThFrame = Math.abs(leftEdge) / this.framerWidth;

		// console.log("nThFrame", nThFrame);

		// console.log("-(nThFrame - ((activeTab.rect.width * 1.1) / this.framerWidth))", nThFrame + ((activeTab.rect.width * 1.1) / this.framerWidth))

		this.scrollLeft(nThFrame + ((activeTab.rect.width * 1.1) / this.framerWidth));

	} else if (rightEdge > this.framerWidth) { // scroll to the right

		// console.log("rightEdge", rightEdge);

		// the right edge of activeTab is in the nThFrame
		const nThFrame = rightEdge / this.framerWidth;

		// console.log("nThFrame", nThFrame);

		// console.log("nThFrame - ((activeTab.rect.width * 1.1) / this.framerWidth)", nThFrame + ((activeTab.rect.width * 1.1) / this.framerWidth))

		this.scrollRight(nThFrame - ((activeTab.rect.width * 1.1) / this.framerWidth));

	} else { // there is no scrolling needed

		if (this.activeTabIndex === 0) { // if active tab is the first one
			this.hideArrow("left");
		}
		this.resetIndicator(); // reset because not scrolling and not resetting in setActiveTabIndex

	}

	// check if you should be able to scroll right
	const lastTab = this.registeredTabs[this.registeredTabs.length - 1].rect;
	// console.log("lastTab", lastTab)
	const rightEdgeLast = lastTab.left + lastTab.width + this.framerShift;
	if (rightEdgeLast > this.framerWidth) {
		this.showArrow("right");
	}

}

DynamicTabs.prototype.resetIndicator = function() {
	let indx = this.activeTabIndex;
	if (this.activeTabIndex >= this.registeredTabs.length) { // if moving from a set of tabs that's bigger than the new one, and we were previously on the last one
		indx = this.registeredTabs.length - 1; // act as if we were on the index as the index of the new last tab, but don't set this tab as active; the app should set the tab index manually
	}
	// console.log("|||| RESETTING INDICATOR TO index", indx, " left:", this.framerShift + this.registeredTabs[indx].rect.left)
	// console.log("this.registeredTabs[indx]", JSON.parse(JSON.stringify(this.registeredTabs[indx])))
	// console.log("this.registeredTabs[indx].rect.left", this.registeredTabs[indx].rect.left)
	// console.log("this.framerShift", this.framerShift)
	// console.log("INDICATOR NEW LEFT", this.framerShift + this.registeredTabs[indx].rect.left)
	// console.log("INDICATOR NEW WIDTH", this.registeredTabs[indx].rect.width)
	this.indicatorBar.style.left = (this.framerShift + this.registeredTabs[indx].rect.left) + "px";
	this.indicatorBar.style.width = this.registeredTabs[indx].rect.width + "px";
}

// scroll left n frameWidths; frameWidths defaults to 0.85 if undefined
DynamicTabs.prototype.scrollLeft = function(framerWidths) {

	if (framerWidths === undefined) {
		framerWidths = 0.85;
	}

	let pixelsToShift = framerWidths * this.framerWidth;

	// if at left edge, don't scroll
	if (this.framerShift >= 0) {
		return;
	}

	if (Math.abs(this.framerShift) > pixelsToShift) {

		// scroll left pixelsToShift
		this.setTabsOffset(this.framerShift + pixelsToShift)

	} else {

		// scroll to the left edge
		this.setTabsOffset(0)
		this.hideArrow("left")

	}

	this.resetIndicator();

	this.showArrow("right");

}

// scroll the the right n frameWidths; frameWidths defaults to 0.85 if undefined
DynamicTabs.prototype.scrollRight = function(framerWidths) {

	if (framerWidths === undefined) {
		framerWidths = 0.85;
	}

	let pixelsToShift = framerWidths * this.framerWidth;

	// the number of pixels that you can still scroll to the right
	const canShift = Math.abs(this.totalTabsWidth - this.framerWidth + this.framerShift);

	// if at right edge, don't scroll
	if (canShift <= 0) {
		return;
	}

	if (canShift > pixelsToShift) {

		// scroll right pixelsToShift
		this.setTabsOffset(this.framerShift - pixelsToShift)

	} else {

		// scroll to the right edge
		this.setTabsOffset(-(this.totalTabsWidth - this.framerWidth))
		this.hideArrow("right")

	}

	this.resetIndicator();

	this.showArrow("left");

}

DynamicTabs.prototype.setTabsOffset = function(offset) {
	this.framerShift = offset;
	this.registeredTabs[0].el.style["margin-left"] = this.framerShift+"px";
}

// specify whether to show the "left" arrow, the "right" arrow, or both (no argument)
DynamicTabs.prototype.showArrow = function(leftRightAll) {
	if (leftRightAll === "left") {
		this.arrowLeft.style.visibility = "";
	} else if (leftRightAll === "right") {
		this.arrowRight.style.visibility = "";
	} else {
		this.arrowLeft.style.visibility = "";
		this.arrowRight.style.visibility = "";
	}
}

// specify whether to hide the "left" arrow, the "right" arrow, or both (no argument)
DynamicTabs.prototype.hideArrow = function(leftRightAll) {
	if (leftRightAll === "left") {
		this.arrowLeft.style.visibility = "hidden";
	} else if (leftRightAll === "right") {
		this.arrowRight.style.visibility = "hidden";
	} else {
		this.arrowLeft.style.visibility = "hidden";
		this.arrowRight.style.visibility = "hidden";
	}
}

// Private utility functions:

// setActiveHighlight marks a tab in the DOM as the active one.
function setActiveHighlight(tabIndex) {
	if (this.activeTabIndex < this.registeredTabs.length) { // the array of registered tabs either has not changed or got changed but has the same number of tabs; must check to not try to set out of range tab as not active
		this.registeredTabs[this.activeTabIndex].el.removeAttribute("data-dtactive");
	}
	this.registeredTabs[tabIndex].el.setAttribute("data-dtactive", "y");
}

// resetRects resets the boundingClientRect info of all registered tabs.
function resetRects(firstLeft, widths) {
	// first, set the first tab manually because its left must be 0
	setNewRect.call(this, 0, {left: firstLeft, width: widths[0]});
	// adjust all the other tabs
	for (let i = 1, tabsLen = this.registeredTabs.length; i < tabsLen; i++) {
		setNewRect.call(this, i, {left: this.registeredTabs[i-1].rect.left + this.registeredTabs[i-1].rect.width, width: widths[i]})
	}
}

// setNewRect replaces a registered tab by the array splice method (to make the mutation watchable from outside).
function setNewRect(tabIndex, rect) {
	this.registeredTabs.splice(tabIndex, 1, {
		el: this.registeredTabs[tabIndex].el,
		oc: this.registeredTabs[tabIndex].oc,
		rect: rect
	})
}

export default DynamicTabs;
