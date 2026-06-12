import type { OceanAudio } from "@/features/journey/audio";
import en from "@/i18n/en";
import { getNestedValue } from "@/i18n";

export class SiteControls {
  private readonly soundBtn: HTMLElement | null;
  private readonly fullscreenBtn: HTMLElement | null;
  private readonly controls: HTMLElement | null;
  /** Intended audio state — defaults on; only false after explicit mute. */
  private soundOn = true;

  constructor(private readonly audio: OceanAudio) {
    this.soundBtn = document.getElementById("btn-sound");
    this.fullscreenBtn = document.getElementById("btn-fullscreen");
    this.controls = document.getElementById("site-controls");

    this.bindEvents();
    this.syncFullscreenState();
    this.applyLabels();
    this.controls?.classList.add("is-audio-on");
  }

  private applyLabels(): void {
    const hint = document.querySelector<HTMLElement>(".audio-hint__text");
    if (hint) {
      hint.innerHTML = en.controls.audioHint.replace(/\n/g, "<br />");
    }
    this.updateSoundButton(this.soundOn);
    this.syncFullscreenState();
  }

  private bindEvents(): void {
    this.soundBtn?.addEventListener("click", () => void this.toggleSound());
    this.fullscreenBtn?.addEventListener("click", () =>
      void this.toggleFullscreen(),
    );

    document.addEventListener("fullscreenchange", () =>
      this.syncFullscreenState(),
    );
  }

  async enableSound(): Promise<boolean> {
    await this.audio.enable();
    this.soundOn = true;
    this.syncAudioState();
    return true;
  }

  async mute(): Promise<void> {
    this.audio.disable();
    this.soundOn = false;
    this.syncAudioState();
  }

  async unmute(): Promise<void> {
    await this.audio.enable();
    this.soundOn = true;
    this.syncAudioState();
  }

  private async toggleSound(): Promise<void> {
    if (this.soundOn) {
      await this.mute();
    } else {
      await this.unmute();
    }
  }

  /** Keep the button in sync with the intended (unmuted) audio state. */
  syncAudioState(): void {
    const on = this.soundOn;
    this.updateSoundButton(on);
    this.controls?.classList.toggle("is-audio-on", on);
  }

  private updateSoundButton(on: boolean): void {
    if (!this.soundBtn) return;
    const label = getNestedValue(
      en,
      on ? "controls.soundOn" : "controls.soundMuted",
    );
    this.soundBtn.setAttribute("aria-pressed", String(on));
    const labelEl = this.soundBtn.querySelector(".btn-label");
    if (labelEl && label) labelEl.textContent = label;
  }

  private async toggleFullscreen(): Promise<void> {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen not supported or denied */
    }
  }

  private syncFullscreenState(): void {
    if (!this.fullscreenBtn) return;
    const active = !!document.fullscreenElement;
    const label = getNestedValue(
      en,
      active ? "controls.exitFullscreen" : "controls.fullscreen",
    );
    this.fullscreenBtn.setAttribute("aria-pressed", String(active));
    const labelEl = this.fullscreenBtn.querySelector(".btn-label");
    if (labelEl && label) labelEl.textContent = label;
    this.controls?.classList.toggle("is-fullscreen", active);
  }

  destroy(): void {
    /* no-op */
  }
}
