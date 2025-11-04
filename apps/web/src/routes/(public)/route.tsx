import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "@/components/common/public/header";
import { CreateSpaceModalProvider } from "@/components/feature/space/components/create-space-provider";
import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/(public)")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getUser();
		return { session };
	},
	loader: async ({ context }) => {
		if (context.session) {
			throw redirect({
				to: "/inbox",
			});
		}
	},
});

function RouteComponent() {
	return (
		<div className="flex flex-col">
			<Header />
			<Outlet />
			<CreateSpaceModalProvider />
		</div>
	);
}
