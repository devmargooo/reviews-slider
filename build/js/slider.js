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

    function Slider() {
        var slides = [];
        var activeSlide;
        var self = this;
        var inner;
        for (var i = 0; i < data.length; i++){
            var slide = new Slide(data[i]);
            slides.push(slide);
        }
        function renderWrapper() {
            var template = document.querySelector(".r-slider-template");
            return document.importNode(template.content, true);
        }
        function renderPrevSlide(parent, activeSlide) {
            if (!parent){
                if (inner) {
                    parent = inner;
                } else {
                    console.log("error: can not append next slide, parent not found");
                }
            }
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
            }
            if (activeSlide == 0) {
                var index = slides.length - 1;
            } else {
                var index = activeSlide - 1;
            }
            var slide = slides[index];
            slide.classList.add("r-slide--prev");
            slide.classList.remove("r-slide--next--toleft");
            slide.classList.remove("r-slide--next--toright");
            var active = parent.querySelector(".r-slide--active--toleft") || parent.querySelector(".r-slide--active--toright") || parent.querySelector(".r-slide--initial-active");
            parent.insertBefore(slide, active);
        }
        function renderActiveSlide(parent, activeSlide) {
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
                var active = slides[activeSlide];
                active.classList.add("r-slide--initial-active");
            } else {
                var active = slides[activeSlide];
                active.classList.add("r-slide--active--toleft");
            }
            parent.appendChild(active);
        }
        function renderNextSlide(parent, activeSlide) {
            if (!parent){
                if (inner) {
                    parent = inner;
                } else {
                    console.log("error: can not append next slide, parent not found");
                }
            }
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
            }
            if (activeSlide == slides.length-1){
                var index = 0;
            } else {
                var index = activeSlide + 1;
            }
            var slide = slides[index];
            slide.classList.add("r-slide--next--toleft");
            slide.classList.remove("r-slide--next--toright");
            slide.classList.remove("r-slide--prev");
            parent.appendChild(slide);

        }
        this.slideToRight = function(){
            var active = document.querySelector(".r-slide--active--toleft") || document.querySelector(".r-slide--active--toright") || document.querySelector(".r-slide--initial-active");
            var next = document.querySelector(".r-slide--next--toleft") || document.querySelector(".r-slide--next--toright");
            var prev = document.querySelector(".r-slide--prev");
            if (prev) {
                var parent = prev.parentNode;
                parent.removeChild(prev);
            }

            if (active.classList.contains("r-slide--active--toleft")) {
                active.classList.remove("r-slide--active--toleft");
            } else if (active.classList.contains("r-slide--active--toright")) {
                active.classList.remove("r-slide--active--toright");
            } else if (active.classList.contains("r-slide--initial-active")) {
                active.classList.remove("r-slide--initial-active");
            } else {
                console.log("Error: active slide not found");
                return;
            }
            active.classList.add("r-slide--prev");

            next.classList.remove("r-slide--next--toleft") || next.classList.remove("r-slide--next--toright");
            next.classList.add("r-slide--active--toleft");

            activeSlide ? activeSlide = (activeSlide + 1) % slides.length : activeSlide = 1;
            renderNextSlide(false, activeSlide);
        };
        this.slideToLeft = function () {
            var active = document.querySelector(".r-slide--active--toleft") || document.querySelector(".r-slide--active--toright") || document.querySelector(".r-slide--initial-active");
            var next = document.querySelector(".r-slide--next--toleft") || document.querySelector(".r-slide--next--toright") ;
            var prev = document.querySelector(".r-slide--prev");

            if (next) {
                var parent = next.parentNode;
                parent.removeChild(next);
            }

            if (active.classList.contains("r-slide--active--toleft")) {
                active.classList.remove("r-slide--active--toleft");
            } else if (active.classList.contains("r-slide--active--toright")) {
                active.classList.remove("r-slide--active--toright");
            } else if (active.classList.contains("r-slide--initial-active")) {
                active.classList.remove("r-slide--initial-active");
            } else {
                console.log("Error: active slide not found");
                return;
            }
            active.classList.add("r-slide--next--toright");
            prev.classList.remove("r-slide--prev");
            prev.classList.add("r-slide--active--toright");

            activeSlide ? activeSlide = (activeSlide - 1) % slides.length : activeSlide = slides.length - 1;
            renderPrevSlide(false, activeSlide);
        };
        this.addChildrenSlider = function (width, alias) {
            var wrapper = document.querySelector(".r-slider");
            var childInner = document.createElement("ul");
            childInner.classList.add("r-slider--inner--" + alias);

            var sliders = wrapper.querySelectorAll(".r-slider--inner");
            var insertingPoint = sliders[sliders.length - 1].nextElementSibling;
            wrapper.insertBefore(childInner, insertingPoint);
        };
        this.render = function(activeSlide){
            var wrapper = renderWrapper();
            inner = wrapper.querySelector(".r-slider--inner");

            renderActiveSlide(inner, activeSlide);
            renderNextSlide(inner, activeSlide);
            renderPrevSlide(inner, activeSlide);

            return wrapper;
        }
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
    slider.addChildrenSlider(5, 'persons');

    var arrowRight = document.querySelector(".arrow--right");
    arrowRight.onclick = slider.slideToRight;

    var arrowLeft = document.querySelector(".arrow--left");
    arrowLeft.onclick = slider.slideToLeft;
    
})();