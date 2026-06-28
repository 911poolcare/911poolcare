import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { contactAttachmentLimits } from "@/content/contact-form";
import { getBlobReadWriteToken, isBlobUploadConfigured } from "@/lib/contact/blob";

function getUploadCallbackUrl(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    return `${origin}/api/contact/upload`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/contact/upload`;
  }

  return "https://911poolcare.vercel.app/api/contact/upload";
}

export async function GET() {
  return NextResponse.json({
    configured: isBlobUploadConfigured(),
    hint: isBlobUploadConfigured()
      ? "Blob client uploads are configured."
      : "Add BLOB_READ_WRITE_TOKEN from your Vercel Blob store to enable uploads.",
  });
}

export async function POST(request: Request) {
  const token = getBlobReadWriteToken();
  if (!token) {
    return NextResponse.json(
      {
        error:
          "File uploads are not configured. Add BLOB_READ_WRITE_TOKEN in Vercel (from your Blob store).",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const callbackUrl = getUploadCallbackUrl(request);

    const jsonResponse = await handleUpload({
      body,
      request,
      token,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/heic",
          "image/heif",
          "video/mp4",
          "video/quicktime",
          "video/webm",
        ],
        maximumSizeInBytes: contactAttachmentLimits.maxFileSizeMb * 1024 * 1024,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ purpose: "contact-form" }),
        callbackUrl,
      }),
      onUploadCompleted: async () => {
        // Metadata is returned to the client; Jobber receives URLs on form submit.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[contact/upload]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload file. Please try again.",
      },
      { status: 500 },
    );
  }
}
