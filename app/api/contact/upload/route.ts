import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { contactAttachmentLimits } from "@/content/contact-form";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "File uploads are not configured." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
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
      }),
      onUploadCompleted: async () => {
        // Upload metadata is returned to the client; Jobber receives URLs on form submit.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[contact/upload]", error);
    return NextResponse.json(
      { error: "Unable to upload file. Please try again." },
      { status: 500 },
    );
  }
}
