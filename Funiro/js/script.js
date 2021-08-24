//=================================================================================================================================

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

//==================================================================================================================================

"use strict"

// ОПРЕДЕЛИМ НА КАКОМ УСТРОЙСТВЕ ОТКРЫТА НАША СТРАНИЦА

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};


//==================================================================================================================================

// ФУНКЦИЯ УБИРАЕТ ТЕХНИЧЕСКИЙ КЛАСС '_hover'

function _removeClasses(els) {
	for (var i = 0; i < els.length; i++) {
		els[i].classList.remove('_hover')
	}
}

//===================================================================================================================================

//НАПИШЕМ ОБРАБОТКУ НАЖАТИЙ (для работы на мобильных устройствах):

//функция будет срабатывать когда весь контент на странице загрузится
window.onload = function () {

	/*1-организуем прослушивание события "click" на всём документе, вычислять нужные объекты и работать с ними: */
	document.addEventListener("click", documentActions);

	// делегирование события "click"
	function documentActions(e) {

		/* 2- в const targetElement получаем нажатый объект */
		const targetElement = e.target;
		// Условие: появляется выпадающее меню при щелчке на стрелочке (при ширине экрана больше 768px и только сенсорных экранах)
		if (window.innerWidth > 768 && isMobile.any()) {
			/* 3-Условие: если нажатый объект содержит класс 'menu__arrow': */
			if (targetElement.classList.contains('menu__arrow')) {
				/* 4-обращаемся к классу ближайшего родителя '.menu__item' и присваиваем(убираем) технический класс '_hover': */
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			// пункты выпадающего меню можно закрывать щелчком в любои месте
			/* if (!targetElement.closest('.menu__item') && document.querySelector('.menu__item._hover')) {
				document.querySelector('.menu__item._hover').classList.remove('_hover');
			} */
			// пункты выпадающего меню можно закрывать щелчком в любои месте
			// Условие: если нажатый объект в родителях не имеет 'menu__item' (не пункт меню и не подменю) и проверим существуют ли объекты 'menu__item' с техническим классом _hover:
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				/* помещаем объкты с техническим классом _hover в функцию _removeClasses и указываем убрать этот технический класс */
				_removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
			}
		}
		// добавляет строчку (поле для ввода) при щелчке на иконке(поиск) на малых экранах
		/* 1-Условие: если нажатый объект содержит класс 'search-form__icon'(соответствует иконке поиска): */
		if (targetElement.classList.contains('search-form__icon')) {
			/* 2-тогда находим объект '.search-form', обращаемся к списку классов classList и убираем(добавляем) технический класс '_active' */
			document.querySelector('.search-form').classList.toggle('_active');
		}
		// убираем строчку (поле для ввода) при щелчке на любом свободном месте
		// Условие: если нажатый объект в родителях не имеет '.search-form' и проверим существуют ли объекты '.search-form' с техническим классом _active:
		else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			/* указываем убрать этот технический класс у объекта '.search-form' */
			document.querySelector('.search-form').classList.remove('_active');
		}
	}
}

//==================================================================================================================================

"use strict"

// SPOILERS

/* получаем коллекцию всех объектов, у которых есть data-атрибут: spoilers */
const spoilersArray = document.querySelectorAll('[data-spoilers]');

