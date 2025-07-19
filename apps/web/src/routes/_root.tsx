import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
