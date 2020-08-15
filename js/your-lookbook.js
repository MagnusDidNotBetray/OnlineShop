function toggleLookbookModalWindow(event){
    let lookbook = event.target.closest('.your-lookbook');
    let lookbookTextWrapper = lookbook ? lookbook.querySelector('.your-lookbook__text-wrapper') : null;
    let lookbookTextWrapperActive = document.querySelector('.your-lookbook__text-wrapper--active');
    if (lookbook){
        lookbookTextWrapper.classList.add('your-lookbook__text-wrapper--active');
        lookbook.style.cssText = `min-height: ${lookbookTextWrapper.offsetHeight}px; height: ${lookbookTextWrapper.offsetHeight}px;`;
    }
    if (event.target.closest('.your-lookbook__text-wrapper') !== lookbookTextWrapperActive && lookbookTextWrapperActive){
        lookbookTextWrapperActive.classList.remove('your-lookbook__text-wrapper--active');
        lookbookTextWrapperActive.closest('.your-lookbook').removeAttribute('style');
    }
}
document.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 655px)').matches)
        toggleLookbookModalWindow(event);
}, false);