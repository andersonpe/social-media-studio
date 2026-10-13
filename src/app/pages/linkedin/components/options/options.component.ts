import { BannerConfig } from "@/app/types/BannerConfig/BannerConfig";
import { CommonModule } from "@angular/common";
import { Component, input, output, signal } from "@angular/core";
import { LucideLayers, LucideLayoutPanelLeft, LucideSparkles, LucideType } from "@lucide/angular";

@Component({
  imports: [
    CommonModule, 
    LucideLayers, 
    LucideLayoutPanelLeft,
    LucideType
  ],
  selector: 'apds-sm-linkedin-options',
  standalone: true,
  styleUrl: './options.component.scss',
  templateUrl: './options.component.html',
})

export class LinkedInOptionsComponent {
  config = input.required<BannerConfig>();
  currentTab = input.required<'layout' | 'typography' | 'stack'>();

  onSelectTabEvent = output<'layout' | 'typography' | 'stack'>();

  enabledTechCount(): number {
    return this.config()
      .techStack
      .filter(tech => tech.enabled)
      .length;
  }

}
