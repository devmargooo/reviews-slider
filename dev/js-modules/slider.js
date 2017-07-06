(function() {
    var INITIAL_SLIDE = 0;
    var SLIDER_WIDTH = 1;
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

    function slideToLeft() {
        var active = document.querySelector(".r-slide--active") || document.querySelector(".r-slide--initial-active");
        var next = document.querySelector(".r-slide--next");

        if (active.classList.contains("r-slide--active")) {
            active.classList.remove("r-slide--active");
        } else if (active.classList.contains("r-slide--initial-active")) {
            active.classList.remove("r-slide--initial-active");
        } else {
            console.log("Error: active slide not found");
            return;
        }

        active.classList.add("r-slide--prev");
        next.classList.remove("r-slide--next");
        next.classList.add("r-slide--active");
    }

    function Slider() {
        var slides = [];
        for (var i = 0; i < data.length; i++){
            var slide = new Slide(data[i]);
            slides.push(slide);
        }
        function renderWrapper() {
            var template = document.querySelector(".r-slider-template");
            return document.importNode(template.content, true);
        }
        function renderActiveSlide(activeSlide) {
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
                var active = slides[activeSlide];
                active.classList.add("r-slide--initial-active");
            } else {
                return;
            }
            return active;
        }
        function renderNextSlide(activeSlide) {
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
                var currentSlide = activeSlide + SLIDER_WIDTH;
                var current = slides[currentSlide];
                current.classList.add("r-slide--next");
                return current;
            } else {
                return;
            }
        }
        this.render = function(activeSlide){
            var wrapper = renderWrapper();
            var inner = wrapper.querySelector(".r-slider--inner");

            var active = renderActiveSlide(activeSlide);
            inner.appendChild(active);

            var next = renderNextSlide(activeSlide);
            inner.appendChild(next);

            return wrapper;
        }
    }

    function renderSlideWrapper() {
        var template = document.querySelector(".r-slide-template");
        return document.importNode(template.content, true);
    }

    function Slide(data) {
        var slide = document.createElement("li");
        slide.classList.add("r-slide");
        var inner = document.createElement("div");
        inner.classList.add("r-slide--inner");
        inner.textContent = data.content;
        slide.appendChild(inner);
        return slide;
    }

    var slider = new Slider();
    var sliderBlock = slider.render();
    var bodyFirstChild = document.body.children[0];
    document.body.insertBefore(sliderBlock, bodyFirstChild);


    var arrowLeft = document.querySelector(".arrow--left");
    arrowLeft.onclick = slideToLeft;
    
})();