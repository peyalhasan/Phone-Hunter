const loadAllPhones = () =>{

    document.getElementById('spinner').style.display='none';

    fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)

}

document.getElementById('search').addEventListener('click',()=>{
       
    document.getElementById('spinner').style.display='block';
        setTimeout(function (){
            loadAllPhones()
        },3000)
        console.log('hello');
    })
