import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgNetworkIconRendererService {
  private renderer: Renderer2;
  private readonly svgNamespace = 'http://w3.org';

  constructor(rendererFactory: RendererFactory2) {
    // Cria uma instância do Renderer2 para manipulação segura do DOM
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Converte a lógica JSX original para criação de elementos no TypeScript puro
   * @returns SVGGElement (Equivalente ao <g> do JSX) ou null se o tipo for undefined
   */
  public renderSubtleNetworkIcon(
    type: string | undefined, 
    x: number, 
    y: number, 
    color: string
  ): SVGGElement | null {
    if (!type) return null;

    // Grupo principal <g>
    const mainGroup = this.renderer.createElement('g', this.svgNamespace);
    this.renderer.setAttribute(mainGroup, 'transform', `translate(${x - 14}, ${y - 14})`);
    this.renderer.setAttribute(mainGroup, 'opacity', '0.85');

    // Círculo de fundo
    const circle = this.renderer.createElement('circle', this.svgNamespace);
    this.renderer.setAttribute(circle, 'cx', '14');
    this.renderer.setAttribute(circle, 'cy', '14');
    this.renderer.setAttribute(circle, 'r', '15');
    this.renderer.setAttribute(circle, 'fill', '#042821');
    this.renderer.setAttribute(circle, 'stroke', color);
    this.renderer.setAttribute(circle, 'stroke-width', '1.2');
    this.renderer.setAttribute(circle, 'stroke-opacity', '0.55');
    this.renderer.appendChild(mainGroup, circle);

    // Renderização condicional com base no tipo
    if (type === 'server') {
      const g = this.renderer.createElement('g', this.svgNamespace);
      this.renderer.setAttribute(g, 'stroke', color);
      this.renderer.setAttribute(g, 'stroke-width', '1.3');
      this.renderer.setAttribute(g, 'fill', 'none');
      this.renderer.setAttribute(g, 'transform', 'translate(6, 6)');

      const rect1 = this.renderer.createElement('rect', this.svgNamespace);
      this.setAttributes(rect1, { x: '1', y: '1', width: '14', height: '5', rx: '1.2' });
      
      const rect2 = this.renderer.createElement('rect', this.svgNamespace);
      this.setAttributes(rect2, { x: '1', y: '9', width: '14', height: '5', rx: '1.2' });

      const c1 = this.renderer.createElement('circle', this.svgNamespace);
      this.setAttributes(c1, { cx: '4', cy: '3.5', r: '0.8', fill: color });

      const c2 = this.renderer.createElement('circle', this.svgNamespace);
      this.setAttributes(c2, { cx: '4', cy: '11.5', r: '0.8', fill: color });

      const l1 = this.renderer.createElement('line', this.svgNamespace);
      this.setAttributes(l1, { x1: '8', y1: '3.5', x2: '12', y2: '3.5' });

      const l2 = this.renderer.createElement('line', this.svgNamespace);
      this.setAttributes(l2, { x1: '8', y1: '11.5', x2: '12', y2: '11.5' });

      this.appendChildren(g, [rect1, rect2, c1, c2, l1, l2]);
      this.renderer.appendChild(mainGroup, g);
    } 
    
    else if (type === 'db') {
      const g = this.renderer.createElement('g', this.svgNamespace);
      this.renderer.setAttribute(g, 'stroke', color);
      this.renderer.setAttribute(g, 'stroke-width', '1.3');
      this.renderer.setAttribute(g, 'fill', 'none');
      this.renderer.setAttribute(g, 'transform', 'translate(6, 5)');

      const ellipse = this.renderer.createElement('ellipse', this.svgNamespace);
      this.setAttributes(ellipse, { cx: '8', cy: '3.5', rx: '6', ry: '2.3' });

      const path1 = this.renderer.createElement('path', this.svgNamespace);
      this.renderer.setAttribute(path1, 'd', 'M2 3.5V9C2 10.3 4.7 11.3 8 11.3C11.3 11.3 14 10.3 14 9V3.5');

      const path2 = this.renderer.createElement('path', this.svgNamespace);
      this.renderer.setAttribute(path2, 'd', 'M2 9V14C2 15.3 4.7 16.3 8 16.3C11.3 16.3 14 15.3 14 14V9');

      this.appendChildren(g, [ellipse, path1, path2]);
      this.renderer.appendChild(mainGroup, g);
    } 
    
    else if (type === 'code') {
      const g = this.renderer.createElement('g', this.svgNamespace);
      this.setAttributes(g, { 
        stroke: color, 'stroke-width': '1.4', fill: 'none', 
        'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: 'translate(6, 6)' 
      });

      const poly1 = this.renderer.createElement('polyline', this.svgNamespace);
      this.renderer.setAttribute(poly1, 'points', '4.5 4 1 8 4.5 12');

      const poly2 = this.renderer.createElement('polyline', this.svgNamespace);
      this.renderer.setAttribute(poly2, 'points', '11.5 4 15 8 11.5 12');

      const line = this.renderer.createElement('line', this.svgNamespace);
      this.setAttributes(line, { x1: '9.2', y1: '2.5', x2: '6.8', y2: '13.5' });

      this.appendChildren(g, [poly1, poly2, line]);
      this.renderer.appendChild(mainGroup, g);
    } 
    
    else if (type === 'git') {
      const g = this.renderer.createElement('g', this.svgNamespace);
      this.setAttributes(g, { 
        stroke: color, 'stroke-width': '1.3', fill: 'none', 
        'stroke-linecap': 'round', transform: 'translate(6, 6)' 
      });

      const c1 = this.renderer.createElement('circle', this.svgNamespace);
      this.setAttributes(c1, { cx: '4', cy: '3.5', r: '2' });

      const c2 = this.renderer.createElement('circle', this.svgNamespace);
      this.setAttributes(c2, { cx: '4', cy: '12.5', r: '2' });

      const c3 = this.renderer.createElement('circle', this.svgNamespace);
      this.setAttributes(c3, { cx: '12', cy: '6.5', r: '2' });

      const line = this.renderer.createElement('line', this.svgNamespace);
      this.setAttributes(line, { x1: '4', y1: '5.5', x2: '4', y2: '10.5' });

      const path = this.renderer.createElement('path', this.svgNamespace);
      this.renderer.setAttribute(path, 'd', 'M12 8.5C12 10.5 9.5 11 4 10.5');

      this.appendChildren(g, [c1, c2, c3, line, path]);
      this.renderer.appendChild(mainGroup, g);
    }

    return mainGroup;
  }

  // Métodos auxiliares para manter o código limpo
  private setAttributes(element: any, attributes: { [key: string]: string }): void {
    Object.keys(attributes).forEach(key => {
      this.renderer.setAttribute(element, key, attributes[key]);
    });
  }

  private appendChildren(parent: any, children: any[]): void {
    children.forEach(child => this.renderer.appendChild(parent, child));
  }
}
