import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.html',
  styleUrls: ['./status.scss'],
})
export class StatusComponent implements OnInit {
  @Input() status?: any;
  constructor(public router: Router) {}
  ngOnInit(): void {}
}
