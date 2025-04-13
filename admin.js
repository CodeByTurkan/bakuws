const body = document.querySelector('body')
const adminCards = document.getElementById('adminCards')
const editCards = document.getElementById('editCards')
const title = document.getElementById('title')
const image = document.getElementById('image')
const content = document.getElementById('content')

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
                <p>${elm.title}</p>
                <p>${elm.content}</p>
                <button onclick="editNews(${elm.id})" type="button" class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">edit</button>
                <button onclick="deleteNews(${elm.id})" type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">delete</button>
            `
        })
        adminCards.innerHTML = code
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

    function editedModal() {
        
    }




