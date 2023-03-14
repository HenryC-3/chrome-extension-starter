import { Actions } from "../types/Message";
import { get, set } from "idb-keyval";

// WARNING: don't use `async` if have used multiple `chrome.runtime.onMessage.addListener`,
// use `async` will block other listeners see[runtime.onMessage - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#addlistener_syntax)
// We use `async` here, because we only use `chrome.runtime.onMessage.addListener` in background script
export const actions: Actions = {
	updateCount: async () => {
		const res = await get<number>("count");
		if (typeof res === "number" && res >= 0) {
			await set("count", res + 1);
		} else {
			set("count", 0);
		}
	},
	getCount: async (_, backgroundResponse) => {
		const res = await get<number>("count");
		if (res) {
			backgroundResponse({ data: res });
		}
	},
	clearCount: async () => {
		await set("count", 0);
	},
};
