import { Image as RNImage } from "react-native";

export const getImageSource = (img: any) => {
  if (!img) return undefined;

  // Local image (require)
  if (typeof img === "number") {
    const resolved = RNImage.resolveAssetSource(img);
    return { uri: resolved.uri };
  }

  // Remote image (API)
  if (typeof img === "string") {
    return { uri: img };
  }

  // Already correct object
  if (img?.uri) {
    return img;
  }

  return undefined;
};
