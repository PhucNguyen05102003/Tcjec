$(document).ready(function () {
    // Khởi tạo các giá trị ban đầu cho các phần tử HTML
    resetRacValues();

    // Gọi hàm để lấy dữ liệu từ API và cập nhật dòng chảy
    fetchDataAndUpdate();

    // Đặt thời gian cập nhật dữ liệu sau mỗi khoảng thời gian
    setInterval(fetchDataAndUpdate, 1000); // Cập nhật sau mỗi 1 giây

    function resetRacValues() {
        $('#rac_taicheduoc').text(0);
        $('#rac_giay').text(0);
        $('#rac_racruoi').text(0);
        $('#rac_huuco').text(0);
    }

    function fetchDataAndUpdate() {
        $.ajax({
            url: 'http://localhost:3000/data',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Cập nhật giá trị cho các phần tử HTML với dữ liệu từ API
                updateRacValues(data);
                // Cập nhật dòng chảy với dữ liệu từ API
                updateracFlow(data);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    }

    function updateRacValues(data) {
        $('#rac_taicheduoc').text(data[0].taicheduoc);
        $('#rac_giay').text(data[0].giay);
        $('#rac_racruoi').text(data[0].racruoi);
        $('#rac_huuco').text(data[0].huuco);
    }

    function updateracFlow(data) {
        const CLiquid = document.querySelector(".Cliquid");
        const CStatus = document.querySelector(".Cstatus");
        const Cpercentage = document.querySelector(".Cpercentage");

        const GLiquid = document.querySelector(".Gliquid");
        const GStatus = document.querySelector(".Gstatus");
        const Gpercentage = document.querySelector(".Gpercentage");

        const RLiquid = document.querySelector(".Rliquid");
        const RStatus = document.querySelector(".Rstatus");
        const Rpercentage = document.querySelector(".Rpercentage");

        const HLiquid = document.querySelector(".Hliquid");
        const HStatus = document.querySelector(".Hstatus");
        const Hpercentage = document.querySelector(".Hpercentage");

        let Cflow = parseInt(data[0].taicheduoc);
        let Gflow = parseInt(data[0].giay);
        let Rflow = parseInt(data[0].racruoi);
        let Hflow = parseInt(data[0].huuco);

        //cập nhật dòng chảy và trạng thái 
        function updateFlow(flow, percentageElem, liquidElem, statusElem) {
            if (flow > 100) flow = 100; 
            percentageElem.innerHTML = flow + "%";
            liquidElem.style.height = `${flow}%`;

            if (flow == 100) {
                statusElem.innerHTML = `ĐẦY`;
                liquidElem.style.height = "103%";
                liquidElem.classList.add("gradient-color-red");
                liquidElem.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            } else if (flow <=20) {
                liquidElem.classList.add("gradient-color-green");
                liquidElem.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow");
            } else if (flow <= 70) {
                liquidElem.classList.add("gradient-color-yellow");
                liquidElem.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-orange");
            } else if (flow <= 80) {
                liquidElem.classList.add("gradient-color-orange");
                liquidElem.classList.remove("gradient-color-green", "gradient-color-yellow", "gradient-color-red");
            } else if (flow >= 85 && flow < 100) {
                statusElem.innerHTML = `GẦN ĐẦY`;
                liquidElem.classList.add("gradient-color-red");
                liquidElem.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            } else {
                liquidElem.classList.add("gradient-color-red");
                liquidElem.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            }
        }

        // cập nhật từng loại dữ liệu
        updateFlow(Cflow, Cpercentage, CLiquid, CStatus);
        updateFlow(Gflow, Gpercentage, GLiquid, GStatus);
        updateFlow(Rflow, Rpercentage, RLiquid, RStatus);
        updateFlow(Hflow, Hpercentage, HLiquid, HStatus);
    }
});












