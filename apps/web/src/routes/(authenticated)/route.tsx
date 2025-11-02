import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/(authenticated)")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getUser();
		return { session };
	},
	loader: async ({ context }) => {
		if (!context.session) {
			throw redirect({
				to: "/sign-in",
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
