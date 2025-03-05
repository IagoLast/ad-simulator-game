import { AdStyle } from './Ad';

/**
 * Wall Ad Style - Simple style for gigantic ads displayed on the edge walls
 * Just a background with centered text and fixed frame
 */
export class WallAdStyle implements AdStyle {
  private static readonly COLORS = [
    { bg: '#FF3366', text: '#FFFFFF' }, // Red/White
    { bg: '#33CC33', text: '#000000' }, // Green/Black
    { bg: '#3366FF', text: '#FFFFFF' }, // Blue/White
    { bg: '#FFCC00', text: '#000000' }, // Yellow/Black
    { bg: '#FF33CC', text: '#FFFFFF' }, // Pink/White
    { bg: '#00CCFF', text: '#000000' }, // Cyan/Black
  ];

  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void {
    // Select a random color scheme
    const colorScheme = WallAdStyle.COLORS[Math.floor(Math.random() * WallAdStyle.COLORS.length)];
    
    // Fill background
    context.fillStyle = colorScheme.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add a simple border
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 10;
    context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Draw text in the center with fixed font size - reduced size
    context.fillStyle = colorScheme.text;
    context.font = '80px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }
} 