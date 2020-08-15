class Select{
    constructor(select){
        this._select = select;
        this._selectList = select.querySelector('.select-list');
        this._selectInput = select.querySelector('.select__input');
        this._selectedOption = undefined;
        this._isFocus = false;
    }
    _closeSelect(){
        this._selectList.classList.remove('select-list--active');
    }
    _toggleSelect(target){
        if (!target.closest('.select__title')){
            this._selectList.classList.toggle('select-list--active');
        }
    }
    _choiceOption(option){
        this._selectInput.value = option.dataset.select;
        this._selectedOption = option;
        this._selectedOption.classList.add('select-list__item--selected');
    }
    _clickOnSelectListener({target: t}){
        this._toggleSelect(t);
        let option = t.closest('.select-list__item');
        if (option){
            this._choiceOption(option);
            this._closeSelect();
            this._selectInput.focus();
        }
        if (this._selectedOption && !this._selectedOption.classList.contains('select-list__item--selected')){
            this._selectedOption.classList.add('select-list__item--selected');
        }
    }
    _hoverOnSelectedLinkListener({target: t}){
        if (t.closest('.select-list__item') && this._selectedOption){
            this._selectedOption.classList.remove('select-list__item--selected');
        }
    }
    init(){
        if (this._selectList.querySelector(`*[data-select="${this._selectInput.value}"]`)){
            this._choiceOption(this._selectList.querySelector(`*[data-select="${this._selectInput.value}"]`));
        }
        this._select.addEventListener('focus', (e) => {
            this._isFocus = true;
            this._hoverOnSelectedLinkListener(e);
        }, true);
        this._select.addEventListener('blur', ({target}) => {
            this._isFocus = false;
        }, true);
        this._select.addEventListener('keypress', (e) => {
            if(this._isFocus && e.code.toLowerCase() === 'space'){
                this._clickOnSelectListener(e);
            }
        });
        this._select.addEventListener('click', (e) => {
            e.preventDefault();
            this._clickOnSelectListener(e);
        });
        this._select.addEventListener('mouseover', (e) => {
            this._hoverOnSelectedLinkListener(e);
        });
        document.addEventListener('focus', ({target: t}) => {
            if (t.constructor.name !== 'HTMLDocument'){
                if (!t.closest('.select') || t.closest('.select') !== this._select){
                    this._closeSelect();
                }
                if (this._selectedOption && !this._selectedOption.classList.contains('select-list__item--selected')){
                    this._selectedOption.classList.add('select-list__item--selected');
                }
            }
        }, true);
        document.addEventListener('click', ({target: t}) => {
            if (!t.closest('.select') || t.closest('.select') !== this._select){
                this._closeSelect();
            }
            if (this._selectedOption && !this._selectedOption.classList.contains('select-list__item--selected')){
                this._selectedOption.classList.add('select-list__item--selected');
            }
        });
    }
}

class SelectQty{
    constructor(select, max){
        this.maxValue = Number(max);
        this._select = select;
        this._input = select.querySelector('.select-qty__input');
        this._arrowUp = select.querySelector('.arrow-up-js');
        this._arrowDown = select.querySelector('.arrow-down-js');
        this._intervalId = undefined;
        this._isFocus = false;
    }
    _incrementInputValue(value){
        if (value < this.maxValue){
            this._input.value = value + 1;
        }
    }
    _decrementInputValue(value){
        if (value > 1){
            this._input.value = value - 1;
        }
    }
    _removeInactiveClass(arrow){
        if (arrow.classList.contains('select-qty__arrow--inactive')){
            arrow.classList.remove('select-qty__arrow--inactive');
        }
    }
    _clickOnArrowUp(){
        this._incrementInputValue(Number(this._input.value));
        if (Number(this._input.value) === this.maxValue){
            this._arrowUp.classList.add('select-qty__arrow--inactive');
        }
        this._removeInactiveClass(this._arrowDown);
    }
    _clickOnArrowDown(){
        this._decrementInputValue(Number(this._input.value));
        if (Number(this._input.value) === 1){
            this._arrowDown.classList.add('select-qty__arrow--inactive');
        }
        this._removeInactiveClass(this._arrowUp);
    }
    init(){
        this._select.addEventListener('focus', () => {
            this._isFocus = true;
        }, true);
        this._select.addEventListener('blur', () => {
            this._isFocus = false;
        }, true);
        this._select.addEventListener('keydown', (e) => {
            if(this._isFocus && e.code === 'ArrowUp'){
                e.preventDefault();
                this._clickOnArrowUp();
            }
            else if(this._isFocus && e.code === 'ArrowDown'){
                e.preventDefault();
                this._clickOnArrowDown();
            }
            else if(this._isFocus && e.target === this._arrowUp && e.code === 'Space'){
                this._clickOnArrowUp();
            }
            else if(this._isFocus && e.target === this._arrowDown && e.code === 'Space'){
                this._clickOnArrowDown();
            }
        });
        this._select.addEventListener('keyup', () => {
            if (this._intervalId){
                clearInterval(this._intervalId);
                this._intervalId = undefined;
            }
        });
        this._arrowUp.addEventListener('mousedown', () => {
            this._clickOnArrowUp();
            if (!this._intervalId){
                this._intervalId = setInterval(() => {
                    this._clickOnArrowUp();
                }, 300);
            }
        });
        this._arrowUp.addEventListener('mouseup', () => {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        });
        this._arrowDown.addEventListener('mousedown', () => {
            this._clickOnArrowDown();
            if (!this._intervalId){
                this._intervalId = setInterval(() => {
                    this._clickOnArrowDown();
                }, 300);
            }
        });
        this._arrowDown.addEventListener('mouseup', () => {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        });
    }
}
function initSelect(){
    let selectColor = new Select(document.querySelector('.color-js'));
    let selectSize = new Select(document.querySelector('.size-js'));
    let selectQty = new SelectQty(document.querySelector('.custom-input-js'), 5);
    selectColor.init();
    selectSize.init();
    selectQty.init();
}

