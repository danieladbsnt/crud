import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
isChecked: boolean = false;

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
  this.service.getCountries().subscribe(
    resp => this.countries = resp
  )
  }
//para que al tocar el campo y salir sin rellenarlo de error.
invalidInput(campo: string) {
  return this.registerForm.controls[campo].errors && this.registerForm.controls[campo].touched;
};

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