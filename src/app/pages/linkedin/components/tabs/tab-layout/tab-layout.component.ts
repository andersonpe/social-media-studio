import { BannerConfig, LayoutPreset, LogoBadgeStyle, NetworkStyle } from "@/app/types/BannerConfig/BannerConfig";
import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { BannerNetworkIconsComponent } from "../../technology-icons/technology-icons.component";


@Component({
  imports: [CommonModule],
  selector: 'apds-sm-linkedin-tab-layout',
  standalone: true,
  styleUrl: './tab-layout.component.scss',
  templateUrl: './tab-layout.component.html',
})
export class LinkedInTabLayoutComponent {
  config = input.required<BannerConfig>();
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

  setNetworkStyle(netId: NetworkStyle) {
    // this.config.update(prev => ({ ...prev, networkStyle: netId }))
  }

  getOpacityPercentage(): number {
    return Math.round(this.config().networkOpacity * 100);
  }

  updateOpacity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);
    
    // this.config.update(prev => ({
    //   ...prev,
    //   networkOpacity: value
    // }));
  }  

  toggleExibirIcones(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    /*this.config.update(prev => ({
      ...prev,
      showNetworkIcons: checkbox.checked // true ou false
    }));*/
  }

  toggleExibirMicroGrid(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    /*this.config.update(prev => ({
      ...prev,
      showSubtleGrid: checkbox.checked // true ou false
    }));*/
  }

  setLayoutPreset(presetId: LayoutPreset) {
    // this.config.update(prev => ({ ...prev, layoutPreset: presetId }))
  }

}