
// Populating Main Date below the navbar
let dateMain = document.getElementById('dateMain');
setInterval(() => {
    let dateToday = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayToday = days[dateToday.getDay()];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateMonth = months[dateToday.getMonth()];
    let dateNumber = dateToday.getDate();
    let dateYear = dateToday.getFullYear();
    dateMain.innerHTML = `<h5>${dayToday}, ${dateNumber} ${dateMonth} ${dateYear}</h5>`;
}, 1000);

let country = "";
let category = "";

function countryChoosen(countryId){
    // console.log(category);
    let countryText = document.getElementById(countryId).innerText;
    let xhr = new XMLHttpRequest();
    country = countryId;
    let navbarDropdown = document.getElementById('navbarDropdown');
    let navbarDropdown2 = document.getElementById('navbarDropdown2');
    navbarDropdown.innerText = `${countryText} [${country}]`;   
    if(navbarDropdown2.innerText === "Category"){
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=c6ac0ab87081474a841a84218f0ca1df`, true);
    }
    else{
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${country}&category=${navbarDropdown2.innerText.toLowerCase()}&apiKey=c6ac0ab87081474a841a84218f0ca1df`, true);
    }
    
    let newsColumn = document.getElementById('newsColumn');
    xhr.onload = function(){
        if(this.status === 200){
            newsColumn.innerHTML = '';
            let newsObj = JSON.parse(this.responseText);
            // console.log(newsObj.articles);
            let str = '';
            for(let i=0 ; i<newsObj.articles.length ; i++){
                str += `
                        <div class="newzCard col-sm-6 my-2">
                            <div class="card mb-3" style="max-width: 540px; height: 100%">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${newsObj.articles[i].urlToImage}" class="img-fluid rounded-start" alt="No Image">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${newsObj.articles[i].title}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="container mb-2">
                                    <p class="card-text">${newsObj.articles[i].description}  <a href="${newsObj.articles[i].url}">Read more..</a></p>
                                    <p class="card-text"><small class="text-muted">Published at: ${newsObj.articles[i].publishedAt.substr(0, 10)} (${newsObj.articles[i].publishedAt.substr(11, 5)})</small></p>
                                </div>
                            </div>
                        </div>`;
                    // console.log(str);
    
            }
            newsColumn.innerHTML = str;
        }
    }
    xhr.send();
    
}

function categoryChoosen(categoryId){
    let categoryText = document.getElementById(categoryId).innerText;
    let xhr = new XMLHttpRequest();
    let category = categoryId;
    let navbarDropdown2 = document.getElementById('navbarDropdown2');
    let navbarDropdown = document.getElementById('navbarDropdown');
    navbarDropdown2.innerText = categoryText;
    if(navbarDropdown.innerText === "Country"){
        // xhr.open('GET', `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=c6ac0ab87081474a841a84218f0ca1df`, true);
        newsColumn.innerHTML = `<h5>First Choose Country then choose category</h5>`
    }
    else{
        let countryTxt = navbarDropdown.innerText.substr(-3, 2);
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${countryTxt}&category=${category}&apiKey=c6ac0ab87081474a841a84218f0ca1df`, true);
    }
    // xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=c6ac0ab87081474a841a84218f0ca1df`, true);
    // xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apiKey=c6ac0ab87081474a841a84218f0ca1df`, true);

    
    let newsColumn = document.getElementById('newsColumn');
    xhr.onload = function(){
        if(this.status === 200){
            newsColumn.innerHTML = '';
            let newsObj = JSON.parse(this.responseText);
            // console.log(newsObj.articles);
            let str = '';
            for(let i=0 ; i<newsObj.articles.length ; i++){
                str += `
                        <div class="newzCard col-sm-6 my-2">
                            <div class="card mb-3" style="max-width: 540px; height: 100%">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${newsObj.articles[i].urlToImage}" class="img-fluid rounded-start" alt="No Image">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${newsObj.articles[i].title}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="container mb-2">
                                    <p class="card-text">${newsObj.articles[i].description}  <a href="${newsObj.articles[i].url}">Read more..</a></p>
                                    <p class="card-text"><small class="text-muted">Published at: ${newsObj.articles[i].publishedAt.substr(0, 10)} (${newsObj.articles[i].publishedAt.substr(11, 5)})</small></p>
                                </div>
                            </div>
                        </div>`;
                    // console.log(str);
    
            }
            newsColumn.innerHTML = str;
        }
    }
    xhr.send();
    
}



let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let newzCards = document.getElementsByClassName("newzCard");
    // console.log(newzCards);
    Array.from(newzCards).forEach(function(element){

        let newzDescrip = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let newzTit = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        // console.log(newzDescrip);
        // console.log(newzTit);
        if(newzDescrip.includes(inputVal) || newzTit.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});