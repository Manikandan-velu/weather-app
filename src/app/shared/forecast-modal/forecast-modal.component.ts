import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-forecast-modal',
  templateUrl: './forecast-modal.component.html',
  styleUrls: ['./forecast-modal.component.scss']
})
export class ForecastModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ForecastModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}