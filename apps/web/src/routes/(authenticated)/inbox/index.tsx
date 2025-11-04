import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/(authenticated)/inbox/")({
	component: RouteComponent,
});

function RouteComponent() {
	const trpc = useTRPC();

	return (
		<MainLayout header={<Header />}>
			<Container>
				<h1 className="font-bold text-3xl">Inbox</h1>
			</Container>
		</MainLayout>
	);
}

function Header() {
	return (
		<div className="w-full justify-between">
			<div className="flex flex-row items-center gap-2 lg:px-2">
				<SidebarTrigger />
			</div>
		</div>
	);
}
