
let nowPlaying = document.getElementsByClassName("row nowPlaying")[0]
let nowPlayingUl = nowPlaying.getElementsByTagName("ul")[0]
let nowPlayingList = nowPlaying.getElementsByTagName("li")

let upcoming = document.getElementsByClassName("row upcoming")[0]
let upcomingH4 = upcoming.getElementsByTagName("h4")[0]
let upcomingList = upcoming.getElementsByTagName("li")

let genreUrlId = window.location.href
let genreId = parseInt(genreUrlId.split("=")[1])
let genreName = genreUrlId.split("=")[2]
// let genresResult = document.getElementsByClassName("row genresResult")[0]

let buyTicketBtn = document.getElementsByClassName("ticketBtn")[0]

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
            // genreListDisplay(data[2])
        })

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
        li.appendChild(p)

        let ticketBtn = document.createElement("a")
        ticketBtn.setAttribute("href", `./ticket.html?id=${movie.results[i].id}`)
        ticketBtn.setAttribute("id", `${[i]}`)
        ticketBtn.setAttribute("class", "ticketBtn")
        ticketBtn.innerText = ("Buy ticket")
        // let btn = document.createElement("p")

        // btn.innerText = ("Buy ticket")
        // ticketBtn.append(btn)

        li.appendChild(ticketBtn)

        ticketBtn.addEventListener("click", (e) => {

            let ticketBtn = e.target.id
                localStorage.setItem("ticket", ticketBtn)
            console.log(ticketBtn)

        })

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

}



let initPage = () => window.scrollTo(0, 0)
window.addEventListener("load", initDisplay)



