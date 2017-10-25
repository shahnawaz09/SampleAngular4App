import { Component, OnInit, OnDestroy, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { SaveEmployeeDataService } from './../../services/saveEmployeeData.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { EmployeeData } from '../../interface/employeeData';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {

  employeesData: EmployeeData[];
  emp: EmployeeData[];
  msgs: Message[] = [];
  loading: boolean;
  //updateField: boolean = false;
  selectedEmployee: EmployeeData;
  subscription: Subscription;

  constructor(private router: Router, private _http: Http, private confirmationService: ConfirmationService, private saveEmployeeDataService: SaveEmployeeDataService, private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    
    this.showSuccess();
    this.loadEmployeesDetail();

  }

  ngOnChanges(values) {
    this.ref.detectChanges();
  }
  showSuccess() {
    this.subscription = this.saveEmployeeDataService._newSuccessSubject.subscribe(event => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Employee Added Successfully' });
    });

  }

  onRowSelect(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Employee Selected', detail: event.data.name + ' - ' + event.data.id });
    console.log(this.msgs);
  }

  onRowUnselect(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Employee Unselected', detail: event.data.name + ' - ' + event.data.id });
  }

  deleteEmployeeData(data): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._http.delete("http://localhost:8084/RestApi/webapi/api/Timesheet/DeleteEmployee/" + data.id)
          .toPromise()
          .then(Response => {
            if (Response.status === 200) {
              this.loadEmployeesDetail();
              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have successfully deleted the record' }];
            }
          });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
  
  updateEmployeeData(data) {
   // this.updateField = true;
    this.confirmationService.confirm({
      message: 'Are you sure you want to update this record?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._http.put('http://localhost:8084/RestApi/webapi/api/Timesheet/UpdateEmployee/' + data.id, data)
          .toPromise()
          .then(Response => {
            if (Response.status === 200) {
              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have successfully updated the record' }];
            }
          });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
  loadEmployeesDetail(): void {
    this.loading = true;
    this._http.get('http://localhost:8084/RestApi/webapi/api/Timesheet/GetEmployeesDetail')
      .toPromise()
      .then((response: Response) => {

        this.employeesData = response.json();
        this.loading = false;

      });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}

