<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## DynamicTabs

### Parameters

-   `container` **([HTMLElement][1] \| [string][2])** The containing element or the ID of the containing element.

### registerTabs

Register tabs identified by their IDs.

#### Parameters

-   `tabIDs` **[Array][3]&lt;[string][2]>** The IDs of the tabs to register.
-   `idPrefix` **[string][2]?** A prefix used with each ID given. (optional, default `""`)

### registerAllTabs

Register all tabs found in the container, which is just elements with the class "dynamic-tab", and refresh the layout.

### registerTab

Register the tab already within the container.

#### Parameters

-   `tab` **[HTMLElement][1]** The tab to register.
-   `refreshLayout` **[boolean][4]?** Whether to refresh the layout after the tab is registered. (optional, default `false`)

### deregisterAllTabs

De-register all tabs.

[1]: https://developer.mozilla.org/docs/Web/HTML/Element

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean