type ApiErrorPayload = {
  error?: {
    code?: unknown;
    message?: unknown;
    requestId?: unknown;
  };
};

function formatApiErrorDetails(payload: ApiErrorPayload): string {
  const code = typeof payload.error?.code === "string" ? payload.error.code : null;
  const requestId = typeof payload.error?.requestId === "string" ? payload.error.requestId : null;
  if (!code && !requestId) return "";
  const parts = [code, requestId ? `request: ${requestId}` : null].filter(Boolean);
  return ` (${parts.join(" | ")})`;
}

export function getApiErrorMessageFromPayload(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const parsed = payload as ApiErrorPayload;
  const message = typeof parsed.error?.message === "string" ? parsed.error.message.trim() : "";
  if (!message) return fallback;
  return `${message}${formatApiErrorDetails(parsed)}`;
}

export async function getApiErrorMessageFromResponse(response: Response, fallback: string): Promise<string> {
  try {
    const payload = (await response.json()) as unknown;
    return getApiErrorMessageFromPayload(payload, fallback);
  } catch {
    return fallback;
  }
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

