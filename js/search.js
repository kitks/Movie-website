
let searchResult = document.getElementsByClassName("row searchResult")[0]
let searchUrl = window.location.href
let searchQuery = searchUrl

let catagoryBanner = document.getElementsByClassName("catagoryBanner")[0]
let searchResultTitle = catagoryBanner.getElementsByTagName("h4")[0]





let searchMoive = (searchData) => {
    // location.assign(`search.html?query=${searchInput.value}`)

    console.log(searchData)

    let api = {
        url: "https://api.themoviedb.org/3/",
        key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

    }


    // searchUrl = (`${searchUrl}query=${searchInput.value}`)
    // console.log(location.search)
    fetch(`${api.url}search/movie?${api.key}&language=en-US&query=${searchData}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            displaySearch(data)
        })


}

let displaySearch = (movie) => {



    console.log(movie)
    console.log(window.history)
    let apiImg = {
        url: "https://image.tmdb.org/t/p/w200"
    }
    searchResultTitle.innerHTML = (`${movie.results.length} Results for <span>"${searchData}"</span>`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = searchResult.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "searchResult"
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

    let ul = searchResult.getElementsByTagName("ul")[0]
    ul.style.display="inline"

}



// let saveData = () => {


//     const searchQueryData = searchInput.value

//     if (!searchQueryData == "") {
//         localStorage.setItem("SEARCH", searchQueryData)
//         window.open("./search.html", "_self");
//     }else{
//         return alert("Please enter keywords")
//     }
// }



window.addEventListener("load", () => {

    let search = localStorage.getItem("SEARCH")

    console.log(search)
    searchData = search


    searchMoive(searchData)
})


// searchBtn.addEventListener("click", saveData)
