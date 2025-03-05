# Game Sound Effects

This directory is no longer needed for sound files as we're now using JavaScript-generated sounds via the Web Audio API.

## Sound System Overview

The game now uses the Web Audio API to generate sound effects programmatically:

- No physical audio files needed
- All sounds are generated at runtime using oscillators and noise generators
- Sound types include:
  - Simple beeps (player join/leave, flag pickup/return)
  - Weapon sounds (shooting)
  - Noise effects (impacts)
  - Click sounds (footsteps)
  - Melodies (win/lose, flag capture)

## Sound Types

The following sound types are generated:

- `player_join`: High-pitched beep (660Hz)
- `player_leave`: Low-pitched beep (330Hz)
- `shoot`: Weapon sound effect with frequency sweep
- `impact`: White noise burst
- `flag_pickup`: Higher-pitched beep (880Hz)
- `flag_capture`: Ascending three-note melody
- `flag_return`: Medium-pitched beep (440Hz)
- `win`: Ascending four-note melody
- `lose`: Descending four-note melody
- `footstep`: Low quiet click sound

## Adding New Sounds

To add or modify sounds:

1. Edit the `setupSounds()` method in `src/client/game/core/Sound.ts`
2. Use the provided helper methods or create new ones for different sound types
3. Connect the sound to game events where needed

## Sound Parameters

Parameters that can be adjusted for sounds:

- Frequency: Controls pitch (higher = higher pitch)
- Duration: Controls length of the sound
- Wave type: sine, square, sawtooth, triangle
- Volume: Overall loudness
- Envelope: How the sound fades in/out

## Attribution

If using third-party sound effects, ensure you have the appropriate license and provide attribution in this README.

## Testing Sounds

You can test if sounds are properly loaded by checking the browser console for any loading errors. 