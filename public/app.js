const PRICES = document.querySelectorAll('.price');

const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency',
        minimumFractionDigits: 0
    }).format(price)
}
PRICES.forEach(node=>{
    node.textContent = toCurrency(node.textContent);
})

//обрабатываем клик по кнопке "удалить"
const $card = document.querySelector('#card')
if($card){
    $card.addEventListener('click', event=>{
        if(event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
            console.log(id);

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
                                <button class="btn btn-small js-remove" data-id=${item.id}>delete</button>
                            </td>
                        </tr>`
                    }).join('');
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').textContent = toCurrency(card.price);
                }else{
                    $card.innerHTML = '<p>Basket is empty</p>'
                }
              })
        }
    })
    
}