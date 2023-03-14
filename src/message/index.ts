import { ExtensionError } from "../types/Error";
import {
	ExtRequestTypes,
	GetRequest,
	GetResponse,
	GetResponseData,
} from "../types/Message";

type SuccessAction<Type extends ExtRequestTypes> = (
	input: GetResponseData<Type>
) => void;
type FailedAction = (input: ExtensionError) => void;

export function send<Type extends ExtRequestTypes>(
	input: GetRequest<Type>,
	success?: SuccessAction<Type>,
	failed?: FailedAction
) {
	chrome.runtime.sendMessage<GetRequest<Type>, GetResponse<Type>>(
		input,
		(res) => {
			if (res.data && success) {
				success(res.data);
			}
			if (res.error && failed) {
				const err = res.error;
				failed(err);
			}
		}
	);
}
