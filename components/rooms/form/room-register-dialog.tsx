import { useRoomFormStore } from "@/hooks/store";
import { useRoomRegisterDialogStore } from "@/hooks/store/modal.stroe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import RoomRegisterAddress from "./room-register-address";
import RoomRegisterCategory from "./room-register-category";
import RoomRegisterFeature from "./room-register-feature";
import RoomRegisterImage from "./room-register-Image";
import RoomRegisterInfo from "./room-register-info";

export default function RoomRegisterDialog() {
  const { isOpen, onClose } = useRoomRegisterDialogStore();
  const { roomForm } = useRoomFormStore();
  const { step } = useRoomFormStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            숙소 등록하기
          </DialogTitle>
        </DialogHeader>
        <section className="w-full mx-auto px-4 h-[80vh] md:min-h-[85vh] overflow-auto">
          {step === 1 && <RoomRegisterCategory />}
          {step === 2 && <RoomRegisterInfo defaultValues={roomForm} />}
          {step === 3 && <RoomRegisterAddress defaultValues={roomForm} />}
          {step === 4 && <RoomRegisterFeature defaultValues={roomForm} />}
          {step === 5 && <RoomRegisterImage />}
        </section>
      </DialogContent>
    </Dialog>
  );
}
