/**
 * Web Audio API synthesizer for vintage antique atmosphere:
 * - Pocket watch ticks
 * - Rain in Taipei (gentle filtered white/pink noise)
 * - Music box chime (pentatonic celesta tones)
 * - Quill pen nib scratching sound
 */

class VintageSoundSystem {
  private ctx: AudioContext | null = null;
  private rainNode: AudioNode | null = null;
  private isRainPlaying = false;
  private isMuted = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isRainPlaying) {
      this.stopRain();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsRainPlaying(): boolean {
    return this.isRainPlaying;
  }

  /**
   * Antique pocket watch tick (soft mechanical impulse)
   */
  public playClockTick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 5;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // Audio might be blocked until user gesture
    }
  }

  /**
   * Quill dip-pen nib ink scratch
   */
  public playQuillScratch() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200 + Math.random() * 800, this.ctx.currentTime);
      filter.Q.value = 3.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Silently ignore
    }
  }

  /**
   * Antique Music Box Chime (Pentatonic pitch: C5, D5, E5, G5, A5, C6)
   */
  public playMusicBoxNote(freqIndex = 0) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const pentatonicFreqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
      const freq = pentatonicFreqs[freqIndex % pentatonicFreqs.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Add harmonic overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.02, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      gain2.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 1.25);
      osc2.stop(this.ctx.currentTime + 0.65);
    } catch {
      // Ignore
    }
  }

  /**
   * Paper page turn rustle
   */
  public playPageTurn() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.18);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  /**
   * Gentle Taipei Rain Ambiance (Filtered continuous noise)
   */
  public toggleRain(): boolean {
    if (this.isRainPlaying) {
      this.stopRain();
      return false;
    } else {
      this.startRain();
      return true;
    }
  }

  public startRain() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.isRainPlaying) return;

      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.06;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1100;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.rainNode = whiteNoise;
      this.isRainPlaying = true;
    } catch {
      this.isRainPlaying = false;
    }
  }

  public stopRain() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioScheduledSourceNode).stop();
        this.rainNode.disconnect();
      } catch {
        // Ignore
      }
      this.rainNode = null;
    }
    this.isRainPlaying = false;
  }

  // =========================================================================
  // 19TH-CENTURY CLASSICAL MUSIC SYNTHESIZER (E. Satie: Gymnopédie No. 1, 1888)
  // =========================================================================
  private isMusicPlaying = false;
  private musicVolume = 0.22;
  private musicTimer: number | null = null;
  private musicNoteIndex = 0;
  private musicListeners: Array<(isPlaying: boolean, title: string) => void> = [];

  public readonly musicTitle = 'Erik Satie: Gymnopédie No. 1 (1888) · 19세기 앤틱 오르골';

  public addMusicListener(fn: (isPlaying: boolean, title: string) => void) {
    this.musicListeners.push(fn);
  }

  public removeMusicListener(fn: (isPlaying: boolean, title: string) => void) {
    this.musicListeners = this.musicListeners.filter((l) => l !== fn);
  }

  private notifyMusicListeners() {
    this.musicListeners.forEach((fn) => fn(this.isMusicPlaying, this.musicTitle));
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
  }

  public toggleClassicalMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopClassicalMusic();
      return false;
    } else {
      this.startClassicalMusic();
      return true;
    }
  }

  public stopClassicalMusic() {
    if (this.musicTimer) {
      window.clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    this.isMusicPlaying = false;
    this.notifyMusicListeners();
  }

  public startClassicalMusic() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    if (this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    this.notifyMusicListeners();
    this.playNextMusicBeat();
  }

  /**
   * Satie Gymnopédie No. 1 Arrangement:
   * 3/4 meter: Beat 1 = Bass note, Beat 2 = Harmony chord, Beat 3 = Harmony decay + Melody
   */
  private playNextMusicBeat = () => {
    if (!this.isMusicPlaying || !this.ctx) return;

    // Frequencies (Hz)
    const N = {
      G2: 98.00, B2: 123.47, D3: 146.83, E3: 164.81, Fs3: 185.00, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, Fs5: 739.99, G5: 783.99,
    };

    // 24 measures of 3 beats each (Gymnopédie theme loop)
    const score: Array<{ bass?: number; chord?: number[]; melody?: number; duration: number }> = [
      // Measure 1-2: Introduction (Gmaj7 / D)
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], duration: 1.1 },
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], duration: 1.1 },

      // Measure 3-6: Main Theme phrase 1 (B4, C#5, D5, etc.)
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], melody: N.B4, duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], melody: N.A4, duration: 1.1 },
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], melody: N.G4, duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], melody: N.Fs4, duration: 1.1 },

      // Measure 7-10: Phrase 2
      { bass: N.E4, chord: [N.G3, N.B3, N.D4], melody: N.D4, duration: 1.1 },
      { bass: N.B2, chord: [N.Fs3, N.B3, N.D4], melody: N.E4, duration: 1.1 },
      { bass: N.C4, chord: [N.E3, N.G3, N.B3], melody: N.Fs4, duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], melody: N.D4, duration: 1.1 },

      // Measure 11-14: Higher Register Variation
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], melody: N.D5, duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], melody: N.B4, duration: 1.1 },
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], melody: N.C5, duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], melody: N.D5, duration: 1.1 },

      // Measure 15-18: Resolution
      { bass: N.E4, chord: [N.G3, N.B3, N.D4], melody: N.B4, duration: 1.1 },
      { bass: N.B2, chord: [N.Fs3, N.B3, N.D4], melody: N.C5, duration: 1.1 },
      { bass: N.C4, chord: [N.E3, N.G3, N.B3], melody: N.B4, duration: 1.1 },
      { bass: N.D3, chord: [N.A3, N.D4, N.Fs4], melody: N.A4, duration: 1.2 },

      // Measure 19-20: Quiet closing cadence
      { bass: N.G2, chord: [N.B3, N.D4, N.Fs4], melody: N.G4, duration: 1.4 },
      { bass: N.G2, chord: [N.B3, N.D4], duration: 1.6 },
    ];

    const currentStep = score[this.musicNoteIndex % score.length];
    this.musicNoteIndex++;

    try {
      const now = this.ctx.currentTime;
      const masterVol = this.musicVolume;

      // Play bass note (warm rounded tone)
      if (currentStep.bass) {
        this.playVintageBell(currentStep.bass, now, 0.45 * masterVol, 1.8);
      }

      // Play gentle accompaniment chord (slight delay for strum / music box harp effect)
      if (currentStep.chord) {
        currentStep.chord.forEach((freq, idx) => {
          this.playVintageBell(freq, now + 0.08 + idx * 0.04, 0.28 * masterVol, 1.4);
        });
      }

      // Play singing melody note (pure antique celesta)
      if (currentStep.melody) {
        this.playVintageBell(currentStep.melody, now + 0.22, 0.65 * masterVol, 2.2);
        // Octave overtone
        this.playVintageBell(currentStep.melody * 2, now + 0.22, 0.15 * masterVol, 1.0);
      }
    } catch {
      // Audio might be suspended
    }

    const nextDelay = currentStep.duration * 1000;
    this.musicTimer = window.setTimeout(this.playNextMusicBeat, nextDelay);
  };

  /**
   * Synthesizes 19th-century celesta / music box bell tone
   */
  private playVintageBell(freq: number, startTime: number, volume: number, duration: number) {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Harmonic overtone with slight detune for vintage music box richness
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);
    filter.frequency.exponentialRampToValueAtTime(700, startTime + duration);

    gainNode.gain.setValueAtTime(volume, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }
}

export const vintageAudio = new VintageSoundSystem();
