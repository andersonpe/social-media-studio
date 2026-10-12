import { Injectable } from '@angular/core';
import { segmentForeground, removeBackground, Config } from '@imgly/background-removal';

@Injectable({
  providedIn: 'root'
})
export class BackgroundRemovalService {

  private readonly config: Config = {
    publicPath: `${window.location.origin}/imgly/`,
    model: 'isnet_quint8',
    proxyToWorker: false,
    device: 'cpu',
    debug: true,
    output: {
      format: 'image/png',
      quality: 1
    },
    progress: (key, current, total) => {
      console.log(`[IMG.LY PROGRESS] ${key}: ${current}/${total}`);
    },
    fetchArgs: {
      cache: "no-store" 
    }
  };

  async removeBackground(image: Blob): Promise<Blob> {
    console.log('========== IMG.LY REMOVE =========='); 
    console.log('[1] Entrou no método');
    
    const result = await removeBackground(
      image,
      this.config
    );

    console.log('[4] Promise resolveu!'); 
    console.log('[5] Resultado:', result); 
    console.log('[6] Tipo:', result.type); 
    console.log('[7] Tamanho:', result.size);

    return result;
  }

  /**
   * Gera somente a máscara do foreground.
   *
   * A máscara pode posteriormente ser aplicada
   * sobre uma cor, imagem ou outro fundo.
   */
  async segmentForeground(
    image: Blob
  ): Promise<Blob> {
    console.log("Segument");
    console.log(this.config)
    return await segmentForeground(
      image,
      this.config
    );
  }
}

