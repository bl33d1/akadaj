// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: "https://geocode.maps.co/reverse?lat=XXXXXXX&lon=YYYYYYYYYY&api_key=6684b67ca7655617516270urq1f5eaa",
  production: false,
  firebaseConfig: {
    projectId: "popo-spotter",
    appId: "1:141232661239:web:a3ac9b24efb63f2345e9f2",
    databaseURL: "https://popo-spotter-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "popo-spotter.appspot.com",
    apiKey: "AIzaSyADh0Z5qBO5WhykqW-39tBkrGYmSmjj0ys",
    authDomain: "popo-spotter.firebaseapp.com",
    messagingSenderId: "141232661239",
    measurementId: "G-BJ3SL2CHZP"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
