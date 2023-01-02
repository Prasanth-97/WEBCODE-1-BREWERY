
//creating html elements

let container = document.createElement("div");
container.setAttribute("class", "container");
container.innerHTML = `<div class="input-box" id="input-box">
<h2>Breweries in United States</h2>
<div class="input-search">
<input id="input-text" type="text" placeholder="Enter US city name" required>
<button title="search" id="search-btn" class="btn"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
</div>
</div>
`
document.body.append(container);

// Javascript code 

let searchButton = document.getElementById("search-btn");
let output = document.createElement("div");
output.setAttribute("class", "output");
let input = document.getElementById("input-box")

//on clicking button it gives breweries name address etc..available in the city 
searchButton.addEventListener("click", async function () {
    let inputText = document.getElementById("input-text").value;
    let inputText1 = inputText.toString();
    document.getElementById("input-text").value = "";
    try {
        let data = await fetch(`https://api.openbrewerydb.org/breweries`);
        let res = await data.json();
        let filteredArr = res.filter((ele) => ele.city == `${inputText1}`);
        if (filteredArr.length) {
            for (let i = 0; i < filteredArr.length; i++) {
                removedElement(`${i}output`)
                output.setAttribute("id", `${i}output`);
                input.appendChild(output);
                output.innerHTML += `
         <p>Name : ${filteredArr[i]?.name || ""}</p>
         <p>Breweries_type : ${filteredArr[i]?.brewery_type || "Not Available"}</p>
         <p>Address : ${filteredArr[i].address_2?.address_3 || "Not Available"}</p>
         <a href="${filteredArr[i].website_url || ""}" target="_blank">Company Url link</a>
         <p>Phone no : ${filteredArr[i]?.phone || ""}</p>         
         <hr>
         `
            }
        } else {
            removedElement(`errormessage`)
            output.innerHTML += ` <p id="errormessage">No Search results found</p>`
            input.appendChild(output);
        }

    }
    catch (err) {
        output.innerHTML = `${err}`
    }

})

function removedElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}