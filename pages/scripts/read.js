function createCard(obj) {
    var mainCard = document.createElement('div');
    mainCard.setAttribute('class', 'row');
    var card = document.createElement('div');
    card.setAttribute('class', 'card col');
    var imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'col-4');
    var img = document.createElement('img');
    img.setAttribute('src', obj.Poster);
    imgDiv.appendChild(img);
    var header = document.createElement('div');
    header.setAttribute('class', 'card-header');
    var h5 = document.createElement('h5');
    var body = document.createElement('div');
    body.setAttribute('class', 'card-body');
    var plot = document.createElement('p');
    plot.setAttribute('class', 'plot');
    var director = document.createElement('p');
    director.setAttribute('class', 'director');
    var writers = document.createElement('p');
    writers.setAttribute('class', 'writers');
    var actors = document.createElement('p');
    actors.setAttribute('class', 'actors');
    var title = document.createElement('div');
    title.setAttribute('class', 'card-title');
    var ul = document.createElement('ul');
    obj.Ratings.forEach((rating)=>{
        var li = document.createElement('li');
        var ratingString = rating.Source; 
        ratingString += ": " + rating.Value;
        li.textContent = ratingString;
        ul.appendChild(li);
    });
    var text = document.createElement('div');
    text.setAttribute('class', 'card-text');
    director.textContent = "Director(s): ";
    director.textContent += obj.Director;
    writers.textContent = "Writers(s): ";
    writers.textContent += obj.Writer;
    actors.textContent = "Actors: ";
    actors.textContent += obj.Actors;
    h5.textContent = obj.Title;
    title.appendChild(ul);
    plot.textContent = obj.Plot;
    text.appendChild(plot);
    text.appendChild(director);
    text.appendChild(writers);
    text.appendChild(actors);
    header.appendChild(h5);
    card.appendChild(header);
    body.appendChild(title);
    body.appendChild(text);
    
    card.appendChild(body);
    mainCard.appendChild(imgDiv);
    mainCard.appendChild(card);
    return mainCard;
}

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
                        const link = 'https://www.omdbapi.com/?&apikey=41888ccf&t=';
                        request.open('GET', link.concat(movie));
                        request.send();
                        request.addEventListener('readystatechange', () => {
                            if (request.readyState === 4 && request.status === 200) {
                                var obj = JSON.parse(request.responseText);
                                var card = createCard(obj);
                                console.log(obj);
                                const result = document.getElementById('fav');
                                result.append(card);
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

const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    e.preventDefault();
    firebase.auth().signOut();
})