import { BannerConfig } from "@/app/types/BannerConfig/BannerConfig";
import { TechItem } from "@/app/types/TechItem/TechItem";
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BannerNetworkIconsComponent } from "../../pages/linkedin/components/technology-icons/technology-icons.component";
import { CommonModule } from "@angular/common";

interface NetworkEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface NetworkNode {
  id: number,
  x: number;
  y: number;
  primary: boolean;
  radius: number;
  icon?: string;
}

interface Hexagon {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface CircuitLine {
  points: string;
  opacity: number;
}

@Component({
  selector: 'app-banner-canvas',
  standalone: true,
  templateUrl: './banner-canvas.component.html',
  styleUrl: './banner-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BannerNetworkIconsComponent],
})
export class BannerCanvasComponent {
  readonly svgRef = viewChild<ElementRef<SVGSVGElement>>('svgRef');
  readonly config = input.required<BannerConfig>();
  readonly width = 1584;
  readonly height = 396;

  readonly nodes: NetworkNode[] = [
    { id: 1, x: 55, y: 65, radius: 3, icon: 'cloud', primary: false },
    { id: 1, x: 150, y: 125, radius: 4, icon: 'code', primary: false },
    { id: 1, x: 240, y: 45, radius: 3, icon: 'db', primary: false },
    { id: 1, x: 325, y: 145, radius: 4, icon: undefined, primary: false },
    { id: 1, x: 415, y: 70, radius: 3, icon: 'db', primary: false },
    { id: 1, x: 500, y: 180, radius: 4, icon: 'git', primary: false },
    { id: 1, x: 600, y: 85, radius: 3, icon: undefined, primary: false },
    { id: 1, x: 700, y: 145, radius: 4, icon: 'server', primary: false },
    { id: 1, x: 800, y: 50, radius: 3, icon: undefined, primary: false },
    { id: 1, x: 900, y: 165, radius: 4, icon: 'api', primary: false },
    { id: 1, x: 1000, y: 75, radius: 3, icon: undefined, primary: false },
    { id: 1, x: 1100, y: 145, radius: 4, icon: 'git', primary: false },
    { id: 1, x: 1200, y: 45, radius: 3, icon: '', primary: false },
    { id: 1, x: 1300, y: 150, radius: 4, icon: 'N', primary: false },
    { id: 1, x: 1400, y: 75, radius: 3, icon: 'O', primary: false },
    { id: 1, x: 1510, y: 130, radius: 4, icon: 'P', primary: false },
    { id: 1, x: 100, y: 270, radius: 3, icon: 'Q', primary: false },
    { id: 1, x: 230, y: 335, radius: 4, icon: 'R', primary: false },
    { id: 1, x: 380, y: 260, radius: 3, icon: 'S', primary: false },
    { id: 1, x: 520, y: 325, radius: 4, icon: 'T', primary: false },
    { id: 1, x: 680, y: 265, radius: 3, icon: 'U', primary: false },
    { id: 1, x: 830, y: 340, radius: 4, icon: 'V', primary: false },
    { id: 1, x: 980, y: 260, radius: 3, icon: 'node', primary: false },
    { id: 1, x: 1130, y: 330, radius: 4, icon: 'node', primary: false },
    { id: 1, x: 1280, y: 265, radius: 3, icon: undefined, primary: false },
    { id: 1, x: 1440, y: 325, radius: 4, icon: 'node', primary: false },
  ];

  readonly edges: NetworkEdge[] = this.createEdges();

  readonly hexagons: Hexagon[] = this.createHexagons();

  readonly circuitLines: CircuitLine[] = [
    {
      points: '0,100 100,100 125,125 250,125',
      opacity: 0.4,
    },
    {
      points: '100,0 100,65 140,105 140,190 220,270',
      opacity: 0.25,
    },
    {
      points: '0,290 160,290 190,260 310,260 350,220 450,220',
      opacity: 0.35,
    },
    {
      points: '400,0 400,55 450,105 450,180',
      opacity: 0.25,
    },
    {
      points: '0,200 80,200 110,230 180,230',
      opacity: 0.2,
    },
  ];

  readonly fontFamilyCss = computed(() => {
    const font = this.config().fontFamily;

    return `'${font}', sans-serif`;
  });

  readonly nameX = computed(() => {
    switch (this.config().layoutPreset) {
      case 'centered':
        return this.width / 2;
      case 'editorial-split':
        return 100;
      default:
        return 1050;
    }
  });

  readonly textAnchor = computed<'start' | 'middle'>(() =>
    this.config().layoutPreset === 'centered'
      ? 'middle'
      : 'start',
  );

  readonly roleY = computed(() =>
    this.config().showTagline ? 235 : 255,
  );

  readonly nameY = computed(() =>
    this.config().showTagline ? 165 : 185,
  );

  readonly taglineY = computed(() => 275);

  readonly isEditorial = computed(
    () => this.config().layoutPreset === 'editorial-split',
  );

  readonly isCentered = computed(
    () => this.config().layoutPreset === 'centered',
  );

  readonly badgeItems = computed(() =>
    this.config().techStack ?? [],
  );

  private createEdges(): NetworkEdge[] {
    const edges: NetworkEdge[] = [];

    for (let i = 0; i < this.nodes.length; i++) {
      const current = this.nodes[i];

      for (let j = i + 1; j < this.nodes.length; j++) {
        const next = this.nodes[j];
        const dx = current.x - next.x;
        const dy = current.y - next.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 175) {
          edges.push({
            x1: current.x,
            y1: current.y,
            x2: next.x,
            y2: next.y,
          });
        }
      }
    }

