import {Component, OnInit} from '@angular/core';
import {Bike} from './bike';
import {BikeService} from './bike.service';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
export class FormLayoutsComponent implements OnInit {

  bikes: Bike[];
  selectedBike: Bike;
  newBike: Bike;

  constructor( private bikeService: BikeService) {

  }

  ngOnInit() {
    this.bikeService.getBikes().then(bikes => this.bikes = bikes);
    this.newBike = new Bike();
  }

  createBike(bike: Bike): void {

    this.bikeService.createBike(bike)
      .then(bike => {
        this.bikes.push(bike);
        this.selectedBike = null;
      });
  }

  deleteBike(bike: Bike): void {
    this.bikeService
      .deleteBike(bike)
      .then(() => {
        this.bikes = this.bikes.filter(h => h !== bike);
        if (this.selectedBike === bike) { this.selectedBike = null; }
      });
  }

  showInfo(bike: Bike): void {
    this.selectedBike = bike;
   // this.router.navigate(['/information', this.selectedBike.id]);
  }
}
