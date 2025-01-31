const loadAllPhones = async (status, brandName) =>{

    document.getElementById('spinner').style.display='none';

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName? brandName :"iphone"}`);
    const data = await response.json();

    if(status){
        displayAllPhone(data.data);
    }
    else{
        if(brandName){
            displayAllPhone(data.data)
        }
        displayAllPhone(data.data.slice(0,6));
    }
}

// Display All phones 
const displayAllPhone = (phones) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';

    if(phones.length === 0){
        phoneContainer.innerHTML = `<p>No Phone Found. Please try a new search.</p>`;
        return;
    }
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
    const searchText = document.getElementById('search-box').value;
    loadAllPhones(true, searchText)
}

// Show Phone Details 

const phoneDetails = async (phone) =>{

    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${phone}`);
    const data = await response.json();

    const {name,brand,image,slug } = data.data;

    const modalContainer = document.getElementById('my_modal_1');
    modalContainer.innerHTML = `
    <div class="modal-box">
        <img src='${image}' />
        <h3 class="text-lg font-bold">${name}</h3>
        <h3 class="text-lg font-bold">${brand}</h3>
        <p class="py-4">${slug}</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
    </div>
    `
    my_modal_1.showModal()
}

document.getElementById('search').addEventListener('click',()=>{
       
    document.getElementById('spinner').style.display='block';

    const searchText = document.getElementById('search-box').value;

        setTimeout(function (){
            loadAllPhones(false, searchText)
        },3000)
    })
loadAllPhones()