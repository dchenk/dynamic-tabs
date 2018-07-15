import DynamicTabs from "../src/index.js";
import "../src/tabs.css";

const tabIDs = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];

let currIndxDisplay = document.getElementById("current-indx"),
	currTextDisplay = document.getElementById("current-text");

function handleSwitch(oldIndx, newIndx, newTab) {
	currIndxDisplay.innerHTML = newIndx;
	currTextDisplay.innerHTML = newTab.innerText;
}

// Sample click handler attached as if by an external application.
// This click event listener will not be removed when the tab is deregistered.
document.getElementById("my-tab-second").addEventListener("click", function () {
	console.log("click handled on second tab (before register)");
});

// Create the object of the container element by ID.
let myTabs = new DynamicTabs("section-tabs");

// Copy the DynamicTabs object to window for access in the console (for the example only).
window.myTabs = myTabs;

// Register all tabs (inside the container), which are identified by having the class "dynamic-tab".
myTabs.registerAllTabs();

// Attach a custom callback to be called when the active tab changes.
myTabs.addSwitchCallback(handleSwitch);

// Other stuff just for the example

// Another sample click handler attached as if by an external application (after tabs are registered).
// This click event listener will not be removed when the tab is deregistered.
document.getElementById("my-tab-second").addEventListener("click", function () {
	console.log("click handled on second tab (after register)");
});

document.getElementById("show-odd").addEventListener("click", () => {
	myTabs.deregisterAllTabs();
	myTabs.registerTabs(tabIDs.filter((x, i) => {
		return i % 2 === 0;
	}), "my-tab-");
	myTabs.addSwitchCallback(handleSwitch);
	currIndxDisplay.innerHTML = "";
	currTextDisplay.innerHTML = "";
});

document.getElementById("show-even").addEventListener("click", () => {
	myTabs.deregisterAllTabs();
	myTabs.registerTabs(tabIDs.filter((x, i) => {
		return i % 2 !== 0;
	}), "my-tab-");
	myTabs.addSwitchCallback(handleSwitch);
	currIndxDisplay.innerHTML = "";
	currTextDisplay.innerHTML = "";
});

document.getElementById("show-all").addEventListener("click", () => {
	myTabs.deregisterAllTabs();
	myTabs.registerTabs(tabIDs, "my-tab-");
	myTabs.addSwitchCallback(handleSwitch);
	currIndxDisplay.innerHTML = "";
	currTextDisplay.innerHTML = "";
});

document.getElementById("deregister-all").addEventListener("click", () => {
	myTabs.deregisterAllTabs();
});
