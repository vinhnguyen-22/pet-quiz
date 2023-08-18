import { NgModule } from '@angular/core';
import { TimeAgo } from './timeAgo';
import { CustomDate } from './customDate';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [TimeAgo, CustomDate],
  imports: [],
  exports: [TimeAgo, CustomDate],
  providers: [DatePipe],
})
export class PipesModule {}
