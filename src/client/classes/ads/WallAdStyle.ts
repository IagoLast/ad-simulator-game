import { AdStyle } from './Ad';

/**
 * Wall Ad Style - Simple style for gigantic ads displayed on the edge walls
 * Just a background with centered text and fixed frame
 */
export class WallAdStyle implements AdStyle {
  // Improved color combinations with better contrast
  private static readonly COLORS = [
    { bg: '#FF3366', text: '#FFFFFF' }, // Red/White
    { bg: '#33CC33', text: '#FFFFFF' }, // Green/White - changed from black for better visibility
    { bg: '#3366FF', text: '#FFFFFF' }, // Blue/White
    { bg: '#FFCC00', text: '#000000' }, // Yellow/Black
    { bg: '#FF33CC', text: '#FFFFFF' }, // Pink/White
    { bg: '#00CCFF', text: '#000000' }, // Cyan/Black
  ];

  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void {
    // Select a random color scheme
    const colorScheme = WallAdStyle.COLORS[Math.floor(Math.random() * WallAdStyle.COLORS.length)];
    
    // Clear canvas first
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background with solid color
    context.fillStyle = colorScheme.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add a thicker white border for better visibility
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 20;
    context.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Add inner black border for contrast
    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    context.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    // Calculate base font size - start larger for wall ads
    let fontSize = Math.floor(canvas.width / 8);
    
    // Adjust font size for longer text
    const MAX_WIDTH_PERCENTAGE = 0.75; // Use 75% of canvas width at most
    const maxWidth = canvas.width * MAX_WIDTH_PERCENTAGE;
    
    // Start with default font size and reduce if needed
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    let textMetrics = context.measureText(text);
    
    // If text is too wide, reduce font size proportionally
    if (textMetrics.width > maxWidth) {
      const scaleFactor = maxWidth / textMetrics.width;
      fontSize = Math.floor(fontSize * scaleFactor);
      context.font = `bold ${fontSize}px Arial, sans-serif`;
    }
    
    // Add text shadow for better visibility
    context.shadowColor = colorScheme.text === '#000000' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    
    // Draw text in the center with adjusted font size for better visibility
    context.fillStyle = colorScheme.text;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Reset shadow
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }
} 