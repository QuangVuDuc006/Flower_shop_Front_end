document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://flower-shop-back-end.onrender.com';
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('cat');

    const categoryTitleEl = document.getElementById('category-title');
    const productListContainer = document.getElementById('product-list');

    if (!categoryId) {
        categoryTitleEl.textContent = "DANH MỤC KHÔNG HỢP LỆ";
        productListContainer.innerHTML = '<p class="no-products">Vui lòng chọn một danh mục từ menu.</p>';
        return;
    }

    // Cập nhật tiêu đề trang
    const formattedTitle = categoryId.replace(/-/g, ' ').toUpperCase();
    categoryTitleEl.textContent = formattedTitle;
    document.title = formattedTitle + " - FlowerCorner";

    // Tải sản phẩm
    fetch(`${API_BASE_URL}/api/products`)
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => product.category.includes(categoryId));

            if (filteredProducts.length === 0) {
                productListContainer.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm nào trong danh mục này.</p>';
                return;
            }

            productListContainer.innerHTML = ''; // Xóa nội dung cũ
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

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
            console.error('Lỗi khi tải sản phẩm danh mục:', error);
            productListContainer.innerHTML = '<p>Không thể tải được sản phẩm. Vui lòng bật server back-end và thử lại.</p>';
        });
});