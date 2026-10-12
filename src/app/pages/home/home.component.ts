import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import {
  LucideCheck,
  LucideCopy,
  LucideDownload,
  LucideEye,
  LucideFileCode,
  LucideLayers,
  LucideLayout,
  LucideRotateCcw,
  LucideSliders,
  LucideSparkles,
  LucideType,
  LucideUser,
} from '@lucide/angular';
import { ExportBannerService } from '@/app/services/banner/export-banner.service';
import { ViewMode } from '@/app/pages/linkedin/types/ViewMode/ViewMode';
import { CommonModule } from '@angular/common';
import { BannerConfig, LayoutPreset, LogoBadgeStyle, NetworkStyle } from '@/app/types/BannerConfig/BannerConfig';
import { INITIAL_TECH_STACK } from '@/app/data/InitialDataStack';
import { BannerCanvasComponent } from '@/app/component/banner-canvas/banner-canvas.component';
import { TechId } from '@/app/types/TechItem/TechItem';

const DEFAULT_CONFIG: BannerConfig = {
  fullName: 'Anderson Pereira da Silva',
  roleTitle: 'Desenvolvedor de Software',
  tagline: 'Arquitetura de Sistemas · Aplicações Web Escaláveis · Bancos de Dados Corporativos',
  showTagline: false,
  bgColor: '#06392f',
  accentColor: '#10b981',
  layoutPreset: 'right-aligned',
  networkStyle: 'constellation',
  networkOpacity: 0.85,
  logoBadgeStyle: 'glass-pill',
  monochromeLogos: false,
  fontFamily: 'Outfit',
  nameFontSize: 52,
  roleFontSize: 25,
  showSubtleGrid: true,
  showNetworkIcons: true,
  techStack: INITIAL_TECH_STACK,
};

