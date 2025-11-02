import { ThemeToggle } from "@/components/theme-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				{/*Add Links and logos Later*/}
				<span className="font-bold font-mono text-sm">Isseki</span>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
