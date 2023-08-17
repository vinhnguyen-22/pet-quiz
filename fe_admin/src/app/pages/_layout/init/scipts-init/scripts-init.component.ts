import { Component, OnInit } from '@angular/core'; 
import { LayoutService } from '../../../../_metronic/core'; 

@Component({
  selector: 'app-scripts-init',
  templateUrl: './scripts-init.component.html',
})
export class ScriptsInitComponent implements OnInit {
  asideSelfMinimizeToggle = false;

  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
  }
 
}
