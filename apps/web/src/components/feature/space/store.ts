import { create } from "zustand";

interface spaceState {
	isCreateSpaceModalOpen: boolean;
	openCreateSpaceModal: () => void;
	closeCreateSpaceModal: () => void;
	activeSpaceId: string | null;
	setActiveSpaceId: (id: string) => void;
}

export const useSpaceStore = create<spaceState>((set) => ({
	activeSpaceId: null,
	isCreateSpaceModalOpen: false,
	openCreateSpaceModal: () => set({ isCreateSpaceModalOpen: true }),
	closeCreateSpaceModal: () => set({ isCreateSpaceModalOpen: false }),
	setActiveSpaceId: (id) => set({ activeSpaceId: id }),
}));
