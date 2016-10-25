var config = {
  apiKey: "AIzaSyAz-oNXw_CrWRAEEPmXOj5KtEbsc3GM0R8",
  authDomain: "pwa-test-1362.firebaseapp.com",
  databaseURL: "https://pwa-test-1362.firebaseio.com",
  storageBucket: "pwa-test-1362.appspot.com",
  messagingSenderId: "650161883311"
};

firebase.initializeApp(config);

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function() {
      return navigator.serviceWorker.ready;
    }).then(function(registration) {
      registration.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
        var endpointSections = sub.endpoint.split('/');
        var subscriptionId = endpointSections[endpointSections.length - 1];
        var newKey = firebase.database().ref().child('token').push().key;
        firebase.database().ref('token/' + newKey).set({subscriptionId: subscriptionId});
        console.log('endpoint:', subscriptionId);
      });
    });
  navigator.serviceWorker.ready.then(function(registration) {
     console.log('Service Worker Ready');
  });
}
