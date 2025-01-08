const cart = [];

        function addToCart(id, name, price) {
            const existingProduct = cart.find(item => item.id === id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        }

        function removeFromCart(id) {
            const productIndex = cart.findIndex(item => item.id === id);
            if (productIndex !== -1) {
                cart.splice(productIndex, 1);
            }
            updateCart();
        }

        function updateCart() {
            const cartItemsDiv = document.getElementById('cart-items');
            cartItemsDiv.innerHTML = '';

            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${item.price * item.quantity}</span>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                `;
                cartItemsDiv.appendChild(cartItemDiv);
            });

            document.getElementById('cart-total').textContent = total.toFixed(2);
        }