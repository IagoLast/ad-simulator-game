import { ControlsMobile } from "./ControlsMobile";
import { ControlsDesktop } from "./ControlsDesktop";

export function createControls(canvas: HTMLCanvasElement) {
  return _isMobile() ? new ControlsMobile(canvas) : new ControlsDesktop(canvas);
}

function _isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}


export default {
    createControls
}