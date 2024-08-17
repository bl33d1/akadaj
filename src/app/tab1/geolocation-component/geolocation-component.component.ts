import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonButton } from "@ionic/angular/standalone";
import { async, BehaviorSubject, map, Observable, take, tap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, DocumentReference, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-geolocation-component',
  templateUrl: './geolocation-component.component.html',
  styleUrls: ['./geolocation-component.component.scss'],
  standalone: true,
  imports: [IonButton, HttpClientModule, AsyncPipe],
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

  addUserProfile(ping: Ping) {
    if (!ping) return;

    addDoc(this.PingsCollection, <Ping>ping);
  }

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mapImage', { static: true }) mapImageRef!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
      
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