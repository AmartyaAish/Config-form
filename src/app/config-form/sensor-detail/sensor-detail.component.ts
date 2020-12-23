import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  polygonForm: FormGroup;
  polygonModel: FormArray;
  ngOnInit(): void {}

  initForm() {}
}
