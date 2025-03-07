/**
 * AudioUI provides visual feedback for WebRTC audio status
 */
export class AudioUI {
  private container: HTMLDivElement;
  private statusElement: HTMLDivElement;
  
  /**
   * Create a new AudioUI
   */
  constructor() {
    // Create container
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.bottom = '20px';
    this.container.style.right = '20px';
    this.container.style.padding = '10px';
    this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.container.style.borderRadius = '5px';
    this.container.style.color = 'white';
    this.container.style.fontFamily = 'Arial, sans-serif';
    this.container.style.fontSize = '14px';
    this.container.style.pointerEvents = 'none';
    this.container.style.display = 'none';
    
    // Create status element
    this.statusElement = document.createElement('div');
    this.statusElement.textContent = 'Voice Chat: OFF (Press C to toggle)';
    this.container.appendChild(this.statusElement);
    
    // Add to document
    document.body.appendChild(this.container);
    
    // Add media query for mobile devices
    this.addMobileStyles();
  }
  
  /**
   * Add mobile-specific styles using media query
   */
  private addMobileStyles(): void {
    // Create a style element
    const style = document.createElement('style');
    style.textContent = `
      @media screen and (max-width: 768px) {
        #audio-ui-container {
          font-size: 10px !important;
          padding: 5px !important;
          bottom: 10px !important;
          right: 10px !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Add an ID to the container so the CSS selector can target it
    this.container.id = 'audio-ui-container';
  }
  
  /**
   * Show the audio UI
   */
  public show(): void {
    this.container.style.display = 'block';
  }
  
  /**
   * Hide the audio UI
   */
  public hide(): void {
    this.container.style.display = 'none';
  }
  
  /**
   * Update the audio status display
   * @param enabled Whether audio is enabled
   * @param playerCount Number of connected players
   */
  public updateStatus(enabled: boolean, playerCount: number = 0): void {
    if (enabled) {
      this.statusElement.textContent = `Voice Chat: ON (${playerCount} players connected)`;
      this.statusElement.style.color = '#4CAF50'; // Green
    } else {
      // Different text for mobile vs desktop
      if (window.innerWidth <= 768) {
        this.statusElement.textContent = 'Voice Chat: OFF (Use mic button)';
      } else {
        this.statusElement.textContent = 'Voice Chat: OFF (Press C to toggle)';
      }
      this.statusElement.style.color = 'white';
    }
  }
  
  /**
   * Show a speaking indicator when someone is talking
   * @param isSpeaking Whether someone is currently speaking
   */
  public showSpeakingIndicator(isSpeaking: boolean): void {
    if (isSpeaking) {
      this.container.style.backgroundColor = 'rgba(76, 175, 80, 0.7)'; // Green with opacity
    } else {
      this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Default background
    }
  }
} 