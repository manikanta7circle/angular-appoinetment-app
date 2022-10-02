import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.scss']
})
export class AppointmentItemComponent implements OnInit {
  @Input() appointmentDetail:any;
  @Output() toggleIsStarred = new EventEmitter<string>()
  starImgUrl = ''
  constructor() { }

  ngOnInit(): void {
    this.starImgUrl = this.appointmentDetail.isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  }
  
  onClickStar(){
    this.toggleIsStarred.emit(this.appointmentDetail.id);
  }

}
