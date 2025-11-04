import { Box, Boxes, Container, Edit, InboxIcon, Notebook } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

interface Items {
	title: string;
	icon: any;
	url?: string;
	Action?: () => void;
	isActive?: boolean;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { open } = useSidebar();

	const data = {
		navMain: [
			{
				title: "Inbox",
				url: "/inbox",
				icon: InboxIcon,
				isActive: true,
			},
			{
				title: "Spaces",
				url: "/spaces",
				icon: Boxes,
				isActive: false,
			},
		],
	};

	return (
		<Sidebar
			variant="sidebar"
			collapsible="icon"
			className="border-r-0"
			{...props}
		>
			<SidebarHeader>
				<NavUser />
				<div className="flex flex-row items-center gap-2">
					{open && <Input placeholder="Search" className="w-full" />}
					<Button variant={"ghost"} size={"icon"}>
						<Edit className="h-4 w-4" />
					</Button>
				</div>
				<NavMain items={data.navMain} />
			</SidebarHeader>
			<SidebarContent>
				{/*<NavSecondary items={data.navSecondary} />*/}
				{/*<SidebarFooter>
          <NavMain items={footerData} />
        </SidebarFooter>*/}
			</SidebarContent>
			<SidebarContent />
			<SidebarRail />
		</Sidebar>
	);
}
