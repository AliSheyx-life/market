window.addEventListener('load', () => {
    // Cart
    let cart = {}
    
    // URL address to google doc
    const appleUrl = 'https://spreadsheets.google.com/feeds/list/1Vs5MekEWWKX_u0uiziML_3sB3UmMehAZFx2LBPUrOLA/od6/public/values?alt=json';

    // Get Data from URL whith fetch API
    const getApple = (url) => {
        return fetch(url).then(item => item.json())
    }

    // Data > Array
    getApple(appleUrl)
        .then(data => {
            const appleArray = data['feed']['entry'];
            console.log(appleArray);

            document.querySelector('.product .products-list').innerHTML = drowProducts(appleArray);
        })
        .then(() => {
            // Filter Radio Buttons/////////////////////////////////////////////////////////
            const filterRadio = document.querySelectorAll('.product-top__filter_input-box input');
            const cardType = document.querySelectorAll('.card');

            filterRadio.forEach(item => {
                item.addEventListener('click', async function () {
                    let inputDataType = this.getAttribute('data-value');

                    inputDataType = inputDataType.toLowerCase();

                    for (let i = 0; i < cardType.length; i++) {
                        let cardDataType = cardType[i].getAttribute('data-type');
                        cardDataType = cardDataType.toLowerCase();


                        if (inputDataType.indexOf(cardDataType) == -1) {
                            cardType[i].parentElement.classList.add('hide')
                        } else {
                            cardType[i].parentElement.classList.remove('hide')
                        }
                        if (inputDataType == 'all') {
                            cardType[i].parentElement.classList.remove('hide')
                        }
                    }
                })
            })
            // Filter Radio Buttons/////////////////////////////////////////////////////////
        })
        .then(() => {
            const filterInput = document.querySelector('#search');
            const searchCard = document.querySelectorAll('.card');

            filterInput.addEventListener('input', function () {
                let filterInput = this.value.toLowerCase();

                for (let j = 0; j < searchCard.length; j++) {
                    let cardKeyWords = searchCard[j].getAttribute('data-keys')
                    cardKeyWords = cardKeyWords.toLowerCase();

                    if (filterInput.indexOf(cardKeyWords) == -1) {
                        searchCard[j].parentElement.classList.add('hide')
                    } else {
                        searchCard[j].parentElement.classList.remove('hide')
                    }
                    // if (filterInput.value == '') {
                    //     searchCard[j].parentElement.classList.remove('hide')
                    // }
                    console.log(cardKeyWords);
                }
            })
        })
        .catch(err => console.log(err + ' Ошибка запроса на сервер'))

    function drowProducts(data) {
        let out = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i]['gsx$status']['$t'] != 0) {

                out += `    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">`
                out += `    <div class="card text-center" data-type="${data[i]['gsx$type']['$t']}" data-keys="${data[i]['gsx$keywords']['$t']}">`
                out += `    <img src="${data[i]['gsx$photo']['$t']}" class="card-img-top product-card-img" alt="...">`
                out += `    <div class="card-body">`
                out += `    <h5 class="card-title">${data[i]['gsx$name']['$t']}</h5>`
                out += `    <p class="card-text">${data[i]['gsx$descrip']['$t']}</p>`
                out += `    <button class="btn btn-outline-info data-id="${data[i]['gsx$id']['$t']}">Добавить в корзину</button>`
                out += `    </div>`
                out += `    </div>`
                out += `    </div>`

            }
        }
        return out
    }

})