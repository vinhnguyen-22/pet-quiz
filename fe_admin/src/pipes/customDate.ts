import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate',
  pure: true,
})
export class CustomDate implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value * 1000)) / 1000);
      if (seconds <= 60) return 'gần đây';

      const intervals: any = {
        year: 31536000,

        month: 2592000,

        week: 604800,

        day: 86400,

        hour: 3600,

        minute: 60,

        second: 1,
      };

      if (seconds > intervals.minute && seconds < intervals.hour) {
        return Math.floor(seconds / intervals.minute) + ' phút trước';
      }
      if (seconds > intervals.hour && seconds < intervals.day) {
        return Math.floor(seconds / intervals.hour) + ' giờ trước';
      }
      if (seconds > intervals.day && seconds < intervals.week) {
        return Math.floor(seconds / intervals.day) + ' ngày trước';
      }
      if (seconds > intervals.week) {
        const date = new Date(value * 1000);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return `${day} Tháng ${month + 1}, ${year}`;
      }
    }
    return value;
  }
}
