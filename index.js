let searchInput = document.getElementsByClassName("form-control me-2")[0]
let searchBtn = document.getElementsByClassName("btn btn-outline-success my-2 my-sm-0")[0]

let nowPlaying = document.getElementsByClassName("row nowPlaying")[0]
let nowPlayingList = nowPlaying.getElementsByTagName("li")

let upcoming = document.getElementsByClassName("row upcoming")[0]
let upcomingList = upcoming.getElementsByTagName("li")

// let displayList = () => {
//     console.log(`displaylist fire`)
//     return new Promise((resolve, reject) => {


//         for (let i = 0; i < nowPlayingList.length; i++) {

//             nowPlayingList[i].style.display = ""

//         }


//         for (let i = 0; i < openingThisWeekList.length; i++) {

//             openingThisWeekList[i].style.display = ""
//         }


//         let error = false

//         if (!error) {
//             resolve()
//         } else {
//             reject(alert("Something went wrong. Please refresh the page."))
//         }
//     })
// }

// let search = () => {
//     console.log(`search fire`)


//     return new Promise((resolve, reject) => {

//         for (let i = 0; i < nowPlayingList.length; i++) {
//             // console.log(nowPlayingList[i].innerText)
//             let search = searchInput.value.toUpperCase()
//             let data = nowPlayingList[i].innerText || nowPlayingList[i].textContent

//             // console.log(search)
//             // console.log(data.toUpperCase())

//             if (data.toUpperCase().indexOf(search) > -1) {
//                 nowPlayingList[i].style.display = ""
//                 // nowPlayingList[i].classList.add("searchResult")
//             } else {
//                 nowPlayingList[i].style.display = "none"
//             }

//         }

//         for (let i = 0; i < openingThisWeekList.length; i++) {
//             // console.log(nowPlayingList[i].innerText)
//             let search = searchInput.value.toUpperCase()
//             let data = openingThisWeekList[i].innerText || openingThisWeekList[i].textContent

//             // console.log(search)
//             // console.log(data.toUpperCase())

//             if (data.toUpperCase().indexOf(search) > -1) {
//                 openingThisWeekList[i].style.display = ""

//             } else {
//                 openingThisWeekList[i].style.display = "none"
//             }

//         }

//         let error = false

//         if (!error) {
//             resolve()
//         } else {
//             reject(alert("Something went wrong. Please refresh the page."))
//         }

//     })


// }



// let noResult = () => {

//     console.log(`no result fire`)

//     for (let i = 0; i < nowPlayingList.length; i++) {

//         if (nowPlayingList[0].style.display == "none") {

//             let ul = nowPlaying.getElementsByTagName("ul")[0]
//             console.log(ul)
//             let li = document.createElement("li")
//             li.innerHTML = (`<h3>No result</h3>`)
//             li.style = ""
//             li.className = "noResult"
//             ul.prepend(li)

//         }
//     }

//     for (let i = 0; i < openingThisWeekList.length; i++) {

//         if (openingThisWeekList[0].style.display == "none") {

//             let ul = openingThisWeek.getElementsByTagName("ul")[0]
//             console.log(ul)
//             let li = document.createElement("li")
//             li.innerHTML = (`<h3>No result</h3>`)
//             li.style = ""
//             li.className = "noResult"
//             ul.prepend(li)

//         }
//     }

// }

// async function clickSearch() {
//     await displayList();
//     await search();

//     if (nowPlayingList[0].classList == "noResult") {
//         nowPlayingList[0].remove()
//         noResult();
//     }

//     // if(openingThisWeekList[0].classList == "noResult"){
//     //     openingThisWeekList[0].remove()
//     //     noResult();
//     // }

// }


// // if (nowPlayingList.classList.contains("searchResult") == false){
// //     alert ("no result")
// // }

// let test = () => {

//     let ul = nowPlaying.getElementsByTagName("ul")[0]
//     console.log(ul)
//     let li = document.createElement("li")
//     ul.appendChild(li)
// }

// searchBtn.addEventListener("click", clickSearch)

// fetch("https://api.themoviedb.org/3/movie/latest?api_key=8ff5e2fbb1b643a55f0256bb89a8a192")
let api = {
    url: "https://api.themoviedb.org/3/movie/",
    key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

}



let apiImg = {
    url: "https://image.tmdb.org/t/p/w200"
}


fetch(`${api.url}now_playing?${api.key}&language=en-US&page=1`)
    .then(response => {
        if (response.status !== 200) {
            return console.log(`Look like there was a problem, status code ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        return nowPlayingDisplay(data)
    })
    .catch(err => {
        console.log(`Fetch error: ${err}`)
    })

fetch(`${api.url}upcoming?${api.key}&language=en-US&page=1&region=CA`)
    .then(response => {
        if (response.status !== 200) {
            return console.log(`Look like there was a problem, status code ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        return upcomingDisplay(data)
        // console.log(`up coming`)
        // console.log(data)
    })
    .catch(err => {
        console.log(`Fetch error: ${err}`)
    })

let nowPlayingDisplay = (movie) => {
    console.log(movie)
    console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = nowPlaying.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "nowPlayingMovie"
        ul.appendChild(li)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        li.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        li.appendChild(p)
    }
}

let upcomingDisplay = (movie) => {
    console.log(movie)
    console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = upcoming.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "upcomingMovie"
        ul.appendChild(li)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        li.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        li.appendChild(p)
    }
}

 // title: movie.results[0].poster_path
    // title: movie.results[0].title
    // title: movie.results[0].original_language
    // title: movie.results[0].overview
    // title: movie.results[0].release_date
    // title: movie.results[0].vote_average
    // title: movie.results[0].backdrop_path