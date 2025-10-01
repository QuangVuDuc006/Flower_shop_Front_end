document.addEventListener("DOMContentLoaded", function() {
    
    // Hàm chung để tải component
    function loadComponent(url, placeholderId) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    placeholder.innerHTML = data;
                })
                .catch(error => {
                    console.error(`Error loading component from ${url}:`, error);
                });
        }
    }

    // Tải Header và Footer
    loadComponent('templates/_header.html', 'header-placeholder');
    loadComponent('templates/_footer.html', 'footer-placeholder'); // <-- THÊM DÒNG NÀY

});