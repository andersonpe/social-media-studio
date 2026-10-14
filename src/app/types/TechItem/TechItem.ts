export type TechId =
  | 'angular'
  | 'react'
  | 'php'
  | 'dotnet'
  | 'postgresql'
  | 'oracle'
  | 'sqlserver';


export interface TechItem {
  id: TechId;
  name: string;
  shortLabel: string;
  brandColor: string;
  accentBg: string;
  enabled: boolean;
}

export interface OnModeTechItemEvent {
  index: number, 
  direction: -1 | 1
}