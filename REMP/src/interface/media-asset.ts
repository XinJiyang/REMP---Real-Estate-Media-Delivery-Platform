export interface ImageType {
  id?: number,
  src: string;
  width: number;
  height: number;
  title?: string;
  alt?: string;
  label?: string;
}

export interface QuiltedImageItem extends ImageType {
  rows: number;
  cols: number;
}