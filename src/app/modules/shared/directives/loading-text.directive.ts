import {AfterViewChecked, Directive, ElementRef, Input} from "@angular/core";

@Directive({
  selector: '[LoadingText]'
})
export class LoadingTextDirective implements AfterViewChecked {

  text: string | undefined;
  @Input('loadingTextWhen') condition: boolean = false;

  constructor(private elem: ElementRef) {}

  ngOnChanges(changes: any) {
    if (!this.text) return;
    this.condition = changes.condition.currentValue;
    const elem = this.elem.nativeElement;
    if (this.condition) {
      elem.disabled = true;
      elem.style.cursor = 'wait';
      elem.innerText = 'loading...!';
    }
    else {
      elem.disabled = false;
      elem.style.cursor = 'pointer';
      elem.innerText = this.text;
    }
  }

  ngAfterViewChecked(): void {
    if (this.text) return;
    this.text = this.elem.nativeElement.innerText;
  }
}
