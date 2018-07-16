"use strict";

import ResizeObserver from "resize-observer-polyfill";

const navIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M14,10l-1.4,1.4L17.2,16l-4.6,4.6L14,22l6-6Z\"/></svg>";

/**
 * DynamicTabs lets you create awesome dynamic tabs.
 */
export default class DynamicTabs {

	/**
	 * Create an instance of DynamicTabs with an element that contains tabs.
	 * @param {(HTMLElement|string)} container - The containing element or the ID of the containing element.
	 */
	constructor(container) {

		if (container instanceof HTMLElement) {
			this.container = container;
		} else {
			this.container = document.getElementById(container);
		}

		if (!container) {
			throw new Error("DynamicTabs: To register tabs, pass in an HTMLElement or the ID of a node containing the tabs");
		}

		this.registeredTabs = [];

		this.activeTabIndex = 0;

		this.switchCallbacks = [];

		const framer = this.container.getElementsByClassName("dynamic-tabs-framer");
		if (framer.length !== 1) {
			throw new Error("DynamicTabs: The tabs container must have one element with the class 'dynamic-tabs-framer'");
		}
		this.framer = framer[0];

		// framerShift is the amount in pixels that the tabs have been scrolled.
		this.framerShift = 0;

		this.framerWidth = 0;

		this.totalTabsWidth = 0;

		this.indicatorBar = this.container.getElementsByClassName("dt-indicator-bar")[0];

		const arrows = this.container.getElementsByClassName("dynamic-tabs-arrow");
		if (arrows.length !== 2) {
			throw new Error("DynamicTabs: The tabs container must have two elements with the class 'dynamic-tabs-arrow'");
		}

		this.arrowLeft = arrows[0];
		this.arrowRight = arrows[1];

		this.arrowLeft.innerHTML = navIcon;
		this.arrowRight.innerHTML = navIcon;

		// Register the arrow click event listeners, and specify 0.85 framerWidths as the first argument explicitly, because
		// otherwise the first argument passed in to the click handler is the Event object.
		this.arrowLeft.addEventListener("click", this.scrollLeft.bind(this, 0.85));
		this.arrowRight.addEventListener("click", this.scrollRight.bind(this, 0.85));

		const ro = new ResizeObserver(this.refreshLayout.bind(this));
		ro.observe(this.framer);

	}

	/**
	 * Register tabs identified by their IDs.
	 * @param {string[]} tabIDs - The IDs of the tabs to register.
	 * @param {string} [idPrefix=""] - A prefix used with each ID given.
	 */
	registerTabs(tabIDs, idPrefix = "") {

		if (!tabIDs || tabIDs.length === 0) {
			console.error("DynamicTabs: You must pass in an array of tab IDs to register")
			return;
		}

		for (let i = 0; i < tabIDs.length; i++) {
			this.registerTab(document.getElementById(idPrefix+tabIDs[i]));
		}

		// console.log("tabs registered; the object:", this)
		// console.log("tabs registered; the tabs:", JSON.parse(JSON.stringify(this.registeredTabs)));

		this.setActiveHighlight(0); // always reset when registering new tabs; avoid resetting indicator now
		this.refreshLayout();

	}

	/**
	 * Register all tabs found in the container, which is just elements with the class "dynamic-tab", and refresh the layout.
	 */
	registerAllTabs() {

		const tabs = this.container.getElementsByClassName("dynamic-tab");

		if (tabs.length === 0) {
			console.error("DynamicTabs: There are no tabs to register");
			return;
		}

		for (let i = 0; i < tabs.length; i++) {
			this.registerTab(tabs[i]);
		}

		// Reset the active tab and refresh the layout because we are registering all tabs.
		this.setActiveHighlight(0);
		this.refreshLayout();

	}

	/**
	 * Register the tab already within the container.
	 * @param {HTMLElement} tab - The tab to register.
	 * @param {boolean} [refreshLayout=false] - Whether to refresh the layout after the tab is registered.
	 */
	registerTab(tab, refreshLayout = false) {

		// Remove the display:none style property that is by default on unregistered tabs.
		tab.setAttribute("data-dtr", "y");

		// The length of the registeredTabs array will be the index of the new tab.
		const newTabIndex = this.registeredTabs.length;

		// Add click listener to set active tab and fire off callbacks upon switching tabs.
		const onClick = this.handleClick.bind(this, newTabIndex);
		tab.addEventListener("click", onClick);

		// Add the initialized tab to the end of the registeredTabs array.
		this.registeredTabs.push({
			el: tab,
			oc: onClick,
			rect: {
				left: 0,
				width: 0
			}
		});

		// When registering a single tab programmatically, refreshLayout should be set to true.
		// Otherwise, when using method registerTabs or registerAllTabs, refreshLayout is called after
		// all of the desired tabs are registered.
		if (refreshLayout) {
			this.refreshLayout();
		}

	}

