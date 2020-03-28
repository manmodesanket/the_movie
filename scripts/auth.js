//state changed
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //console.log(user);
      window.location.href = "/pages/user.html";
      
      // ...
    } else {
      // User is signed out.
  }
});

//signup
const signup = document.querySelector('.signup-form');

signup.addEventListener('submit', e=>{
    e.preventDefault();
    //get user info
    const username = signup['name1'].value;
    const email = signup['email1'].value;
    const password = signup['pswd1'].value;
    
    //sigup the user
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred=>{
      cred.user.updateProfile({
        displayName: username
      })
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorCode + errorMessage);
        // ...
    });
});




//login
const login = document.querySelector('.login-form');

login.addEventListener('submit', e=>{
    e.preventDefault();
    //get credentials
    const email = login['email2'].value;
    const password = login['pswd2'].value;
    //log in user
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
        login.reset();
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+ errorMessage);
        // ...
      });
})