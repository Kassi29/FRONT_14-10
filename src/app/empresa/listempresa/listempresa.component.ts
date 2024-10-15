import { Component, OnInit } from '@angular/core';
import { empresa } from '../model/empresa';
import { EmpresaService } from '../service/empresa.service';

@Component({
  selector: 'app-listempresa',
  templateUrl: './listempresa.component.html',
  styleUrls: ['./listempresa.component.css']
})
export class ListempresaComponent implements OnInit {

  empresa: empresa[] = [];
  empresaSelected: empresa = new empresa();

  constructor(private service: EmpresaService){}

  ngOnInit(): void {
    this.loadEmpresa();
  }

  loadEmpresa(): void {
    this.service.findAllEmp().subscribe(empresa => {
      this.empresa = empresa;
    });
  }

  addEmpresa(empresa: empresa): void {
    const request = empresa.id ? this.service.updateEmp(empresa) : this.service.createEmp(empresa);

    request.subscribe(updateEmpresa => {
      if (empresa.id) {
        this.empresa = this.empresa.map(emp =>
          emp.id === empresa.id ? { ...updateEmpresa } : emp
        );
      } else {
        this.empresa.push(updateEmpresa);
      }
      this.resetEmpresaSelection();
    });
  }

  updateEmp(empr: empresa): void {
    this.empresaSelected = { ...empr};
  }

  deleteEmp(empresa: empresa): void {
    this.service.deleteEmp(empresa.id).subscribe({
      next: () => {
        this.empresa = this.empresa.filter(e => e.id !== empresa.id);
      },
      error: (err) => {
        console.error('Error al eliminar empresa:', err);
      }
    });
  }

  resetEmpresaSelection(): void {
    this.empresaSelected = new empresa();
  }
}

