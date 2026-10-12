import { Injectable } from '@angular/core';
import { segmentForeground, removeBackground, Config } from '@imgly/background-removal';

@Injectable({
  providedIn: 'root'
})
export class ExportBannerService {

    async exportSvgToPng(
        svgElement: SVGSVGElement, 
        scale: 1 | 2 = 1, 
        filename: string = 'linkedin-banner-anderson-pereira-1584x396.png'): Promise<void> {
        
            if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        const width = 1584 * scale;
        const height = 396 * scale;

        const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
        clonedSvg.setAttribute('width', String(width));
        clonedSvg.setAttribute('height', String(height));
        clonedSvg.setAttribute('viewBox', '0 0 1584 396');

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(clonedSvg);
        const svgBlob = new Blob([svgString], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                URL.revokeObjectURL(url);
                reject(new Error('Canvas 2D context indisponível'));
                return;
                }
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);
                URL.revokeObjectURL(url);

                canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Falha ao gerar arquivo PNG'));
                    return;
                }
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(downloadUrl), 2000);
                resolve();
                }, 'image/png', 1.0);
            } catch (err) {
                URL.revokeObjectURL(url);
                reject(err);
            }
            };
            img.onerror = (err) => {
            URL.revokeObjectURL(url);
            reject(err);
            };
            img.src = url;
        });
    }


    async copySvgAsPngToClipboard(svgElement: SVGSVGElement): Promise<boolean> {
    
        if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
            return false;
        }

        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        const width = 1584;
        const height = 396;
        const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
        clonedSvg.setAttribute('width', String(width));
        clonedSvg.setAttribute('height', String(height));
        clonedSvg.setAttribute('viewBox', '0 0 1584 396');

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(clonedSvg);
        const svgBlob = new Blob([svgString], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(svgBlob);

        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                URL.revokeObjectURL(url);
                resolve(false);
                return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    resolve(false);
                    return;
                }
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob }),
                    ]);
                    resolve(true);
                } catch {
                    resolve(false);
                }
            }, 'image/png');
            };
            img.onerror = () => {
            URL.revokeObjectURL(url);
                resolve(false);
            };
            img.src = url;
        });
    }


    exportSvgFile(
  svgElement: SVGSVGElement,
  filename: string = 'linkedin-banner-anderson-pereira-1584x396.svg'
): void {
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  clonedSvg.setAttribute('width', '1584');
  clonedSvg.setAttribute('height', '396');
  clonedSvg.setAttribute('viewBox', '0 0 1584 396');

  const serializer = new XMLSerializer();
  const svgString =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    serializer.serializeToString(clonedSvg);
  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}


}





