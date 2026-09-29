import { NextRequest } from "next/server";
import { forwardToBackend } from "@/lib/backendProxy";

interface RouteContext {
  params: Promise<{ slug?: string[] }>;
}

async function getPath(context: RouteContext): Promise<string> {
  const { slug } = await context.params;
  return slug?.length ? `/${slug.join("/")}` : "";
}

export async function GET(req: NextRequest, context: RouteContext) {
  return forwardToBackend("get", await getPath(context), req);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return forwardToBackend("post", await getPath(context), req);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return forwardToBackend("put", await getPath(context), req);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return forwardToBackend("patch", await getPath(context), req);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return forwardToBackend("delete", await getPath(context), req);
}
