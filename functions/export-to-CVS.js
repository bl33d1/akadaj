const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

admin.initializeApp();

exports.exportActiveUsersToCsv = functions.https.onRequest(async (req, res) => {
    const pingsRef = admin.firestore().collection('pings');
    const tenMinutesAgo = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 10 * 60 * 1000));
    const snapshot = await pingsRef.where('createdOn', '>=', tenMinutesAgo).get();
    
    if (snapshot.empty) {
        res.status(404).send('No active users found.');
        return;
    }

    const pings = [];
    snapshot.forEach(doc => {
        pings.push(doc.data());
    });


    const csvWriter = createObjectCsvWriter({
        path: '/tmp/active_pings.csv',
        // Name,Country,Color,Latitude,Longitude
        header: [
            { Name: 'ID', Country: 'Country' ,Latitude: 'Latitude', Longitude: 'Longitude'}
        ]
    });

    await csvWriter.writeRecords(users);

    res.download('/tmp/active_pings.csv', 'active_pings.csv', (err) => {
        if (err) {
            res.status(500).send('Error generating CSV file.');
        }
    });
});
