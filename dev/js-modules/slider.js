(function() {
    var INITIAL_SLIDE = 0;
    var SLIDER_WIDTH = 1;
    var PERSONS_SLIDER_WIDTH = 5;
    var PERSONS_SLIDER_OFFSET = 2;//offset between active slide and first left slide
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
    var personsData = [
        {
            imgsrc: 'img/jolie.png',
            caption: 'Елена Демченко\nlash-мастер'
        },
        {
            caption: 'Name2\nstatus2'
        },
        {
            caption: 'Name3\nstatus3'
        },
        {
            caption: 'Name4\nstatus4'
        },
        {
            caption: 'Name5\nstatus5'
        }
    ];
    var placeholders = [
        'img/placeholders/1.png',
        'img/placeholders/2.png',
        'img/placeholders/3.png',
        'img/placeholders/4.png'
    ];
    function renderRandomPersonPlaceholderSrc() {
        var index = Math.floor(Math.random() * (placeholders.length));
        return placeholders[index];
    }
    function Slider() {
        var slides = [];
        var persons = []
        var activeSlide;
        var self = this;
        var inner, personsInner;
        for (var i = 0; i < data.length; i++){
            var slide = new Slide(data[i]);
            slides.push(slide);
        }
        for (var i = 0; i < personsData.length; i++){
            var person = new SlidePerson(personsData[i]);
            persons.push(person);
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
        function ifLeftPersonsSlideIsNextSlide(nextObjIndex) {
            var leftSlide = document.querySelector(".r-slide--persons--third--left") || document.querySelector(".r-slide--persons--third--left--initial");
            return (leftSlide == persons[nextObjIndex]);
        }
        function cloneLeftPersonsSlide(parent, index) {//return original of left slide
            if (!parent){
                if (personsInner) {
                    parent = personsInner;
                } else {
                    console.log("error: can not append next persons slide, parent not found");
                }
            }
            var leftSlide = document.querySelector(".r-slide--persons--third--left") || document.querySelector(".r-slide--persons--third--left--initial");
            var clone = SlidePerson(persons[index]);
            clone.classList = leftSlide.classList;
            parent.insertBefore(clone, leftSlide.nextElementSibling);
            return leftSlide;
        }

        function personsSlideToRight(parent, activeSlide) {
            if (!parent){
                if (personsInner) {
                    parent = personsInner;
                } else {
                    console.log("error: can not append next persons slide, parent not found");
                }
            }
            if (!activeSlide){
                activeSlide = INITIAL_SLIDE;
            }

            var nextObjIndex = activeSlide + PERSONS_SLIDER_OFFSET + 1;
            if (ifLeftPersonsSlideIsNextSlide(nextObjIndex)){
                var nextslide = cloneLeftPersonsSlide(personsInner, nextObjIndex);
                nextslide.classList = "r-slide--persons r-slide--persons--next--toleft";
                parent.appendChild(nextslide);

                var thirdLeft = document.querySelector(".r-slide--persons--third--left") || document.querySelector(".r-slide--persons--third--left--initial");
                thirdLeft.classList = "r-slide--persons--prev";

                var secondLeft = document.querySelector(".r-slide--persons--secondary--left") || document.querySelector(".r-slide--persons--secondary--left--initial");
                secondLeft.classList = "r-slide--persons--third--left";

                var primary = document.querySelector(".r-slide--persons--primary") || document.querySelector(".r-slide--persons--primary--initial");
                primary.classList = "r-slide--persons--secondary--left";

                var secondaryRight =  document.querySelector(".r-slide--persons--secondary--right") || document.querySelector(".r-slide--persons--secondary--right--initial");
                secondaryRight.classList = "r-slide--persons--primary";

                var thirdRight = document.querySelector(".r-slide--persons--third--right") || document.querySelector(".r-slide--persons--third--right--initial");
                thirdRight.classList = "r-slide--persons--secondary--right";
            }

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


            personsSlideToRight(personsInner);
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
        function renderActivePersonsSlides(parent, activeSlide) {
            if (!activeSlide) {
                activeSlide = INITIAL_SLIDE;
                var primary = persons[activeSlide];
                primary.classList.add("r-slide--persons--primary--initial");

                var secondaryLeftIndex = activeSlide - 1;
                if (secondaryLeftIndex < 0) secondaryLeftIndex+=persons.length;

                var secondaryLeft = persons[secondaryLeftIndex];
                secondaryLeft.classList.add("r-slide--persons--secondary--left--initial");

                var thirdLeftIndex = activeSlide - 2;
                if (thirdLeftIndex < 0) thirdLeftIndex+=persons.length;

                var thirdLeft = persons[thirdLeftIndex];
                thirdLeft.classList.add("r-slide--persons--third--left--initial");

                var secondaryRightIndex = activeSlide + 1;
                if (secondaryRightIndex > persons.length) secondaryRightIndex-= persons.length;

                var secondaryRight = persons[secondaryRightIndex];
                secondaryRight.classList.add("r-slide--persons--secondary--right--initial");

                var thirdRightIndex = activeSlide + 2;
                if (thirdRightIndex > persons.length) thirdRightIndex-= persons.length;

                var thirdRight = persons[thirdRightIndex];
                thirdRight.classList.add("r-slide--persons--third--right--initial");

                parent.appendChild(thirdLeft);
                parent.appendChild(secondaryLeft);
                parent.appendChild(primary);
                parent.appendChild(secondaryRight);
                parent.appendChild(thirdRight);
            }
        }
        this.render = function(activeSlide){
            var wrapper = renderWrapper();
            inner = wrapper.querySelector(".r-slider--inner");

            renderActiveSlide(inner, activeSlide);
            renderNextSlide(inner, activeSlide);
            renderPrevSlide(inner, activeSlide);

            return wrapper;
        };
        this.renderPersons = function (activeSlide) {
            personsInner = document.querySelector(".r-slider--inner--persons");
            renderActivePersonsSlides(personsInner, activeSlide);
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
    
    function SlidePerson(data) {
        var slide = document.createElement("li");
        slide.classList.add("r-slide--persons");
        var imgsrc;

        if (data.imgsrc){
                imgsrc = data.imgsrc;
        } else {
            imgsrc = renderRandomPersonPlaceholderSrc();
        }

        var img = document.createElement("img");
        img.setAttribute('src', imgsrc);
        slide.appendChild(img);

        return slide;

    }

    var slider = new Slider();
    var sliderBlock = slider.render();
    var bodyFirstChild = document.body.children[0];
    document.body.insertBefore(sliderBlock, bodyFirstChild);
    slider.addChildrenSlider(5, 'persons');
    slider.renderPersons();

    var arrowRight = document.querySelector(".arrow--right");
    arrowRight.onclick = slider.slideToRight;

    var arrowLeft = document.querySelector(".arrow--left");
    arrowLeft.onclick = slider.slideToLeft;
    
})();