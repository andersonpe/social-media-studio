import { BannerConfig, LogoBadgeStyle } from "@/app/types/BannerConfig/BannerConfig";
import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { BannerNetworkIconsComponent } from "../../technology-icons/technology-icons.component";


@Component({
  imports: [CommonModule, BannerNetworkIconsComponent],
  selector: 'apds-sm-linkedin-tab-stack',
  standalone: true,
  styleUrl: './tab-texto.component.scss',
  templateUrl: './tab-texto.component.html',
})
export class LinkedInTabTextoComponent {
  config = input.required<BannerConfig>();
}