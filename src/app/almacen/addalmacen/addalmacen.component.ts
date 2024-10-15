/*
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { almacen } from '../model/almacen';
import { Router } from '@angular/router';
import { AlmacenService } from 'src/app/almacen/service/almacen.service';

@Component({
  selector: 'app-addalmacen',
  templateUrl: './addalmacen.component.html',
  styleUrls: ['./addalmacen.component.css']
})
export class AddalmacenComponent implements OnInit{

  registerForm: FormGroup;
  almacen: almacen[] = [];
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private service: AlmacenService){
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void{
    if(this.registerForm.valid){
      const formData = this.registerForm.value;

      this.service.createCat(formData).subscribe({
        next: (newAlmacen) => {
          console.log('Almacen creado: ', newAlmacen);
          this.router.navigateByUrl('/panel/lisalm');
          this.registerForm.reset();
        },
        error: (error) => {
          console.error('Error al crear almacen:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Marcar todos los campos como tocados
      this.errorMessage = ("Por favor, completa todos los campos requeridos.");
    }
  }
}



 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlmacenService} from 'src/app/almacen/service/almacen.service';
import * as L from 'leaflet';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-addalmacen',
  templateUrl: './addalmacen.component.html',
  styleUrls: ['./addalmacen.component.css']
})
export class AddalmacenComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';
  mapCenter: L.LatLngTuple = [-16.5000, -68.1193]; // Coordenadas por defecto (La Paz)

  departamentos = [
    {name: 'La Paz', coords: [-16.5000, -68.1193]},
    {name: 'Cochabamba', coords: [-17.3964, -66.1570]},
    {name: 'Santa Cruz', coords: [-17.7840, -63.1822]},
    {name: 'Oruro', coords: [-17.9666, -67.1161]},
    {name: 'Potosí', coords: [-19.5834, -65.7505]},
    {name: 'Chuquisaca', coords: [-19.0363, -65.2615]},
    {name: 'Beni', coords: [-14.8563, -66.0360]},
    {name: 'Pando', coords: [-11.0078, -68.6604]},
    {name: 'Tarija', coords: [-21.5353, -64.7292]}
  ];

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: AlmacenService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      latitud: [0, [Validators.required]],
      longitud: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onDepartamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const departamento = selectElement.value;
    const selected = this.departamentos.find(d => d.name === departamento);
    if (selected) {
      this.mapCenter = selected.coords as L.LatLngTuple;
      this.mapComponent.setMapCenter(this.mapCenter);
    }
  }

  onLocationSelected(lat: number, lng: number): void {
    console.log('Latitud:', lat, 'Longitud:', lng); // Verifica que se reciban correctamente
    this.registerForm.patchValue({
      latitud: lat,
      longitud: lng
    });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Datos a enviar al backend:', formData); // Verificar que los datos se envían correctamente


      this.service.createAlmacen(formData).subscribe({
        next: (newAlmacen) => {
          console.log('Almacén creado: ', newAlmacen);
          this.router.navigateByUrl('/panel/listalm');

          this.registerForm.reset();
        },
        error: (error) => {
          console.error('Error al crear almacén:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.errorMessage = "Por favor, completa todos los campos requeridos.";
    }


  }

}
