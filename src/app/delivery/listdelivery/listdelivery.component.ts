import { Component } from '@angular/core';
import {DeliveryDTO} from "../model/DeliveryDTO";
import {DeliveryService} from "../service/delivery.service";

@Component({
  selector: 'app-listdelivery',
  templateUrl: './listdelivery.component.html',
  styleUrls: ['./listdelivery.component.css']
})
export class ListdeliveryComponent {
  deliverys: DeliveryDTO[] = []; // Array para almacenar los deliverys
  isCreatingDelivery: boolean = false; // Control para saber si se está creando un nuevo delivery

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.fetchDeliverys();
  }

  fetchDeliverys(): void {
    this.deliveryService.getDeliverys().subscribe(
      (data: DeliveryDTO[]) => {
        this.deliverys = data;
      },
      (error) => {
        console.error('Error fetching deliverys', error);
      }
    );
  }

  deleteDelivery(delivery: DeliveryDTO) {
    if (confirm('¿Estás seguro de que deseas eliminar este delivery?')) {
      this.deliveryService.deleteDelivery(delivery.deliveryRoleId).subscribe(() => {
        this.deliverys = this.deliverys.filter(d => d.deliveryRoleId !== delivery.deliveryRoleId);
        alert('Delivery eliminado con éxito');
      }, error => {
        alert('Error al eliminar el delivery');
        console.error(error);
      });
    }
  }
}
