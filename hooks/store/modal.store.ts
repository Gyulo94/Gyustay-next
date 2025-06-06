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

interface CommentsListDialogStore {
  isOpen: boolean;
  onOpen: (roomId: string) => void;
  onClose: () => void;
  roomId?: string;
}
export const useCommentsListDialogStore = create<CommentsListDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: (roomId) => set({ isOpen: true, roomId }),
    onClose: () => set({ isOpen: false }),
  })
);

interface CommentEditDialogStore {
  isOpen: boolean;
  onOpen: (commentId: string) => void;
  onClose: () => void;
  commentId?: string;
}
export const useCommentEditDialogStore = create<CommentEditDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: (commentId) => set({ isOpen: true, commentId }),
    onClose: () => set({ isOpen: false }),
    commentId: undefined,
  })
);

interface RoomRegisterDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRoomRegisterDialogStore = create<RoomRegisterDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

interface RoomUpdateDialogStore {
  isOpen: boolean;
  onOpen: (roomId: string) => void;
  onClose: () => void;
  roomId?: string;
}
export const useRoomUpdateDialogStore = create<RoomUpdateDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: (roomId) => set({ isOpen: true, roomId }),
    onClose: () => set({ isOpen: false }),
    roomId: undefined,
  })
);
