import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()

export class SaveEmployeeDataService {

    private newSuccessSubject = new Subject<any>();
    public _newSuccessSubject = this.newSuccessSubject.asObservable();


    constructor(){}

    // getMessage(): Observable<any> {
    //             return this.newSuccessSubject.asObservable();
    //         }

    emitSuccessData(event): void{

        this.newSuccessSubject.next(event);
    }
}