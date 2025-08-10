import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonHoverColor]',
  standalone: true,
})
export class ButtonHoverColorDirective {
  private color: string = '#4b565e';
  private readonly defaultColor: string = '#4b565e';
  private readonly hoverColor: string = '#f0ba4e';

  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.color;
  }

  @HostListener('mouseenter')
  enter(): void {
    this.color = this.hoverColor;
  }

  @HostListener('mouseleave')
  leave(): void {
    this.color = this.defaultColor;
  }
}
