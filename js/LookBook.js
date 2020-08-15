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

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', event => {bannerModalWindow(event);}, false);
});