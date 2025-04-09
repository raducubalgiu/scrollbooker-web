import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { LOG } from "./logger";
import { omit } from "lodash";

export const requestLogger = (req: InternalAxiosRequestConfig) => {
	const { method, url, headers, data } = req;
	const traceInfo = getTraceInfo(headers);
	const requestStr = `${method?.toUpperCase()} ${url}`;
	const dataStr = data ? `data:${JSON.stringify(data)}` : "";

	LOG.info(`${requestStr} ${dataStr}`, traceInfo);

	return req;
};

export const responseLogger = (res: AxiosResponse) => {
	const { status, data, config } = res;
	const { headers } = config;
	const traceInfo = getTraceInfo(headers);
	const dataStringify = JSON.stringify(data, getCircularReplacer());
	const responseStr = `RESPONSE [status:${status}, data:${dataStringify}]}]`;

	LOG.info(responseStr, traceInfo);

	return res;
};

export const responseErrorLogger = (error: AxiosResponse) => {
	const { config, ...restError } = error;
	const { headers, ...rest } = config;
	const traceInfo = getTraceInfo(headers);
	const responseStr = `ERROR [${JSON.stringify(rest)}]`;

	LOG.error(responseStr, traceInfo);

	throw omit(restError, ["request"]);
};

const getTraceInfo = (headers: AxiosHeaders) => {
	const spanId = headers["X-B3-SpanId"];
	const traceId = headers["X-B3-TraceId"];

	return { traceId, spanId };
};

const getCircularReplacer = () => {
	const seen = new WeakSet();
	return (_: unknown, value: unknown | null) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}
		return value;
	};
};
