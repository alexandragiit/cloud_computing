window.addEventListener('load', function () {

  console.log("Hello World!");



});

document.getElementById("login").addEventListener('click', function(){

  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  promise.then((u) =>{
    window.location.href = '/';
  }).catch(e=>console.log(e.message));
  


});



document.getElementById("register").addEventListener('click', function(){s
  // de verificat mailul ca e mail
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
  promise.catch(e=>console.log(e.message));


});

document.getElementById("logout").addEventListener('click', function(){

  firebase.auth().signOut();
 

});

firebase.auth().onAuthStateChanged(user => {
  if(user){
    document.getElementById("logout").style.display = "inline";
    document.getElementById("login").style.display = "none";
    console.log("Logged in!");

    user.getIdToken().then(function (token) {
      // Add the token to the browser's cookies. The server will then be
      // able to verify the token against the API.
      document.cookie = "token=" + token;


    });

  }else{
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";
    console.log("Logged out!");

    document.cookie = "token=";
  }
});









// // window.addEventListener('load', function () {
// //   document.getElementById('sign-out').onclick = function () {
// //     firebase.auth().signOut();
// //   }});

//   // FirebaseUI config.
//   var uiConfig = {
//     signInSuccessUrl: '/',
//     signInOptions: [
//       // Comment out any lines corresponding to providers you did not check in
//       // the Firebase console.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       //firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       //firebase.auth.PhoneAuthProvider.PROVIDER_ID

//     ],
//     // Terms of service url.
//     tosUrl: '<your-tos-url>'
//   };
  

//   firebase.auth().onAuthStateChanged(function (user) {
//     console.log(user);
//     if (user) {
//       // User is signed in, so display the "sign out" button and login info.
//       document.getElementById('sign-out').hidden = false;
//       document.getElementById('login-info').hidden = false;
//       console.log(`Signed in as ${user.displayName} (${user.email})`);
//       user.getIdToken().then(function (token) {
//         // Add the token to the browser's cookies. The server will then be
//         // able to verify the token against the API.
//         // SECURITY NOTE: As cookies can easily be modified, only put the
//         // token (which is verified server-side) in a cookie; do not add other
//         // user information.
//         document.cookie = "token=" + token;
//       });
//     } else {
//       // User is signed out.
//       // Initialize the FirebaseUI Widget using Firebase.
//       var ui = new firebaseui.auth.AuthUI(firebase.auth());
//       // Show the Firebase login button.
//       ui.start('#firebaseui-auth-container', uiConfig);
//       // Update the login state indicators.
//       document.getElementById('sign-out').hidden = true;
//       document.getElementById('login-info').hidden = true;
//       // Clear the token cookie.
//       document.cookie = "token=";
//     }
//   }, function (error) {
//     console.log(error);
//     alert('Unable to log in: ' + error)
//   });


