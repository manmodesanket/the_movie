firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const email = user.email;
        const db = firebase.firestore();

        db.collection('user').where('email', '==', email).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                if (doc.data().email === email) {
                    for (let i = 0; i < doc.data().movies.length; i++) {
                        console.log(doc.data().movies[i]);
                        const movie = doc.data().movies[i];
                        const request = new XMLHttpRequest();
                        const link = 'http://www.omdbapi.com/?&apikey=41888ccf&t=';
                        request.open('GET', link.concat(movie));
                        request.send();
                        request.addEventListener('readystatechange', () => {
                            if (request.readyState === 4 && request.status === 200) {
                                console.log(request.responseText);
                                const result = document.getElementById('fav');
                                result.innerHTML += request.responseText;
                            }
                        });
                    }
                }
            });
        });
    } else {
        // User is signed out.
        window.location.href = "../../index.html";
    }
});