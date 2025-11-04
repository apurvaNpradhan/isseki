import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { EllipsisIcon, Plus } from "lucide-react";
import Container from "@/components/container";
import { CreateSpaceModalProvider } from "@/components/feature/space/components/create-space-provider";
import SpaceListView from "@/components/feature/space/components/space-list-view";
import { useSpaceStore } from "@/components/feature/space/store";
import MainLayout from "@/components/main-layout";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/(authenticated)/spaces/")({
	component: RouteComponent,
});

function RouteComponent() {
	const trpc = useTRPC();
	const { data, isPending } = useQuery(trpc.space.getSpaces.queryOptions());
	return (
		<MainLayout header={<Header />}>
			<Container>
				<h1 className="font-bold font-sans text-4xl">My Spaces</h1>
				{isPending && <Skeleton className="h-20 w-full" />}
				{data && <SpaceListView spaces={data} />}
			</Container>
			<CreateSpaceModalProvider />
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
