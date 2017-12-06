import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Supervisor} from '../../shared/supervisor.model';
import {SupervisorService} from '../../shared/supervisor.service';

@Component({
  selector: 'app-project-suporvisor',
  templateUrl: './project-supervisor.component.html',
  styleUrls: ['./project-supervisor.component.css']
})
export class ProjectSupervisorComponent implements OnInit {

  @Input()
  wantedSupervisor: Supervisor;
  @Output()
  onWantedSupervisorChange: EventEmitter<number> = new EventEmitter();

  @Input()
  isEditable: boolean;
  @Input()
  isGroup: boolean;
  @Input()
  isAdmin: boolean;

  @Input()
  assignedSupervisor: Supervisor;
  @Output()
  onAssignedSupervisorChange: EventEmitter<number> = new EventEmitter();

  supervisors: Supervisor[];
  constructor(private modalService: NgbModal, private supervisorService: SupervisorService) {
  }

  ngOnInit() {
    this.supervisors = [];
    this.supervisorService.getAll().subscribe(s => this.supervisors = s);
  }

  open(content) {
    this.modalService.open(content);
  }

  selectWantedSupervisor(supervisor: Supervisor) {
    this.wantedSupervisor = supervisor;
    // Emit that we'venow selected a supervisor
    this.onWantedSupervisorChange.emit(supervisor.id);
  }
  selectAssignedSupervisor(supervisor: Supervisor) {
    this.assignedSupervisor = supervisor;
    // Emit that we'venow selected a supervisor
    this.onAssignedSupervisorChange.emit(supervisor.id);
  }
}
