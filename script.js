const cards = document.getElementById('cards')

async function getCards() { 
    const res = await fetch("https://67fba7941f8b41c816847cf0.mockapi.io/bakuws")
    const data = await res.json()  //bura function fetch eksine gedir.
    showCards(data)
}
// kartdaki infonu ya data js yada apidan al , bunu meqsedi budu 
// fetch is ofisant front deyirki mene flan sey lazimdi. fetchle back onu gonderir

function showCards(data) {
    let code = ''
    data.map(elm => {
        code +=
        `
        <div class="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-sm text-black">
                <img class="rounded-t-lg h-50 object-cover w-full" src=${elm.img} alt=""/>
                <div class="p-2">
                    <p class="font-bold text-[20px]">${elm.title}</p>
                </div>
            </div>
        `
    })
    console.log(code);
    
    cards.innerHTML = code    //you call cards after they have been completed not before
}
getCards()