@Component({
  imports: [CommonModule, LucideCheck, LucideFileCode, LucideDownload, LucideCopy, LucideDownload, LucideLayers, LucideLayout, LucideType, LucideSparkles, BannerCanvasComponent],
  selector: 'apds-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  protected readonly title = signal('social-media-studio');
  exportBannerService = inject(ExportBannerService);

  viewMode = signal<ViewMode>('banner-only');
  config = signal<BannerConfig>(DEFAULT_CONFIG);
  exportNotice = signal<string | null>(null);
  activeTab = signal<'layout' | 'typography' | 'stack'>('layout');
  isExporting = signal<boolean>(false);
  copiedSuccess = signal<boolean>(false);

  svgRef = viewChild<ElementRef<SVGSVGElement>>('svgCanvas');

   readonly presets: { id: LayoutPreset; title: string; desc: string }[] = [
    {
      id: 'right-aligned',
      title: 'Executivo Direita (Ideal)',
      desc: 'Deixa a esquerda livre para a foto do LinkedIn e destaca a malha de rede.',
    },
    {
      id: 'centered',
      title: 'Centralizado Clássico',
      desc: 'Simetria total no centro do banner com nós de rede nas laterais.',
    },
    {
      id: 'editorial-split',
      title: 'Editorial Assimétrico',
      desc: 'Alinhamento à esquerda com barra arquitetural divisória.',
    }
  ];

  readonly networks: { id: NetworkStyle; title: string; desc: string }[] = [
    {
      id: 'constellation',
      title: 'Constelação & Nós',
      desc: 'Malha de conectividade distribuída com ícones sutis de servidor, banco e nuvem.',
    },
    {
      id: 'hex-topology',
      title: 'Topologia Hexagonal',
      desc: 'Clusters geométricos modulares inspirados em arquitetura de microsserviços.',
    },
    {
      id: 'circuit-flow',
      title: 'Fluxo de Dados',
      desc: 'Trilhas minimalistas de barramento de dados com terminais de rede.',
    },
  ];

  readonly estilos: { id: LogoBadgeStyle; title: string; desc: string }[] = [
    {
      id: 'glass-pill',
      title: 'Cards Translúcidos',
      desc: 'Molduras de vidro sutil com ícone oficial em destaque e texto legível.',
    },
    {
      id: 'minimal-clean',
      title: 'Minimalista Circular',
      desc: 'Ícones em medalhões escuros sem borda externa ao redor do nome.',
    },
    {
      id: 'icon-above',
      title: 'Bloco Vertical',
      desc: 'Logos centralizados acima do nome de cada tecnologia.',
    },
  ];


  getOpacityPercentage(): number {
    return Math.round(this.config().networkOpacity * 100);
  }

  updateOpacity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);
    
    this.config.update(prev => ({
      ...prev,
      networkOpacity: value
    }));
  }  

  toggleExibirIcones(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    this.config.update(prev => ({
      ...prev,
      showNetworkIcons: checkbox.checked // true ou false
    }));
  }

  toggleExibirMicroGrid(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    this.config.update(prev => ({
      ...prev,
      showSubtleGrid: checkbox.checked // true ou false
    }));
  }

  setNetworkStyle(netId: NetworkStyle) {
    this.config.update(prev => ({ ...prev, networkStyle: netId }))
  }

  setLayoutPreset(presetId: LayoutPreset) {
    this.config.update(prev => ({ ...prev, layoutPreset: presetId }))
  }

  setLogoBadgeStyle(style: LogoBadgeStyle) {
    this.config.update(prev => ({ ...prev, logoBadgeStyle: style }))
  }

  setMonochromeLogos(value: boolean) {
    this.config.update(prev => ({ ...prev, monochromeLogos: value }))
  }

  moveTechItem = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.config().techStack.length) return;
      this.config.update(prev => {
        const list = [...prev.techStack];
        const temp = list[index];
        list[index] = list[targetIndex];
        list[targetIndex] = temp;
        return { ...prev, techStack: list };
      });
  };


  setViewMode(event: MouseEvent, mode: ViewMode) {
    event.preventDefault();
    this.viewMode.update(prev => mode);
  }

  handleReset = () => {
    this.config.set(DEFAULT_CONFIG);
    this.exportNotice.set('Configurações originais restauradas (#06392f)');
    setTimeout(() => this.exportNotice.set(null), 2500);
  };

  handleCopyClipboard = async () => {
    const svgElement = this.svgRef()?.nativeElement;
    
    if (!svgElement) return;

    const ok = await this.copySvgAsPngToClipboard(svgElement);
    if (ok) {
      this.copiedSuccess.set(true);
      this.exportNotice.set('Imagem 1584 × 396 px copiada para a área de transferência');
      setTimeout(() => {
        this.copiedSuccess.set(false);
        this.exportNotice.set(null);
      }, 3000);
    } else {
      await this.handleDownloadPng(1);
    }
  };

  async copySvgAsPngToClipboard(svgElement: SVGSVGElement): Promise<boolean> {
    
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
      return false;
    }

    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const width = 1584;
    const height = 396;
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
    clonedSvg.setAttribute('width', String(width));
    clonedSvg.setAttribute('height', String(height));
    clonedSvg.setAttribute('viewBox', '0 0 1584 396');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(false);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        canvas.toBlob(async (blob) => {
          if (!blob) {
            resolve(false);
            return;
          }
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            resolve(true);
          } catch {
            resolve(false);
          }
        }, 'image/png');
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(false);
      };
      img.src = url;
    });
  };

  handleDownloadPng = async(scale: 1 | 2 = 1) => {
    const svgElement = this.svgRef()?.nativeElement;

    if (!svgElement || this.isExporting()) return;
    
    this.isExporting.set(true);

    try {
      const suffix = scale === 2 ? '3168x792-2x' : '1584x396';
  
      await this.exportBannerService.exportSvgToPng(
        svgElement,
        scale,
        `banner-linkedin-anderson-pereira-${suffix}.png`
      );
  
      this.exportNotice.set(`PNG (${1584 * scale} × ${396 * scale} px) exportado com sucesso`);
      setTimeout(() => this.exportNotice.set(null), 3500);
    } finally {
      this.isExporting.set(false);
    }
  };


    handleDownloadSvg = () => {
      const svgElement = this.svgRef()?.nativeElement;

      if (!svgElement) return;

      this.exportBannerService.exportSvgFile(svgElement, 'banner-linkedin-anderson-pereira-1584x396.svg');
      this.exportNotice.set('Arquivo vetorial SVG (1584 × 396 px) exportado');
      
      setTimeout(() => this.exportNotice.set(null), 3500);
    };

    activeTechNames(): string[] {
  return this.config()
    .techStack
    .filter(tech => tech.enabled)
    .map(tech => tech.name);
}

enabledTechCount(): number {
  return this.config()
    .techStack
    .filter(tech => tech.enabled)
    .length;
}

