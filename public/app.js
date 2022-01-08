//форматируем значение цены.
const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency',
        minimumFractionDigits: 0
    }).format(price)
}

//применяем форматирование всех цен в списке игр
const PRICES = document.querySelectorAll('[data-price]');
PRICES.forEach(item => {
    item.textContent = toCurrency(item.textContent);
})

//обрабатываем клик по кнопке "удалить"
const $card = document.getElementById('card')
if($card){
    $card.addEventListener('click', event => {
        if(event.target.getAttribute('data-btn-remove')){
            const id = event.target.getAttribute('data-btn-remove')

            fetch(`card/remove/${id}`,{
                method: 'delete',
            }).then(res=> res.json())
              .then(card => {

                if(card.games.length){
                    const html = card.games.map(item =>{
                        return `
                            <tr>
                                <td>${item.title}</td>
                                <td>${item.count}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button class="btn btn-small" data-btn-remove=${item.id}>delete</button>
                                </td>
                            </tr>`
                    }).join('');
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('[data-price]').textContent = toCurrency(card.price);
                }else{
                    $card.innerHTML = '<p>Basket is empty</p>'
                }
              })
        }
    })
    
}