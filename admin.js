const body = document.querySelector('body')
const adminCards = document.getElementById('adminCards')
const title = document.getElementById('title')
const image = document.getElementById('image')
const content = document.getElementById('content')
const addModal = document.getElementById('addModal')

    // sehive yuklenen anda onload deyir, sildikki gorunmesin back side
    let token = localStorage.getItem('token')
    if (!token) {
        body.style.display = 'none'
        location.href = 'login.htm'
    }


    async function getCards() {
        const res = await fetch("https://67fba7941f8b41c816847cf0.mockapi.io/bakuws")
        const data = await res.json()
        console.log(data)
        
        showOnAdmin(data)
    }
    getCards()

    function saveChanges(){
        // yaradirik get elediklerimizden, getde hamisini goturduk
        fetch('https://67fba7941f8b41c816847cf0.mockapi.io/bakuws', {
            // ilk backa sorgu gonderrisen 
            method:'POST',
            headers: {
                // 'authorization':`Bearer ${token}`  //search
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title: title.value,
                content: content.value,
                img : image.value
            })
        })
        .then(res => {
            res.json()
            if (res.ok) {
                getCards()
            }
        })
        
    }
    
    function showOnAdmin(data) {
        let code =''
        data.forEach(elm => {
            code += 
            `
              <div class="h-[80%] bg-white border border-gray-200 rounded-lg shadow-sm text-black ">
                <a href="" id=${elm.id}>
                    <img class="rounded-t-lg h-50 object-cover w-full" src=${elm.img} alt=""/>
                </a>
                <div class="p-2">
                    <p class="font-bold text-[20px]">${elm.title}</p>
                    <p class=" text-base">${elm.content}</p>
                </div>
                <button onclick="editNews(${elm.id})" type="button" class=" text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">edit</button>
                <button onclick="deleteNews(${elm.id})" type="button" class=" text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">delete</button>
            </div>
            `
        })
        adminCards.innerHTML = code
        addModal.classList.add('hidden')
    }

    // token 3 hisseden ibaretdir.,, user info , 


    // new project - news  - id, creaat, title img


    // script js de fetch get ele. 

    // item.text  - ""  -icerisnde cagir. 


    function deleteNews(id) {
        fetch(`https://67fba7941f8b41c816847cf0.mockapi.io/bakuws/${id}`, {
            // ilk backa sorgu gonderrisen 
            method:'DELETE',
            headers: {
                // 'authorization':`Bearer ${token}`  //search
                'content-type':'application/json'
            }
        })
        .then(res => {
            res.json()
            if (res.ok) {
                getCards()
            }
        })
    }

    function editNews(id) {
        fetch(`https://67fba7941f8b41c816847cf0.mockapi.io/bakuws/${id}`, {
            // ilk backa sorgu gonderrisen 
            method:'PUT',
            headers: {
                // 'authorization':`Bearer ${token}`  //search
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title: title.value,
                content: content.value,
                img : image.value
            })
        })
        .then(res => {
            res.json()
            if (res.ok) {
                getCards()
            }
        })
    }

    function name(params) {
        
    }
   
    function addNews(){
        addModal.classList.remove('hidden')
    }
    //niye yeniden cagirma teleb edir?
    



