import { createFileRoute } from "@tanstack/react-router";
import { EllipsisIcon } from "lucide-react";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/(authenticated)/projects/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<MainLayout header={<Header />}>
			<Container>
				<h1 className="font-bold font-sans text-3xl">My Projects</h1>
			</Container>
		</MainLayout>
	);
}

function Header() {
	return (
		<div className="flex w-full items-center justify-between">
			<SidebarTrigger />
			<div className="flex items-center">
				<ThemeToggle />
				<Button variant={"ghost"} size={"icon"}>
					<EllipsisIcon className="h-6 w-6" />
				</Button>
			</div>
		</div>
	);
}
