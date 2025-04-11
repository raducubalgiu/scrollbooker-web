import axios from "axios";
import { AxiosHeaders } from "axios";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/authOptions";
import {
	requestLogger,
	responseErrorLogger,
	responseLogger,
} from "@/utils/axios-utils";
import { LOG } from "@/utils/logger";
import { redirect } from "next/navigation";

const BASE_URL = process.env.BE_BASE_ENDPOINT;

const random16Hex = () => crypto.randomBytes(8).toString("hex");

export async function Instance() {
	const session = await getServerSession(authOptions);
	const spanId = random16Hex();
	const traceId = random16Hex();

	if (!session) redirect("/api/auth/signin");

	const headers = new AxiosHeaders({
		Authorization: `Bearer ${session?.accessToken}`,
		Language: "RO",
		"Content-Type": "application/json",
		"X-B3-SpanId": spanId,
		"X-B3-TraceId": traceId,
	});

	const instance = axios.create({
		baseURL: BASE_URL,
		headers,
	});

	instance.interceptors.request.use(requestLogger);
	instance.interceptors.response.use(responseLogger, responseErrorLogger);

	LOG.info(
		`Instance was created for user with username: @${session?.username}`,
		{
			traceId,
			spanId,
		}
	);

	return instance;
}
