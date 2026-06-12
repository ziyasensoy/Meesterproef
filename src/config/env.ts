export const config = {
  map: {
    imageryUrl:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    labelsUrl:
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    minZoom: 5,
    maxZoom: 10,
    tileMaxZoom: 18,
  },
} as const;
