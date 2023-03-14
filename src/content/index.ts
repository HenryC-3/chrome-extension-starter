import { send } from "../message";

console.log("this is content");
if (isGoogleSearchUrl(window.location.href)) {
	send<"updateCount">({ type: "updateCount" });
}

function isGoogleSearchUrl(uri: string) {
	const regex =
		/^https?:\/\/(www\.)?google\.[a-z]{2,}(?:\.[a-z]{2})?\/(?:search\?(?=.*?\bq=)|.*?\/search\?tbm=)/i;
	return regex.test(uri);
}
