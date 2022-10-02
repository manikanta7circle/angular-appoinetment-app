import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';
import {format} from 'date-fns'
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  appointmentsList: Appointment[]=[];
  titleInput ='';
  dateInput ='';
  isFiltered = false;
  filteredAppointmentList = this.appointmentsList;
  filterClassName = ''
  constructor() { }

  ngOnInit(): void {
    this.filterClassName = this.isFiltered ? 'filter-filled' : 'filter-empty';
  }

  getFilteredAppointments(isFiltered: boolean){
    if(isFiltered){
      this.filteredAppointmentList = this.appointmentsList.filter((item)=> item.isStarred===true);
    }
    else{
      this.filteredAppointmentList = this.appointmentsList;
    }
  }

  addAppointment(data:any){
    data.preventDefault();
    if(this.dateInput !== '' && this.titleInput !== ''){
      const formattedDate = format(new Date(this.dateInput),'dd MMMM yyyy, EEEE');
      const newAppointment: Appointment = {
        id: v4(),
        title: this.titleInput,
        date: formattedDate,
        isStarred: false
      }
      console.log(newAppointment)
      this.appointmentsList.push(newAppointment)
      this.getFilteredAppointments(false)
      this.titleInput='';
      this.dateInput='';
    }
  }

  onChangeTitleInput(data:any){
    this.titleInput = data.target.value;
  }

  onChangeDateInput(data:any){
    this.dateInput = data.target.value;
  }

  onClickStarred(){
    this.isFiltered = !this.isFiltered;
    this.filterClassName = this.isFiltered ? 'filter-filled' : 'filter-empty'
    this.getFilteredAppointments(this.isFiltered)
  }

  onToggleisStarred(data: any){
    this.appointmentsList = this.appointmentsList.map(item=>{
      if(data===item.id){
        return {...item, isStarred: !item.isStarred}
      }
      return item;
    })
    this.getFilteredAppointments(false);
  }

}
