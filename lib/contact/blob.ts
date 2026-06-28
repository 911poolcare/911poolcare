/** Client uploads via handleUpload require a read-write token (OIDC alone is not enough). */
export function isBlobUploadConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function getBlobReadWriteToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || null;
}
