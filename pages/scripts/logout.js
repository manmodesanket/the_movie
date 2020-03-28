firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //console.log(user);
      // ...
    } else {
      // User is signed out.
      window.location.href = "../../index.html";
  }
});

const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    e.preventDefault();
    firebase.auth().signOut();
})