techInitials(name: string): string {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return '';
  }

  const words = normalizedName
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
}

  toggleTechItem = (id: TechId) => {
    this.config.update(prev => {
      const enabledCount = prev.techStack.filter((t) => t.enabled).length;
      return {
        ...prev,
        techStack: prev.techStack.map((item) => {
          if (item.id !== id) return item;
          if (item.enabled && enabledCount <= 1) return item;
          return { ...item, enabled: !item.enabled };
        }),
      };
    });
  };

  setFullName(value: string): void {
    this.config.update(current => ({
      ...current,
      fullName: value
    }));
  }

  setRoleTitle(value: string): void {
    this.config.update(current => ({
      ...current,
      roleTitle: value
    }));
  }

  setFontFamily(value: BannerConfig['fontFamily']): void {
    this.config.update(current => ({
      ...current,
      fontFamily: value
    }));
  }

  setNameFontSize(value: number): void {
  this.config.update(current => ({
    ...current,
    nameFontSize: value
  }));
}

setRoleFontSize(value: number): void {
  this.config.update(current => ({
    ...current,
    roleFontSize: value
  }));
}

setBgColor(value: string): void {
  this.config.update(current => ({
    ...current,
    bgColor: value
  }));
}

setShowTagline(value: boolean): void {
  this.config.update(current => ({
    ...current,
    showTagline: value
  }));
}

setTagline(value: string): void {
  this.config.update(current => ({
    ...current,
    tagline: value
  }));
}

}

/*

import {
  BannerCanvas,
  BannerConfig,
  FontChoice,
  LayoutPreset,
  LogoBadgeStyle,
  NetworkStyle,
} from './components/BannerCanvas';
import { INITIAL_TECH_STACK, TechId, renderTechLogoGroup } from './components/TechLogos';


const DEFAULT_CONFIG: BannerConfig = {
  fullName: 'Anderson Pereira da Silva',
  roleTitle: 'Desenvolvedor de Software',
  tagline: 'Arquitetura de Sistemas · Aplicações Web Escaláveis · Bancos de Dados Corporativos',
  showTagline: false,
  bgColor: '#06392f',
  accentColor: '#10b981',
  layoutPreset: 'right-aligned',
  networkStyle: 'constellation',
  networkOpacity: 0.85,
  logoBadgeStyle: 'glass-pill',
  monochromeLogos: false,
  fontFamily: 'Outfit',
  nameFontSize: 52,
  roleFontSize: 25,
  showSubtleGrid: true,
  showNetworkIcons: true,
  techStack: INITIAL_TECH_STACK,
};

type ViewMode = 'banner-only' | 'linkedin-mockup' | 'safe-zone';

export default function App() {
  const [config, setConfig] = useState<BannerConfig>(DEFAULT_CONFIG);
  const [viewMode, setViewMode] = useState<ViewMode>('banner-only');
  const [activeTab, setActiveTab] = useState<'layout' | 'typography' | 'stack'>('layout');
  const [isExporting, setIsExporting] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  

  const handleDownloadPng = async (scale: 1 | 2 = 1) => {
    if (!svgRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const suffix = scale === 2 ? '3168x792-2x' : '1584x396';
      await exportSvgToPng(
        svgRef.current,
        scale,
        `banner-linkedin-anderson-pereira-${suffix}.png`
      );
      setExportNotice(`PNG (${1584 * scale} × ${396 * scale} px) exportado com sucesso`);
      setTimeout(() => setExportNotice(null), 3500);
    } finally {
      setIsExporting(false);
    }
  };



  const handleCopyClipboard = async () => {
    if (!svgRef.current) return;
    const ok = await copySvgAsPngToClipboard(svgRef.current);
    if (ok) {
      setCopiedSuccess(true);
      setExportNotice('Imagem 1584 × 396 px copiada para a área de transferência');
      setTimeout(() => {
        setCopiedSuccess(false);
        setExportNotice(null);
      }, 3000);
    } else {
      await handleDownloadPng(1);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setExportNotice('Configurações originais restauradas (#06392f)');
    setTimeout(() => setExportNotice(null), 2500);
  };

  const toggleTechItem = (id: TechId) => {
    setConfig((prev) => {
      const enabledCount = prev.techStack.filter((t) => t.enabled).length;
      return {
        ...prev,
        techStack: prev.techStack.map((item) => {
          if (item.id !== id) return item;
          if (item.enabled && enabledCount <= 1) return item;
          return { ...item, enabled: !item.enabled };
        }),
      };
    });
  };

  const moveTechItem = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= config.techStack.length) return;
    setConfig((prev) => {
      const list = [...prev.techStack];
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return { ...prev, techStack: list };
    });
  };

  return (
  );
}*/
