import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { client, type ArgumentTypes, type ExtractData } from "./client";
import type { Address } from "@server/schemas/addresses";

type CreateAddressArgs = ArgumentTypes<
  typeof client.api.v0.addresses.$post
>[0]["json"];

type SerializeAddress = ExtractData<
  Awaited<
    ReturnType<(typeof client.api.v0.addresses)[":profileNumber"]["$get"]>
  >
>["addresses"][number];

export function mapSerializedAddressToSchema(
  serialized: SerializeAddress,
): Address {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}

async function createAddress(args: CreateAddressArgs) {
  const res = await client.api.v0.addresses.$post({ json: args });
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating the address. Please contact IT.";
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
  const result = await res.json();
  return result;
}

export const useCreateAddressMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddress,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", data?.address.profileNumber],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};

async function getAddressesByProfileNumber(profileNumber: number) {
  const res = await client.api.v0.addresses[":profileNumber"].$get({
    param: { profileNumber: profileNumber.toString() },
  });
  if (!res.ok) {
    throw new Error("Error getting addresses by id");
  }
  const { addresses } = await res.json();
  return addresses.map(mapSerializedAddressToSchema);
}

export const getAddressesByProfileNumberQueryOptions = (
  profileNumber: number,
) =>
  queryOptions({
    queryKey: ["addresses", profileNumber],
    queryFn: () => getAddressesByProfileNumber(profileNumber),
  });
