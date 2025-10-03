document.addEventListener('DOMContentLoaded', function() {

    const API_BASE_URL = 'https://flower-shop-back-end.onrender.com';
    const productListContainer = document.getElementById('product-list');

    if (productListContainer) {
        fetch(`${API_BASE_URL}/api/products`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(products => {
                productListContainer.innerHTML = ''; // Xóa nội dung cũ
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.dataset.productId = product.id;

                    // SỬA LỖI: Ghép địa chỉ server với đường dẫn ảnh
                    const imageUrl = product.image ? `${API_BASE_URL}${product.image}` : 'images/placeholder.png';

                    productCard.innerHTML = `
                        <a href="product-detail.html?id=${product.id}">
                            <img src="${imageUrl}" alt="${product.name}">
                            <h3>${product.name}</h3>
                        </a>
                        <p class="price">${formatCurrency(product.price)}</p>
                        <button class="add-to-cart-btn">Thêm vào giỏ</button>
                    `;
                    productListContainer.appendChild(productCard);
                });
            })
            .catch(error => {
                console.error('Lỗi khi tải sản phẩm trên trang chủ:', error);
                productListContainer.innerHTML = '<p>Không thể tải được sản phẩm. Vui lòng bật server back-end và thử lại.</p>';
            });
    }
    
    if (productListContainer) {
        productListContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const card = event.target.closest('.product-card');
                const productId = card.dataset.productId;
                console.log(`Đã thêm sản phẩm có ID: ${productId} vào giỏ.`);
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            }
        });
    }

    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelector('.slides');
        const slideItems = document.querySelectorAll('.slide');
        if (slideItems.length > 0) {
            const slideCount = slideItems.length;
            const prevBtn = document.querySelector('.slider-btn.prev');
            const nextBtn = document.querySelector('.slider-btn.next');
            let currentIndex = 0;
            let autoPlayInterval;

            function goToSlide(index) {
                if (index < 0) index = slideCount - 1;
                else if (index >= slideCount) index = 0;
                
                slides.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
                currentIndex = index;
            }

            function startAutoPlay() {
                clearInterval(autoPlayInterval); 
                autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 4000);
            }

            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                clearInterval(autoPlayInterval);
                setTimeout(startAutoPlay, 5000);
            });

            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                clearInterval(autoPlayInterval);
                setTimeout(startAutoPlay, 5000);
            });

            startAutoPlay();
        }
    }
});