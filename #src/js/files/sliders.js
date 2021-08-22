let sliders = document.querySelectorAll('.swiper');
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

			if (slider.classList.contains('swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper_scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('gallery')) {

		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollitems = document.querySelectorAll('.swiper_scroll');
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
		observer: true,
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
			nextEl: '.slider-main .slider-arrows--next', // обратились к конкретным кнопкам, указав класс родителя
			prevEl: '.slider-main .slider-arrows--prev',
		}
	});
}
