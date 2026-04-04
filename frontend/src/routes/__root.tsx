import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { LeftNav } from "../components/LeftNav";
import { TopNav } from "../components/TopNav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="md:hidden pt-25 text-center px-2">
        This is a banking system that can only be used on desktop viewport
      </div>
      <div className="hidden md:block">
        <LeftNav />
        <TopNav />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
