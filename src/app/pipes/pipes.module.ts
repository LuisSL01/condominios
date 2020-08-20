import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { FiltroPipe } from './filtro.pipe';



@NgModule({
  declarations: [DomSanitizerPipe, ImageSanitizerPipe, FiltroPipe],
  exports: [DomSanitizerPipe, ImageSanitizerPipe, FiltroPipe]
})
export class PipesModule { }
