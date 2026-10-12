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

export const INITIAL_TECH_STACK: TechItem[] = [
  {
    id: 'angular',
    name: 'Angular',
    shortLabel: 'Angular',
    brandColor: '#DD0031',
    accentBg: 'rgba(221, 0, 49, 0.14)',
    enabled: true,
  },
  {
    id: 'react',
    name: 'React.js',
    shortLabel: 'React.js',
    brandColor: '#61DAFB',
    accentBg: 'rgba(97, 218, 251, 0.14)',
    enabled: true,
  },
  {
    id: 'php',
    name: 'PHP',
    shortLabel: 'PHP',
    brandColor: '#777BB4',
    accentBg: 'rgba(119, 123, 180, 0.16)',
    enabled: true,
  },
  {
    id: 'dotnet',
    name: '.NET',
    shortLabel: '.NET',
    brandColor: '#512BD4',
    accentBg: 'rgba(81, 43, 212, 0.16)',
    enabled: true,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    shortLabel: 'PostgreSQL',
    brandColor: '#5B9BD5',
    accentBg: 'rgba(91, 155, 213, 0.14)',
    enabled: true,
  },
  {
    id: 'oracle',
    name: 'Oracle',
    shortLabel: 'Oracle',
    brandColor: '#F80000',
    accentBg: 'rgba(248, 0, 0, 0.14)',
    enabled: true,
  },
  {
    id: 'sqlserver',
    name: 'SQL Server',
    shortLabel: 'SQL Server',
    brandColor: '#EE3124',
    accentBg: 'rgba(238, 49, 36, 0.14)',
    enabled: true,
  },
];

import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'g[tech-logo-group]',
  standalone: true,
  imports: [],
  templateUrl: 'tech-logos.component.html',
})
export class TechLogoGroupComponent {
  // Inputs baseados em Signals (padrão obrigatório no Angular 22)
  id = input.required<TechId>();
  monochrome = input<boolean>(false);

  // Derivação reativa eficiente de cores usando computed()
  protected angularColors = computed(() => ({
    leftShield: this.monochrome() ? '#E2E8F0' : '#DD0031',
    rightShield: this.monochrome() ? '#94A3B8' : '#C3002F',
    letterFill: this.monochrome() ? '#06392f' : '#FFFFFF'
  }));

  protected reactColors = computed(() => ({
    strokeColor: this.monochrome() ? '#F1F5F9' : '#61DAFB'
  }));

  protected phpColors = computed(() => ({
    ovalFill: this.monochrome() ? '#CBD5E1' : '#777BB4',
    ovalStroke: this.monochrome() ? '#F8FAFC' : '#AEB2D5',
    textFill: this.monochrome() ? '#06392f' : '#FFFFFF'
  }));

  protected dotnetColors = computed(() => ({
    badgeFill: this.monochrome() ? '#E2E8F0' : '#512BD4',
    badgeStroke: this.monochrome() ? '#94A3B8' : '#7B5FE8',
    textFill: this.monochrome() ? '#06392f' : '#FFFFFF'
  }));

  protected postgresColors = computed(() => ({
    baseBlue: this.monochrome() ? '#CBD5E1' : '#336791',
    lightBlue: this.monochrome() ? '#F8FAFC' : '#659AD2',
    strokeTone: this.monochrome() ? '#06392f' : '#FFFFFF'
  }));

  protected oracleColors = computed(() => ({
    oracleRed: this.monochrome() ? '#F1F5F9' : '#F80000'
  }));

  protected sqlServerColors = computed(() => ({
    primaryRed: this.monochrome() ? '#E2E8F0' : '#EE3124',
    deepRed: this.monochrome() ? '#94A3B8' : '#CC2927',
    highlight: this.monochrome() ? '#FFFFFF' : '#FF7A70'
  }));
}

