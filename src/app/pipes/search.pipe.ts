import { Pipe, PipeTransform } from '@angular/core';
import { MyElement } from '../interfaces/myelement.interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: MyElement[], text: string): MyElement[] {
    if (text === ''){
      return list;
    }

    text = text.toLowerCase();
    
    return list.filter( item => {
      return item.name.toLowerCase().includes(text);
    });
  }

}
