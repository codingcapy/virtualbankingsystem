import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add/relationship")({
  component: RouteComponent,
});

function RouteComponent() {
  function handleSubmit() {}

  return (
    <div className="flex flex-col pt-25">
      <div className="mx-auto">
        <div className="text-2xl text-sky-500 font-semibold">
          Create Relationship
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col w-[500px]"
        >
          <div className="px-2 py-1 my-1 border rounded">Profile</div>
          <div>+ Add profile</div>
          <button className="bg-sky-500 rounded my-5 py-2 text-white cursor-pointer hover:bg-sky-400 transition-all ease-in-out duration-300z">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}
