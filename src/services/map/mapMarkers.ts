export type MapMarkerCategory =
  | "fishing"
  | "environment"
  | "energy"
  | "security"
  | "trade"
  | "borders";

export type MapMarkerId =
  | "brexitFishing"
  | "doggerBank"
  | "euQuotas"
  | "dutchWind"
  | "norwayOil"
  | "germanBight"
  | "nato"
  | "shipping"
  | "maritimeBorders"
  | "scotland"
  | "pipelines";

export interface MapMarker {
  id: MapMarkerId;
  lat: number;
  lng: number;
  category: MapMarkerCategory;
  variant: MapMarkerCategory;
}

export const NORTH_SEA_BOUNDS: [[number, number], [number, number]] = [
  [50.2, -5.8],
  [62.8, 12.5],
];

export const MAP_MARKERS: MapMarker[] = [
  {
    id: "brexitFishing",
    lat: 54.0,
    lng: 0.5,
    category: "fishing",
    variant: "fishing",
  },
  {
    id: "doggerBank",
    lat: 54.5,
    lng: 2.0,
    category: "environment",
    variant: "environment",
  },
  {
    id: "euQuotas",
    lat: 54.0,
    lng: 4.5,
    category: "fishing",
    variant: "fishing",
  },
  {
    id: "dutchWind",
    lat: 53.5,
    lng: 4.8,
    category: "energy",
    variant: "energy",
  },
  {
    id: "norwayOil",
    lat: 61.0,
    lng: 2.5,
    category: "energy",
    variant: "energy",
  },
  {
    id: "germanBight",
    lat: 54.5,
    lng: 7.5,
    category: "environment",
    variant: "environment",
  },
  {
    id: "nato",
    lat: 58.0,
    lng: 9.5,
    category: "security",
    variant: "security",
  },
  {
    id: "shipping",
    lat: 51.0,
    lng: 1.5,
    category: "trade",
    variant: "trade",
  },
  {
    id: "maritimeBorders",
    lat: 51.5,
    lng: 3.0,
    category: "borders",
    variant: "borders",
  },
  {
    id: "scotland",
    lat: 57.5,
    lng: -2.0,
    category: "borders",
    variant: "borders",
  },
  {
    id: "pipelines",
    lat: 56.0,
    lng: 3.5,
    category: "energy",
    variant: "energy",
  },
];
