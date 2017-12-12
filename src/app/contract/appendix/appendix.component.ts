import { Component, OnInit } from '@angular/core';
import {Appendix} from '../shared/appendix.model';
import {AppendixService} from '../../shared/appendix.service';

@Component({
  selector: 'app-appendix',
  templateUrl: './appendix.component.html',
  styleUrls: ['./appendix.component.css']
})
export class AppendixComponent implements OnInit {
  appendix: Appendix;

  constructor(private appendixService: AppendixService) { }

  ngOnInit() {
    this.appendix = {resources: '', condition: ''};
    this.appendixService.get().subscribe(a => this.appendix = a);
  }

}
