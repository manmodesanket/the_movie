const search = document.querySelector(".search-form");

search.addEventListener('submit', e=>{
    e.preventDefault();
    const request = new XMLHttpRequest();
    const movie = document.getElementById('search').value;
    console.log(movie);
    const link ='http://www.omdbapi.com/?&apikey=41888ccf&t=';
    request.open('GET', link.concat(movie));
    request.send();
    request.addEventListener('readystatechange',()=>{
        if(request.readyState=== 4 && request.status === 200) {
            console.log(request.responseText);
            const result = document.getElementById('result');
            result.innerHTML = request.responseText;
        }
    });
    
});


