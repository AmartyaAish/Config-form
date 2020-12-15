import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CamConfig } from 'src/shared/shared/cam-config.model';

interface PolygonDetails{
  polygonCoordinates: string,
  entry: [
    {
      minRssi: number,
      maxRssi: number
    }
  ],
  exit: [
    {
      minRssi: number,
      maxRssi: number
    }
  ]
}


@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css']
})
export class ConfigFormComponent implements OnInit {

//    CameraConfig: { polygonCoordinates: string, name: string }[] = [
//     { "id": 0, "name": "Available" },
//     { "id": 1, "name": "Ready" },
//     { "id": 2, "name": "Started" }
// ];

  cameraconfig: PolygonDetails[] = new Array<PolygonDetails>();
  @Input() config: CamConfig = new CamConfig('', null, null);
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
