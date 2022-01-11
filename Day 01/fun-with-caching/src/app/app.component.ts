import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ColorModel } from './models/color.model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  duplicates = ['X', 'X'];

  colors$: Observable<ColorModel[]> | null = null;

  add() {
    this.duplicates.push('X');
  }

  remove() {
    this.duplicates.splice(0, 1);
  }


  constructor(private dataService: DataService){}
  ngOnInit(): void {
  }

  go() {

    if (this.colors$ !== null) return;

    console.log('Fetching all colors');
    const cold$ = this.dataService.getAllColors();

    const hot$ = new ReplaySubject<ColorModel[]>(1);
    this.colors$ = hot$;
    cold$.subscribe(hot$);


  }

}
