import L from "leaflet";
import { config } from "@/config/env";
import type { AnimalHotspots } from "@/features/journey/hotspots";
import en from "@/i18n/en";
import {
  MAP_MARKERS,
  NORTH_SEA_BOUNDS,
  type MapMarker,
  type MapMarkerId,
} from "@/services/map/mapMarkers";
import { escapeAttr } from "@/utils/dom";

function getMarkerCopy(id: MapMarkerId): {
  label: string;
  title: string;
  body: string;
} {
  const m = en.markers[id];
  return { label: m.label, title: m.title, body: m.body };
}

function createPinIcon(marker: MapMarker): L.DivIcon {
  const { label, title, body } = getMarkerCopy(marker.id);
  const titleAttr = escapeAttr(title);
  const bodyAttr = escapeAttr(body);
  const html = `
    <button type="button"
      class="map-pin map-pin--${marker.variant}"
      data-hotspot
      data-marker-id="${marker.id}"
      data-map-category="${marker.category}"
      data-title="${titleAttr}"
      data-body="${bodyAttr}"
      aria-label="${titleAttr}">
      <span class="map-pin__dot"></span>
      <span class="map-pin__label">${label}</span>
    </button>`;

  return L.divIcon({
    className: "leaflet-map-pin",
    html,
    iconSize: [1, 1],
    iconAnchor: [0, 0],
  });
}

export class MapController {
  private readonly container: HTMLElement | null;
  private readonly mapEl: HTMLElement | null;
  private filters: HTMLElement[] = [];
  private readonly markerLayers = new Map<MapMarkerId, L.Marker>();
  private pins: HTMLElement[] = [];
  private map: L.Map | null = null;

  constructor(private readonly hotspots: AnimalHotspots) {
    this.container = document.querySelector(".map-container");
    this.mapEl = document.getElementById("north-sea-leaflet");

    if (!this.container || !this.mapEl) return;

    this.filters = [
      ...document.querySelectorAll<HTMLElement>("[data-map-filter]"),
    ];

    this.filters.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const filter = btn.dataset.mapFilter;
        if (filter) this.setFilter(filter);
      });
    });

    void this.initMap();
  }

  private bindMarkerPins(): void {
    this.pins = [];
    MAP_MARKERS.forEach((marker) => {
      const layer = this.markerLayers.get(marker.id);
      if (!layer) return;
      const pin = layer.getElement()?.querySelector<HTMLElement>(".map-pin");
      if (!pin) return;
      this.pins.push(pin);
      this.hotspots.register(pin);
    });
  }

  private updateFilterLabels(): void {
    const f = en.layers.politics.filters;
    const map: Record<string, string> = {
      all: f.all,
      borders: f.borders,
      fishing: f.fishing,
      energy: f.energy,
      environment: f.environment,
      security: f.security,
      trade: f.trade,
    };
    this.filters.forEach((btn) => {
      const key = btn.dataset.mapFilter;
      if (key && map[key]) btn.textContent = map[key];
    });
  }

  private async initMap(): Promise<void> {
    if (!this.mapEl) return;

    this.map = L.map(this.mapEl, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
      minZoom: config.map.minZoom,
      maxZoom: config.map.maxZoom,
    });

    L.tileLayer(config.map.imageryUrl, {
      attribution:
        "Tiles &copy; Esri - Source: Esri, Maxar, Earthstar Geographics",
      maxZoom: config.map.tileMaxZoom,
    }).addTo(this.map);

    L.tileLayer(config.map.labelsUrl, {
      attribution: "",
      maxZoom: config.map.tileMaxZoom,
      opacity: 0.35,
    }).addTo(this.map);

    MAP_MARKERS.forEach((marker) => {
      const layer = L.marker([marker.lat, marker.lng], {
        icon: createPinIcon(marker),
        riseOnHover: true,
        bubblingMouseEvents: false,
      }).addTo(this.map!);

      layer.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        const copy = getMarkerCopy(marker.id);
        const pin = layer.getElement()?.querySelector<HTMLElement>(".map-pin");
        this.hotspots.openWithContent(copy.title, copy.body, pin ?? null);
      });

      this.markerLayers.set(marker.id, layer);
    });

    this.map.whenReady(() => {
      this.bindMarkerPins();
      this.updateFilterLabels();
    });

    this.map.fitBounds(NORTH_SEA_BOUNDS, { padding: [28, 28] });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.map?.invalidateSize();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(this.mapEl);
  }

  setFilter(category: string): void {
    this.filters.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.mapFilter === category);
    });

    this.pins.forEach((pin) => {
      const pinCat = pin.dataset.mapCategory;
      const visible = category === "all" || pinCat === category;
      pin.classList.toggle("is-dimmed", !visible);
      pin.classList.toggle("is-highlighted", visible && category !== "all");
    });

    this.container?.classList.toggle(
      "map-container--filtered",
      category !== "all",
    );
  }

  destroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
