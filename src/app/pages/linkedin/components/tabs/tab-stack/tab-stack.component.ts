import { BannerConfig, LogoBadgeStyle } from "@/app/types/BannerConfig/BannerConfig";
import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { BannerNetworkIconsComponent } from "../../technology-icons/technology-icons.component";
import { OnModeTechItemEvent, TechId } from "@/app/types/TechItem/TechItem";

@Component({
  imports: [CommonModule, BannerNetworkIconsComponent],
  selector: 'apds-sm-linkedin-tab-stack',
  standalone: true,
  styleUrl: './tab-stack.component.scss',
  templateUrl: './tab-stack.component.html',
})
export class LinkedInTabStackComponent {
  config = input.required<BannerConfig>();
  onSetLogoBadgeStyleEvent = output<LogoBadgeStyle>(); 
  onSetMonochromeLogosEvent = output<void>(); 
  onSetColourfulLogosEvent = output<void>(); 
  onMoveTechItemEvent = output<OnModeTechItemEvent>();
  onToggleTechItemEvent = output<TechId>();

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

  setLogoBadgeStyle(style: LogoBadgeStyle) {
    this.onSetLogoBadgeStyleEvent.emit(style);
  }

  setMonochromeLogos() {
    this.onSetMonochromeLogosEvent.emit();
  }

  setColourfulLogos() {
    this.onSetColourfulLogosEvent.emit();
  }

  moveTechItem = (event: OnModeTechItemEvent) => {
    this.onMoveTechItemEvent.emit(event);
  };

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
    this.onToggleTechItemEvent.emit(id);
  };  

}