import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '../service/empresa.service';
@Component({
  selector: 'app-addempresa',
  templateUrl: './addempresa.component.html',
  styleUrls: ['./addempresa.component.css']
})
export class AddempresaComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private service: EmpresaService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    // Inicialización, si es necesario
  } 
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Datos del formulario:', JSON.stringify(formData));


      this.service.createEmp(formData).subscribe({
        next: (newEmpresa) => {
          console.log('Empresacreada:', newEmpresa);
          this.router.navigateByUrl('/panel/listemp'); // Redirigir a la lista de categorías
          this.registerForm.reset(); // Reiniciar el formulario
        },
        error: (error) => {
          console.error('Error al crear empresa:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Marcar todos los campos como tocados
      this.errorMessage = "Por favor, completa todos los campos requeridos.";
    }
  }
}
