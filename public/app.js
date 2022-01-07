const PRICES = document.querySelectorAll('.price');

PRICES.forEach(node=>{
    node.textContent = new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency',
        minimumFractionDigits: 0
    }).format(node.textContent)
})