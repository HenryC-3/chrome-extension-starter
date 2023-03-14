import { ExtensionError } from "./Error";
import { List, Union } from "ts-toolbelt";

export type ExtRequestTypes = "updateCount" | "getCount" | "clearCount";

type ExtRequest<Type extends ExtRequestTypes, RequestBody> = {
	type: Type;
	data?: RequestBody;
};
type ExtResponse<ResponseData> =
	| { data: ResponseData }
	| { error: ExtensionError };

export type BackgroundAction<RequestBody, ResponseBody> = (
	data: RequestBody,
	backgroundResponse: (response: ExtResponse<ResponseBody>) => void
) => void;

interface Messenger<Type extends ExtRequestTypes, RequestBody, ResponseBody> {
	request: ExtRequest<Type, RequestBody>;
	response: ExtResponse<ResponseBody>;
	action: BackgroundAction<RequestBody, ResponseBody>;
}

// create relation between request, response and action
type Messengers = [
	Messenger<"updateCount", undefined, undefined>,
	Messenger<"getCount", undefined, number>,
	Messenger<"clearCount", undefined, undefined>
];

// send message
export type GetRequest<Type extends ExtRequestTypes> = List.Select<
	Messengers,
	{ request: { type: Type } }
>[0]["request"];

export type GetResponse<Type extends ExtRequestTypes> = List.Select<
	Messengers,
	{ request: { type: Type } }
>[0]["response"];

export type GetResponseData<Type extends ExtRequestTypes> = Union.Exclude<
	List.Select<Messengers, { request: { type: Type } }>[0]["response"],
	{ error: ExtensionError }
>["data"];

// actions
export type GetAction<Type extends ExtRequestTypes> = List.Select<
	Messengers,
	{ request: { type: Type } }
>[0]["action"];

export type ExtensionRequest = Messengers[number]["request"];
export type BackgroundResponse = Messengers[number]["response"];
export type Actions = {
	[Type in ExtRequestTypes]: List.Select<
		Messengers,
		{ request: { type: Type } }
	>[0]["action"];
};
