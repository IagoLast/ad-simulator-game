import { AdStyle } from '../classes/ads/Ad';

/**
 * Enhanced ad style with bright colors and more visible text
 */
export class ColorfulAdStyle implements AdStyle {
  private static readonly COLORS = [
    { bg: '#FF5733', text: '#FFFFFF' }, // Red/White
    { bg: '#33FF57', text: '#000000' }, // Green/Black
    { bg: '#3357FF', text: '#FFFFFF' }, // Blue/White
    { bg: '#F3FF33', text: '#000000' }, // Yellow/Black
    { bg: '#FF33F6', text: '#FFFFFF' }, // Pink/White
    { bg: '#33FFF6', text: '#000000' }, // Cyan/Black
    { bg: '#FF9933', text: '#000000' }, // Orange/Black
    { bg: '#9933FF', text: '#FFFFFF' }  // Purple/White
  ];

  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void {
    // Select a random color scheme
    const colorScheme = ColorfulAdStyle.COLORS[Math.floor(Math.random() * ColorfulAdStyle.COLORS.length)];
    
    // Fill background
    context.fillStyle = colorScheme.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add gradient overlay
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 12;
    context.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    
    // Add inner border
    context.strokeStyle = '#000000';
    context.lineWidth = 4;
    context.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);
    
    // Helper function to measure text and find optimal font size
    const findOptimalFontSize = (text: string, maxWidth: number, initialSize: number): number => {
      let fontSize = initialSize;
      context.font = `bold ${fontSize}px Arial, sans-serif`;
      
      // Reduce font size until text fits
      while (fontSize > 20 && context.measureText(text).width > maxWidth) {
        fontSize -= 5;
        context.font = `bold ${fontSize}px Arial, sans-serif`;
      }
      
      return fontSize;
    };
    
    // Set available area
    const contentArea = {
      width: canvas.width * 0.85,
      height: canvas.height * 0.7
    };
    
    // Process the text - check if it's a URL
    const isUrl = text.includes('.');
    if (isUrl) {
      // Handle URL formatting
      const parts = text.split('.');
      const domain = parts[0];
      const extension = '.' + parts.slice(1).join('.');
      
      // Calculate optimal font sizes based on domain name length
      const maxWidth = contentArea.width;
      const initialSize = Math.floor(canvas.width / (domain.length > 10 ? 10 : 8));
      const domainFontSize = findOptimalFontSize(domain, maxWidth, initialSize);
      const extensionFontSize = Math.floor(domainFontSize * 0.8); // Slightly smaller extension
      
      // Draw domain
      context.fillStyle = colorScheme.text;
      context.font = `bold ${domainFontSize}px Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(domain, canvas.width / 2, canvas.height / 2 - domainFontSize * 0.6);
      
      // Draw extension
      context.font = `bold ${extensionFontSize}px Arial, sans-serif`;
      context.fillText(extension, canvas.width / 2, canvas.height / 2 + extensionFontSize * 0.6);
    } else {
      // Handle non-URL text - split into words
      const words = text.split(' ');
      
      // For single words or very short text
      if (words.length <= 2 && text.length < 15) {
        const fontSize = findOptimalFontSize(text, contentArea.width, Math.floor(canvas.width / 7));
        context.fillStyle = colorScheme.text;
        context.font = `bold ${fontSize}px Arial, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      } else {
        // For longer text, break into multiple lines
        const initialLineHeight = Math.floor(canvas.width / 12);
        const maxWidth = contentArea.width;
        
        // Set initial font
        context.font = `bold ${initialLineHeight}px Arial, sans-serif`;
        context.fillStyle = colorScheme.text;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Generate lines that fit within maxWidth
        const lines: string[] = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + ' ' + words[i];
          const metrics = context.measureText(testLine);
          
          if (metrics.width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);
        
        // Adjust font size if too many lines
        let fontSize = initialLineHeight;
        if (lines.length > 3) {
          fontSize = Math.floor(initialLineHeight * (3 / lines.length) * 0.9);
          context.font = `bold ${fontSize}px Arial, sans-serif`;
        }
        
        // Draw lines
        const totalTextHeight = fontSize * lines.length;
        const startY = (canvas.height - totalTextHeight) / 2 + fontSize / 2;
        
        lines.forEach((line, index) => {
          context.fillText(line, canvas.width / 2, startY + index * fontSize);
        });
      }
    }
    
    // Add a "decoration" element
    const decoration = Math.floor(Math.random() * 4);
    switch (decoration) {
      case 0: // Circle
        context.beginPath();
        context.arc(canvas.width * 0.15, canvas.height * 0.15, canvas.width * 0.08, 0, Math.PI * 2);
        context.fillStyle = colorScheme.text;
        context.fill();
        break;
      case 1: // Star
        this.drawStar(context, canvas.width * 0.85, canvas.height * 0.15, 5, canvas.width * 0.08, canvas.width * 0.04);
        context.fillStyle = colorScheme.text;
        context.fill();
        break;
      case 2: // Rectangle banner
        context.fillStyle = colorScheme.text;
        context.fillRect(canvas.width * 0.15, canvas.height * 0.15, canvas.width * 0.7, canvas.height * 0.15);
        context.fillStyle = colorScheme.bg;
        context.font = `bold ${Math.floor(canvas.width / 16)}px Arial, sans-serif`;
        context.fillText('ADVERTISEMENT', canvas.width / 2, canvas.height * 0.22);
        break;
      case 3: // Diagonal stripe
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(Math.PI / 4);
        context.fillStyle = colorScheme.text;
        context.fillRect(-canvas.width, -canvas.height * 0.1, canvas.width * 2, canvas.height * 0.2);
        context.restore();
        break;
    }
  }
  
  // Helper method to draw a star shape
  private drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): void {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }
} 