function initProductSlider(){
    class ProductSlider extends Slider{
        constructor(sliderClass, delay, slideToShow, dragToggle, breakpoint){
            super(sliderClass, delay, slideToShow, dragToggle, breakpoint);
            this.arrowNext = document.querySelector(`.${sliderClass}__arrow--next`);
            this.arrowPrev = document.querySelector(`.${sliderClass}__arrow--prev`);
        }
        init(){
            super.init();
            this.arrowNext.addEventListener('click', () => {
                this.nextSlide();
            });
            this.arrowPrev.addEventListener('click', () => {
                this.prevSlide();
            });
        }
    }
    let productSlider = new ProductSlider('product-slider', 700, 1, true, {
        width: '1050px',
        options: {
            slideToShow: 2
        }
    });
    productSlider.init();
}

function dataMenu(){
    const menu = document.querySelector('.data-menu');
    const contentBox = document.querySelector('.data-content');
    const buttons = [...menu.querySelectorAll('.data-menu__button')];
    const blocks = [...contentBox.querySelectorAll('.data-content__item')];
    const menuMap = new Map();
    buttons.forEach(button => {
        let block = blocks.find(elem => elem.dataset.type === button.dataset.type);
        menuMap.set(button, block);
    });
    const setActiveClass = (button, block) => {
        button.classList.add('data-menu__button--active');
        block.classList.add('data-content__item--active');
    }
    contentBox.style.height = `${menuMap.get(buttons[0]).offsetHeight}px`;
    const changeActiveLink = ({target: t}) => {
        let currentButton = t.closest('.data-menu__button');
        if (currentButton){
            buttons.forEach(elem => {elem.classList.remove('data-menu__button--active');});
            blocks.forEach(elem => {elem.classList.remove('data-content__item--active');});
            setActiveClass(currentButton,  menuMap.get(currentButton));
            contentBox.style.height = `${menuMap.get(currentButton).offsetHeight}px`;
        }
    };
    setActiveClass(buttons[0], menuMap.get(buttons[0]));
    menu.addEventListener('click', changeActiveLink);
    window.addEventListener('resize', () => {
        contentBox.style.height = `${contentBox.querySelector('.data-content__item--active').offsetHeight}px`;
    });
}

function setRating(){
    const icons = [...document.querySelectorAll('.review-list__icon')];
    const attributMap = new Map();
    const selectedColor = '#ded3aa';
    const unselectedColor = '#dfdfde';
    if (!localStorage.attributeArr){
        icons.forEach(elem => {
            attributMap.set(elem, elem.getAttribute('fill'));
        });
    }
    else{
        const attributeArr = JSON.parse(localStorage.attributeArr);
        icons.forEach((elem, index) => {
            attributMap.set(elem, attributeArr[index]);
            elem.setAttribute('fill', attributeArr[index]);
        });
    }
    const mouseenterHandler = ({target}) => {
        if (localStorage.setRating !== 'true'){
            let indexTarget = icons.indexOf(target);
            icons.forEach((elem, index) => {
                if (index <= indexTarget){
                    elem.setAttribute('fill', selectedColor);
                }
                else elem.setAttribute('fill', unselectedColor)
            });
        }
    };
    const mouseleaveHandler = () => {
        if (localStorage.setRating !== 'true'){
            icons.forEach(elem => {
                elem.setAttribute('fill', attributMap.get(elem));
            });
        }
    };
    if (localStorage.setRating !== 'true'){
        icons.forEach(elem => {
            elem.addEventListener('mouseenter', mouseenterHandler);
            elem.addEventListener('mouseleave', mouseleaveHandler);
            elem.addEventListener('click', () => {
                if (localStorage.setRating !== 'true'){
                    localStorage.setItem('setRating', 'true');
                    localStorage.setItem('attributeArr', JSON.stringify(icons.map(elem => elem.getAttribute('fill'))));
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSelect();
    initProductSlider();
    dataMenu();
    setRating();
});