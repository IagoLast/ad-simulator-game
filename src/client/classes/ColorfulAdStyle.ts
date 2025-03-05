import { AdStyle } from "./ads/Ad";

/**
 * Enhanced ad style with bright colors and more visible text
 */
export class ColorfulAdStyle implements AdStyle {
  private static readonly COLORS = [
    { bg: "#FF5733", text: "#FFFFFF" }, // Red/White
    { bg: "#33FF57", text: "#000000" }, // Green/Black
    { bg: "#3357FF", text: "#FFFFFF" }, // Blue/White
    { bg: "#F3FF33", text: "#000000" }, // Yellow/Black
    { bg: "#FF33F6", text: "#FFFFFF" }, // Pink/White
    { bg: "#33FFF6", text: "#000000" }, // Cyan/Black
    { bg: "#FF9933", text: "#000000" }, // Orange/Black
    { bg: "#9933FF", text: "#FFFFFF" }, // Purple/White
  ];

  apply(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    text: string
  ): void {
    // Select a random color scheme
    const colorScheme =
      ColorfulAdStyle.COLORS[
        Math.floor(Math.random() * ColorfulAdStyle.COLORS.length)
      ];

    // Fill background
    context.fillStyle = colorScheme.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add gradient overlay
    const gradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add border
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 12;
    context.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Add inner border
    context.strokeStyle = "#000000";
    context.lineWidth = 4;
    context.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

    // Draw text
    const fontSize = Math.floor(canvas.width / 10);
    context.fillStyle = colorScheme.text;
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }
}
