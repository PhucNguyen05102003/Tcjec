$(document).ready(function () {
    // Hàm cập nhật giao diện chất lỏng cho từng loại rác
    function updateLiquid(data) {
        updateSingleLiquid("#rac_huuco", data[0].taicheduoc);
        updateSingleLiquid("#rac_taiche", data[0].giay);
        updateSingleLiquid("#rac_nilong", data[0].racruoi);
        updateSingleLiquid("#rac_chuaphanloai", data[0].huuco);
    }

    // Hàm cập nhật giao diện chất lỏng cho một loại rác cụ thể
    function updateSingleLiquid(selector, value) {
        let liquidContainer = $(selector).closest(".Bliquid-container");
        let liquid = liquidContainer.find(".Bliquid");
        let percentage = value;
        liquid.height(percentage + "%");

        // Thay đổi màu sắc khi đạt 100%
        if (percentage >= 100) {
            liquid.addClass("full");
        } else {
            liquid.removeClass("full");
        }
    }})