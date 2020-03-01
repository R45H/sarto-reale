var
	classBlock = 'slider',
	classSlider = classBlock + '__wrap',
	classDots = classBlock + '__dots',
	classDot = classBlock + '__dot',
	classArrow = classBlock + '__arrow',
	classArrowIcon = classBlock + '__arrow-icon',
	$blocks = $('.' + classBlock),
	prevArrow = '' +
		'<button type="button" class="' + classArrow + ' ' + classArrow + '_prev">' +
			'<svg class="' + classArrowIcon + '" viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg">' +
				'<path d="M0.184601 15.5389L14.8518 0.205435C15.107 -0.0588796 15.5289 -0.0706297 15.7945 0.184623C16.0602 0.439188 16.0693 0.861067 15.8153 1.12732L1.58959 15.9998L15.8154 30.8724C16.0693 31.1387 16.0602 31.5606 15.7946 31.8151C15.6656 31.9388 15.499 32 15.3336 32C15.1578 32 14.9834 31.931 14.8519 31.7942L0.184601 16.4608C-0.0615349 16.203 -0.0615349 15.7967 0.184601 15.5389Z"/>' +
			'</svg>' +
		'</button>',
	nextArrow = '' +
		'<button type="button" class="' + classArrow + ' ' + classArrow + '_next">' +
			'<svg class="' + classArrowIcon + '" viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path d="M15.8154 15.5389L1.1482 0.205435C0.893002 -0.0588796 0.47111 -0.0706297 0.205474 0.184623C-0.0601612 0.439188 -0.0692861 0.861067 0.184661 1.12732L14.4104 15.9998L0.184598 30.8724C-0.0693491 31.1387 -0.0602232 31.5606 0.205412 31.8151C0.334355 31.9388 0.500986 32 0.666368 32C0.842187 32 1.01663 31.931 1.14814 31.7942L15.8154 16.4608C16.0615 16.203 16.0615 15.7967 15.8154 15.5389Z"/>' +
			'</svg>' +
		'</button>';

$blocks.each(function() {
	var
		$this = $(this),
		$slider = $this.find('.' + classSlider),
		sliderDots = $this.attr('data-dots') === 'true',

		sliderRows = +$this.attr('data-rows') || 1,
		sliderCols = +$this.attr('data-cols') || 1,
		sliderSmRows = +$this.attr('data-sm-rows') || sliderRows || 1,
		sliderSmCols = +$this.attr('data-sm-cols') || sliderCols || 1,
		sliderMdRows = +$this.attr('data-md-rows') || sliderSmRows || sliderRows || 1,
		sliderMdCols = +$this.attr('data-md-cols') || sliderSmCols || sliderCols || 1,
		sliderLgRows = +$this.attr('data-lg-rows') || sliderMdRows || sliderRows || 1,
		sliderLgCols = +$this.attr('data-lg-cols') || sliderMdCols || sliderCols || 1,
		sliderXlRows = +$this.attr('data-xl-rows') || sliderLgRows || sliderRows || 1,
		sliderXlCols = +$this.attr('data-xl-cols') || sliderLgCols || sliderCols || 1,

		sliderArrows = $this.attr('data-arrows') !== undefined ? $this.attr('data-arrows') : 'true',
		sliderSmArrows = $this.attr('data-sm-arrows') !== undefined ? $this.attr('data-sm-arrows') : sliderArrows || 'true',
		sliderMdArrows = $this.attr('data-md-arrows') !== undefined ? $this.attr('data-md-arrows') : sliderSmArrows || sliderArrows || 'true',
		sliderLgArrows = $this.attr('data-lg-arrows') !== undefined ? $this.attr('data-lg-arrows') : sliderMdArrows || sliderArrows || 'true',
		sliderXlArrows = $this.attr('data-xl-arrows') !== undefined ? $this.attr('data-xl-arrows') : sliderLgArrows || sliderArrows || 'true';

	sliderArrows = sliderArrows === 'true';
	sliderSmArrows = sliderSmArrows === 'true';
	sliderMdArrows = sliderMdArrows === 'true';
	sliderLgArrows = sliderLgArrows === 'true';
	sliderXlArrows = sliderXlArrows === 'true';

	$slider.slick({
		rows: sliderRows,
		slidesToShow: sliderCols,
		slidesToScroll: sliderCols,
		arrows: sliderArrows,
		prevArrow: prevArrow,
		nextArrow: nextArrow,
		appendArrows: $this,
		dots: sliderDots,
		dotsClass: classDots,
		customPaging: function() {
			return '<button type="button" class="' + classDot + '"></button>'
		},
		appendDots: $this,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 575,
				settings: {
					rows: sliderSmRows,
					slidesToShow: sliderSmCols,
					slidesToScroll: sliderSmCols,
					arrows: sliderSmArrows
				}
			},
			{
				breakpoint: 767,
				settings: {
					rows: sliderMdRows,
					slidesToShow: sliderMdCols,
					slidesToScroll: sliderMdCols,
					arrows: sliderMdArrows
				}
			},
			{
				breakpoint: 991,
				settings: {
					rows: sliderLgRows,
					slidesToShow: sliderLgCols,
					slidesToScroll: sliderLgCols,
					arrows: sliderLgArrows
				}
			},
			{
				breakpoint: 1199,
				settings: {
					rows: sliderXlRows,
					slidesToShow: sliderXlCols,
					slidesToScroll: sliderXlCols,
					arrows: sliderXlArrows
				}
			}
		]
	});
});