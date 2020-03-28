const request = new XMLHttpRequest();

request.addEventListener('readystatechange', () => {
    if(request.readyState=== 4 && request.status === 200) {
        console.log(request.responseText);
        const result = document.getElementById('result');
        result.innerHTML = request.responseText;
    }
});

request.open('GET', 'http://www.omdbapi.com/?&apikey=41888ccf&t=Avengers')
request.send()