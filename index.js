let searchInput = document.getElementsByClassName("form-control me-2")[0]
let searchBtn = document.getElementsByClassName("btn btn-outline-success my-2 my-sm-0")[0]

let nowPlaying = document.getElementsByClassName("row nowPlaying")[0]
let nowPlayingList = nowPlaying.getElementsByTagName("li")

// let nowPlaying = document.querySelector(".row.nowPlaying")
// let nowPlayingList = nowPlaying.getElementsByTagName("li")

let openingThisWeek = document.getElementsByClassName("row openingThisWeek")[0]
let openingThisWeekList = openingThisWeek.getElementsByTagName("li")
// let mk = nowPlaying.getElementsByTagName("li")[0]


let displayList = () => {
    console.log(`displaylist fire`)
    return new Promise((resolve, reject) => {


        for (let i = 0; i < nowPlayingList.length; i++) {

            nowPlayingList[i].style.display = ""
         
        }


        for (let i = 0; i < openingThisWeekList.length; i++) {

            openingThisWeekList[i].style.display = ""
        }


        let error = false

        if (!error) {
            resolve()
        } else {
            reject(alert("Something went wrong. Please refresh the page."))
        }
    })
}

let search = () => {
    console.log(`search fire`)


    return new Promise((resolve, reject) => {

        for (let i = 0; i < nowPlayingList.length; i++) {
            // console.log(nowPlayingList[i].innerText)
            let search = searchInput.value.toUpperCase()
            let data = nowPlayingList[i].innerText || nowPlayingList[i].textContent

            // console.log(search)
            // console.log(data.toUpperCase())

            if (data.toUpperCase().indexOf(search) > -1) {
                nowPlayingList[i].style.display = ""
                // nowPlayingList[i].classList.add("searchResult")
            } else {
                nowPlayingList[i].style.display = "none"
            }

        }

        for (let i = 0; i < openingThisWeekList.length; i++) {
            // console.log(nowPlayingList[i].innerText)
            let search = searchInput.value.toUpperCase()
            let data = openingThisWeekList[i].innerText || openingThisWeekList[i].textContent

            // console.log(search)
            // console.log(data.toUpperCase())

            if (data.toUpperCase().indexOf(search) > -1) {
                openingThisWeekList[i].style.display = ""

            } else {
                openingThisWeekList[i].style.display = "none"
            }

        }

        let error = false

        if (!error) {
            resolve()
        } else {
            reject(alert("Something went wrong. Please refresh the page."))
        }

    })


}



let noResult = () => {

    console.log(`no result fire`)

    for (let i = 0; i < nowPlayingList.length; i++) {

        if (nowPlayingList[0].style.display == "none") {

            let ul = nowPlaying.getElementsByTagName("ul")[0]
            console.log(ul)
            let li = document.createElement("li")
            li.innerHTML=(`<h3>No result</h3>`)
            li.style =""
            li.className ="noResult"
            ul.prepend(li)

        }
    }

    for (let i = 0; i < openingThisWeekList.length; i++) {

        if (openingThisWeekList[0].style.display == "none") {

            let ul = openingThisWeek.getElementsByTagName("ul")[0]
            console.log(ul)
            let li = document.createElement("li")
            li.innerHTML=(`<h3>No result</h3>`)
            li.style =""
            li.className ="noResult"
            ul.prepend(li)

        }
    }

}

async function clickSearch() {
    await displayList();
    await search();

    if(nowPlayingList[0].classList == "noResult"){
        nowPlayingList[0].remove()
        noResult();
    }

    // if(openingThisWeekList[0].classList == "noResult"){
    //     openingThisWeekList[0].remove()
    //     noResult();
    // }
    
}


// if (nowPlayingList.classList.contains("searchResult") == false){
//     alert ("no result")
// }

let test = () => {

    let ul = nowPlaying.getElementsByTagName("ul")[0]
    console.log(ul)
    let li = document.createElement("li")
    ul.appendChild(li)
}

searchBtn.addEventListener("click", clickSearch)