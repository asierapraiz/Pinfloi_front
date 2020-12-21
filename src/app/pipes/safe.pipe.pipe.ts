import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safePipe'
})
export class Safe.PipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
