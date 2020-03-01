// Для ссылок с href='#' и наличием только атрибутов class, href и style отключается стандартное поведение ссылки
$(document).on('click', 'a', function(e) {
	var $this = $(this);

	if ($this.attr('href') !== '#') return;

	if (
		(this.attributes.length < 4 && $this.attr('class') && $this.attr('href') && $this.attr('style')) ||
		(this.attributes.length < 4 && $this.attr('class') && $this.attr('href') && $this.attr('tabindex')) ||
		(this.attributes.length < 5 && $this.attr('class') && $this.attr('href') && $this.attr('target')) && $this.attr('rel') ||
		(this.attributes.length < 3 && $this.attr('class') && $this.attr('href')) ||
		(this.attributes.length < 2 && !$this.attr('class') && $this.attr('href'))
	) {
		e.preventDefault();
	}
});

svg4everybody();