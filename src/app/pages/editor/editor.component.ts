import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent , ImageCroppedEvent } from 'ngx-image-cropper';
import { BackgroundRemovalService } from '@/app/services/ia/remove-background-ia.service';

@Component({
  selector: 'apds-editor',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class ImageEditorComponent {
  removeBackgroundService = inject(BackgroundRemovalService);
  cdr = inject(ChangeDetectorRef);
  loading = false;
  imageWithoutBg: string | null = null; // Guarda a imagem PNG sem fundo em Base64
  currentBgColor = 'transparent';       // Cor de fundo do container do cropper
  croppedImageBase64: string | null = null; // Resultado final recortado/redimensionado

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.loading = true;
    this.imageWithoutBg = null;

    try {
      // 1. Remove o fundo usando a IA da IMG.LY
      const blobResult = await this.removeBackgroundService.removeBackground(file);

      // 2. Converte o Blob resultante para Base64 para alimentar o ngx-image-cropper
      this.imageWithoutBg = await this.blobToBase64(blobResult);

    } catch (error) {
      console.error('Erro ao remover o fundo com a IA:', error);
      alert('Falha ao processar a imagem.');
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); 
    }
  }

  // Altera a cor de fundo visível no editor
  changeBackground(color: string) {
    this.currentBgColor = color;
  }

  // Evento disparado pelo Cropper a cada movimento de resize ou crop
  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64 || null;
  }

  // Junta o recorte com a cor de fundo escolhida em um Canvas final para download
  saveImage() {
    if (!this.croppedImageBase64) return;

    const img = new Image();
    img.src = this.croppedImageBase64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Se não for transparente, pinta o fundo com a cor selecionada
        if (this.currentBgColor !== 'transparent') {
          ctx.fillStyle = this.currentBgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Desenha a imagem recortada por cima do fundo
        ctx.drawImage(img, 0, 0);

        // Faz o download do arquivo final
        const link = document.createElement('a');
        link.download = 'foto-editada.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
  }

  // Utilitário para converter Blob em string Base64
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
