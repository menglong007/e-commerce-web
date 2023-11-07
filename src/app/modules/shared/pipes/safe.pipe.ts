import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(data: File | Blob | string | null | undefined, background: boolean = false): SafeResourceUrl {
    if (data == '' || data == null) {
      return background ? 'url(/assets/photos/photo.png)' : '/assets/photos/photo.png';
    }
    if (data instanceof File || data instanceof Blob) {
      data = URL.createObjectURL(data);
      const url = this.sanitizer.bypassSecurityTrustResourceUrl(data!);
      return background ? `url(${data})` : url;
    }
    return background ? `url(${data})` : data;
  }
}
