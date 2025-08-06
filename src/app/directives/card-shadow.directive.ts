import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardShadow]',
  standalone: true,
})
export class CardShadowDirective {
  private readonly transitionStyle: string =
    'transform 0.3s ease, box-shadow 0.3s ease';
  private readonly animationStyle: string = 'fadeIn 1s ease-out';
  private readonly hoverTransform: string = 'translateY(-5px)';
  private readonly defaultTransform: string = 'translateY(0)';
  private readonly hoverShadow: string = '0 10px 20px rgba(0, 0, 0, 0.3)';
  private readonly defaultShadow: string = 'none';

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
    this.initializeStyles();
  }

  private initializeStyles(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      this.transitionStyle
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'animation',
      this.animationStyle
    );
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      this.hoverTransform
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      this.hoverShadow
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      this.defaultTransform
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      this.defaultShadow
    );
  }
}
