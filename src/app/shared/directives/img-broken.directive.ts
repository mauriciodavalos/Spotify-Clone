import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  // @input() customImg: string
  @HostListener('error') handleError(): void{
    const elNative = this.elHost.nativeElement
    console.log('🔴 Esta imagen revento -->', this.elHost);
    elNative.src = "../../../assets/images/18.jpg"
  }

  constructor(private elHost: ElementRef) { 

  }
}
