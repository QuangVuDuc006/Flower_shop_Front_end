document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:3000';
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const productNameEl = document.getElementById('product-name');
    const productPriceEl = document.getElementById('product-price');
    const productOriginalPriceEl = document.getElementById('product-original-price');
    const productDiscountEl = document.getElementById('product-discount');
    const productImageEl = document.getElementById('product-image');
    const productDescriptionEl = document.getElementById('product-description');
    const contentEl = document.getElementById('product-detail-content');

    if (!productId) {
        contentEl.innerHTML = "<h1>ID sản phẩm không hợp lệ!</h1>";
        return;
    }

    fetch(`${API_BASE_URL}/api/products`)
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);

            if (product) {
                document.title = product.name + " - FlowerCorner";
                productNameEl.textContent = product.name;
                productPriceEl.textContent = formatCurrency(product.price);

                if (product.originalPrice && product.originalPrice > product.price) {
                    productOriginalPriceEl.textContent = formatCurrency(product.originalPrice);
                    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                    productDiscountEl.textContent = `-${discount}% GIẢM`;
                    productDiscountEl.style.display = 'inline-block';
                } else {
                    productDiscountEl.style.display = 'none';
                }

                // SỬA LỖI: Ghép địa chỉ server với đường dẫn ảnh
                const imageUrl = product.image ? `${API_BASE_URL}${product.image}` : 'images/placeholder.png';
                productImageEl.src = imageUrl;
                productImageEl.alt = product.name;
                
                if (product.description) {
                    productDescriptionEl.textContent = product.description;
                }
            } else {
                contentEl.innerHTML = "<h1>Sản phẩm không tồn tại!</h1>";
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải chi tiết sản phẩm:', error);
            contentEl.innerHTML = "<h1>Đã xảy ra lỗi khi tải dữ liệu sản phẩm.</h1>";
        });
});