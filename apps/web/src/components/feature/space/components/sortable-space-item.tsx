import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SelectSpace } from "@isseki/db/schema/space";
import { Link } from "@tanstack/react-router";
import { GripVertical } from "lucide-react";
import { type IconName, IconPicker } from "@/components/ui/icon-picker";

interface SortableSpaceItemProps {
	data: SelectSpace;
	onUpdate: (id: string, data: Partial<SelectSpace>) => void;
}
export default function SortableSpaceItem({
	data,
	onUpdate,
}: SortableSpaceItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: data.id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="group relative flex w-full flex-row items-center gap-2"
		>
			<button
				{...listeners}
				{...attributes}
				className="-left-4 absolute hidden transition-all duration-200 md:group-hover:block"
			>
				<GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
			</button>

			<div className="flex w-full flex-row items-center gap-2 rounded-md rounded-sm px-2 py-1 transition-colors group-hover:bg-primary/5">
				<IconPicker
					onColorValueChange={
						(value) => onUpdate(data.id, { color: value })
						// updateMutation.mutate({
						//   id: data.id,
						//   data: { color: value },
						// })
					}
					onIconValueChange={
						(value) => onUpdate(data.id, { icon: value })
						// updateMutation.mutate({
						//   id: data.id,
						//   data: { icon: value },
						// })
					}
					defaultIconValue={data.icon as IconName}
					defaultColorValue={data.color}
					className="h-5 w-5"
				/>
				<Link
					className="flex flex-1 flex-row items-center"
					to="/spaces/$id"
					params={{ id: data.id }}
				>
					<span>{data.name}</span>
				</Link>
			</div>
		</div>
	);
}
