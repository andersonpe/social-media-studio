import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: '[renderTechnologyLogo]',
  imports: [CommonModule],
  standalone: true,
  template: `
    <!-- Círculo de fundo comum a todos os ícones -->
    <svg:g [attr.transform]="translate() ? 'translate(' + (x() - 14) + ', ' + (y() - 14) + ')' : null">
      
      @if (showBackground()) {
        <svg:circle
          cx="14"
          cy="14"
          r="15"
          fill="#042821"
          [attr.stroke]="isMonochrome() ? '#FFFFFF' : color()"
          stroke-width="1.2"
          stroke-opacity="0.55"
        />
      }

      @switch (type()) {
        @case  ('server') {
          <svg:g [attr.stroke]="color()" stroke-width="1.3" fill="none" transform="translate(6, 6)">
            <svg:rect x="1" y="1" width="14" height="5" rx="1.2" />
            <svg:rect x="1" y="9" width="14" height="5" rx="1.2" />
            <svg:circle cx="4" cy="3.5" r="0.8" [attr.fill]="color()" />
            <svg:circle cx="4" cy="11.5" r="0.8" [attr.fill]="color()" />
            <svg:line x1="8" y1="3.5" x2="12" y2="3.5" />
            <svg:line x1="8" y1="11.5" x2="12" y2="11.5" />
          </svg:g>
        }

        @case ('db') {
          <svg:g [attr.stroke]="color()" stroke-width="1.3" fill="none" transform="translate(6, 5)">
            <svg:ellipse cx="8" cy="3.5" rx="6" ry="2.3" />
            <svg:path d="M2 3.5V9C2 10.3 4.7 11.3 8 11.3C11.3 11.3 14 10.3 14 9V3.5" />
            <svg:path d="M2 9V14C2 15.3 4.7 16.3 8 16.3C11.3 16.3 14 15.3 14 14V9" />
          </svg:g>
        }

        @case ('code') {
          <svg:g [attr.stroke]="color()" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(6, 6)">
            <svg:polyline points="4.5 4 1 8 4.5 12" />
            <svg:polyline points="11.5 4 15 8 11.5 12" />
            <svg:line x1="9.2" y1="2.5" x2="6.8" y2="13.5" />
          </svg:g>
        }

        @case ('git') {
          <svg:g [attr.stroke]="color()" stroke-width="1.3" fill="none" stroke-linecap="round" transform="translate(6, 6)">
            <svg:circle cx="4" cy="3.5" r="2" />
            <svg:circle cx="4" cy="12.5" r="2" />
            <svg:circle cx="12" cy="6.5" r="2" />
            <svg:line x1="4" y1="5.5" x2="4" y2="10.5" />
            <svg:path d="M12 8.5C12 10.5 9.5 11 4 10.5" />
          </svg:g>
        }

        @case ('cloud') {
          <svg:g [attr.stroke]="color()" stroke-width="1.3" fill="none" stroke-linecap="round" transform="translate(6, 6)">
            <svg:path d="M3 10a3 3 0 0 1 3-3 4.5 4.5 0 0 1 8.5-1.5 3.5 3.5 0 0 1 1.5 6.5H5a3 3 0 0 1-2-2z" />
          </svg:g>
        }

        @case ('angular') {
          <svg:g>
            <svg:polygon
              points="24,4 6,10.4 8.8,34.2 24,44 39.2,34.2 42,10.4"
              [attr.fill]="leftShield()"
            />
            <svg:polygon
              points="24,4 24,8.4 24,44 39.2,34.2 42,10.4"
              [attr.fill]="rightShield()"
            />
            <svg:path
              d="M24 8.8L12.8 33.8H17L19.3 28.1H28.7L31 33.8H35.2L24 8.8ZM20.9 24.4L24 16.9L27.1 24.4H20.9Z"
              [attr.fill]="letterFill()"
            />
          </svg:g>
        }

        @case ('react') {
          <svg:g>
            <svg:circle cx="24" cy="24" r="3.8" [attr.fill]="strokeColor()" />
            <svg:g [attr.stroke]="strokeColor()" stroke-width="2.3" fill="none">
              <svg:ellipse cx="24" cy="24" rx="19" ry="7.4" />
              <svg:ellipse cx="24" cy="24" rx="19" ry="7.4" transform="rotate(60 24 24)" />
              <svg:ellipse cx="24" cy="24" rx="19" ry="7.4" transform="rotate(120 24 24)" />
            </svg:g>
          </svg:g>
        }

        @case ('php') {
            <g>
              <ellipse
                cx="24"
                cy="24"
                rx="20.5"
                ry="11.5"
                [attr.fill]="phpOvalFill()"
                [attr.stroke]="phpOvalStroke()"
                stroke-width="1.5"
              />
              <text
                x="24"
                y="27.8"
                text-anchor="middle"
                [attr.fill]="phpTextFill()"
                font-size="13.5"
                font-weight="800"
                font-style="italic"
                letter-spacing="0.4"
                style="font-family: 'Plus Jakarta Sans', Arial, sans-serif"
              >
                php
              </text>
            </g>
        }

        @case ('dotnet') {
            <g>
              <rect
                x="4"
                y="8"
                width="40"
                height="32"
                rx="8"
                [attr.fill]="dotNETBadgeFill()"
                [attr.stroke]="dotNETBadgeStroke()"
                stroke-width="1.2"
              />
              <text
                x="24"
                y="28.5"
                text-anchor="middle"
                [attr.fill]="dotNETTextFill()"
                font-size="13.5"
                font-weight="800"
                letter-spacing="-0.3"
                style="font-family: 'Plus Jakarta Sans', Arial, sans-serif"
              >
                .NET
              </text>
            </g>
        }

        @case ('postgresql') {
            <g>
              <path
                d="M11 14C11 8.5 16.8 5 24 5C31.2 5 37 8.5 37 14V25.5C37 33.5 30.8 40.5 24 43C17.2 40.5 11 33.5 11 25.5V14Z"
                [attr.fill]="pgBaseBlue()"
                [attr.stroke]="pgLightBlue()"
                stroke-width="1.8"
              />
              <path
                d="M15.5 16.5C12.5 17 11.5 21 12.8 25.2C14 29 17.2 30 18.8 28.5M32.5 16.5C35.5 17 36.5 21 35.2 25.2C34 29 30.8 30 29.2 28.5"
                fill="none"
                [attr.stroke]="pgStrokeTone()"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <path
                d="M18.5 15.5C18.5 12.2 21 10.5 24 10.5C27 10.5 29.5 12.2 29.5 15.5V24.5C29.5 29.5 27.5 35.5 24.2 35.5C21.8 35.5 20.8 33.5 21.5 31.5"
                fill="none"
                [attr.stroke]="pgStrokeTone()"
                stroke-width="2.4"
                stroke-linecap="round"
              />
              <circle cx="21.5" cy="18.2" r="1.4" [attr.fill]="pgStrokeTone()" />
              <circle cx="26.5" cy="18.2" r="1.4" [attr.fill]="pgStrokeTone()" />
              <path
                d="M27.8 26.5C29.8 27.8 31.5 27.2 32.2 25.8"
                fill="none"
                [attr.stroke]="pgLightBlue()"
                stroke-width="2.1"
                stroke-linecap="round"
              />
            </g>
        }

        @case ('oracle') {
          <g>
            <rect
              x="5.5"
              y="13.5"
              width="37"
              height="21"
              rx="10.5"
              fill="none"
              [attr.stroke]="oracleRed()"
              stroke-width="5.2"
            />
          </g>
        }

        @case ('sqlserver') {
          <svg:g>
            <svg:ellipse cx="24" cy="11.5" rx="14.5" ry="5.2" [attr.fill]="mssPrimaryRed()" />
            <svg:ellipse cx="24" cy="11.5" rx="10.5" ry="3" [attr.fill]="mssDeepRed()" />
            <svg:path
              d="M9.5 15.5C9.5 18.8 16 21.2 24 21.2C32 21.2 38.5 18.8 38.5 15.5V21C38.5 24.3 32 26.7 24 26.7C16 26.7 9.5 24.3 9.5 21V15.5Z"
              [attr.fill]="mssPrimaryRed()"
            />
            <svg:path
              d="M9.5 24.5C9.5 27.8 16 30.2 24 30.2C32 30.2 38.5 27.8 38.5 24.5V30C38.5 33.3 32 35.7 24 35.7C16 35.7 9.5 33.3 9.5 30V24.5Z"
              [attr.fill]="mssDeepRed()"
            />
            <svg:path
              d="M9.5 33.2C9.5 36.5 16 39 24 39C32 39 38.5 36.5 38.5 33.2V36.8C38.5 40.1 32 42.5 24 42.5C16 42.5 9.5 40.1 9.5 36.8V33.2Z"
              [attr.fill]="mssPrimaryRed()"
            />
            <svg:path
              d="M12.5 19.5C18 22.8 29.5 21.8 36.5 17.5"
              [attr.stroke]="mssHighlight()"
              stroke-width="1.6"
              fill="none"
              stroke-linecap="round"
            />
            <svg:path
              d="M12.5 28.5C18 31.8 29.5 30.8 36.5 26.5"
              [attr.stroke]="mssHighlight()"
              stroke-width="1.6"
              fill="none"
              stroke-linecap="round"
            />
          </svg:g>
        }
      }
    </svg:g>
  `
})
export class BannerNetworkIconsComponent {
  // Inputs modernos usando Angular Signals
  type = input.required<string>();
  x = input.required<number>();
  y = input.required<number>();
  color = input.required<string>();
  translate = input<boolean>(true);
  isMonochrome = input<boolean>(false);
  showBackground = input<boolean>(true);

