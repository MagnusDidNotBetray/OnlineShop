function sortBy(){
    const container = document.querySelector('.sort-by');
    const sortButton = container.querySelector('.sort-by__sort-btn');
    const menu = container.querySelector('.sort-by__menu');
    const menuItems = [...menu.querySelectorAll('.sort-by__item')];
    const hide = () => {
        sortButton.classList.remove('sort-by__sort-btn--active');
        menu.classList.remove('sort-by__menu--active');
    };
    container.addEventListener('click', ({target}) => {
        if (target.closest('.sort-by__sort-btn')){
            sortButton.classList.toggle('sort-by__sort-btn--active');
            menu.classList.toggle('sort-by__menu--active');
        }
        else if (target.closest('.sort-by__item')){
            menuItems.forEach(elem => elem.classList.remove('active'));
            target.closest('.sort-by__item').classList.add('active');
            hide();
        }
    });
    document.addEventListener('click', ({target}) => {
        if (!target.closest('.sort-by__sort-btn') && !target.closest('.sort-by__menu')){
            hide();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    sortBy();
});