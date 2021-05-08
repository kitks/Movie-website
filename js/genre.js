let nowPlaying = document.getElementsByClassName("row nowPlaying")[0]
let nowPlayingUl = nowPlaying.getElementsByTagName("ul")[0]
let nowPlayingList = nowPlaying.getElementsByTagName("li")

let upcoming = document.getElementsByClassName("row upcoming")[0]
let upcomingH4 = upcoming.getElementsByTagName("h4")[0]
let upcomingList = upcoming.getElementsByTagName("li")

let genreUrlId = window.location.href
let genreId = parseInt(genreUrlId.split("=")[1])
let genreName = genreUrlId.split("=")[2]


let api = {
    url: "https://api.themoviedb.org/3/movie/",
    key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

}

let apiImg = {
    url: "https://image.tmdb.org/t/p/w200"
}


let urls = [
    (`${api.url}now_playing?${api.key}&language=en-US&page=1`),
    (`${api.url}upcoming?${api.key}&language=en-US&page=1&region=CA`),
    (`https://api.themoviedb.org/3/genre/movie/list?${api.key}&language=en-US`)
]


let initDisplay = () => {

    Promise.all(urls.map(url =>
        fetch(url).then(resp => resp.json())
    ))
        .then(data => {
            nowPlayingDisplay(data[0])
            upcomingDisplay(data[1])
            // genreDisplay(data[2])
            genrePageinit()
        })

}


let genreDisplay = (e) => {

    Promise.all(urls.map(url =>
        fetch(url).then(resp => resp.json())
    ))
        .then(data => {

            console.log(`test`)
            console.log(data[2])
            // console.log(data[1].results[0].genre_ids)
            // console.log(genreUrlId)
            let title = document.getElementsByClassName("catagoryBanner")[0]
            let h4 = title.getElementsByTagName("h4")[0]
            let targetId = e.target.id
            // h4.innerText = (e.target.innerText)
            h4.innerText = (`test`)
            nowPlaying.className = (`row genresResult`)

            for (i = 0; i < upcomingList.length; i++) {
                nowPlayingUl.appendChild(upcomingList[0])

            }

            for (i = 0; i < nowPlayingList.length; i++) {

                if (nowPlayingList[i].id.includes(targetId)) {
                    nowPlayingList[i].style.display = ""

                } else if (!nowPlayingList[i].id.includes(targetId)) {
                    nowPlayingList[i].style.display = "none"
                }
            }
        })
    upcoming.remove()
}

let nowPlayingDisplay = (movie) => {
    console.log(movie)
    // console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = nowPlaying.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "nowPlayingMovie"
        ul.appendChild(li)
        let a = document.createElement("a")
        a.setAttribute("href", `./info.html?id=${movie.results[i].id}`)
        li.appendChild(a)

        li.setAttribute("id", `${movie.results[i].genre_ids}`)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        a.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        a.appendChild(p)
    }
}

let upcomingDisplay = (movie) => {
    console.log(movie)
    // console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = upcoming.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "upcomingMovie"
        ul.appendChild(li)
        let a = document.createElement("a")
        a.setAttribute("href", `./info.html?id=${movie.results[i].id}`)
        li.appendChild(a)

        li.setAttribute("id", `${movie.results[i].genre_ids}`)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        a.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        a.appendChild(p)

    }
    for (i = 0; i < upcomingList.length; i++) {
        nowPlayingUl.appendChild(upcomingList[0])

    }
    upcoming.remove()
    nowPlaying.className = (`row genresResult`)
}


let genrePageinit = () => {

    console.log(genreName)
    let title = document.getElementsByClassName("catagoryBanner")[0]
    let h4 = title.getElementsByTagName("h4")[0]
    // decodeURIComponent(genreName)
    h4.innerText = (`${decodeURIComponent(genreName)}`)

    for (i = 0; i < upcomingList.length; i++) {
        nowPlayingUl.appendChild(upcomingList[0])

    }

    for (i = 0; i < nowPlayingList.length; i++) {
        // 
        if (nowPlayingList[i].id.includes(genreId)) {
            nowPlayingList[i].style.display = ""

        } else if (!nowPlayingList[i].id.includes(genreId) || nowPlayingList[i].id == null) {
            nowPlayingList[i].style.display = "none"
        }
    }
}

initDisplay()
