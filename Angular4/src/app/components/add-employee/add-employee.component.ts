import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Message } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng';
import { SaveEmployeeDataService } from './../../services/saveEmployeeData.service';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  id: number;
  name: String;
  points: number;
  actualWorkHour: number;
  totalWorkHour: number;
  msgs: Message[] = [];
  displayMsgs: Message[] = [];
  idFormControl: any;
  nameFormControl: any;
  rewardsFormControl: any;
  actualFormControl: any;
  totalFormControl: any;
  disableSaveBtn: boolean = true;

  constructor(private router: Router, private _http: Http, private confirmationService: ConfirmationService, private saveEmployeeDataService: SaveEmployeeDataService) { }

  ngOnInit() {
    this.validation();
    this.displayMsgs = [];
    this.displayMsgs.push({ severity: 'success', summary: 'Success Message', detail: 'Employee Added Successfully' });
  }


  assign():void{
  if((this.id !== undefined && this.name === undefined && this.points === undefined && this.actualWorkHour === undefined && this.totalWorkHour === undefined) ||
  (this.id !== undefined && this.name !== undefined && this.points === undefined && this.actualWorkHour === undefined && this.totalWorkHour === undefined) ||
  (this.id !== undefined && this.name !== undefined && this.points !== undefined && this.actualWorkHour === undefined && this.totalWorkHour === undefined) ||
  (this.id !== undefined && this.name !== undefined && this.points !== undefined && this.actualWorkHour !== undefined && this.totalWorkHour === undefined)){
    this.disableSaveBtn = true;
  }
  else if((this.id !== null && this.name === null && this.points === null && this.actualWorkHour === null && this.totalWorkHour === null) ||
  (this.id !== null && this.name !== null && this.points === null && this.actualWorkHour === null && this.totalWorkHour === null) ||
  (this.id !== null && this.name !== null && this.points !== null && this.actualWorkHour === null && this.totalWorkHour === null) ||
  (this.id !== null && this.name !== null && this.points !== null && this.actualWorkHour !== null && this.totalWorkHour === null)){
    this.disableSaveBtn = true;
  }
  else{
    this.disableSaveBtn = false;
  }
}

  validation(): void {
    this.idFormControl = new FormControl('', [
      Validators.required
    ]);
    this.nameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.rewardsFormControl = new FormControl('', [
      Validators.required
    ]);
    this.actualFormControl = new FormControl('', [
      Validators.required
    ]);
    this.totalFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  // showSuccess() {
  //   this.msgs = [];
  //   this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Employee Added Successfully' });
  // }


  saveEmployee(): void {

    let dataObj = {

      id: this.id,
      name: this.name,
      rewardPoints: this.points,
      actualWorkHour: this.actualWorkHour,
      totalWorkHour: this.totalWorkHour

    }

    this._http.post("http://localhost:8084/RestApi/webapi/api/Timesheet/SaveEmployeesDetail", dataObj)
      .toPromise()
      .then(Response => {
        if (Response.status === 201) {
          this.router.navigate(['/home']);

        }
      });

  }

  cancel(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to leave?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.router.navigate(['/home']);

      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  success(): void {
    this.saveEmployeeDataService.emitSuccessData(event);
  }

}
