class ProductCard{
    constructor(parentElemClass, cardClass){
        this.cardGrid = document.querySelector(`.${parentElemClass}`);
        this.cardClass = cardClass;
        this.cards = [...document.querySelectorAll(`.${this.cardClass}`)];
        this.cardCollectionItems = undefined;
    }
    _initcardCollectionItems(){
        this.cardCollectionItems = new Map;
        this.cards.forEach(card => {
            let cardItems = {
                'productCardMask': card.querySelector(`.${this.cardClass}__mask`),
                'productCardInfo': card.querySelector(`.${this.cardClass}__info`),
                'slides': [...card.querySelectorAll(`.${this.cardClass}__slide`)],
                'productCardImg': card.querySelector(`.${this.cardClass}__img`),
                'productCardImgSrc': card.querySelector(`.${this.cardClass}__img`).src
            };
            this.cardCollectionItems.set(card, cardItems);
        }); 
    }
    _addActiveClass(card){
        this.cardCollectionItems.get(card).productCardMask.classList.add(`${this.cardClass}__mask--active`);
        this.cardCollectionItems.get(card).productCardInfo.classList.add(`${this.cardClass}__info--active`);
    }
    _removeActiveClass(card){
        this.cardCollectionItems.get(card).productCardMask.classList.remove(`${this.cardClass}__mask--active`);
        this.cardCollectionItems.get(card).productCardInfo.classList.remove(`${this.cardClass}__info--active`);
    }
    _changeImgSrc(card, t){
        this.cardCollectionItems.get(card).productCardImg.src = t.style.backgroundImage.substring(5, (t.style.backgroundImage.length - 2));
    }
    _isMobileOs(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    }
    _mouseoverEventListener({target: t, relatedTarget: r}){
        if (!this._isMobileOs()){
            let card = t.closest(`.${this.cardClass}`);
            if (!r && card || (card && r.closest(`.${this.cardClass}`) !== card)){
                this._addActiveClass(card);
            }
            if (card && this.cardCollectionItems.get(card).slides.includes(t)){
                this._changeImgSrc(card, t);
            }
        }
    }
    _mouseoutEventListener({target: t, relatedTarget: r}){
        if (!this._isMobileOs()){
            let card = t.closest(`.${this.cardClass}`);
            if (!r && card || (card && r.closest(`.${this.cardClass}`) !== card)){
                this._removeActiveClass(card);
                this.cardCollectionItems.get(card).productCardImg.src = this.cardCollectionItems.get(card).productCardImgSrc;
            }
        } 
    }
    _clickEventListener({target: t}){
        if (this._isMobileOs()){
            let card = t.closest('.product-card');
            if (card){
                this.cards.forEach(elem => {
                    this._removeActiveClass(elem);
                    this.cardCollectionItems.get(elem).productCardImg.src = this.cardCollectionItems.get(elem).productCardImgSrc;
                });
                this._addActiveClass(card);
            }
            if (card && this.cardCollectionItems.get(card).slides.includes(t)){
                this._changeImgSrc(card, t);
            }
            if (!card){
                this.cards.forEach(elem => {
                    this._removeActiveClass(elem);
                    this.cardCollectionItems.get(elem).productCardImg.src = this.cardCollectionItems.get(elem).productCardImgSrc;
                });
            }
        }
    }
    init(){
        this._initcardCollectionItems();
        return [event => {this._mouseoverEventListener(event)}, event => {this._mouseoutEventListener(event)}, event => {this._clickEventListener(event)}];
    }
}

function initCard(){
    let card = new ProductCard('product-grid', 'product-card');
    let [mouseoverListener, mouseoutListener, clickListener] = card.init();
    card.cardGrid.addEventListener('mouseover', mouseoverListener);
    card.cardGrid.addEventListener('mouseout', mouseoutListener);
    document.addEventListener('click', clickListener);
}

document.addEventListener('DOMContentLoaded', () => {
    initCard();
});
