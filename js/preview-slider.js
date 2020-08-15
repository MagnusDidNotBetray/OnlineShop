function initPreviewSlider(){
    class PreviewSlider extends Slider{
        constructor(sliderClass, delay, slideToShow, dragToggle, breakpoint){
            super(sliderClass, delay, slideToShow, dragToggle, breakpoint);
            this.linkText = {
                '0': "shop men's collection",
                '1': "shop women's collection"
            };
            this.link = document.querySelector(`.preview__link`);
        }
        nextSlide(){
            super.nextSlide();
            this.link.innerText = this.linkText[this.currentSlideIndex];
        }
        init(){
            super.init();
            this.link.innerText = this.linkText['0'];
        }
    }
    const slider = new PreviewSlider('preview-slider', 0, 1, false);
    slider.init();
    slider.autoPlay();
}

document.addEventListener('DOMContentLoaded', () => {
    initPreviewSlider();
});

