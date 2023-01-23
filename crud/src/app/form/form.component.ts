import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';
;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 
countries: any;
id!: number;

editedUser!: any;
updatedForm!: any;
editedUserId!: number;

//function validator pass
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
      subscribed: [true],
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
  this.service.getCountries().subscribe(
    resp => this.countries = resp
  )
  }
//para que al tocar el campo y salir sin rellenarlo de error.
invalidInput(campo: string) {
  return this.registerForm.controls[campo].errors && this.registerForm.controls[campo].touched;
};

userEdited(editedUser:any){
  console.log('editedUser', editedUser.id);
  console.log(this.registerForm.setValue = editedUser)
  this.editedUserId = editedUser.id
  
  this.editedUser = this.registerForm.patchValue({
    username: editedUser.username,
    password: editedUser.password,
    confirmPass: editedUser.confirmPass,
    email: editedUser.email,
    subscribed: editedUser.subscribed,
    country: editedUser.country,
    city: editedUser.city
  })
  console.log(editedUser);
  
}

updateUser(editedUser:any,editedUserId: number) {
  console.log(editedUser);
  
  this.service.updateData(this.editedUser,this.editedUserId)
  .subscribe(editedUser => {
    console.log(editedUser);
  
  })
}

save() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
  }
//ver valor del form
 console.log(this.registerForm.value);
//resetear valor del form 
  this.registerForm.reset();
};

submitData() {
//mandar datos del form a BD
  this.service.postData(this.registerForm.value)
  .subscribe(resp => {
    console.log(resp);

  })
};

}
/*
Una vez está la info del user q se quiere editar en el form, se edita y al 
darle al btn de "crear" se tiene que actualizar la info de la BD y pintar la
nueva info en la table
*/