export type LayerId =
  | "intro"
  | "dive"
  | "surface"
  | "nature"
  | "pollution"
  | "infrastructure"
  | "history"
  | "politics"
  | "finale";

export type ScrollProgressCallback = (
  progress: number,
  scrollY: number,
) => void;
