import MainGrid from "@/features/admin/home/MainGrid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: Home,
});

function Home(props: { disableCustomTheme?: boolean }) {
  return <MainGrid />;
}