  // Angular

  // Angular
  leftShield = computed(() =>
    this.isMonochrome() ? '#E2E8F0' : '#DD0031'
  );

  rightShield = computed(() =>
    this.isMonochrome() ? '#94A3B8' : '#C3002F'
  );

  letterFill = computed(() =>
    this.isMonochrome() ? '#06392f' : '#FFFFFF'
  );

  // React
  strokeColor = computed(() =>
    this.isMonochrome() ? '#F1F5F9' : '#61DAFB'
  );

  // PHP
  phpOvalFill = computed(() =>
    this.isMonochrome() ? '#CBD5E1' : '#777BB4'
  );

  phpOvalStroke = computed(() =>
    this.isMonochrome() ? '#F8FAFC' : '#AEB2D5'
  );

  phpTextFill = computed(() =>
    this.isMonochrome() ? '#06392f' : '#FFFFFF'
  );

  // .NET
  dotNETBadgeFill = computed(() =>this.isMonochrome() ? '#E2E8F0' : '#512BD4');
  dotNETBadgeStroke = computed(() =>this.isMonochrome() ? '#94A3B8' : '#7B5FE8');
  dotNETTextFill = computed(() => this.isMonochrome() ? '#06392f' : '#FFFFFF');

  // PostgreSQL
  pgBaseBlue = computed(() =>this.isMonochrome() ? '#CBD5E1' : '#336791');
  pgLightBlue = computed(() =>this.isMonochrome() ? '#F8FAFC' : '#659AD2');
  pgStrokeTone = computed(() => this.isMonochrome() ? '#06392f' : '#FFFFFF');

  // Oracle
  oracleRed = computed(() => this.isMonochrome() ? '#F1F5F9' : '#F80000');

  mssPrimaryRed = computed(() =>this.isMonochrome() ? '#E2E8F0' : '#EE3124');
  mssDeepRed = computed(() => this.isMonochrome() ? '#94A3B8' : '#CC2927');
  mssHighlight = computed(() => this.isMonochrome() ? '#FFFFFF' : '#FF7A70');

}
