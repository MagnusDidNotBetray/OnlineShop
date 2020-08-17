function bannerModalWindow(event){
    if (window.matchMedia("(max-width: 966px)").matches){
        let bannerWin = document.querySelector('.lookbook-content__banner-win');
        let bannerWinTextWrapper = bannerWin.querySelector('.banner-win__text-wrapper');
        toggleBannerModalWindow(event, bannerWin, bannerWinTextWrapper, '.lookbook-content__banner-win',
        '.banner-win__text-wrapper', 'banner-win__text-wrapper--active');
    }
    if (window.matchMedia("(max-width: 768px)").matches){
        let bannerJane = document.querySelector('.lookbook-content__banner-janes');
        let bannerJaneTextWrapper = bannerJane.querySelector('.banner-janes__text-wrapper');
        toggleBannerModalWindow(event, bannerJane, bannerJaneTextWrapper, '.lookbook-content__banner-janes',
        '.banner-janes__text-wrapper', 'banner-janes__text-wrapper--active');
    }
}
function toggleBannerModalWindow(event, banner, wrapper, bannerClass, wrapperClass, activeClass){
    if (event.target.closest(bannerClass) && !wrapper.classList.contains(activeClass)){
        wrapper.classList.add(activeClass);
        banner.style.cssText = `height: ${wrapper.offsetHeight}px; padding: 0;`;
    }
    else if (!event.target.closest(wrapperClass) && wrapper.classList.contains(activeClass)){
        wrapper.classList.remove(activeClass);
        banner.removeAttribute("style");
    }
}

function lookbookGrid(){
    const grid = document.querySelector('.lookbook-content');
    const banner = grid.querySelector('.lookbook-content__banner-win');
    const items = grid.querySelectorAll('.lookbook-content__item');
    const offsetArr = [...items].map(elem => elem.offsetLeft);
    const maxOffsetLeft = Math.max.apply(null, offsetArr);
    const minOffsetLeft = Math.min.apply(null, offsetArr);
    [items[0], items[1]].forEach(elem => elem.classList.add('lookbook-content__item--order--2-'));
    items[items.length - 1].classList.add('lookbook-content__item--order--2');
    const mutationCallback = () => {
        const lastItem = grid.querySelector('.lookbook-content__item--order--2');
        if (banner.offsetWidth < grid.offsetWidth && lastItem){
            const items = grid.querySelectorAll('.lookbook-content__item');
            if ((items[items.length - 1].offsetLeft < maxOffsetLeft && lastItem.offsetLeft === maxOffsetLeft) ||
                (items[items.length - 2].offsetLeft < maxOffsetLeft && lastItem.offsetLeft === maxOffsetLeft)){
                lastItem.classList.remove('lookbook-content__item--order--2');
            }
        }
        else if (banner.offsetWidth < grid.offsetWidth){
            const items = grid.querySelectorAll('.lookbook-content__item');
            if (items[items.length - 1].offsetLeft === minOffsetLeft){
                items[items.length - 1].classList.add('lookbook-content__item--order--2');
            }
        }
    };
    const observer = new MutationObserver(mutationCallback);
    observer.observe(grid, {attributes: false, childList: true, subtree: false});
    mutationCallback();
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', event => {bannerModalWindow(event);}, false);
    window.addEventListener('resize', () => {
        console.log('ok');
        if (!window.matchMedia("(max-width: 966px)").matches && document.querySelector('.banner-win__text-wrapper--active')){
            document.querySelector('.banner-win__text-wrapper--active').classList.remove('banner-win__text-wrapper--active');
            document.querySelector('.lookbook-content__banner-win').removeAttribute("style");
        }
        if (!window.matchMedia("(max-width: 768px)").matches && document.querySelector('.banner-janes__text-wrapper--active')){
            document.querySelector('.banner-janes__text-wrapper--active').classList.remove('banner-janes__text-wrapper--active');
            document.querySelector('.lookbook-content__banner-janes').removeAttribute("style");
        }
    });
    lookbookGrid();
});