///////// SPOTBOT JR /////////
//////////////////////////////
handleButton = () => {
    const button = document.getElementById('button')
    button.addEventListener('click', () => {
        getPlaylists()  
    })    
}

shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

getPlaylists = () => {
    fetch("https://accounts.spotify.com/api/token", {
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
        })
        .then(resp => resp.json())
        .then(data => {
            const token = data.access_token 
            fetch("https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=10", {
            headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            }})
            .then(resp => resp.json())
            .then(data => {
                shuffle(data.playlists.items)

                const button = document.getElementById('button')
                button.innerText = 'do it again'

                const imageDiv = document.getElementById('image-div')
                imageDiv.innerHTML = `
                <img id='album-art' src='${data.playlists.items[0].images[0].url}' alt='album cover'/>
                <a href=${data.playlists.items[0].external_urls.spotify} target="_blank"><button class='style-button' >listen to playlist</button></a>
                `
            })
        })
}

handleButton()