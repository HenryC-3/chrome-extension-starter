import { actions } from "./actions";
import { listenToMessage } from "./message";

listenToMessage(actions);
