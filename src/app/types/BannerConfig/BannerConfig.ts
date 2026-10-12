import { TechItem } from "../TechItem/TechItem";

export type LayoutPreset = 'right-aligned' | 'centered' | 'editorial-split';
export type NetworkStyle = 'constellation' | 'hex-topology' | 'circuit-flow';
export type LogoBadgeStyle = 'glass-pill' | 'minimal-clean' | 'icon-above';
export type FontChoice = 'Outfit' | 'Plus Jakarta Sans' | 'Syne';

export interface BannerConfig {
  fullName: string;
  roleTitle: string;
  tagline: string;
  showTagline: boolean;
  bgColor: string;
  accentColor: string;
  layoutPreset: LayoutPreset;
  networkStyle: NetworkStyle;
  networkOpacity: number; // 0.1 to 1.0
  logoBadgeStyle: LogoBadgeStyle;
  monochromeLogos: boolean;
  fontFamily: FontChoice;
  nameFontSize: number;
  roleFontSize: number;
  showSubtleGrid: boolean;
  showNetworkIcons: boolean;
  techStack: TechItem[];
}