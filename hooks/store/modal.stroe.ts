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

interface ShareDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  image: string;
  setImage: (image: string) => void;
  title: string;
  setTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  address: string;
  setAddress: (address: string) => void;
}

export const useShareDialogStore = create<ShareDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  image: "",
  setImage: (image) => set({ image }),
  title: "",
  setTitle: (title) => set({ title }),
  category: "",
  setCategory: (category) => set({ category }),
  address: "",
  setAddress: (address) => set({ address }),
}));
