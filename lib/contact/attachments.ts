import { contactAttachmentLimits } from "@/content/contact-form";

const maxBytes = contactAttachmentLimits.maxFileSizeMb * 1024 * 1024;

const allowedPrefixes = ["image/", "video/"];

export function validateAttachmentFiles(files: File[]): string | null {
  if (files.length > contactAttachmentLimits.maxFiles) {
    return `You can upload up to ${contactAttachmentLimits.maxFiles} files.`;
  }

  for (const file of files) {
    if (!allowedPrefixes.some((prefix) => file.type.startsWith(prefix))) {
      return `"${file.name}" must be a photo or video file.`;
    }
    if (file.size > maxBytes) {
      return `"${file.name}" is too large. Max ${contactAttachmentLimits.maxFileSizeMb}MB per file.`;
    }
  }

  return null;
}
