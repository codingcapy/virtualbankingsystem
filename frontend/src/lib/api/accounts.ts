import type { Account } from "@server/schemas/accounts";
import { client, type ArgumentTypes, type ExtractData } from "./client";

type CreateAccountArgs = ArgumentTypes<
  typeof client.api.v0.accounts.$post
>[0]["json"];

type SerializeAccount = ExtractData<
  Awaited<
    ReturnType<(typeof client.api.v0.accounts)[":relationshipNumber"]["$get"]>
  >
>["accounts"][number];

export function mapSerializedAccountToSchema(
  serialized: SerializeAccount,
): Account {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}

async function createAccount(args: CreateAccountArgs) {
  const res = await client.api.v0.accounts.$post({ json: args });
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating the account. Please contact IT.";
    try {
      const errorResponse = await res.json();
      if (
        errorResponse &&
        typeof errorResponse === "object" &&
        "message" in errorResponse
      ) {
        errorMessage = String(errorResponse.message);
      }
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

async function getAccountsByProfileNumber() {}
