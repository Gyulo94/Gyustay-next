import { useFindRoomById, useUpdateRoom } from "@/hooks/query/use-room";
import { useRoomFormStore } from "@/hooks/store";
import { useRoomUpdateDialogStore } from "@/hooks/store/modal.store";
import { ImageType } from "@/type/image.type";
import { RoomType } from "@/type/room.type";
import { useEffect } from "react"; // <-- useCallback 임포트!
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"; // 아마 shadcn ui 일듯?
import RoomOpenAddress from "./room-open-address";
import RoomOpenCategory from "./room-open-category";
import RoomOpenFeature from "./room-open-feature";
import RoomOpenImage from "./room-open-Image";
import RoomOpenInfo from "./room-open-info";

export default function RoomUpdateDialog() {
  const { isOpen, onClose, roomId } = useRoomUpdateDialogStore(); // <-- onClose 사용!
  const { step, setStep, roomForm, setRoomForm } = useRoomFormStore();
  const { data, isLoading } = useFindRoomById(roomId);
  const updateRoom = useUpdateRoom(roomId);
  const room: RoomType = data;

  useEffect(() => {
    if (room && isOpen) {
      setRoomForm({
        address: room?.address || "",
        bedroomDescription: room?.bedroomDescription || "",
        categoryId: room?.category.id || "",
        description: room?.description || "",
        freeCancel: room?.freeCancel || false,
        hasAirConditioner: room?.hasAirConditioner || false,
        hasBarbeque: room?.hasBarbeque || false,
        hasFreeLaundry: room?.hasFreeLaundry || false,
        hasFreeParking: room?.hasFreeParking || false,
        hasMountainsView: room?.hasMountainsView || false,
        hasShampoo: room?.hasShampoo || false,
        hasWifi: room?.hasWifi || false,
        images:
          room?.images?.map((img: ImageType) =>
            typeof img === "string" ? img : img.url
          ) || [],
        lat: room?.lat || "",
        lng: room?.lng || "",
        officeSpace: room?.officeSpace || false,
        price: room?.price || 0,
        selfCheckIn: room?.selfCheckIn || false,
        title: room?.title || "",
      });
    }
  }, [room, isOpen, setRoomForm]);

  useEffect(() => {
    if (!isOpen) {
      if (step !== 1) {
        setStep(1);
      }
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
  if (isLoading || !room) return null;

  function onSubmit() {
    updateRoom.mutate(roomForm);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            숙소 수정하기
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
