import type { Identification } from "@server/schemas/identifications";
import type { ArgumentTypes, client, ExtractData } from "./client";

type CreateIdentificationArgs = ArgumentTypes<
  typeof client.api.v0.identifications.$post
>[0]["json"];

type SerializeIdentification = ExtractData<
  Awaited<
    ReturnType<(typeof client.api.v0.identifications)[":profileNumber"]["$get"]>
  >
>["identifications"][number];

export function mapSerializedIdentificationToSchema(
  serialized: SerializeIdentification,
): Identification {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}
