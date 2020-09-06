import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchFalconService } from 'src/app/modules/search-falcon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-finding-falcon',
  templateUrl: './finding-falcon.component.html',
  styleUrls: ['./finding-falcon.component.css']
})
export class FindingFalconComponent implements OnInit {

  isBrokenImage: boolean = false;
  isLimitExceed: boolean = false;
  isFindFalconDisabled:boolean = true;
  isEnableVehicle: boolean = false;
  planetSelected = [];
  options = [];
  vehicle;
  isValidSelections: boolean = true;
  vehicleStock = [];
  currentPlanet;
  timeTaken: number = 0;
  totalVehicleSpeed = 0;
  totalPlanetDistance = 0;
  enableFindFalcon:boolean = false;

  tempOption: { display: string; value: number; }[];
  constructor(
    private searchFalconService:SearchFalconService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllPlanets();
    this.tempOption = this.options;
  }

  getAllPlanets() {
    this.searchFalconService.getAllPlanets().subscribe(res => {
      res.forEach(element => {
        if(element) {
          this.searchFalconService.getAllVehicles().subscribe(vehicle => {
            if(vehicle) {
              this.vehicle = vehicle;
              this.options.push({
                display: element.name,
                value: this.options.length + 1,
                vehicle: this.vehicle,
                planetDistance: element.distance
              })
            }
          })
        }
      });
    })
  }
  profileForm = new FormGroup({
    selected: new FormControl([])
  });

  errorHandler(event:any) {
    event.target.style.display = "none";
  }

  changed() {
    if(this.profileForm.controls['selected'].value.length >= 4) {
      this.isLimitExceed = true;
      let selectedValues = this.profileForm.controls['selected'].value;
        this.options = this.options.filter(obj => {
          return selectedValues.includes(obj.value);
        })
    } else {
      this.options = this.tempOption;
    }
    this.profileForm.controls['selected'].value.length >= 1? this.isFindFalconDisabled = false: this.isFindFalconDisabled = true;
  }

  findFalcon() {
    this.isEnableVehicle = true;
    let selectedValues = this.profileForm.controls['selected'].value;
    this.planetSelected = this.options.filter(obj => {
      return selectedValues.includes(obj.value);
    })
  }

  radioChange(event) {
    let radioSelected = event.value.split('-');
      let selectedPlanet = Number(radioSelected[6]);
      let vehicleNumber = Number(radioSelected[7]);
      let vehicleMaxDistance = Number(radioSelected[3]);
      let planetDistance = Number(radioSelected[1]);
      let availableTotalVehicle = Number(radioSelected[5]);
      let vehicleSpeed = Number(radioSelected[8]);
      let vehicleName = radioSelected[4];
      // check the selected vehicle will reach in planet
      if(planetDistance > vehicleMaxDistance){
        this._snackBar.open("This selected vehicle will not reach at this planet!!", undefined, {
          duration: 2000
        });
        this.isValidSelections = false;
        this.enableFindFalcon = false;
      }
      if(this.currentPlanet != selectedPlanet && !this.isValidSelections){
        this._snackBar.open("Please choose the correct vehicle!!", undefined, {
          duration: 2000
        });
        this.isValidSelections = false;
        this.enableFindFalcon = false;
      }
      // check the selected vehicle stock available
      // if checkbox item chaged old checked data should be removed
      this.vehicleStock = this.vehicleStock.filter(obj => obj.selectedPlanet != selectedPlanet);
      this.vehicleStock.push({
        vehicleNumber: vehicleNumber,
        selectedPlanet : selectedPlanet,
        vehicleSpeed: vehicleSpeed,
        planetDistance: planetDistance,
        vehicleName: vehicleName
      })
      let selectedCountOfVehicles = this.vehicleStock.filter(obj => {
        return obj.vehicleNumber == vehicleNumber;
      }).length;
      if(selectedCountOfVehicles > availableTotalVehicle) {
        this._snackBar.open("This selected vehicle is out of stock!!", undefined, {
          duration: 2000
        });
        this.isValidSelections = false;
        this.enableFindFalcon = false;
      }
      if(!(selectedCountOfVehicles > availableTotalVehicle || planetDistance > vehicleMaxDistance)) {
        this.isValidSelections = true;
        if(this.vehicleStock.length == this.planetSelected.length){
          this.enableFindFalcon = true;
        }
      } else {
        this.isValidSelections = false;
        this.enableFindFalcon = false;
        this.currentPlanet = selectedPlanet;
      }
      // choose this valid vehicle
      this.getTimeTaken();
  }
  getTimeTaken() {
    this.totalPlanetDistance = 0;
    this.totalVehicleSpeed = 0;
    this.vehicleStock.forEach(element => {
      this.totalVehicleSpeed = this.totalVehicleSpeed + element.vehicleSpeed;
      this.totalPlanetDistance = this.totalPlanetDistance + element.planetDistance;
    });
    this.timeTaken = this.totalPlanetDistance / this.totalVehicleSpeed;
    this.searchFalconService.setTimeTaken(this.timeTaken);
  }
  searchFalcon() {
    let planetNames = [];
    let vehicleNames = [];
    this.vehicleStock.forEach(element => {
      let item = this.vehicle.filter(obj => obj.name == element.vehicleName);
      vehicleNames.push(item[0].name);
    });
    this.planetSelected.forEach(element => {
      planetNames.push(element.display);
    });
    vehicleNames = Array.from(new Set(vehicleNames));
    let data = {
      "token": localStorage.getItem('kingShan-token'),
      "planet_names": planetNames,
      "vehicle_names": vehicleNames
    }
    this.searchFalconService.findFalcon(data).subscribe(res => {
      if(res) {
        this.searchFalconService.setPlanetFound(res.planet_name);
        this.router.navigate(['find-falcon/success']);
      }
    },
    error => {
      this._snackBar.open("Execution failed!!", undefined, {
        duration: 2000
      });
    })
  }
}