	/**
	 * De-register all tabs, and remove all tab switch callbacks. If any tabs will be registered again and a tab switch
	 * callback will need to be called, the callback should be registered again using addSwitchCallback.
	 */
	deregisterAllTabs() {
		for (let i = this.registeredTabs.length; i > 0; i--) {
			this.deregisterTab(0);
		}
		this.switchCallbacks = [];
		this.refreshLayout();
	}

	/**
	 * De-register a tab, removing the click event listener given to it when it was registered, and hide the element from view.
	 * @param {number} tabIndex - The index of the tab in the registeredTabs array.
	 * @param {boolean} [refreshLayout=false] - Whether to refresh the layout after de-registering the tab.
	 */
	deregisterTab(tabIndex, refreshLayout = false) {

		const tab = this.registeredTabs[tabIndex];

		tab.el.removeEventListener("click", tab.oc);

		// Remove the "data-dtr" attribute to hide the tab from view.
		tab.el.removeAttribute("data-dtr");

		// Remove the active attribute (in case the tab is active).
		tab.el.removeAttribute("data-dtactive");

		const ml = tab.el.style["margin-left"];
		if (ml !== "0px" && ml !== "") {
			tab.el.style["margin-left"] = "0px";
		}

		// Remove the element from the array.
		this.registeredTabs.splice(tabIndex, 1);

		if (this.registeredTabs.length === 0) {
			this.indicatorBar.style.width = "0";
		}

		// When de-registering a single tab programmatically, refreshLayout should be set to true.
		// Otherwise, when using method deregisterTabs or deregisterAllTabs, refreshLayout is called after
		// all of the appropriate tabs are de-registered.
		if (refreshLayout) {
			this.refreshLayout();
		}

	}

	/**
	 * Set the active tab by its index in the registeredTabs array and then scroll to it if necessary.
	 * @param {number} newIndex
	 */
	setActiveTabIndex(newIndex) {

		// console.log("this.registeredTabs.length before setActiveTabIndex", this.registeredTabs.length)
		// console.log("this.activeTabIndex before setActiveTabIndex", this.activeTabIndex)

		// Reset if there are no registered tabs.
		if (this.registeredTabs.length === 0) {
			this.activeTabIndex = 0;
			return;
		}

		// If something weird is happening, we don't want an invalid index of an array accessed.
		if (newIndex >= this.registeredTabs.length) {
			console.error("DynamicTabs: Invalid tab index failed to set");
			return;
		}

		this.activeTabIndex = newIndex;
		this.setActiveHighlight(newIndex);
		this.scrollToActiveTab(); // Re-position the indicator
		// console.log("this.registeredTabs.length after setActiveTabIndex", this.registeredTabs.length)
		// console.log("this.activeTabIndex after setActiveTabIndex", this.activeTabIndex)

	}

	/**
	 * Add a callback function to be called after each tab switch.
	 * @param {tabSwitchCallback} callback
	 */
	addSwitchCallback(callback) {
		this.switchCallbacks.push(callback);
	}

	// Private utility functions:

	/**
	 * handleClick is the click event callback given to each tab upon registration.
	 * This event callback is removed when the tab is de-registered.
	 * This function must not be called from anywhere directly.
	 * @param {number} tabIndex - The index of the clicked tab.
	 * @private
	 */
	handleClick(tabIndex) {
		const prev = this.activeTabIndex;
		this.setActiveTabIndex(tabIndex);
		const t = this.registeredTabs[tabIndex].el;
		this.switchCallbacks.forEach(function(cb) {
			cb(prev, tabIndex, t);
		})
	}

