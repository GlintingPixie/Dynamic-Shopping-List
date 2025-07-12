document.addEventListener('DOMContentLoaded',()=>{
    const products = [{id:1,name:"Product 1",price:19.99},{id:2,name:"Product 2",price:29.99},{id:3,name:"Product 3",price:39.99},{id:4,name:"Product 4",price:49.999}]
    
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    
    const productList = document.getElementById('product-list')
    const cartItems = document.getElementById('cart-items')
    const emptyCartDisplay = document.getElementById('empty-cart')
    const cartTotal = document.getElementById('cart-total')
    const totalPrice = document.getElementById('total-price')
    const checkoutBtn = document.getElementById('checkout-btn')

    products.forEach((product)=>{
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id ="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    })

    // If there is cart in localStorage render it
    if (cart.length){
        renderCart()
    }

    productList.addEventListener('click',(event)=>{
        if (event.target.tagName !== 'BUTTON') return;

        const productId = parseInt(event.target.getAttribute('data-id'))
        const product = products.find(p => p.id === productId)
        
        // Adding to cart
        cart.push(product)
        saveCart()
        renderCart();

    })

    function renderCart(){
        let cartPrice = 0;
        cartItems.innerText = ""
        if (cart.length){

            emptyCartDisplay.classList.add('hidden')
            cartTotal.classList.remove('hidden')

            cart.forEach((product)=>{
                const productDiv = document.createElement('div')
                productDiv.classList.add('product')
                productDiv.innerHTML = `
                <span>${product.name} - $${product.price.toFixed(2)}</span>
                <button data-id ="${product.id}">Remove from cart</button>
                `
                cartPrice += product.price
                cartItems.appendChild(productDiv)
            })
            totalPrice.textContent = `$${cartPrice.toFixed(2)}`
        }
        else{
            emptyCartDisplay.classList.remove('hidden')
            cartTotal.classList.add('hidden')
        }
    }
    cartItems.addEventListener('click',(event)=>{
        if(event.target.tagName !=='BUTTON') return;

        const productId = parseInt(event.target.getAttribute('data-id'))
        cart = cart.filter((p)=>p.id !== productId)
        saveCart()
        renderCart();

    })
    checkoutBtn.addEventListener('click',(event)=>{
        cart.length = 0
        alert('Cart Ordered Successfully');
        saveCart()
        renderCart()
    })

    function saveCart(){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
})