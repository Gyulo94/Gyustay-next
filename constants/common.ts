import { AiOutlineCheckCircle, AiOutlineWifi } from "react-icons/ai";
import { BsDoorClosed } from "react-icons/bs";
import { GiBarbecue } from "react-icons/gi";
import { LuCircleParking, LuWind } from "react-icons/lu";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { PiBathtub, PiMountainsDuotone } from "react-icons/pi";

export const SERVER_URL = process.env.SERVER_URL;
export const APP_NAME = process.env.APP_NAME;
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION;
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcNX9WPQAGAgJUl8IWQgAAAABJRU5ErkJggg==";

export const DEFAULT_LAT = "37.565337";
export const DEFAULT_LNG = "126.9772095";
export const ZOOM_LEVEL = 7;

const FEATURE_TYPE = {
  FREE_CANCEL: "FREE_CANCEL",
  PAID_CANCEL: "PAID_CANCEL",
  SELF_CHECKIN: "SELF_CHECKIN",
  SELF_CHECKIN_DISALLOWED: "SELF_CHECKIN_DISALLOWED",
  FREE_OFFICE_SPACE: "FREE_OFFICE_SPACE",
  NO_OFFICE_SPACE: "NO_OFFICE_SPACE",
};

type FeatureType = (typeof FEATURE_TYPE)[keyof typeof FEATURE_TYPE];

export const FeatureDescription: Record<FeatureType, string> = {
  [FEATURE_TYPE.FREE_CANCEL]: "무료 취소 가능합니다.",
  [FEATURE_TYPE.PAID_CANCEL]: "무료 취소 불가능합니다.",
  [FEATURE_TYPE.SELF_CHECKIN]: "셀프 체크인이 가능합니다.",
  [FEATURE_TYPE.SELF_CHECKIN_DISALLOWED]: "셀프 체크인이 불가능합니다.",
  [FEATURE_TYPE.FREE_OFFICE_SPACE]: "사무시설이 있습니다.",
  [FEATURE_TYPE.NO_OFFICE_SPACE]: "사무시설이 없습니다.",
};

export const TOSS_PAYMENTS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;

export const TOSS_PAYMENTS_SECRET_KEY = process.env.TOSS_PAYMENTS_SECRET_KEY;

export const ROOM_FEATURE = [
  {
    label: "무료 취소",
    value: "freeCancel",
    icon: AiOutlineCheckCircle,
  },
  {
    label: "셀프 체크인",
    value: "selfCheckIn",
    icon: BsDoorClosed,
  },
  {
    label: "사무시설",
    value: "officeSpace",
    icon: AiOutlineCheckCircle,
  },
  {
    label: "마운틴 뷰",
    value: "hasMountainsView",
    icon: PiMountainsDuotone,
  },
  {
    label: "샴푸 및 욕실 용품",
    value: "hasShampoo",
    icon: PiBathtub,
  },
  {
    label: "무료 세탁",
    value: "hasFreeLaundry",
    icon: MdOutlineLocalLaundryService,
  },
  {
    label: "에어컨",
    value: "hasAirConditioner",
    icon: LuWind,
  },
  {
    label: "무료 와이파이",
    value: "hasWifi",
    icon: AiOutlineWifi,
  },
  {
    label: "바베큐 시설",
    value: "hasBarbeque",
    icon: GiBarbecue,
  },
  {
    label: "무료 주차",
    value: "hasFreeParking",
    icon: LuCircleParking,
  },
];

export const FormUrl = {
  CATEGORY: "/rooms/register/category",
  INFO: "/rooms/register/info",
  ADDRESS: "/rooms/register/address",
  FEATURE: "/rooms/register/feature",
  IMAGE: "/rooms/register/image",
};
