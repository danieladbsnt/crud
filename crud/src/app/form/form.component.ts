import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
//todo:
//2- añadir el valor del form al users array con .push p.ej
//3- pintar cada user en la pantalla (HACIENDO EL PASO 2)
//4- añadir funcionalidad edit & delete
countries: string[] = ['España', 'Rumanía', 'Austria']
formValues: string[] = [];

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

registerForm: FormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subscribed: [false],
      country: ['', Validators.required],
      city: ['', Validators.required]
},
{
  validator: this.mustmatch('password', 'confirmPass')
});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

invalidInput(campo: string) {
  return this.registerForm.controls[campo].errors && this.registerForm.controls[campo].touched;
};


save() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
  }
//coger valor del form
 this.formValues = this.registerForm.value;
 
//resetear valor del form 
  this.registerForm.reset();
};

 
}
