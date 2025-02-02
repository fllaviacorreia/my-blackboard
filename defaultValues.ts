
export interface DrawPath {
  path: string;
  color: string;
  width: number;
  colorFrom: "pencil" | "eraser";
}

export const colorsPencil = [ "black", "brown", "orange",  "yellow", "red", "green", "blue", "white" ];
export const colorsBackground = ["black", "gray", "#2C5F2D", "white"];
export const sizeIcons = 30;
