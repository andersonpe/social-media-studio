import { BannerConfig, LogoBadgeStyle } from "@/app/types/BannerConfig/BannerConfig";
import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { BannerNetworkIconsComponent } from "../../technology-icons/technology-icons.component";
import { TechId } from "@/app/types/TechItem/TechItem";

@Component({
  imports: [CommonModule, BannerNetworkIconsComponent],
  selector: 'apds-sm-linkedin-tab-stack',
  standalone: true,
  styleUrl: './tab-stack.component.scss',
  templateUrl: './tab-stack.component.html',
})
export class LinkedInTabStackComponent {
  config = input.required<BannerConfig>();

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
      // this.config.update(prev => ({ ...prev, logoBadgeStyle: style }))
  }

  setMonochromeLogos() {
      // this.config.update(prev => ({ ...prev, monochromeLogos: value }))
  }

  setColourfulLogos() {

  }

  moveTechItem = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.config().techStack.length) return;
      /*this.config.update(prev => {
        const list = [...prev.techStack];
        const temp = list[index];
        list[index] = list[targetIndex];
        list[targetIndex] = temp;
        return { ...prev, techStack: list };
      });*/
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
    /*this.config.update(prev => {
      const enabledCount = prev.techStack.filter((t) => t.enabled).length;
      return {
        ...prev,
        techStack: prev.techStack.map((item) => {
          if (item.id !== id) return item;
          if (item.enabled && enabledCount <= 1) return item;
          return { ...item, enabled: !item.enabled };
        }),
      };
    });*/
  };  

}