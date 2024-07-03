import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-geolocation-component',
  templateUrl: './geolocation-component.component.html',
  styleUrls: ['./geolocation-component.component.scss'],
  standalone: true,
  imports: [IonButton, HttpClientModule],
  providers: []
})
export class GeolocationComponentComponent implements OnInit {
  constructor(
    public httpService: HttpClient

  ) { }

  ngOnInit(): void {
    // this.getLocation();
  }

  backendUrl = "https://geocode.maps.co/reverse?lat=XXXXXXXXXX&lon=YYYYYYYYYY&api_key=6684b67ca7655617516270urq1f5eaa";

  status: string = '';
  location: string = '';

  lati: string = '';
  long: string = '';

  isDisabled = false;

  getLocation() {
    if ('geolocation' in navigator) {
      this.status = 'Fetching location...';
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude;
          this.status = 'Location fetched successfully!';
          this.location = `Latitude: ${latitude}, Longitude: ${longitude}`;

          console.log(latitude.toString());
          console.log(longitude.toString());
          this.isDisabled = true;
          
          setTimeout(() => {
            this.isDisabled = false;
          },10000)
          
          this.backendUrl = this.backendUrl.replace("XXXXXXXXXX", ""+latitude)
          this.backendUrl = this.backendUrl.replace("YYYYYYYYYY", ""+longitude)
          console.log(this.backendUrl);
          let arr = [];
          this.httpService.get(this.backendUrl).subscribe((x:any)=>{
            console.log(x);
          });
          //TODO: send new object with post
          localStorage.setItem('latatide',latitude.toString())
          localStorage.setItem('longtitude',longitude.toString())
        },
        (error) => {
          this.status = `Error: ${error.message}`;
        }, {

      }
      );
    } else {
      this.status = 'Geolocation is not supported by your browser';
    }
  }

}
