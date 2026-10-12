import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { ViewMode } from "../../types/ViewMode/ViewMode";
import { SelectViewModeEventData } from "../../types/SelectViewModeEventData";
import { LucideCheck, LucideCopy, LucideDownload, LucideRepeat } from "@lucide/angular";

@Component({
  imports: [CommonModule, LucideCheck, LucideCopy, LucideDownload, LucideRepeat],
  selector: 'apds-sm-linkedin-subnav',
  standalone: true,
  styleUrl: './subnav.component.scss',
  templateUrl: './subnav.component.html',
})
export class SubnavLinkedInComponent {
  viewMode = input<ViewMode>('banner-only');
  isExporting = input<boolean>(false);
  copiedSuccess = input<boolean>(false);
  
  onSelectViewModeEvent = output<SelectViewModeEventData>(); 
  onClickResetEvent = output<void>(); 
  onClickDownloadEvent = output<void>();
  onClickCopyEvent = output<void>(); 

  onChangeViewModeHandler(event: MouseEvent, data: ViewMode) {
    this.onSelectViewModeEvent.emit({event: event, view: data} as SelectViewModeEventData);
  }

  onClickRestaurarEventHandler(event: MouseEvent, data: ViewMode) {
    this.onClickResetEvent.emit();
  }

  onClickDownloadEventHandler() {
    this.onClickDownloadEvent.emit();
  }

  onClickCopyEventHandler() {
    this.onClickCopyEvent.emit();
  }

  onClickResetEventHandler() {
    this.onClickResetEvent.emit();
  }

}
