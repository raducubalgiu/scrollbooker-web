import { NextRequest, NextResponse } from "next/server";

type UploadStreamRequestBody = {
  uploadLength: number;
  metadata?: Record<string, string>;
};

function toTusMetadata(metadata?: Record<string, string>): string | undefined {
  if (!metadata) return undefined;

  const entries = Object.entries(metadata).filter(
    ([key, value]) => key.trim() && value != null
  );

  if (!entries.length) return undefined;

  return entries
    .map(([key, value]) => {
      const encodedValue = Buffer.from(String(value), "utf8").toString(
        "base64"
      );
      return `${key} ${encodedValue}`;
    })
    .join(",");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as UploadStreamRequestBody;

    const uploadLength = Number(body?.uploadLength);

    if (!Number.isFinite(uploadLength) || uploadLength <= 0) {
      return NextResponse.json(
        { error: "uploadLength invalid." },
        { status: 400 }
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const streamToken = process.env.CLOUDFLARE_STREAM_TOKEN;

    if (!accountId || !streamToken) {
      return NextResponse.json(
        { error: "Cloudflare env vars are missing." },
        { status: 500 }
      );
    }

    const tusMetadata = toTusMetadata(body.metadata);

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream?direct_user=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${streamToken}`,
          "Tus-Resumable": "1.0.0",
          "Upload-Length": String(uploadLength),
          ...(tusMetadata ? { "Upload-Metadata": tusMetadata } : {}),
        },
        cache: "no-store",
      }
    );

    if (!cfResponse.ok) {
      const errorText = await cfResponse.text();

      return NextResponse.json(
        {
          error: "Failed to create Cloudflare direct upload URL.",
          details: errorText,
        },
        { status: cfResponse.status }
      );
    }

    const uploadUrl = cfResponse.headers.get("Location");
    const uid = cfResponse.headers.get("stream-media-id");

    if (!uploadUrl) {
      return NextResponse.json(
        { error: "Cloudflare did not return a Location header." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      uploadUrl,
      uid,
    });
  } catch (error) {
    console.error("[upload-stream] POST error:", error);

    return NextResponse.json(
      { error: "Unexpected error while creating upload URL." },
      { status: 500 }
    );
  }
}
