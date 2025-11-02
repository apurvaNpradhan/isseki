import { createFileRoute } from "@tanstack/react-router";
import SignIn from "../sign-in";

export const Route = createFileRoute("/(public)/(auth)/sign-in/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto">
			<SignIn />
		</div>
	);
}
