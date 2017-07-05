(function() {
    var INITIAL_SLIDE = 0;
    var data = [
        {
            content: "Это отзыв номер 1"
        },
        {
            content: "Это отзыв номер 2"
        },
        {
            content: "Это отзыв номер 3"
        },
        {
            content: "Это отзыв номер 4"
        },
        {
            content: "Это отзыв номер 5"
        }
    ];
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

    function Slider() {
        var slides = [];
        for (var i = 0; i < data.length; i++){
            var slide = new Slide(data[i]);
            slides.push(slide);
        }
        function renderWrapper() {
            var template = document.querySelector(".m-slider-template");
            return document.importNode(template.content, true);
        }
        function renderActiveSlide(activeSlide) {
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
                var active = slides[activeSlide];
                console.log(active);
            } else {
                return;
            }
            return active;
        }
        this.render = function(activeSlide){
            var wrapper = renderWrapper();
            var inner = wrapper.querySelector(".m-slider--inner");

            var active = renderActiveSlide(activeSlide);
            inner.appendChild(active);

            return wrapper;
        }
    }

    function renderSlideWrapper() {
        var template = document.querySelector(".m-slide-template");
        return document.importNode(template.content, true);
    }

    function Slide(data) {
        var wrapper = renderSlideWrapper();
        var reviewArea = wrapper.querySelector(".m-slide--inner");
        reviewArea.textContent = data.content;
        return wrapper;
    }

    var slider = new Slider();
    var sliderBlock = slider.render();
    var bodyFirstChild = document.body.children[0];
    document.body.insertBefore(sliderBlock, bodyFirstChild);


    var arrowLeft = document.querySelector(".arrow--left");
    arrowLeft.onclick = slideToLeft;
    
})();