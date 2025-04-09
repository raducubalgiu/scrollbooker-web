import { getDateNow } from "./date-utils";

export const APP_NAME = "credit-worthiness-ui";

type Trace = {
	traceId: string;
	spanId: string;
};

const log = (type: string, message: string, trace?: Trace) => {
	const traceInfo = trace
		? `[${APP_NAME},${trace?.traceId},${trace.spanId}]`
		: `[${APP_NAME}]`;

	// eslint-disable-next-line no-console
	console.log(`${getDateNow()} ${type} ${traceInfo} ${message}`);
};

export const LOG = {
	info: (message: string, trace?: Trace) => log("INFO", message, trace),
	error: (message: string, trace?: Trace) => log("ERROR", message, trace),
};
