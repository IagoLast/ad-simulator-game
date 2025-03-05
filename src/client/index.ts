import { Game } from './game/Game';

// Initialize the game when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Create the game (constructor starts animation)
  if(window.location.pathname !== '/') {
    const game = new Game(window.location.pathname);
  }
}); 