class Slider{
    constructor(sliderClass, delay, slideToShow, dragToggle, breakpoint){
        this.sliderClass = sliderClass;
        this.sliderGrid = document.querySelector(`.${sliderClass}__grid`);
        this.slider = document.querySelector(`.${sliderClass}`);
        this.slides = [...document.querySelectorAll(`.${sliderClass}__item`)];
        this.currentSlideIndex = 0;
        this.autoPlayID = undefined;
        this.transitionDelay = delay;
        this.dragToggle = dragToggle;
        this.infiniteActive = true;
        this.isMouseDown = false;
        this.cursorPosBeginX = undefined;
        this.cursorPosCurrentX = undefined;
        this.cursorPosBeginY = undefined;
        this.cursorPosCurrentY = undefined;
        this.isScroll = undefined;
        this.translateBegin = undefined;
        this.defaultSlideToShow = slideToShow;
        this.slideToShow = slideToShow;
        this.breakpoint = breakpoint;
    }
    changeSliderHeight(){
        this.slider.style.setProperty('--slider-height', `${this.slides[this.currentSlideIndex].offsetHeight}px`);
    }
    removeActiveSlide(){
        this.slides[this.currentSlideIndex].classList.remove(`${this.sliderClass}__item--active`);
    }
    cloneSlide(){
        this.sliderGrid.insertBefore(this.slides[this.slides.length - 1].cloneNode(true), this.sliderGrid.firstElementChild);
        this.slides.forEach(elem => {
            this.sliderGrid.appendChild(elem.cloneNode(true));
        })
    }
    setResponsiveProperties(){
        if (this.breakpoint && window.matchMedia(`(max-width: ${this.breakpoint.width})`).matches){
            Object.keys(this.breakpoint.options).forEach(key => {
                this[key] = this.breakpoint.options[key];
            });  
        }
        else if (this.breakpoint && !window.matchMedia(`(max-width: ${this.breakpoint.width})`).matches){
            this.slideToShow = this.defaultSlideToShow;
        }
    }
    nextInfiniteSlide(){
        this.infiniteActive = false;
        let slideToShow = this.slideToShow || 1;
        setTimeout(() => {
            this.sliderGrid.style.transition = 'all 0s';
            for (let i = slideToShow + 1; i < this.sliderGrid.children.length; i++){
                this.sliderGrid.children[i].style.display = 'none';
            }
            this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex].offsetLeft}px)`;
            setTimeout(() => {
                for (let i = slideToShow + 1; i < this.sliderGrid.children.length; i++){
                    this.sliderGrid.children[i].style.display = '';
                }
                this.infiniteActive = true;
            }, 500);
        }, this.transitionDelay);
    }
    prevInfiniteSlide(){
        this.infiniteActive = false;
        setTimeout(() => {
            this.sliderGrid.style.transition = 'all 0s';
            this.slides.forEach((elem, index) => {
                index < this.slides.length - 1 ? elem.style.opacity = '0' : elem.style.display = '';
            });
            this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex].offsetLeft}px)`;
            setTimeout(() => {
                this.slides.forEach(elem => {
                    elem.style.opacity = '';
                });
                this.infiniteActive = true;
            }, 500);
        }, this.transitionDelay);
    }
    nextSlide(){
        if (this.infiniteActive){
            this.sliderGrid.style.transition = `all ${this.transitionDelay}ms`;
            this.removeActiveSlide();
            this.currentSlideIndex++;
            if (this.currentSlideIndex <= this.slides.length - 1){
                this.slides[this.currentSlideIndex].classList.add(`${this.sliderClass}__item--active`);
                this.changeSliderHeight();
                this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex].offsetLeft}px)`;
            }
            else{
                this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex - 1].nextElementSibling.offsetLeft}px)`;
                this.currentSlideIndex = 0;
                this.slides[this.currentSlideIndex].classList.add(`${this.sliderClass}__item--active`);
                this.changeSliderHeight();
                this.nextInfiniteSlide();
            }
        }
    }
    prevSlide(){
        if (this.infiniteActive){
            this.sliderGrid.style.transition = `all ${this.transitionDelay}ms`;
            this.removeActiveSlide();
            this.currentSlideIndex--;
            if (this.currentSlideIndex >= 0){
                this.slides[this.currentSlideIndex].classList.add(`${this.sliderClass}__item--active`);
                this.changeSliderHeight();
                this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex].offsetLeft}px)`;
            }
            else{
                this.currentSlideIndex = this.slides.length - 1;
                this.slides[this.currentSlideIndex].classList.add(`${this.sliderClass}__item--active`);
                this.changeSliderHeight();
                this.sliderGrid.style.transform = `translateX(-${this.sliderGrid.firstElementChild.offsetLeft}px)`;
                this.prevInfiniteSlide();
            }
        }
    }
    mousedownListener(cursorPosX, cursorPosY){
        this.isMouseDown = true;
        this.isScroll = true;
        this.cursorPosBeginX = cursorPosX;
        this.cursorPosBeginY = cursorPosY;
        this.translateBegin = Number(this.sliderGrid.style.transform.match(/\d+/)[0]) * -1;
    }
    mousemoveListener(e, cursorPosX, cursorPosY){
        if (this.isMouseDown){
            if (this.isScroll && cursorPosY !== this.cursorPosBeginY
                && (this.cursorPosBeginX - 3 <= cursorPosX && cursorPosX <= this.cursorPosBeginX + 3)){
                this.isMouseDown = false;
            }
            else this.isScroll = false;
            if(this.infiniteActive && this.isMouseDown){
                e.preventDefault();
                let sliderX = this.slider.getBoundingClientRect().x;
                this.sliderGrid.style.transition = 'all 0ms';
                this.cursorPosCurrentX = cursorPosX;
                this.sliderGrid.style.transform = `translateX(${this.translateBegin + (this.cursorPosCurrentX - this.cursorPosBeginX)}px)`;
                if (cursorPosX <= sliderX || cursorPosX >= sliderX + this.slider.offsetWidth){
                    this.mouseupListener();
                }
            }
        }
    }
    mouseupListener(){
        if (this.isMouseDown && this.cursorPosCurrentX && this.cursorPosBeginX){
            this.isMouseDown = false;
            if (this.cursorPosCurrentX - this.cursorPosBeginX < -30){
                this.nextSlide();
            }
            else if (this.cursorPosCurrentX - this.cursorPosBeginX > 30){
                this.prevSlide();
            }
            else{
                this.sliderGrid.style.transform = `translateX(${this.translateBegin}px)`;
            }
            this.cursorPosBeginX = undefined;
            this.cursorPosCurrentX = undefined;
        }
        else this.isMouseDown = false;
    }
    autoPlay(off){
        if (off !== true && this.autoPlayID === undefined){
            this.autoPlayID = setInterval(() => {
                    this.nextSlide();
            }, 10000);
        }
        else if (off === true && this.autoPlayID !== undefined){
            clearInterval(this.autoPlayID);
            this.autoPlayID = undefined;
        }
    }
    init(){
        this.cloneSlide();
        if (this.slideToShow !== undefined && window.matchMedia('(max-width: 1050px)').matches){
            this.slideToShow = 2;
        }
        this.slides[this.currentSlideIndex].classList.add(`${this.sliderClass}__item--active`);
        this.changeSliderHeight();
        this.sliderGrid.style.transition = `all ${this.transitionDelay}ms`;
        this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex].offsetLeft}px)`;
        this.setResponsiveProperties();
        window.addEventListener('resize', () => {
            this.changeSliderHeight();
            this.sliderGrid.style.transform = `translateX(-${this.slides[this.currentSlideIndex].offsetLeft}px)`;
            this.setResponsiveProperties();
        });
        if (this.dragToggle){
            this.slider.addEventListener('mousedown', ({pageX, pageY}) => {
                this.mousedownListener(pageX, pageY);
            });
            this.slider.addEventListener('mouseup', () => {
                this.mouseupListener();
            });
            this.slider.addEventListener('mousemove', (e) => {
                this.mousemoveListener(e, e.pageX, e.pageY);
            });
            this.slider.addEventListener('touchstart', ({touches}) => {
                this.mousedownListener(touches[0].pageX, touches[0].pageY);
            });
            this.slider.addEventListener('touchend', () => {
                this.mouseupListener();
            });
            this.slider.addEventListener('touchmove', (e) => {
                this.mousemoveListener(e, e.touches[0].pageX, e.touches[0].pageY);
            });
        }
    }
}
