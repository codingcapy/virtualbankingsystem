import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col pt-25">
      <div className="mx-auto">
        <div className="text-2xl text-sky-500 font-semibold">
          Create Profile
        </div>
        <form action="" className="flex flex-col w-[500px]">
          <input
            type="text"
            placeholder="First name"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Middle name"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Last name"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="px-2 py-1 my-1 border rounded"
          />
          <button className="bg-sky-500 rounded my-5 py-2 text-white cursor-pointer hover:bg-sky-400 transition-all ease-in-out duration-300z">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}
