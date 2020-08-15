function changeMarginBrandArticle(){
    const brandArticle = document.querySelector('.brand__inner-article--margin-top');
    const textWrapper = document.querySelector('.brand-article__text-wrapper');
    const changeMargin = () => {
        if (window.matchMedia('(min-width: 570px)').matches){
            let parentHeight = Number(textWrapper.parentElement.offsetHeight);
            let elemHeight = Number(textWrapper.offsetHeight);
            let parentPaddingTop = Number(window.getComputedStyle(textWrapper.parentElement).getPropertyValue('padding-top').replace(/\D/g, ''));
            let innerMarginTop = Number(window.getComputedStyle(brandArticle.parentElement).getPropertyValue('margin-top').replace(/\D/g, ''));
            if ((parentHeight - (elemHeight + parentPaddingTop)) >= innerMarginTop){
                brandArticle.style.setProperty('--margin-top', `-${parentHeight - (elemHeight + parentPaddingTop)}px`);
            }
            else if (parentHeight - (elemHeight + parentPaddingTop) <= innerMarginTop){
                brandArticle.style.setProperty('--margin-top', '0');
            }
        }
        else brandArticle.style.setProperty('--margin-top', '0');
    };
    window.addEventListener('resize', changeMargin);
    changeMargin();
}

document.addEventListener('DOMContentLoaded', () => {
    changeMarginBrandArticle();
});