export type Wallpaper = {
  id: string;
  title: string;
  image: any;
  collectionId: string;
  collectionName: string;
  isFree: boolean;
  dimensions: string;
  license: string;
  views: string;
  likes: string;
};

export type Collection = {
  id: string;
  title: string;
  coverImage: any;
  bannerImage?: any;
  isPremium: boolean;
  price: number;
  wallpaperCount: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// Replace these with your real local image files inside assets/wallpapers/
// Naming: w1.jpg, w2.jpg ... w8.jpg
// ─────────────────────────────────────────────────────────────────────────────
const W1 = require("../../assets/onboarding/W1.jpg");
const W2 = require("../../assets/onboarding/W2.jpg");
const W3 = require("../../assets/onboarding/W3.jpg");
const W4 = require("../../assets/onboarding/W4.jpg");
const W5 = require("../../assets/onboarding/W5.jpg");
const W6 = require("../../assets/onboarding/W6.jpg");
const W7 = require("../../assets/onboarding/W7.jpg");
const W8 = require("../../assets/onboarding/W8.jpg");

// Banner images for collection page carousel
const B1 = require("../../assets/onboarding/W9.jpg");
const B2 = require("../../assets/onboarding/W10.jpg");

export const BANNER_IMAGES = [
  { id: "b1", image: B1, label: "Banner 1" },
  { id: "b2", image: B2, label: "Banner 2" },
];

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "1",
    title: "Star Mandala",
    image: W1,
    collectionId: "c1",
    collectionName: "Grainy Gradient",
    isFree: true,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "7.8K",
    likes: "40K",
  },
  {
    id: "2",
    title: "Ice Bloom",
    image: W2,
    collectionId: "c1",
    collectionName: "Grainy Gradient",
    isFree: true,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "5.1K",
    likes: "22K",
  },
  {
    id: "3",
    title: "Ember Wave",
    image: W3,
    collectionId: "c2",
    collectionName: "Pixelated Patterns",
    isFree: false,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "4.4K",
    likes: "23K",
  },
  {
    id: "4",
    title: "Moss Flow",
    image: W4,
    collectionId: "c2",
    collectionName: "Pixelated Patterns",
    isFree: false,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "3.2K",
    likes: "18K",
  },
  {
    id: "5",
    title: "Wisp Purple",
    image: W5,
    collectionId: "c3",
    collectionName: "Neon Dreams",
    isFree: false,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "9.1K",
    likes: "51K",
  },
  {
    id: "6",
    title: "Blue Butterfly",
    image: W6,
    collectionId: "c3",
    collectionName: "Neon Dreams",
    isFree: true,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "6.0K",
    likes: "34K",
  },
  {
    id: "7",
    title: "Blue Morph",
    image: W7,
    collectionId: "c1",
    collectionName: "Grainy Gradient",
    isFree: true,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "4.7K",
    likes: "29K",
  },
  {
    id: "8",
    title: "Desert Dusk",
    image: W8,
    collectionId: "c2",
    collectionName: "Pixelated Patterns",
    isFree: false,
    dimensions: "7680 x 7680 px",
    license:
      "Personal use only, no commercial use allowed, for setups credits are required",
    views: "8.3K",
    likes: "47K",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    title: "Collection 1",
    coverImage: W1,
    bannerImage: W2,
    isPremium: false,
    price: 3,
    wallpaperCount: 3,
  },
  {
    id: "c2",
    title: "Collection 2",
    coverImage: W3,
    bannerImage: W4,
    isPremium: true,
    price: 3,
    wallpaperCount: 3,
  },
  {
    id: "c3",
    title: "Collection 3",
    coverImage: W5,
    bannerImage: W6,
    isPremium: true,
    price: 3,
    wallpaperCount: 2,
  },
];
