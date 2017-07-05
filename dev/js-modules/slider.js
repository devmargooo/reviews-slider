(function() {
    var active = document.querySelector(".m-slide--active") || document.querySelector(".m-slide--initial-active");
    var next = document.querySelector(".m-slide--next");

    function slideToLeft() {
        if (active.classList.contains("m-slide--active")) {
            active.classList.remove("m-slide--active");
        } else if (active.classList.contains("m-slide--initial-active")) {
            active.classList.remove("m-slide--initial-active");
        } else {
            console.log("Error: active slide not found");
            return;
        }

        active.classList.add("m-slide--prev");
        next.classList.remove("m-slide--next");
        next.classList.add("m-slide--active");
    }

    function moveLeft(slide) {
        var initialLeft =
            //var timer = setInterval(function () {

                        slide.style.left = parseInt(slide.style.left) - 1 + 'rem';
        //}, 2);
    }

    var arrowLeft = document.querySelector(".arrow--left");
    arrowLeft.onclick = slideToLeft;

    function Slider(data) {

    }
    
})();