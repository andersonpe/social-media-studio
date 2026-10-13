import { BannerConfig, FontChoice, LogoBadgeStyle } from "@/app/types/BannerConfig/BannerConfig";
import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";

@Component({
  imports: [CommonModule],
  selector: 'apds-sm-linkedin-tab-typography',
  standalone: true,
  styleUrl: './tab-typography.component.scss',
  templateUrl: './tab-typography.component.html',
})
export class LinkedInTabTypographyComponent {
  config = input.required<BannerConfig>();
  onSetFullNameEvent = output<string>(); 
  onSetRoleTitleEvent = output<string>(); 
  onSetFontFamilyEvent = output<FontChoice>(); 
  onSetNameFontSizeEvent = output<number>(); 
  onSetRoleFontSizeEvent = output<number>(); 
  onSetBgColorEvent = output<string>(); 
  onSetShowTaglineEvent = output<boolean>(); 
  onSetTagLineEvent = output<string>(); 

  setFullName(value: string): void {
    console.log(value);
    this.onSetFullNameEvent.emit(value);
  }

  setRoleTitle(value: string): void {
    this.onSetRoleTitleEvent.emit(value);
  }  

  setFontFamily(value: FontChoice): void {
    this.onSetFontFamilyEvent.emit(value);
  }

  setNameFontSize(value: number): void {
    this.onSetNameFontSizeEvent.emit(value);
  }  

  setRoleFontSize(value: number): void {
    this.onSetRoleFontSizeEvent.emit(value);
  }
  
  setBgColor(value: string): void {
    this.onSetBgColorEvent.emit(value);
  }  

  setShowTagline(value: boolean): void {
    this.onSetShowTaglineEvent.emit(value);
  }  
  
  setTagline(value: string): void {
    this.onSetTagLineEvent.emit(value);
  }
}