import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonButton } from "@ionic/angular/standalone";
import { async, BehaviorSubject, map, Observable, take, tap, timer } from 'rxjs';
import { AsyncPipe, NgStyle } from '@angular/common';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, DocumentReference, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-geolocation-component',
  templateUrl: './geolocation-component.component.html',
  styleUrls: ['./geolocation-component.component.scss'],
  standalone: true,
  imports: [IonButton, HttpClientModule, AsyncPipe, NgStyle, ],
  providers: []
})
export class GeolocationComponentComponent implements OnInit {
  public httpService = inject(HttpClient)
  private firestore = inject(Firestore);
  private PingsCollection: CollectionReference;
  pings$: Observable<Ping[]>;

  constructor() {

    // get a reference to the user-profile collection
    this.PingsCollection = collection(this.firestore, 'pings');
    this.pings$ = collectionData(this.PingsCollection, { idField: 'id' }) as Observable<Ping[]>;

  }

  // checkForAdmin(){
  //   return window.location.href.includes('blediardi');
  // }
  addUserProfile(ping: Ping) {
    if (!ping) return;

    addDoc(this.PingsCollection, <Ping>ping);
  }

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mapImage', { static: true }) mapImageRef!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
      
  }

  imageWidth: number = 400;
  imageHeight: number = 400;

  // Define the bounding box for Kosovo (approximate values)
  kosovoBounds = {
    minLat: 41.85,
    maxLat: 43.26,
    minLng: 20.03,
    maxLng: 21.78
  };

  getPixelCoordinates(lat: string, lng: string) {

    const xRatio = (Number(lng) - this.kosovoBounds.minLng) / (this.kosovoBounds.maxLng - this.kosovoBounds.minLng);
    const yRatio = (Number(lat) - this.kosovoBounds.minLat) / (this.kosovoBounds.maxLat - this.kosovoBounds.minLat);

    const xPixel = xRatio * this.imageWidth;
    const yPixel = (1 - yRatio) * this.imageHeight; // Invert y-axis for top-left origin

    return { x: xPixel, y: yPixel };
  }


  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitudeWeb = position.coords.latitude
          const longitudeWeb = position.coords.longitude;
          console.log(latitudeWeb.toString());
          console.log(longitudeWeb.toString());
          //TODO: send new object with post
          localStorage.setItem('latatide', latitudeWeb.toString())
          localStorage.setItem('longtitude', longitudeWeb.toString())
            this.addUserProfile({
              createdOn: new Date().toISOString(),
              latitude: '' + latitudeWeb,
              longitude: '' + longitudeWeb
            })
          });
        } else{
          alert("App needs location service active to work!");
        }
    } 

    deleteRecord(latatideLongtitude: string) {
      deleteDoc(doc(this.firestore, "pings", latatideLongtitude))
    }
  }

export interface Ping {
  id?:string;
  latitude: string;
  longitude: string;
  createdOn: string;
}