const body = document.querySelector('body')
const adminCards = document.getElementById('adminCards')
const title = document.getElementById('title')
const image = document.getElementById('image')
const content = document.getElementById('content')
const buttonAdd = document.getElementById('buttonAdd')
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
        showOnAdmin(data)
    }
    getCards()

    function showOnAdmin(data) {
        let code =''
        data.forEach(elm => {
            code += `
            <div class="max-w-sm m-4 flex flex-col justify-start bg-white/30 text-white rounded-lg shadow-sm">
                <img class="rounded-t-lg object-cover w-full " src=${elm.img} alt=""/>
                <div class="p-4">
                    <p class="font-bold text-[20px] mb-2">${elm.title}</p>
                    <p class="text-base overflow-hidden text-ellipsis whitespace-nowrap">${elm.content.slice(0,40)}...</p>
                </div>
                <div class="p-4 mt-auto flex justify-between gap-2">
                    <button onclick='editNews(${JSON.stringify(elm)})' class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 font-medium"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button onclick="deleteNews(${elm.id})" class="bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm px-5 py-2.5 font-medium"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
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

    function addNews(){
        addModal.classList.remove('hidden')
        image.value = ''
        content.value = ''
        title.value = ''
    }

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
        image.value = ''
        content.value = ''
        title.value = ''
    }

    let editedId = ''
    function editNews(elm) {
       addModal.classList.remove('hidden')
       buttonAdd.classList.add('hidden')
       buttonEdit.classList.remove('hidden')
    //    bunu fetchle de yazmaq olar amma uzundu
        image.value = elm.img 
        content.value = elm.content
        title.value = elm.title
        // deyirsenki onceden yazilmis deyerleri yaz

        editedId = elm.id

        // 
    }

    function saveEdits() {
        fetch(`https://67fba7941f8b41c816847cf0.mockapi.io/bakuws/${editedId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                img: image.value,
                title: title.value,
                content: content.value
                // sonrada deyirsenki eyni deyisendir
            })
        })
        .then(res => res.json())
        .then(data => {
            getCards();
            addModal.classList.add('hidden');
        });
       
    }
    
    function closeModal() {
        addModal.classList.add('hidden')
    }

function logOut() {
    localStorage.clear()
    location.href = 'login.htm'
}

