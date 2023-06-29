// const form=document.querySelector("#SearchForm")
// const input=document.querySelector("input")
// let toSearch="girls"
// form.addEventListener('submit',function(e){
//     e.preventDefault()
//     toSearch=input.value
//     search(toSearch)
// })

// const search=async(toSearch)=>{
//     const existingImages=document.querySelectorAll("img")
//     for(let img of existingImages){
//         img.parentNode.removeChild(img);
//     }
//     const req=await axios.get(`https://api.tvmaze.com/search/shows?q=${toSearch}`)
//     console.log(req.data)
//     for(let i=0;i<req.data.length;i++){
//         if(req.data[i].show.image!=null)
//         {
//             let image=document.createElement("img")
//             image.src=req.data[i].show.image.medium
//             document.body.append(image)
//         }
        
//     }
// }



const API_KEY="api_key=4b4132f996c2ea46803be20f5445608f"
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL="https://image.tmdb.org/t/p/w500"
const main=document.querySelector("main")
const card=document.querySelector("movie")
const form=document.querySelector("form")
const search=document.querySelector(".search")
function getMovies(url){
    fetch(url)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data.results)
        showMovies(data.results)
    })
}
function getColor(val){
    if(val>=8){
        return "green"
    }
    else if(val>=7){
        return "orange"
    }
    return "red"
}
function showMovies(data){
    main.innerHTML=""
    for(let movie of data){
        const {title,poster_path,vote_average,overview}=movie
        const movieEl=document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML=`
        <img src="${IMG_URL+poster_path}" class="" alt="${title}">
            <div class="movie-info">
              <h4>${title} <span class="${getColor(vote_average)}">${vote_average}</span></h4>
              <div class="overview">
                <h4>overview</h4>
                ${overview}
              </div>
            </div>
        `
        console.log(movie.overview)
        main.append(movieEl)
    }
}
getMovies(API_URL)

form.addEventListener('submit',function(e){
    e.preventDefault()
    const searchTerm=search.value
    
    if(searchTerm){
        const SEARCH_URL=BASE_URL+"/search/movie?"+API_KEY
        getMovies(SEARCH_URL+"&query="+searchTerm)
    }
})