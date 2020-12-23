import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm
} from '@angular/forms';
@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  sensorForm: FormGroup;
  // polygonModel: FormArray;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.sensorForm = new FormGroup({
      sensor_id: new FormControl(''),
      field_1: new FormControl(''),
      field_2: new FormControl('')
    });
    // this.sensorForm = this.fb.group({
    //   polygonModel: this.fb.array([this.createNewPolygonModel()])
    // });
    // this.polygonForm = this.
  }

  onSubmit() {
    console.log(this.sensorForm.value);
  }
}
