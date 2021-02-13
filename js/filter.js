window.addEventListener('load', () => {

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
                    cardType[i].classList.add('hide')
                } else {
                    cardType[i].classList.remove('hide')
                }

                console.log('hello');
            }

            console.log(inputDataType);
        })
    })



})