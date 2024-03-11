document.addEventListener('DOMContentLoaded', function() {
    let productsData = [];

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            productsData = data;
            displayProducts(productsData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayProducts(products) {
        const productList = document.getElementById('products');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            const productContent = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
                <img src="${product.image}" alt="${product.title}">
            `;

            productDiv.innerHTML = productContent;
            productList.appendChild(productDiv);
        });
    }

    document.getElementById('Ascending').addEventListener('click', () => {
        const selectedCategory = document.getElementById('category-filter').value;
        let filteredProducts = productsData;

        if (selectedCategory) {
            filteredProducts = productsData.filter(product => product.category === selectedCategory);
        }

        filteredProducts.sort((a, b) => a.price - b.price);
        displayProducts(filteredProducts);
    });

    document.getElementById('Descending').addEventListener('click', () => {
        const selectedCategory = document.getElementById('category-filter').value;
        let filteredProducts = productsData;

        if (selectedCategory) {
            filteredProducts = productsData.filter(product => product.category === selectedCategory);
        }

        filteredProducts.sort((a, b) => b.price - a.price);
        displayProducts(filteredProducts);
    });

    document.getElementById('category-filter').addEventListener('change', () => {
        const selectedCategory = document.getElementById('category-filter').value;
        let filteredProducts = productsData;

        if (selectedCategory) {
            filteredProducts = productsData.filter(product => product.category === selectedCategory);
        }

        displayProducts(filteredProducts);
    });
});