	/**
	 * Refresh the entire layout of the tabs.
	 * @private
	 */
	refreshLayout() {

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
			this.resetRects(0, widths);
			this.scrollToActiveTab(); // indicator will be reset
		} else {
			this.framer.style["text-align"] = "center";
			this.setTabsOffset(0); // reset the scroll amount (margin-left of the first tab) to 0
			this.resetRects((this.framerWidth - this.totalTabsWidth) / 2, widths);
			this.resetIndicator(); // reset with new tab dimensions (Vue will run setActiveTabIndex anyway, but that's okay)
			this.hideArrow();
		}

	}

	/**
	 * Scroll within the tabs container so that the active tab is visible.
	 * @private
	 */
	scrollToActiveTab() {

		// Return if there's no need to scroll anywhere.
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

	/**
	 * Reset the indicator bar offset and width.
	 * @private
	 */
	resetIndicator() {
		let indx = this.activeTabIndex;
		// Check if the index of the active tab is possible given the current number of registered tabs.
		if (indx >= this.registeredTabs.length) {
			// Behave as if we were on the tab index of the new last tab, but don't set this tab as active;
			// the app should set the tab index manually.
			indx = this.registeredTabs.length - 1;
		}
		// console.log("|||| RESETTING INDICATOR TO index", indx, " left:", this.framerShift + this.registeredTabs[indx].rect.left)
		// console.log("this.registeredTabs[indx].rect.left", this.registeredTabs[indx].rect.left)
		// console.log("this.framerShift", this.framerShift)
		// console.log("INDICATOR NEW LEFT", this.framerShift + this.registeredTabs[indx].rect.left)
		// console.log("INDICATOR NEW WIDTH", this.registeredTabs[indx].rect.width)
		this.indicatorBar.style.left = (this.framerShift + this.registeredTabs[indx].rect.left) + "px";
		this.indicatorBar.style.width = this.registeredTabs[indx].rect.width + "px";
	}

	/**
	 * Scroll left framerWidths widths of the framer.
	 * @param {number} [framerWidths=0.85]
	 * @private
	 */
	scrollLeft(framerWidths = 0.85) {

		// If at left edge, don't scroll.
		if (this.framerShift >= 0) {
			return;
		}

		const pixelsToShift = framerWidths * this.framerWidth;

		if (this.framerShift < -pixelsToShift) {

			// Scroll left pixelsToShift.
			this.setTabsOffset(this.framerShift + pixelsToShift);

		} else {

			// Scroll to the left edge.
			this.setTabsOffset(0);
			this.hideArrow("left");

		}

		this.resetIndicator();

		this.showArrow("right");

	}

	/**
	 * Scroll right framerWidths widths of the framer.
	 * @param {number} [framerWidths=0.85]
	 * @private
	 */
	scrollRight(framerWidths = 0.85) {

		// canShift is the number of pixels that you can still scroll to the right.
		// Here we must add this.framerShift to incorporate any scrolling to the right already done.
		const canShift = this.totalTabsWidth - this.framerWidth + this.framerShift;

		// If at right edge, don't scroll.
		if (canShift <= 0) {
			return;
		}

		const pixelsToShift = framerWidths * this.framerWidth;

		if (canShift > pixelsToShift) {

			// Scroll right pixelsToShift.
			this.setTabsOffset(this.framerShift - pixelsToShift);

		} else {

			// Scroll to the right edge.
			this.setTabsOffset(this.framerWidth - this.totalTabsWidth);
			this.hideArrow("right");

		}

		this.resetIndicator();

		this.showArrow("left");

	}

	/**
	 * Set the scrolling offset.
	 * @param {number} offset - The number of pixels that the offset should be.
	 * @private
	 */
	setTabsOffset(offset) {
		this.framerShift = offset;
		this.registeredTabs[0].el.style["margin-left"] = offset+"px";
	}

	/**
	 * Show either the left or right arrow or both.
	 * @param {string} [leftRightAll="all"]
	 * @private
	 */
	showArrow(leftRightAll) {
		if (leftRightAll === "left") {
			this.arrowLeft.style.visibility = "";
		} else if (leftRightAll === "right") {
			this.arrowRight.style.visibility = "";
		} else {
			this.arrowLeft.style.visibility = "";
			this.arrowRight.style.visibility = "";
		}
	}

	/**
	 * Hide either the left or right arrow or both.
	 * @param {string} [leftRightAll="all"]
	 * @private
	 */
	hideArrow(leftRightAll) {
		if (leftRightAll === "left") {
			this.arrowLeft.style.visibility = "hidden";
		} else if (leftRightAll === "right") {
			this.arrowRight.style.visibility = "hidden";
		} else {
			this.arrowLeft.style.visibility = "hidden";
			this.arrowRight.style.visibility = "hidden";
		}
	}

	/**
	 * Set the DOM attribute of the registered tab at tabIndex to mark it as the active tab.
	 * @param tabIndex
	 * @private
	 */
	setActiveHighlight(tabIndex) {
		// If the array of registered tabs either has not changed or got changed but has the same number of tabs,
		// must check to not try to set out of range tab index as not active.
		if (this.activeTabIndex < this.registeredTabs.length) {
			this.registeredTabs[this.activeTabIndex].el.removeAttribute("data-dtactive");
		}
		this.registeredTabs[tabIndex].el.setAttribute("data-dtactive", "y");
	}

	/**
	 * Reset the boundingClientRect info of all registered tabs based on the current layout.
	 * @param firstLeft
	 * @param widths
	 * @private
	 */
	resetRects(firstLeft, widths) {
		// Set the first tab manually because its left must be firstLeft.
		this.registeredTabs[0].rect = {left: firstLeft, width: widths[0]};
		// Adjust the other tabs.
		for (let i = 1, tabsLen = this.registeredTabs.length; i < tabsLen; i++) {
			this.registeredTabs[i].rect = {left: this.registeredTabs[i-1].rect.left + this.registeredTabs[i-1].rect.width, width: widths[i]};
		}
	}

};

/**
 * A tabSwitchCallback can be registered using the addSwitchCallback method.
 * @callback tabSwitchCallback
 * @param {number} previousTabIndex
 * @param {number} nextTabIndex
 * @param {HTMLElement} clickedTab
 */
