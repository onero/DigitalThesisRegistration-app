import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output()
  onWantedSuporvisorChange: EventEmitter<number> = new EventEmitter();

  @Input()
  isEditable: boolean;

  @Input()
  assignedSuporvisor: Suporvisor;
  @Output()
  onAssignedSuporvisorChange: EventEmitter<number> = new EventEmitter();

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
    // Emit that we'venow selected a suporvisor
    this.onWantedSuporvisorChange.emit(suporvisor.id);
  }
  selectAssignedSuporvisor(suporvisor: Suporvisor) {
    this.assignedSuporvisor = suporvisor;
    // Emit that we'venow selected a suporvisor
    this.onAssignedSuporvisorChange.emit(suporvisor.id);
  }
}