/* проверяем есть ли такие объкты */
if (spoilersArray.length > 0) {
	/* переведём все полученные объкты(коллекцию) в массив и разделим на 2-ва массива: с простыми спойлерами и спойлерами, работающими по определённым условиям: */

	// Получим обычные спройлеры:
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		//проверим осутствие параметров у атрибута data-spoilers объектов
		/* обращаемся к элементу массива.заходим в его data-атрибут.обращаемся к конкретному атрибуту spoilers.преобразуем содержимое в массив с разделителем (запятая) и запрашиваем 1-ю ячейку с индеком [0] Атрибут НЕ должен содержать первого параметра (данных в этой ячейке), тогда этот объект(элементу массива) попадёт в const spoilersRegular */
		return !item.dataset.spoilers.split(",")[0];
	});
	//Инициализация обычных спойлеров:
	/* Если такие объекты(элементы массива) существуют */
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Получим спройлеры с медиа-запросами:
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	});
	//Инициализация спройлеров с медиа-запросами:
	if (spoilersMedia.length > 0) {
		/* создаём константу с пустым массивом (его мы будем наполнять параметрами): */
		const breakpointsArray = [];
		/* переберём (с помощью forEach) массив объктов, которые мы собрали: */
		spoilersMedia.forEach(item => {
			/* обращаемся к data-атрибуту spoilers и сохраним в константе строку с параметрами для каждого объкта: */
			const params = item.dataset.spoilers;
			/*создаём пустой объкт и будем его наполнять: */
			const breakpoint = {};
			/* преобразовываем строку внутри params в массив (с помощью split) с разделителем (запятая) и сохраняем в константе: */
			const paramsArray = params.split(",");
			/*  для пустого объкта breakpoint создаём значение value и присваиваем туда нулевую ячейку массива (ширина экрана): */
			breakpoint.value = paramsArray[0];
			/* соэраним значение min для этого объекта ( по умолчанию будет-max) */
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			/* сохраним сам объект */
			breakpoint.item = item;
			/* заполненный значениями объект breakpoint добавляем в массив breakpointsArray: */
			breakpointsArray.push(breakpoint);
		});

		// Что бы учесть повторения, получаем уникальные брейкпоинты:
		/* сохраним в переменной, переделанный с помощью метода map массив breakpointsArray*/
		let mediaQueries = breakpointsArray.map(function (item) {
			/* соберём строку с медиа-запросом: */
			return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
		});
		/* через переменную mediaQueries(массив), обращаемся к функции и фильтруем массив и возвращаем уникальные значения и сохраняем внутри массива mediaQueries*/
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		/* пробежимся по массиву mediaQueries, который мы собрали.убрали все дубли и т.д. ,с помощью forEach ( по всем брейкпоинтам */
		mediaQueries.forEach(breakpoint => {
			/* в константу получаем строку(одну запись данного массива), которую преобразуем в массив с помощью разделителя (запятая) */
			const paramsArray = breakpoint.split(",");
			/*  в константу получаем первый параметр массива параметров (число-ширина экрана) */
			const mediaBreakpoint = paramsArray[1];
			/* в константу получаем второй параметр массива параметров (число-ширина экрана) */
			const mediaType = paramsArray[2];
			/* в константу сохраним результат работы метода matchMedia, который будет слушать ширину жкрана и отрабатывать если сработает тот или иной брейк поинт В параметры(в скобках) указываем нулевой параметр массива (строка, которую мы форировали ранее)*/
			const matchMedia = window.matchMedia(paramsArray[0]);
			// Соберём массив обектов, которые соответствуют данному брейкпоинту, фильтруем и сохраним в константу
			const spoilersArray = breakpointsArray.filter(function (item) {
				/* если совпадает и число и тип, то объект попадает в массив spoilersArray */
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			// Создадим событие,которое будет отрабатывать при достижении условия брейкпоинта:
			matchMedia.addListener(function () {
				initSpoilers(spoilersArray, matchMedia);
			});
			initSpoilers(spoilersArray, matchMedia); // функция так же отработает при загрузке страницы
		});
	}

	// Функции (методы) для работы спойлеров:

	// ИНИЦИАЛИЗАЦИЯ
	function initSpoilers(spoilersArray, matchMedia = false/* по умолчанию */) {
		/* пробежимся по каждому элементу(spoilersBlock) массива*/
		spoilersArray.forEach(spoilersBlock => {
			/* сделаем проверку: если matchMedia не false(имеет значение), то присваиваем имя item объкту spoilersBlock, иначе оставляем без именений*/
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			/* сделаем условное ветвление: если наш брейкпоинт сработал(matchMedia.matches вернёт false) или были переданы обычные спойлеры(без медиа-запросов) т.е. matchMedia НЕ true(false), тогда: */
			if (matchMedia.matches || !matchMedia) {
				/* оболочке спойлера присваивается технический класс '_init': */
				spoilersBlock.classList.add('_init');
				/* отправляем данный объект в функцию: */
				initSpoilerBody(spoilersBlock);
				/* На объкт spoilersBlock вешаем событие "click" и вызываем функцию: */
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				/* иначе */
				/* отбираем у блока технический класс '_init': */
				spoilersBlock.classList.remove('_init');
				/* передаём в функцию объкт и параметр false: */
				initSpoilerBody(spoilersBlock, false);
				/* убираем событие "click" на блоке: */
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		});
	}
	// РАБОТА С КОНТЕНТОМ СПОЙЛЕРА
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true/* по умолчанию*/) {
		/* получим все заголовки спойлеров внутри конкретного блока: */
		const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
		/* проверяем есть ли у нас такие заголовки: */
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody/* true */) {
					/* у этого заголовка убираем атрибут 'tabindex'(возможность перехода по данным заголовкам по щелчку на Tab): */
					spoilerTitle.removeAttribute('tabindex');
					/* проверка: есть ли у заголовка НЕТ класса '_active': */
					if (!spoilerTitle.classList.contains('_active')) {
						/* тогда мы скрываем контентную часть: обращаемся к заголовку spoilerTitle, далее к nextElementSibling(следующий элемент после заголовка) и используем атрибут hidden со значением true: */
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					/* Если у нас не сработал брейкпоинт, нам нужно отобразить спойлер в виде обычного блока: */
					/* тогда добабляем атрибут tabindex со значением -1 */
					spoilerTitle.setAttribute('tabindex', '-1');
					/* показываем контентные блоки, если они бвли скрыты: */
					spoilerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	/* добавим функцию, которая исполняется при щелчке на заголовке спойлера */
	function setSpoilerAction(e) {
		// Используем делегирование событий
		/* В константу el получаем нажатый объект: */
		const el = e.target;
		/* проверяем есть ли у самого объкта атрибут data-spoiler или у ближайшего родителя*/
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			/* получаем в константу ближайший родительский блок данного спойлера */
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			/* в константу сохраняем результат проверки: нужно ли добавлять данному блоку функционал аккордеона или нет: */
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			/* проверка: есть ли у родителя в данный момент какие-нибудь объкты внутри с классом '._slide': */
			if (!spoilersBlock.querySelectorAll('._slide').length) {
				/* проверка на аккордион: если oneSpoiler=true и у нажатой кнопки нет класса '_active',тогда нам нужно все остальные спойлеры скрыть(используем функцию hideSpoilersBody, в которую передаём родительский объект): */
				if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle('_active');
				_slideToggle(spoilerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpoilersBody(spoilersBlock) {
		/* в константу получим активный(открытый) спойлер внутри родительского объекта: */
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		/* если такой есть: */
		if (spoilerActiveTitle) {
			/* убираем класс _active и скрываем все элементы */
			spoilerActiveTitle.classList.remove('_active');
			_slideUp(spoilerActiveTitle.nextElementSibling, 500);
		}
	}
}

// SlideToggle (фцнкции, которые позволяют нам анимировать (скрывать и показывать) объкты)

/* функция _slideUp, анимированно скрывает объект */
let _slideUp = (target, duration = 500) => {
	/* добавим проверку: если у объкта нет технического класса _slide: */
	if (!target.classList.contains('_slide')) {
		/* добавим этот класс */
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true; // вместо: 	target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

/* функция _slideUp, анимированно показывает объект */
let _slideDown = (target, duration = 500) => {
	/* добавим проверку: если у объкта нет технического класса _slide: */
	if (!target.classList.contains('_slide')) {
		/* добавим этот класс */
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		/* 	target.style.removeProperty('display');
			let display = window.getComputedStyle(target).display;
			if (display === 'none')
				display = 'block';
		
			target.style.display = display; */
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

/* функция _slideToggle вызывает функции _slideDown или _slideUp, когда нужно показать или скрыть обьект */
let _slideToggle = (target, duration = 500) => {
	/* if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') { */
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
/* } */

//==================================================================================================================================

// МЕНЮ-БУРГЕР и его анимация

/* 1-получим объект (иконку меню-бургер) Будем искать этот класс: */
const iconMenu = document.querySelector('.menu__icon');
/* 3-найдём и сохраним в константу menuBody объект .menu__body (будет нужно для анимирования появления меню при нажатии на иконке (меню-бургер) */
const menuBody = document.querySelector('.menu__body');
/* 2-проверка: есть ли такой обхект(класс) в константе iconMenu: */
if (iconMenu) {
	/* 4-создаём событие "click" по иконке(меню-бургер): */
	iconMenu.addEventListener("click", function (e) {
		/* 7-запретим скроллить страницу при открытом меню: */
		//обатимся к body и будем добавлять(убирать) технический класс '_lock' при нажатой иконке(меню-бургер):
		document.body.classList.toggle('_lock');
		/* 5-обращаемся к иконке(меню-бургер) и добавляем(убираем) класс '_active' при нажатии на неё: */
		iconMenu.classList.toggle('_active'); /* чтобы анимнровать иконку(меню-бургер) при нажатии */
		/* 6-обращаемся к объекту .menu__body и добавляем(убираем) класс '_active' при нажатии на неё: */
		menuBody.classList.toggle('_active'); /* чтобы анимировать появление меню при нажати на иконку(меню-бургер) */
	});
}





//====================================================================================================================================
//  Инициализируем SWIPER
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');

				}
			}

			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper_wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper_bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {

		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollitems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollitems.length > 0) {
	for (let index = 0; index < sliderScrollitems.length; index++) {
		const sliderScrollitem = sliderScrollitems[index];
		const sliderScrollBar = sliderScrollitem.querySelectorAll('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollitem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollBar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}

function sliders_bild_callback(params) { }

if (document.querySelector('.slider-main__body')) {
	new Swiper('.slider-main__body', {
		//observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.controls-slider-main__dotts',
			clickable: true,
		},
		//Arrows
		navigation: {
			nextEl: '.slider-main .slider-arrow--next', // обратились к конкретным кнопкам, указав в начале класс родителя
			prevEl: '.slider-main .slider-arrow--prev',
		}
	});
}






