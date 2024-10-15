import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { artesano } from '../model/artesano';


@Injectable({
  providedIn: 'root'
})
export class artesanoService {
    private apiUrl = 'http://localhost:8080/users/listaArtesanos'; 

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de deliverys
  getArtesano(): Observable<artesano[]> {
    return this.http.get<artesano[]>(this.apiUrl);
  }
  deleteArtesano(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Ajusta la ruta según tu configuración
  }

}