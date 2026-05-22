import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicBaseUrl: string;
};

export function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicBaseUrl) {
    throw new Error("R2_NOT_CONFIGURED");
  }

  return { accountId, accessKeyId, secretAccessKey, bucket, publicBaseUrl };
}

export function createR2Client(config: R2Config) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

export async function uploadImageToR2(params: {
  key: string;
  body: Uint8Array;
  contentType: string;
  cacheControl?: string;
}) {
  const config = getR2Config();
  const client = createR2Client(config);

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
      CacheControl: params.cacheControl ?? "public, max-age=31536000, immutable",
    }),
  );

  const base = config.publicBaseUrl.replace(/\/$/, "");
  return `${base}/${params.key}`;
}

export async function getObjectFromR2(key: string) {
  const config = getR2Config();
  const client = createR2Client(config);
  const response = await client.send(
    new GetObjectCommand({
      Bucket: config.bucket,
      Key: key,
    }),
  );

  const body = response.Body ? await response.Body.transformToByteArray() : null;
  return {
    body,
    contentType: response.ContentType ?? "application/octet-stream",
    cacheControl: response.CacheControl ?? "public, max-age=31536000, immutable",
  };
}
