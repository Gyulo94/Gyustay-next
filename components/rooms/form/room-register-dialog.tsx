import { useCreateRoom } from "@/hooks/query/use-room";
import { useRoomFormStore } from "@/hooks/store";
import { useRoomRegisterDialogStore } from "@/hooks/store/modal.store";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import RoomOpenAddress from "./room-open-address";
import RoomOpenCategory from "./room-open-category";
import RoomOpenFeature from "./room-open-feature";
import RoomOpenImage from "./room-open-Image";
import RoomOpenInfo from "./room-open-info";

export default function RoomRegisterDialog() {
  const { isOpen, onClose } = useRoomRegisterDialogStore();
  const { step, setStep, roomForm, setRoomForm } = useRoomFormStore();
  const createRoom = useCreateRoom();

  useEffect(() => {
    if (!isOpen) {
      // if (step !== 1) {
      //   setStep(1);
      // }
      setRoomForm({
        address: "",
        bedroomDescription: "",
        categoryId: "",
        description: "",
        freeCancel: false,
        hasAirConditioner: false,
        hasBarbeque: false,
        hasFreeLaundry: false,
        hasFreeParking: false,
        hasMountainsView: false,
        hasShampoo: false,
        hasWifi: false,
        images: [],
        lat: "",
        lng: "",
        officeSpace: false,
        price: 0,
        selfCheckIn: false,
        title: "",
      });
    }
  }, [isOpen, step, setStep, setRoomForm]);

  function onSubmit() {
    createRoom.mutate(roomForm);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setStep(1);
      }}
    >
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            숙소 등록하기
          </DialogTitle>
        </DialogHeader>
        <section className="w-full mx-auto px-4 h-[80vh] md:min-h-[85vh] overflow-auto">
          {step === 1 && <RoomOpenCategory />}
          {step === 2 && <RoomOpenInfo defaultValues={roomForm} />}
          {step === 3 && <RoomOpenAddress defaultValues={roomForm} />}
          {step === 4 && <RoomOpenFeature defaultValues={roomForm} />}
          {step === 5 && (
            <RoomOpenImage
              defaultImages={roomForm.images}
              onSubmit={onSubmit}
            />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
