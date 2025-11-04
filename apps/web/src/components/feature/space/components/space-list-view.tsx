import {
	closestCenter,
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { SelectSpace } from "@isseki/db/schema/space";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { queryClient } from "@/router";
import { getNewPosition } from "@/utils/get-new-sorting-position";
import { useTRPC } from "@/utils/trpc";
import { useSpaceStore } from "../store";
import SortableSpaceItem from "./sortable-space-item";

interface SpaceListViewProps {
	spaces: SelectSpace[];
}

export default function SpaceListView({ spaces }: SpaceListViewProps) {
	const [items, setItems] = useState<SelectSpace[]>([]);
	const { openCreateSpaceModal } = useSpaceStore();
	useEffect(() => {
		if (spaces) {
			setItems(
				[...spaces].sort((a, b) => Number(a.position) - Number(b.position)),
			);
		}
	}, [spaces]);
	const trpc = useTRPC();
	const updateMutation = useMutation({
		...trpc.space.updateSpace.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: trpc.space.getSpaces.queryKey(),
			});
		},
	});
	const createMutation = useMutation({
		...trpc.space.createSpace.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: trpc.space.getSpaces.queryKey(),
			});
		},
	});
	const handleUpdateSpace = (id: string, data: Partial<SelectSpace>) => {
		updateMutation.mutate({
			id,
			data,
		});
	};
	const sensors = useSensors(useSensor(PointerSensor));
	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = items.findIndex((i) => i.id === active.id);
		const newIndex = items.findIndex((i) => i.id === over.id);
		const newItems = arrayMove(items, oldIndex, newIndex);
		setItems(newItems);
		const prev = newItems[newIndex - 1]?.position
			? Number(newItems[newIndex - 1].position)
			: null;
		const next = newItems[newIndex + 1]?.position
			? Number(newItems[newIndex + 1].position)
			: null;

		const newPosition = getNewPosition(prev, next);

		updateMutation.mutate({
			id: active.id,
			data: {
				position: newPosition.toString(),
			},
		});
	};
	return (
		<div className="flex flex-col space-y-1">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={items.map((i) => i.id)}
					strategy={verticalListSortingStrategy}
				>
					{items.map((space) => (
						<SortableSpaceItem
							key={space.id}
							data={space}
							onUpdate={handleUpdateSpace}
						/>
					))}
				</SortableContext>
			</DndContext>
			<button
				type="button"
				onClick={openCreateSpaceModal}
				className="flex flex-row items-center gap-2 text-muted-foreground transition-colors duration-100 hover:text-primary"
			>
				<Plus className="h-4 w-4" />
				<span className="text-sm">New space</span>
			</button>
		</div>
	);
}
