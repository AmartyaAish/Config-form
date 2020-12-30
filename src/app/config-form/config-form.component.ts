import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
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
  resp: JSON;

  // cameraconfig: PolygonDetails[] = new Array<PolygonDetails>();
  // @Input() config: CamConfig = new CamConfig('', null, null);
  constructor(private fb: FormBuilder, private httpclient: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  initForm() {
    this.polygonForm = this.fb.group({
      // sensor_id: new FormControl(''),
      // field_1: new FormControl(''),
      // field_2: new FormControl(''),
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
    this.polygonModel.push(this.createNewPolygonModel());
  }

  addEntryAngle(indexEntry: number) {
    (this.polygonModel.controls[indexEntry]?.get(
      'entryAngle'
    ) as FormArray).push(this.createNewAngle());
  }

  addExitAngle(indexExit: number) {
    (this.polygonModel.controls[indexExit]?.get('exitAngle') as FormArray).push(
      this.createNewAngle()
    );
  }

  postFunction(obj: any): Observable<any> {
    return this.httpclient.post<any>(
      `http://localhost:8000/download-config/abc/`,
      obj
    );
  }

  // public downloadReport(res: HttpResponse<Blob>) {
  //   const name = res.headers
  //     .get('content-disposition')
  //     ?.split(';')[1]
  //     .split('filename')[1]
  //     .split('=')[1]
  //     .trim();
  //   const url = window.URL.createObjectURL(res.body);
  //   const a = document.createElement('a');
  //   document.body.appendChild(a);
  //   a.setAttribute('style', 'display: none');
  //   a.href = url;
  //   a.download = name!;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   a.remove();
  // }

  onSubmit() {
    let str = this.polygonForm.value;
    // let strStrigify = JSON.stringify(str);

    // console.log(str);

    // const k = {
    //   polygonModel: [
    //     {
    //       polygon:
    //         'POLYGON((0.36515151515151517 0.22823529411764706, 0.5931818181818181 0.0058823529411764705, 0.8742424242424243 0.2211764705882353, 0.6909090909090909 0.6588235294117647, 0.3606060606060606 0.22705882352941176))',
    //       entryAngle: [{ minRssi: 1160, maxRssi: 1236 }],
    //       exitAngle: [
    //         { minRssi: 1000, maxRssi: 1075 },
    //         { minRssi: 1345, maxRssi: 1359 }
    //       ],
    //       radiusToInterpolate: null,
    //       minVectorMagnitude: null
    //     }
    //   ]
    // };

    // const k2 = {
    //   polygonModel: [
    //     {
    //       polygon:
    //         'POLYGON((0.36515151515151517 0.22823529411764706, 0.5931818181818181 0.0058823529411764705, 0.8742424242424243 0.2211764705882353, 0.6909090909090909 0.6588235294117647, 0.3606060606060606 0.22705882352941176))',
    //       entryAngle: [{ minRssi: 1160, maxRssi: 1236 }],
    //       exitAngle: [
    //         { minRssi: 1000, maxRssi: 1075 },
    //         { minRssi: 1257, maxRssi: 1359 }
    //       ],
    //       radiusToInterpolate: null,
    //       minVectorMagnitude: null
    //     }
    //   ]
    // };

    const k_str = {
      polygonModel: [
        {
          polygon: str.polygonModel[0].polygon,
          entryAngle: str.polygonModel[0].entryAngle,
          exitAngle: str.polygonModel[0].exitAngle,
          radiusToInterpolate: str.polygonModel[0].radiusToInterpolate,
          minVectorMagnitude: str.polygonModel[0].minVectorMagnitude
        }
      ]
    };

    console.log(JSON.stringify(k_str));

    this.postFunction(k_str).subscribe(response => {
      // console.log(response);
      // console.log(k);
      this.resp = response;
      console.log('response ', response);
      console.log(typeof response);
      // this.downloadReport((response));

      // this.downloadReport(response);
      let test = JSON.stringify(response);
      console.log(test);
      var element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(test)
      );
      element.setAttribute('download', 'test_config.config');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }
}
