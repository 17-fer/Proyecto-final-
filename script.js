document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Variables Globales y Estado del Carrito ---
    const productsContainer = document.getElementById('productos-container');
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotalElement = document.getElementById('cart-total');
    const contactForm = document.getElementById('contact-form');

    // Inicializar el carrito desde localStorage o vacío
    let cart = JSON.parse(localStorage.getItem('amigurumiCart')) || [];

    // --- 2. Funciones de Carrito (Persistencia y Visualización) ---

    /** Guarda el estado actual del carrito en localStorage. */
    const saveCart = () => {
        localStorage.setItem('amigurumiCart', JSON.stringify(cart));
    };

    /** Actualiza el contador de productos en el ícono del carrito. */
    const updateCartCounter = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
    };

    /** Calcula y actualiza el total de la compra. */
    const updateCartTotal = () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2);
    };

    /** Renderiza la lista detallada de productos en el sidebar del carrito. */
    const updateCartDisplay = () => {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
            updateCartCounter();
            updateCartTotal();
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <span>$${item.price.toFixed(2)} c/u</span>
                </div>
                <input 
                    type="number" 
                    value="${item.quantity}" 
                    min="1" 
                    data-id="${item.id}" 
                    class="item-quantity-input"
                    aria-label="Cantidad de ${item.name}"
                />
                <button class="remove-btn" data-id="${item.id}" aria-label="Eliminar ${item.name}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsList.appendChild(itemElement);
        });

        // Reasignar listeners para edición y eliminación
        attachCartListeners();
        updateCartCounter();
        updateCartTotal();
        saveCart();
    };

    /** Agrega un producto al carrito o incrementa su cantidad. */
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Mostrar un mensaje simple de confirmación
        alert(`"${product.name}" ha sido añadido al carrito.`);
        
        updateCartDisplay();
        cartSidebar.classList.add('open'); // Abrir carrito al agregar
    };

    /** Elimina un producto del carrito. */
    const removeItemFromCart = (productId) => {
        cart = cart.filter(item => item.id != productId);
        updateCartDisplay();
    };

    /** Maneja la actualización de la cantidad de un producto. */
    const updateItemQuantity = (productId, newQuantity) => {
        const item = cart.find(item => item.id == productId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            updateCartDisplay();
        } else if (newQuantity <= 0) {
             removeItemFromCart(productId);
        }
    };
    
    /** Vacía completamente el carrito. */
    const clearCart = () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            cart = [];
            updateCartDisplay();
        }
    };

    /** Asigna listeners de eventos dentro del sidebar del carrito (para edición). */
    const attachCartListeners = () => {
        // Listener para eliminar producto
        cartItemsList.querySelectorAll('.remove-btn').forEach(button => {
            button.onclick = (e) => {
                removeItemFromCart(e.currentTarget.dataset.id);
            };
        });

        // Listener para cambiar cantidad
        cartItemsList.querySelectorAll('.item-quantity-input').forEach(input => {
            input.onchange = (e) => {
                const newQuantity = parseInt(e.target.value);
                updateItemQuantity(e.target.dataset.id, newQuantity);
            };
        });
    };
    
    // --- 3. FETCH API: Cargar Productos Dinámicamente ---
    
    // Lista de productos base con IDs únicos y URLs de imágenes
    const baseProducts = [
        { id: 10, name: 'Patito', price: 9500, img: "https://i.pinimg.com/236x/00/8d/eb/008deb005efa0082d815f37b28d43138.jpg", description: "Patito tejido a crochet, un clásico adorable." },
        { id: 11, name: 'Pulpito', price: 8000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9MbZSJjCmEmEXWoap4TicW0PWrsrhqwkziCj7-mOUMwNbM_onXlMvMSDgzBMnUzAUrqI&usqp=CAU", description: "Pulpito con tentáculos suaves, ideal para bebés." },
        { id: 12, name: 'Tortuguita', price: 10000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAel0cYhR95-HehH1iB3r52eIgyW4_J8eJ2Ut0MhWVqnZNyQnmWpkywHU73WaioW4BZVg&usqp=CAU", description: "Tortuguita de caparazón colorido y delicado." }
    ];

    /** Renderiza la lista de productos en el HTML. */
    const renderProducts = (products) => {
        productsContainer.innerHTML = ''; // Limpiar el contenido estático
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'producto';
            productElement.dataset.id = product.id;
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name} amigurumi" />
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="precio" data-price="${product.price}">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
            `;
            productsContainer.appendChild(productElement);
        });

        // Asignar listeners a los botones de "Agregar al carrito"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.productId);
                const selectedProduct = products.find(p => p.id === productId);
                if (selectedProduct) {
                    addToCart(selectedProduct);
                }
            });
        });
    };

    /** Simula la obtención de productos desde una "API" (usando datos locales). */
    const fetchProducts = async () => {
        // En una aplicación real, aquí usarías fetch('tu_api/productos')
        // Usamos una simulación de API con los productos base.
        
        // Simulación de los productos que ya teníamos en HTML para tener un catálogo más grande.
        const staticProducts = [
            { id: 1, name: 'Conejito', price: 9000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuVrgBLG4geZeZZV0RYm3WpMakijw2shPKjg&s", description: "Un adorable conejito tejido a mano con hilo suave." },
            { id: 2, name: 'Osito', price: 9000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-0pJADPbmxpQv6OvgPzhQvDpmRlBj3HehNg&s", description: "Osito de peluche tejido a crochet con detalles delicados." },
            { id: 3, name: 'Unicornio', price: 9000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFkY7FTChkobvfkH74j4lPj5-lWUuQ33hehA&s", description: "Unicornio mágico tejido a mano con colores brillantes." },
        ];

        const allProducts = [...staticProducts, ...baseProducts]; // Juntar productos
        renderProducts(allProducts);
    };

    // --- 4. Validación de Formulario (DOM Manipulation) ---

    /** Muestra un mensaje de error bajo el campo. */
    const displayError = (id, message) => {
        const errorElement = document.getElementById(`error-${id}`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    };

    /** Borra el mensaje de error. */
    const clearError = (id) => {
        displayError(id, '');
    };

    /** Valida el formato de correo electrónico. */
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    /** Maneja el evento de envío del formulario. */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const formStatus = document.getElementById('form-status');
        formStatus.textContent = '';

        const nombre = contactForm.elements['nombre'].value.trim();
        const email = contactForm.elements['email'].value.trim();
        const mensaje = contactForm.elements['mensaje'].value.trim();

        // 1. Validar Nombre
        if (nombre === '') {
            displayError('nombre', 'El nombre es requerido.');
            isValid = false;
        } else {
            clearError('nombre');
        }

        // 2. Validar Email
        if (email === '') {
            displayError('email', 'El correo electrónico es requerido.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            displayError('email', 'El formato de correo no es válido.');
            isValid = false;
        } else {
            clearError('email');
        }

        // 3. Validar Mensaje
        if (mensaje === '') {
            displayError('mensaje', 'El mensaje es requerido.');
            isValid = false;
        } else {
            clearError('mensaje');
        }

        if (isValid) {
            // Si es válido, enviamos los datos a Formspree
            const formData = new FormData(contactForm);
            formStatus.textContent = 'Enviando...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '✅ ¡Gracias! Tu mensaje ha sido enviado.';
                    contactForm.reset();
                } else {
                    formStatus.textContent = '❌ Hubo un error al enviar el formulario.';
                }
            } catch (error) {
                formStatus.textContent = '❌ Error de conexión. Inténtalo más tarde.';
                console.error('Error al enviar:', error);
            }
        }
    };

    // --- 5. Inicialización de Listeners y Datos ---

    // Inicializar el carrito
    updateCartDisplay(); 

    // Cargar productos
    fetchProducts();
    
    // Listeners del Sidebar del Carrito
    openCartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    
    clearCartBtn.addEventListener('click', clearCart);

    // Listener del Formulario de Contacto
    contactForm.addEventListener('submit', handleFormSubmit);
});