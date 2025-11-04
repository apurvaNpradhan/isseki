import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import Container from "@/components/container";
import { useSpaceStore } from "@/components/feature/space/store";
import MainLayout from "@/components/main-layout";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/(authenticated)/spaces/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const trpc = useTRPC();
	const { id } = Route.useParams();
	const { data, isPending } = useQuery(
		trpc.space.getSpace.queryOptions({
			id,
		}),
	);
	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<MainLayout header={<Header />}>
			<Container>
				<h1 className="font-bold text-4xl">{data?.name}</h1>
			</Container>
		</MainLayout>
	);
}

function Header() {
	const { openCreateSpaceModal } = useSpaceStore();
	return (
		<div className="flex w-full items-center justify-between">
			<SidebarTrigger />
			<div className="flex items-center">
				<ThemeToggle />

				<Button variant={"ghost"} size={"icon"} onClick={openCreateSpaceModal}>
					<Plus className="h-6 w-6" />
				</Button>
			</div>
		</div>
	);
}
