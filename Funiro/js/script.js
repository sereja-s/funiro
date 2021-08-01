
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		// появляется выпадающее меню при щелчке на стрелочке (при ширине экрана меньше 769)
		if (window.innerWidth > 319 /* && isMobile.any() */) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelector('.menu__item._hover')) {
				document.querySelector('.menu__item._hover').classList.remove('_hover');
			}
			// пункты выпадающего меню можно закрывать щелчком в любои месте
			/* if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
			} */
		}
		// добавлят строчку при щелчке на иконке(поиск) на малых экранах
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		}
		// убираем строчку при клике на любом свободном месте
		else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
	}
}