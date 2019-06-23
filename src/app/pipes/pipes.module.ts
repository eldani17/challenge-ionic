import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [SearchPipe],
  exports: [SearchPipe],
  imports: []
})
export class PipesModule { }
