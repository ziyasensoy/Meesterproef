import type { LayerId } from "./journey";

export interface AudioLayerProfile {
  waterFilter: number;
  waterGain: number;
  airGain: number;
  subGain: number;
  subFreq: number;
  pulseGain: number;
  pulseFreq: number;
  bubbleGain: number;
  waveWashGain: number;
  lfoRate: number;
  lfoDepth: number;
  masterGain: number;
}

export type AudioLayerProfiles = Record<LayerId, AudioLayerProfile> & {
  dive?: AudioLayerProfile;
};
