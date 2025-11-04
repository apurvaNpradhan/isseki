import { InsertSpace } from "@isseki/db/schema/space";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { type IconName, IconPicker } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COLORS } from "@/constants/color";
import { iconsData } from "@/constants/icons";
import { queryClient } from "@/router";
import { useTRPC } from "@/utils/trpc";
import { useSpaceStore } from "../store";

export default function CreateSpace() {
	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			color: COLORS[0],
			icon: iconsData[0].name,
		} as z.input<typeof InsertSpace>,
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: InsertSpace,
			onDynamicAsyncDebounceMs: 300,
		},
		onSubmit: async (values) => {
			await createSpace(values.value);
		},
		onSubmitInvalid({ formApi }) {
			const errorMap = formApi.state.errorMap["onDynamic"]!;
			const inputs = Array.from(
				document.querySelectorAll("#previewForm input"),
			) as HTMLInputElement[];
			let firstInput: HTMLInputElement | undefined;
			for (const input of inputs) {
				if (errorMap[input.name]) {
					firstInput = input;
					break;
				}
			}
			firstInput?.focus();
		},
	});
	const {
		isCreateSpaceModalOpen,
		openCreateSpaceModal,
		closeCreateSpaceModal,
	} = useSpaceStore();
	const trpc = useTRPC();
	const mutation = useMutation({
		...trpc.space.createSpace.mutationOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: trpc.space.getSpaces.queryKey(),
			});
			closeCreateSpaceModal();
			form.reset();
			toast.success("Space created successfully");
		},
		onError: (err) => {
			console.error(err);
			toast.error("Error creating space");
		},
	});
	const createSpace = async (data: InsertSpace) => {
		const validated = InsertSpace.parse(data);
		await mutation.mutateAsync(validated);
	};
	function onClose() {
		mutation.reset();
		form.reset();
		closeCreateSpaceModal();
	}
	return (
		<Dialog
			open={isCreateSpaceModalOpen}
			onOpenChange={(value) =>
				value ? openCreateSpaceModal() : closeCreateSpaceModal()
			}
		>
			<DialogTrigger asChild>
				<Button className="size-8 shrink-0" variant="secondary" size="icon">
					Create Space
				</Button>
			</DialogTrigger>

			<DialogContent className="top-[30%] w-full p-0 shadow-xl sm:max-w-[750px]">
				<DialogHeader>
					<DialogTitle className="sr-only">Create a new space</DialogTitle>
				</DialogHeader>
				<div className="w-full px-4">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-1"
					>
						<div className="flex flex-row items-center gap-2">
							<form.Field name="color">
								{(colorField) => (
									<form.Field name="icon">
										{(iconField) => (
											<IconPicker
												defaultColorValue={colorField.state.value as string}
												// ColorValue={(colorField.state.value as string) ?? ""}
												onColorValueChange={(value) =>
													colorField.handleChange(value)
												}
												// IconValue={(iconField.state.value as IconName) ?? ""}
												defaultIconValue={iconField.state.value as IconName}
												onIconValueChange={(value) =>
													iconField.handleChange(value)
												}
											/>
										)}
									</form.Field>
								)}
							</form.Field>
							<form.Field name="name">
								{(field) => (
									<div className="flex flex-col gap-1">
										<Input
											name={"name"}
											className="h-auto w-full overflow-hidden text-ellipsis whitespace-normal border-none px-0 font-semibold shadow-none outline-none focus-visible:ring-0 lg:text-xl"
											placeholder="Side Hustle"
											type="text"
											value={(field.state.value as string) ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={!!field.state.meta.errors.length}
										/>
										{field.state.meta.errors.map((error) => (
											<p
												key={error?.message}
												className="mt-1 text-destructive text-sm"
											>
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>
						</div>
						<form.Field name="description">
							{(field) => (
								<div className="ml-8 flex flex-row gap-2">
									<Textarea
										placeholder="Enter a short description"
										required={false}
										className="h-auto w-full resize-none overflow-hidden text-ellipsis whitespace-normal border-none px-0 text-lg shadow-none outline-none focus-visible:ring-0"
										disabled={false}
										value={(field.state.value as string | undefined) ?? ""}
										name={"description"}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										aria-invalid={!!field.state.meta.errors.length}
									/>
								</div>
							)}
						</form.Field>

						<div className="flex w-full justify-end border-t py-3.5">
							<form.Subscribe>
								{(state) => (
									<div className="flex gap-2">
										<Button variant="secondary" type="button" onClick={onClose}>
											Cancel
										</Button>
										<Button
											type="submit"
											disabled={!state.canSubmit || state.isSubmitting}
										>
											{state.isSubmitting ? (
												<>
													<LoaderCircleIcon className="animate-spin" />
													Creating
												</>
											) : (
												"Create space"
											)}
										</Button>
									</div>
								)}
							</form.Subscribe>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
