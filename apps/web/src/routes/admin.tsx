import AppLayout from "@/components/AppLayout";
import AppTheme from "@/components/theme/AppTheme";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppTheme>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AppTheme>
  );
}
