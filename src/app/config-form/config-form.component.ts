import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { CamConfig } from 'src/shared/shared/cam-config.model';

// interface PolygonDetails{
//   polygonCoordinates: string,
//   entry: [
//     {
//       minRssi: number,
//       maxRssi: number
//     }
//   ],
//   exit: [
//     {
//       minRssi: number,
//       maxRssi: number
//     }
//   ]
// }

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

  polygonForm: FormGroup;
  polygonModel: FormArray;
  // cameraconfig: PolygonDetails[] = new Array<PolygonDetails>();
  // @Input() config: CamConfig = new CamConfig('', null, null);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  initForm() {
    this.polygonForm = this.fb.group({
      sensor_id: new FormControl(''),
      field_1: new FormControl(''),
      field_2: new FormControl(''),
      polygonModel: this.fb.array([this.createNewPolygonModel()])
    });

    this.polygonModel = this.polygonForm.get('polygonModel') as FormArray;
  }

  createNewPolygonModel() {
    return this.fb.group({
      polygon: [null],
      entryAngle: this.fb.array([this.createNewAngle()]),
      exitAngle: this.fb.array([this.createNewAngle()]),
      radiusToInterpolate: [null],
      minVectorMagnitude: [null]
    });
  }

  createNewAngle() {
    return this.fb.group({
      minRssi: [null],
      maxRssi: [null]
    });
  }

  addNewPolygonModel() {
    // console.log(this.polygonForm);
    this.polygonModel.push(this.createNewPolygonModel());
  }

  addEntryAngle(indexEntry: number) {
    (this.polygonModel.controls[indexEntry]?.get(
      'entryAngle'
    ) as FormArray).push(this.createNewAngle());
    // console.log(indexEntry)
  }

  addExitAngle(indexExit: number) {
    (this.polygonModel.controls[indexExit]?.get('exitAngle') as FormArray).push(
      this.createNewAngle()
    );
    // console.log(indexExit)
  }

  onSubmit() {
    // console.log(this.polygonForm.value);
    // console.warn(this.polygonForm.value);
    // this.polygonForm.value

    let str = JSON.stringify(this.polygonForm.value);
    let str2 = JSON.parse(str);

    console.log(str);
    console.log(str2.polygonModel);
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(str)
    );
    element.setAttribute('download', 'config.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    // console.log(typeof(this.polygonForm.value));
    // console.log(this.polygonForm.value.polygonModel[0].polygon);
  }

  // createNewExitAngle(){}
}
