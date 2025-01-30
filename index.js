const loadAllPhones = async (status, brandName) =>{

    document.getElementById('spinner').style.display='none';

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName? brandName : "iphone"}`);
    const data = await response.json();

    if(status){
        displayAllPhone(data.data);
    }
    else{
        displayAllPhone(data.data.slice(0,6));
    }
}

// Display All phones 
const displayAllPhone = (phones) =>{
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach( (phone) => {
        //Distructuring 
        const {brand, image, slug} = phone;
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card bg-base-100 my-3 w-96 shadow-xl">
        <figure class="px-10 pt-10">
            <img
            src="${image}"
            alt="Phone"
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${brand}</h2>
            <p>${slug}</p>
            <div class="card-actions">
            <button onclick="phoneDetails('${slug}')" class="btn btn-primary ">Show Details</button>
            </div>
        </div>
    </div>
        `;
    phoneContainer.appendChild(div)
    });
}

// Show All Phones 

const handleShowAll = () =>{
    loadAllPhones(true)
}

// Show Phone Details 

const phoneDetails = async (phone) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${phone}`);
    const data = await response.json();
    console.log(data.data)
}

document.getElementById('search').addEventListener('click',()=>{
       
    document.getElementById('spinner').style.display='block';

    const searchText = document.getElementById('search-box').value;

        setTimeout(function (){
            loadAllPhones(false, searchText)
        },3000)
    })
loadAllPhones()