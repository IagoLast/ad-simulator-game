export class Sound {
  private static instance: Sound;
  private audioContext: AudioContext;
  private sounds: Map<string, () => void>;
  private enabled: boolean;
  private volume: number;
  private lastFootstepTime: number = 0;
  private footstepInterval: number = 350; // milliseconds between footstep sounds
  
  constructor() {
    this.sounds = new Map();
    this.enabled = true;
    this.volume = 0.5; // Default volume at 50%
    
    // Create audio context
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error('Web Audio API is not supported in this browser', e);
      this.audioContext = null as unknown as AudioContext;
    }
    
    this.setupSounds();
  }

  /**
   * Get the singleton instance of the Sound class
   */
  public static getInstance(): Sound {
    if (!Sound.instance) {
      Sound.instance = new Sound();
    }
    return Sound.instance;
  }

  /**
   * Setup all game sounds using JS-generated audio
   */
  private setupSounds(): void {
    if (!this.audioContext) return;
    
    // Create different types of sounds programmatically
    this.createBeepSound('player_join', 660, 0.2);
    this.createBeepSound('player_leave', 330, 0.2);
    this.createWeaponSound('shoot', 80, 0.2);
    this.createNoiseSound('impact', 0.1);
    this.createBeepSound('flag_pickup', 880, 0.2);
    this.createMelody('flag_capture', [440, 550, 660], [0.1, 0.1, 0.2]);
    this.createBeepSound('flag_return', 440, 0.2);
    this.createMelody('win', [440, 550, 660, 880], [0.1, 0.1, 0.1, 0.3]);
    this.createMelody('lose', [880, 660, 550, 440], [0.1, 0.1, 0.1, 0.3]);
    this.createClickSound('footstep', 0.05);
  }

  /**
   * Create a simple beep sound
   * @param id Sound ID
   * @param frequency Tone frequency in Hz
   * @param duration Duration in seconds
   */
  private createBeepSound(id: string, frequency: number, duration: number): void {
    this.sounds.set(id, () => {
      if (!this.audioContext || !this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      
      gainNode.connect(this.audioContext.destination);
      gainNode.gain.value = this.volume;
      
      // Add a slight fade out
      gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration);
    });
  }

  /**
   * Create a weapon sound effect
   * @param id Sound ID
   * @param frequency Base frequency
   * @param duration Sound duration
   */
  private createWeaponSound(id: string, frequency: number, duration: number): void {
    this.sounds.set(id, () => {
      if (!this.audioContext || !this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      
      gainNode.connect(this.audioContext.destination);
      gainNode.gain.value = this.volume;
      
      // Quick attack and decay
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      // Frequency sweep down
      oscillator.frequency.setValueAtTime(frequency * 2, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency, this.audioContext.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration);
    });
  }

  /**
   * Create a noise sound effect (for impacts)
   * @param id Sound ID
   * @param duration Sound duration
   */
  private createNoiseSound(id: string, duration: number): void {
    this.sounds.set(id, () => {
      if (!this.audioContext || !this.enabled) return;
      
      const bufferSize = this.audioContext.sampleRate * duration;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Fill the buffer with noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = this.volume * 0.5; // Lower volume for noise
      
      // Quick attack and decay
      gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      noise.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      noise.start();
      noise.stop(this.audioContext.currentTime + duration);
    });
  }

  /**
   * Create a click sound (for footsteps)
   * @param id Sound ID
   * @param duration Sound duration
   */
  private createClickSound(id: string, duration: number): void {
    this.sounds.set(id, () => {
      if (!this.audioContext || !this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'triangle';
      oscillator.frequency.value = 60 + Math.random() * 60; // Random frequency for variety
      oscillator.connect(gainNode);
      
      gainNode.connect(this.audioContext.destination);
      gainNode.gain.value = this.volume * 0.3; // Lower volume for clicks
      
      // Very quick attack and decay for click sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration);
    });
  }

  /**
   * Create a melody from a sequence of notes
   * @param id Sound ID
   * @param frequencies Array of frequencies
   * @param durations Array of durations for each note
   */
  private createMelody(id: string, frequencies: number[], durations: number[]): void {
    this.sounds.set(id, () => {
      if (!this.audioContext || !this.enabled) return;
      
      let startTime = this.audioContext.currentTime;
      
      for (let i = 0; i < frequencies.length; i++) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequencies[i];
        oscillator.connect(gainNode);
        
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = this.volume;
        
        // Envelope for each note
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(this.volume, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + durations[i]);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + durations[i]);
        
        startTime += durations[i];
      }
    });
  }

  /**
   * Play a sound effect
   * @param id The ID of the sound to play
   * @param volumeModifier Optional volume modifier (0.0 to 1.0)
   */
  public play(id: string, volumeModifier: number = 1.0): void {
    if (!this.enabled || !this.sounds.has(id)) {
      return;
    }
    
    // Temporarily adjust volume if modifier provided
    const originalVolume = this.volume;
    if (volumeModifier !== 1.0) {
      this.volume *= volumeModifier;
    }
    
    // Play the sound
    const playSound = this.sounds.get(id);
    if (playSound) {
      playSound();
    }
    
    // Restore original volume
    this.volume = originalVolume;
  }

  /**
   * Play a 3D positioned sound based on game coordinates
   * @param id Sound ID
   * @param position Source position
   * @param listenerPosition Player position
   * @param maxDistance Maximum distance to hear the sound
   */
  public play3DSound(
    id: string,
    position: { x: number, y: number, z: number },
    listenerPosition: { x: number, y: number, z: number },
    maxDistance: number = 50
  ): void {
    // Calculate distance between sound source and listener
    const dx = position.x - listenerPosition.x;
    const dy = position.y - listenerPosition.y;
    const dz = position.z - listenerPosition.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
    // Calculate volume based on distance (inverse relationship)
    if (distance > maxDistance) return; // Too far to hear
    
    const volumeFactor = Math.max(0, 1 - distance / maxDistance);
    
    // Play the sound with adjusted volume
    this.play(id, volumeFactor);
  }

  /**
   * Set the master volume for all sounds
   * @param volume Volume level from 0.0 to 1.0
   */
  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Enable or disable all sounds
   * @param enabled Whether sound should be enabled
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Play footstep sounds
   * @param isMoving Whether the player is moving
   */
  public playFootsteps(isMoving: boolean): void {
    if (!isMoving || !this.enabled) return;
    
    // Check if enough time has passed since the last footstep sound
    const now = Date.now();
    if (now - this.lastFootstepTime < this.footstepInterval) return;
    
    // Play at a low volume and randomize slightly for realism
    const randomVolume = 0.2 + Math.random() * 0.1;
    this.play('footstep', randomVolume);
    
    // Update last footstep time
    this.lastFootstepTime = now;
  }

  /**
   * Play a sound for shooting
   * @param shooterPosition Position of the shooter
   * @param listenerPosition Position of the local player
   */
  public playShootSound(
    shooterPosition: { x: number, y: number, z: number },
    listenerPosition: { x: number, y: number, z: number }
  ): void {
    this.play3DSound('shoot', shooterPosition, listenerPosition, 100);
  }

  /**
   * Play impact sound when a projectile hits something
   */
  public playImpactSound(
    impactPosition: { x: number, y: number, z: number },
    listenerPosition: { x: number, y: number, z: number }
  ): void {
    this.play3DSound('impact', impactPosition, listenerPosition, 80);
  }

  /**
   * Play sound for flag events
   * @param event 'pickup', 'capture', or 'return'
   */
  public playFlagSound(event: 'pickup' | 'capture' | 'return'): void {
    const soundId = `flag_${event}`;
    this.play(soundId);
  }

  /**
   * Play game over sound
   * @param isWin Whether the local player's team won
   */
  public playGameOverSound(isWin: boolean): void {
    this.play(isWin ? 'win' : 'lose');
  }

  /**
   * Toggle sound on/off
   * @returns New state of sound (true = enabled, false = disabled)
   */
  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  /**
   * Get current sound enabled state
   * @returns Whether sound is currently enabled
   */
  public isEnabled(): boolean {
    return this.enabled;
  }
}