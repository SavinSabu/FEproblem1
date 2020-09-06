import { Component, OnInit } from '@angular/core';
import { SearchFalconService } from 'src/app/modules/search-falcon.service';

@Component({
  selector: 'app-catched-falcon',
  templateUrl: './catched-falcon.component.html',
  styleUrls: ['./catched-falcon.component.css']
})
export class CatchedFalconComponent implements OnInit {

  planetFound;
  timeTaken;
  constructor(
    private searchFalconService:SearchFalconService
  ) { }

  ngOnInit() {
    this.searchFalconService.getPlanetFound().subscribe(res => {
      this.planetFound = res;
    });
    this.searchFalconService.getTimeTaken().subscribe(res => {
      this.timeTaken = res;
    })
  }

}
