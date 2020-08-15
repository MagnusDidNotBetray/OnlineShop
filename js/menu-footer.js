function loadMapsAPI(){
    if (!localStorage.getItem('currency')){
        const script = document.createElement('script');
        script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?&key=AIzaSyDkd8ZXvItx1Khh-Iu7kU4t-bQZ4abFt00&language=en&callback=geodecoder');
        document.body.appendChild(script);
    }
}
function geodecoder(){
        const geocoder = new google.maps.Geocoder();
        navigator.geolocation.getCurrentPosition(pos => {
            geocoder.geocode({'location': {lat: parseFloat(pos.coords.latitude), lng: parseFloat(pos.coords.longitude)}}, (result, status) => {    
                if (status === 'OK') setCurrencyProperty(result[6].formatted_address);
            });  
        }, () => {
            localStorage.setItem('currency', 'USD');
            changeCurrency();
        });  
}
function setCurrencyProperty(country){
    if (country === 'Ukraine'){
        localStorage.setItem('currency', 'UAH');
        changeCurrency();
    }
    else if(['Russia', 'Belarus', 'Kazakhstan'].includes(country)){
        localStorage.setItem('currency', 'RUB');
        changeCurrency();
    }
    else{
        localStorage.setItem('currency', 'USD');
        changeCurrency();
    }
}
function changeCurrency(){
    if(localStorage.getItem('currency')){
        let inactiveListItem = document.querySelector('.currency-list__item--inactive');
        document.forms.currencyForm.elements.currency.value = localStorage.currency;
        if (inactiveListItem) inactiveListItem.classList.remove('currency-list__item--inactive');
        document.querySelector(`[data-currency='${localStorage.currency}']`).classList.add('currency-list__item--inactive');
    }
}
function currencySelect(){
    const currencyBox =  document.querySelector('.top-bar__currency');
    const currencyList = currencyBox.querySelector('.currency-list');
    return (event) => {
        if (event.target.closest('.top-bar__currency') && !currencyList.classList.contains('currency-list--active')){
            currencyList.classList.add('currency-list--active');
        }
        else if(event.target.closest('.currency-list__item')){
            localStorage.currency = event.target.closest('.currency-list__item').dataset.currency;
            currencyList.classList.remove('currency-list--active');
            changeCurrency();
        }
        else if(!event.target.closest('.currency-list__item') && currencyList.classList.contains('currency-list--active')){
            currencyList.classList.remove('currency-list--active');
        }
    }
}
function clickOnCurrencySelectEventListener(){
    const currencySelectListener = currencySelect();
    document.addEventListener('click', event => {
        currencySelectListener(event);
    });
}
function togglePlaceholder(){
    const searchInput = document.forms.search.elements[1];
    const searchInputPlaceholder = searchInput.placeholder;
    searchInput.addEventListener('focus', () => {
        searchInput.placeholder = '';
    });
    searchInput.addEventListener('blur', () => {
        if(!searchInput.value)
            searchInput.placeholder = searchInputPlaceholder;
    })
}
function addActiveClassToNavLink(){
    for (let elem of document.querySelectorAll('.navigation-list__link')){
        if (document.location.pathname.includes(elem.dataset.activePage)){
            elem.classList.add('navigation-list__link--active');
            break;
        }
    }
}
function burgerMenu(){
    const burgerMenu = document.querySelector('.navigation-list');
    document.addEventListener('click', event => {
        if (event.target.closest('.menu-button')){
            document.body.classList.add('burger-active');
            burgerMenu.classList.remove('navigation-list--inactive');
        }
        else if (!event.target.closest('.navigation-list') && document.body.classList.contains('burger-active')){
            document.body.classList.remove('burger-active');
            burgerMenu.classList.add('navigation-list--inactive');
        }
    });
}
function burgerMenuCategorySelect(){
    let buttons = document.querySelectorAll('.js-category-button');
    [...buttons].forEach(button => {
        button.addEventListener('click', (event) => {
           if (window.matchMedia('(max-width: 1050px)').matches){
                if (event.target.closest('.navigation-list__link')){
                    event.preventDefault();
                }
                burgerMenuRemoveSelectedCategory(buttons);
                button.classList.add('navigation-list__item--active');
                button.querySelector('.navigation-dropdown').classList.add('navigation-dropdown--active');
           }
        })
    });
    document.addEventListener('click', event => {
        let backBtn = event.target.closest('.navigation-dropdown__back-btn');
        let navigationDropdownActive = document.querySelector('.navigation-dropdown--active');
        if (!event.target.closest('.navigation-list') && document.querySelector('.navigation-list__item--active')){
            setTimeout(burgerMenuRemoveSelectedCategory, 500, buttons);
        }
        else if (backBtn){
            navigationDropdownActive.classList.add('navigation-dropdown--animate');
            setTimeout(() => {
                burgerMenuRemoveSelectedCategory(buttons);
                navigationDropdownActive.classList.remove('navigation-dropdown--animate');
            }, 500);
        }
    })
}
function burgerMenuRemoveSelectedCategory(buttons){
    [...buttons].forEach(elem => {
        elem.classList.remove('navigation-list__item--active');
        elem.querySelector('.navigation-dropdown').classList.remove('navigation-dropdown--active');
    });
}
function toggleVisibilitySearchForm(){
    const body = document.body;
    const searchForm = body.querySelector('.search-form');
    document.addEventListener('click', event => {
        if (event.target.closest('.search-button')){
            searchForm.classList.add('search-form--active');
            window.scroll(0, 0);
            body.classList.add('search-active');
        }
        else if (!event.target.closest('.search-form') || event.target.closest('.search-form__close-btn')){
            searchForm.classList.remove('search-form--active');
            body.classList.remove('search-active');
        }
    });
}
function toggleVisibilityLoginList(){
    const loginList = document.querySelector('.login-list');
    document.addEventListener('click', e => {
        if (e.target.closest('.login__button') && !loginList.classList.contains('login-list--active')){
            loginList.classList.add('login-list--active');
        }
        else if(!e.target.closest('.login-list')){
            loginList.classList.remove('login-list--active');
        }
    });
}
function toggleVisibilityInfoList(){
    const infoListArr = document.querySelectorAll('.info-list');
    document.addEventListener('click', e => {
        let infoList = e.target.closest('.info-list');
        if (infoList && !infoList.classList.contains('info-list--active')){
            [...infoListArr].forEach(elem => elem.classList.remove('info-list--active'));
            infoList.classList.add('info-list--active');
        }
        else if(!infoList){
            [...infoListArr].forEach(elem => elem.classList.remove('info-list--active'));
        }
    });
}

function changeSignProperty(){
    const signLinks = [...document.querySelectorAll('*[data-sign]')];
    signLinks.forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.sign = elem.dataset.sign;
            window.location.href = elem.href;
        });
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loadMapsAPI();
    changeCurrency();
    clickOnCurrencySelectEventListener();
    togglePlaceholder();
    addActiveClassToNavLink();
    burgerMenu();
    burgerMenuCategorySelect();
    toggleVisibilitySearchForm();
    toggleVisibilityLoginList();
    toggleVisibilityInfoList();
    changeSignProperty();
    window.addEventListener('storage', () => {
        changeCurrency();
    });
});



