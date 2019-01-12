import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, property?: string, condition?: any): any {
    return items.filter(item => {
      // No triple equals
      return item[property] == condition
    });
  }

}
