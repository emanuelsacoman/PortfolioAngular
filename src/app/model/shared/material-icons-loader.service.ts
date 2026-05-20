import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const MATERIAL_ICONS_ID = 'material-icons-font';
const MATERIAL_ICONS_HREF = 'https://fonts.googleapis.com/icon?family=Material+Icons';

@Injectable({
  providedIn: 'root',
})
export class MaterialIconsLoaderService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  load(): void {
    if (this.document.getElementById(MATERIAL_ICONS_ID)) {
      return;
    }

    const link = this.document.createElement('link');
    link.id = MATERIAL_ICONS_ID;
    link.rel = 'stylesheet';
    link.href = MATERIAL_ICONS_HREF;
    this.document.head.appendChild(link);
  }
}
