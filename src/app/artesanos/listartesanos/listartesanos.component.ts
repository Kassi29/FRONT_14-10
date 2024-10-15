import { Component } from '@angular/core';
import { artesano } from '../model/artesano';
import { artesanoService } from '../service/artesano.service';

@Component({
  selector: 'app-listartesanos',
  templateUrl: './listartesanos.component.html',
  styleUrls: ['./listartesanos.component.css']
})
export class ListartesanosComponent {
  artesanos: artesano[] = [];
  isCreatingArtesano: boolean = false; 

  constructor (private artesanoService: artesanoService){}
  
  ngOnInit(): void {
    this.fetchArtesano();
  }

  fetchArtesano(): void {
    this.artesanoService.getArtesano().subscribe(
      (data: artesano[]) => {
        this.artesanos = data;
      },
      (error) => {
        console.error('Error fetching artesanos', error);
      }
    );
  }

  deleteArtesano(artesano: artesano) {
    if (confirm('¿Estás seguro de que deseas eliminar este artesano?')) {
      this.artesanoService.deleteArtesano(artesano.artesanoRoleId).subscribe(() => {
        this.artesanos = this.artesanos.filter(a => a.artesanoRoleId !== artesano.artesanoRoleId);
        alert('Artesano eliminado con éxito');
      }, error => {
        alert('Error al eliminar el artesano');
        console.error(error);
      });
    }
  }


}
