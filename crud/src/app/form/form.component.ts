import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
countries: any;
editedUserId!: number;
users!: User[];

private _unsuscribe$ = new Subject<boolean>();

//function para validar pass
mustmatch(pass: string, matchPass: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[pass];
    const matching = formGroup.controls[matchPass];

    if(control.value !== matching.value) {
      matching.setErrors({mustMatch: true})
    } else {
      matching.setErrors(null);
    }
  }
}

//para validar los campos del registro
registerForm: FormGroup = this.formBuilder.group({
      username: [, [Validators.required, Validators.minLength(3)]],
      password: [, Validators.required],
      confirmPass: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      subscribed: [false],
      country: [, Validators.required],
      city: [, Validators.required]
},
{
  validator: this.mustmatch('password', 'confirmPass')
});

constructor(private formBuilder: FormBuilder,
            private service: ServiceService
  ) {}

ngOnInit(): void {
  this.service.getCountries().pipe(takeUntil(this._unsuscribe$)).subscribe({
    next: resp => this.countries = resp
  })

  this.service.getData().pipe(takeUntil(this._unsuscribe$))
  .subscribe(users => {
    this.users = users;
    console.log(users);
  });
  }
//para que al tocar el campo y salir sin rellenarlo de error.
invalidInput(campo: string) {
  return this.registerForm.controls[campo].errors && this.registerForm.controls[campo].touched;
};

userEdited(editedUser:any){
  this.editedUserId = editedUser.id
//para poner los datos del usuario seleccionado en el form
   this.registerForm.patchValue({
    username: editedUser.username,
    password: editedUser.password,
    confirmPass: editedUser.confirmPass,
    email: editedUser.email,
    subscribed: editedUser.subscribed,
    country: editedUser.country,
    city: editedUser.city
  })
}

update() {
  this.service.updateData(this.registerForm.value, this.editedUserId).pipe(
    switchMap(() => {
      return this.service.getData()
    } )
  )
  .subscribe(users => {
    this.users = users
    console.log(this.users);
  })
}

save() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
  }
//ver valor del form
 console.log(this.registerForm.value);

};

submitData() {
//mandar datos del form a BD
  this.service.postData(this.registerForm.value)
  .subscribe(resp => {
     this.users = resp
    console.log('new user added', this.users);
  })
  //resetear valor del form 
  this.registerForm.reset();
};


ngOnDestroy(): void {
  this._unsuscribe$.next(true)
  this._unsuscribe$.complete();
}
}