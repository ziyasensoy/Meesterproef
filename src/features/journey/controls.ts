import type { OceanAudio } from "@/features/journey/audio";
import en from "@/i18n/en";
import { getNestedValue } from "@/i18n";

export class SiteControls {
  private readonly soundBtn: HTMLElement | null;
  private readonly fullscreenBtn: HTMLElement | null;
  private readonly controls: HTMLElement | null;
  /** Sound off until the user clicks Turn on sound. */
  private userMuted = true;

  constructor(private readonly audio: OceanAudio) {
    this.soundBtn = document.getElementById("btn-sound");
    this.fullscreenBtn = document.getElementById("btn-fullscreen");
    this.controls = document.getElementById("site-controls");

    this.bindEvents();
    this.syncFullscreenState();
    this.applyLabels();
  }

  private applyLabels(): void {
    const hint = document.querySelector<HTMLElement>(".audio-hint__text");
    if (hint) {
      const lines = en.controls.audioHint.split("\n");
      const cta = lines.pop();
      const lead = lines.join("<br />");
      hint.innerHTML = cta
        ? `${lead}<br /><span class="audio-hint__cta">${cta}</span>`
        : en.controls.audioHint.replace(/\n/g, "<br />");
    }
    this.syncAudioState();
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

  isUserMuted(): boolean {
    return this.userMuted;
  }

  async enableSound(): Promise<void> {
    if (this.userMuted) return;
    await this.audio.enable();
    this.syncAudioState();
  }

  async mute(): Promise<void> {
    this.userMuted = true;
    this.audio.disable();
    this.syncAudioState();
  }

  async unmute(): Promise<void> {
    this.userMuted = false;
    await this.audio.enable();
    this.syncAudioState();
  }

  private async toggleSound(): Promise<void> {
    if (this.userMuted) {
      await this.unmute();
    } else {
      await this.mute();
    }
  }

  /** Keep the button in sync with the user's mute preference. */
  syncAudioState(): void {
    const on = !this.userMuted;
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
