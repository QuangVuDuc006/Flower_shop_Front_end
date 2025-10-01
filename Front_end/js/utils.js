/**
 * Định dạng một số thành chuỗi tiền tệ Việt Nam (VND).
 * @param {number} number - Số tiền cần định dạng.
 * @returns {string} - Chuỗi đã được định dạng (ví dụ: 1.000.000 ₫).
 */
function formatCurrency(number) {
    // Sử dụng Intl.NumberFormat để định dạng theo chuẩn Việt Nam
    // style: 'currency' - định dạng tiền tệ
    // currency: 'VND' - đơn vị tiền tệ là Việt Nam Đồng
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}