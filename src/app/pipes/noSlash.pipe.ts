import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noSlash' })
export class NoSlashPipe implements PipeTransform {

    transform(path: String) {
        return path.replace("/", " ");
    }
}