import { create } from "zustand";

interface ImageListDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  images: { url: string }[];
  setImages: (images: { url: string }[]) => void;
}

export const useImageListDialogStore = create<ImageListDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  images: [],
  setImages: (images) => set({ images }),
}));
