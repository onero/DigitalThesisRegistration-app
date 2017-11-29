import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Suporvisor} from '../../shared/suporvisor.model';
import {SuporvisorService} from '../../shared/suporvisor.service';

@Component({
  selector: 'app-project-suporvisor',
  templateUrl: './project-suporvisor.component.html',
  styleUrls: ['./project-suporvisor.component.css']
})
export class ProjectSuporvisorComponent implements OnInit {

  @Input()
  wantedSuporvisor: Suporvisor;

  @Input()
  assignedSuporvisor: Suporvisor;

  suporvisors: Suporvisor[];
  constructor(private modalService: NgbModal, private suporvisorService: SuporvisorService) { }

  ngOnInit() {
    this.suporvisors = [];
    this.suporvisorService.getAll().subscribe(s => this.suporvisors = s);
  }

  open(content) {
    this.modalService.open(content);
  }

  selectWantedSuporvisor(suporvisor: Suporvisor) {
    this.wantedSuporvisor = suporvisor;
  }
  selectAssignedSuporvisor(suporvisor: Suporvisor) {
    this.assignedSuporvisor = suporvisor;
  }
}
