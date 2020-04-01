firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        //console.log(user);
        // ...
        const email = user.email;
        const welcome = document.querySelector(".welcome");
        var welcomeString = 'Hello'.concat(' ', email);
        welcome.innerHTML += welcomeString;
        const search = document.querySelector(".search-form");

        search.addEventListener('submit', e => {
            e.preventDefault();
            const request = new XMLHttpRequest();
            const movie = document.getElementById('search').value;
            //console.log(movie);
            const link = 'http://www.omdbapi.com/?&apikey=41888ccf&t=';
            request.open('GET', link.concat(movie));
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4 && request.status === 200) {
                    var obj = JSON.parse(request.responseText);
                    console.log(obj.Title);
                    const result = document.getElementById('result');
                    result.innerHTML = request.responseText;
                    var add = document.getElementById("add");
                    add.addEventListener('click', () => {
                        const db = firebase.firestore();
                        const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
                        var add = db.collection('user').doc(email).update({
                            movies: arrayUnion(obj.Title)
                        })
                    });
                }
            });

        });
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