    return edges;
  }

  private createHexagons(): Hexagon[] {
    const hexagons: Hexagon[] = [];

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 13; col++) {
        const x = col * 135 + (row % 2) * 67;
        const y = row * 76 + 10;

        hexagons.push({
          x,
          y,
          size: 42,
          opacity: 0.08 + ((row + col) % 3) * 0.035,
        });
      }
    }

    return hexagons;
  }

  hexagonPoints(
    x: number,
    y: number,
    size: number,
  ): string {
    const points: string[] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;

      points.push(
        `${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`,
      );
    }

    return points.join(' ');
  }

  /**
   * Fallback visual for technologies without a registered SVG logo.
   */
  techInitials(name: string): string {
    const words = name.trim().split(/[\s-]+/);

    if (words.length > 1) {
      return `${words[0][0] ?? ''}${words[1][0] ?? ''}`
        .toUpperCase();
    }

    return name.slice(0, 2).toUpperCase();
  }

  techColor(tech: TechItem): string {
    if (this.config().monochromeLogos) {
      return '#ffffff';
    }

    return tech.brandColor || this.config().accentColor;
  }

  trackNode(index: number): number {
    return index;
  }

  trackTech(_index: number, tech: TechItem): string {
    return tech.id;
  }


  getBadgeWidth(tech: TechItem): number {
    if (this.config().logoBadgeStyle === 'icon-above') {
      return Math.max(82, tech.name.length * 7 + 18);
    }

    if (this.config().logoBadgeStyle === 'minimal-clean') {
      return tech.name.length * 7 + 28;
    }

    return tech.name.length * 7 + 48;
  }

  getBadgeX(index: number, total: number): number {
    const gap = 12;
    const items = this.badgeItems();
    const totalWidth = items.reduce(
      (sum, tech) => sum + this.getBadgeWidth(tech),
      0,
    ) + Math.max(0, total - 1) * gap;

    const startX = this.config().layoutPreset === 'centered'
      ? (this.width - totalWidth) / 2
      : this.config().layoutPreset === 'editorial-split'
        ? 100
        : 1050;

    let offset = 0;

    for (let i = 0; i < index; i++) {
      offset += this.getBadgeWidth(items[i]) + gap;
    }

    return startX + offset;
  }

  getBadgeY(): number {
    return this.config().logoBadgeStyle === 'icon-above'
      ? 315
      : 325;
  }

  renderSubtleNetworkIcon(type: string | undefined, x: number, y: number, color: string): SafeHtml | null {
    if (!type) return null;

    let innerContent = '';

    // Renderização condicional baseada na string
    if (type === 'server') {
      innerContent = `
        <g stroke="${color}" stroke-width="1.3" fill="none" transform="translate(6, 6)">
          <rect x="1" y="1" width="14" height="5" rx="1.2" />
          <rect x="1" y="9" width="14" height="5" rx="1.2" />
          <circle cx="4" cy="3.5" r="0.8" fill="${color}" />
          <circle cx="4" cy="11.5" r="0.8" fill="${color}" />
          <line x1="8" y1="3.5" x2="12" y2="3.5" />
          <line x1="8" y1="11.5" x2="12" y2="11.5" />
        </g>
      `;
    } else if (type === 'db') {
      innerContent = `
        <g stroke="${color}" stroke-width="1.3" fill="none" transform="translate(6, 5)">
          <ellipse cx="8" cy="3.5" rx="6" ry="2.3" />
          <path d="M2 3.5V9C2 10.3 4.7 11.3 8 11.3C11.3 11.3 14 10.3 14 9V3.5" />
          <path d="M2 9V14C2 15.3 4.7 16.3 8 16.3C11.3 16.3 14 15.3 14 14V9" />
        </g>
      `;
    } else if (type === 'code') {
      innerContent = `
        <g stroke="${color}" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(6, 6)">
          <polyline points="4.5 4 1 8 4.5 12" />
          <polyline points="11.5 4 15 8 11.5 12" />
          <line x1="9.2" y1="2.5" x2="6.8" y2="13.5" />
        </g>
      `;
    } else if (type === 'git') {
      innerContent = `
        <g stroke="${color}" stroke-width="1.3" fill="none" stroke-linecap="round" transform="translate(6, 6)">
          <circle cx="4" cy="3.5" r="2" />
          <circle cx="4" cy="12.5" r="2" />
          <circle cx="12" cy="6.5" r="2" />
          <line x1="4" y1="5.5" x2="4" y2="10.5" />
          <path d="M12 8.5C12 10.5 9.5 11 4 10.5" />
        </g>
      `;
    } else if (type === 'cloud') {
      innerContent = `
        <g stroke="${color}" stroke-width="1.3" fill="none" stroke-linecap="round" transform="translate(6, 6)">
          <!-- Caminho padrão ilustrativo para nuvem devido ao corte do código original -->
          <path d="M3 10a3 3 0 0 1 3-3 4.5 4.5 0 0 1 8.5-1.5 3.5 3.5 0 0 1 1.5 6.5H5a3 3 0 0 1-2-2z" />
        </g>
      `;
    }

    return `
      <g transform="translate(${x - 14}, ${y - 14})" opacity="0.85">
        <circle
          cx="14"
          cy="14"
          r="15"
          fill="#042821"
          stroke="${color}"
          stroke-width="1.2"
          stroke-opacity="0.55"
        />
        ${innerContent}
      </g>
    `.trim();
  }

}
