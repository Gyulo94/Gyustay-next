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
