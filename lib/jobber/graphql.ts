import { getJobberAccessToken } from "@/lib/jobber/auth";
import {
  JOBBER_GRAPHQL_URL,
  JOBBER_GRAPHQL_VERSION,
} from "@/lib/jobber/config";

export type JobberUserError = {
  message: string;
  path?: string[];
};

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
  extensions?: {
    cost?: {
      throttleStatus?: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
};

export async function jobberGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const accessToken = await getJobberAccessToken();

  const response = await fetch(JOBBER_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-JOBBER-GRAPHQL-VERSION": JOBBER_GRAPHQL_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = (await response.json()) as GraphqlResponse<T>;

  if (!response.ok) {
    throw new Error(
      payload.errors?.[0]?.message ??
        `Jobber API request failed (${response.status})`,
    );
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("Jobber API returned no data");
  }

  return payload.data;
}

export function formatUserErrors(errors: JobberUserError[] | null | undefined) {
  if (!errors?.length) return null;
  return errors
    .map((error) =>
      error.path?.length
        ? `${error.path.join(".")}: ${error.message}`
        : error.message,
    )
    .join("; ");
}
