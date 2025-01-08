import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit {


  addForm: FormGroup;
// empForm: FormGroup;

education: string[]= [
  'Graduate',
  'PostGraduate',
  'Diplamo',
  '+2',

];
experience: string[]= [
  'Fresher',
  '>6 Months',
  '1 Year',
  '2 years',
  '3 years',
];

employeerole: string[]= [
  'C# Developer',
  '.Net Developer',
  'Angular Developer',
  'Java Developer',
  'React Developer',
];

constructor(
private _fb: FormBuilder, 
private _empService: EmployeeService,
private _dialogRef: MatDialogRef<AddEditEmpComponent>,
@Inject(MAT_DIALOG_DATA) public data:any,
private _coreService: CoreService
){
  this.addForm = this._fb.group({
    FirstName:'',
    LastName: '',
    Email: '',
    DateofBirth:'',
    Gender: '',
    Education:'',
    Address:'',
    Experience:'', 
    EmployeeRole:'',
  });
}

ngOnInit(): void {
  this.addForm.patchValue(this.data);
}

onFormSubmit(){
  if(this.addForm.valid){
    if(this.data){
      this._empService.updateEmployee(this.data.id,this.addForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee detail updated!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {

          console.error(err);
        }
       });
    } else {
      this._empService.addEmployee(this.addForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
       });
    }
   
  }
}

}
