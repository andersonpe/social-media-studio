import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import {
  LucideDownload,
  LucideSparkles,
} from '@lucide/angular';
import { ExportBannerService } from '@/app/services/banner/export-banner.service';
import { ViewMode } from '@/app/pages/linkedin/types/ViewMode/ViewMode';
import { CommonModule } from '@angular/common';
import { BannerConfig, LayoutPreset, LogoBadgeStyle, NetworkStyle } from '@/app/types/BannerConfig/BannerConfig';
import { INITIAL_TECH_STACK } from '@/app/data/InitialDataStack';
import { BannerCanvasComponent } from '@/app/component/banner-canvas/banner-canvas.component';
import { OnModeTechItemEvent, TechId } from '@/app/types/TechItem/TechItem';
import { SubnavLinkedInComponent } from './components/subnav/subnav.component';
import { SelectViewModeEventData } from './types/SelectViewModeEventData';
import { BannerNetworkIconsComponent } from '@/app/pages/linkedin/components/technology-icons/technology-icons.component';
import { LinkedInTabStackComponent } from './components/tabs/tab-stack/tab-stack.component';
import { LinkedInTabLayoutComponent } from './components/tabs/tab-layout/tab-layout.component';
import { LinkedInTabTypographyComponent } from './components/tabs/tab-typography/tab-typography.component';
import { LinkedInOptionsComponent } from './components/options/options.component';

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
  imports: [
    CommonModule, 
    SubnavLinkedInComponent, 
    LinkedInTabLayoutComponent, 
    LinkedInTabTypographyComponent, 
    LucideDownload, 
    LucideDownload, 
    LucideSparkles, 
    BannerCanvasComponent, 
    LinkedInTabStackComponent,
    LinkedInOptionsComponent
  ],
  selector: 'apds-social-media-studio-linkedin',
  standalone: true,
  styleUrl: './linkedin.component.scss',
  templateUrl: './linkedin.component.html',
})
export class LinkedInComponent {
  protected readonly title = signal('social-media-studio');
  exportBannerService = inject(ExportBannerService);

  viewMode = signal<ViewMode>('banner-only');
  config = signal<BannerConfig>(DEFAULT_CONFIG);
  exportNotice = signal<string | null>(null);
  activeTab = signal<'layout' | 'typography' | 'stack'>('layout');
  isExporting = signal<boolean>(false);
  copiedSuccess = signal<boolean>(false);

  svgRef = viewChild<ElementRef<SVGSVGElement>>('svgCanvas');

  setViewModeEventHandler(event: SelectViewModeEventData) {
    event.event.preventDefault();
    this.viewMode.update(prev => event.view);
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

  /**
   * Event handlers
   * 
   */

  setFullNameEventHandler(value: string): void {
    this.config.update(current => ({
      ...current,
      fullName: value
    }));
  }

  setRoleTitleEventHandler(value: string): void {
    this.config.update(current => ({
      ...current,
      roleTitle: value
    }));
  }  

  setFontFamilyEventHandler(value: BannerConfig['fontFamily']): void {
    this.config.update(current => ({
      ...current,
      fontFamily: value
    }));
  }

  setNameFontSizeEventHandler(value: number): void {
    this.config.update(current => ({
      ...current,
      nameFontSize: value
    }));
  } 

  setRoleFontSizeEventHandler(value: number): void {
    this.config.update(current => ({
      ...current,
      roleFontSize: value
    }));
  }
  
  setBgColorEventHandler(value: string): void {
    this.config.update(current => ({
      ...current,
      bgColor: value
    }));
  }  

  setShowTaglineEventHandler(value: boolean): void {
    this.config.update(current => ({
      ...current,
      showTagline: value
    }));
  }  
  
  setTaglineEventHandler(value: string): void {
    this.config.update(current => ({
      ...current,
      tagline: value
    }));
  }

  onSelectTabEventHandler(value: 'layout' | 'typography' | 'stack'): void {
    this.activeTab.set(value);
  }

  onSetLogoBadgeStyleEventHandler(style: LogoBadgeStyle) {
    this.config.update(prev => ({ ...prev, logoBadgeStyle: style }))  
  }
  
  onSetMonochromeLogosEventHandler() {
    this.config.update(prev => ({ ...prev, monochromeLogos: true }))
  }
            
  onSetColourfulLogosEventHandler() {
    this.config.update(prev => ({ ...prev, monochromeLogos: false }))
  }

  onModeTechItemEventHandler(event: OnModeTechItemEvent) {
    const targetIndex = event.index + event.direction;
    if (targetIndex < 0 || targetIndex >= this.config().techStack.length) return;
      this.config.update(prev => {
        const list = [...prev.techStack];
        const temp = list[event.index];
        list[event.index] = list[targetIndex];
        list[targetIndex] = temp;
        return { ...prev, techStack: list };
      });
  }

  onToggleTechItemEventHandler(event: TechId) {
    this.config.update(prev => {
      const enabledCount = prev.techStack.filter((t) => t.enabled).length;
      return {
        ...prev,
        techStack: prev.techStack.map((item) => {
          if (item.id !== event) return item;
          if (item.enabled && enabledCount <= 1) return item;
          return { ...item, enabled: !item.enabled };
        }),
      };
    });
  }

}
