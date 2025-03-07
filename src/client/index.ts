import { Game } from './game/Game';

// Initialize the game when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname;
  
  // Only initialize game for paths starting with '/game-'
  if(pathname !== '/' && pathname.startsWith('/game-')) {
    const game = new Game(pathname);
  }
}); 