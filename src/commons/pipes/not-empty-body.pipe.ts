// import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

// @Injectable()
// export class NotEmptyBodyPipe implements PipeTransform {
//   transform(value: Record<string, unknown>) {
//     if (!value || Object.keys(value).length === 0) {
//       throw new BadRequestException('The request body cannot be empty');
//     }
//     return value;
//   }
// }
