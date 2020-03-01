var
	classBlock = 'banner',
	$blocks = $('.' + classBlock),
	mobilePoint = 575;

$blocks.each(function() {
	var
		$this = $(this),
		$img = $this.find('.' + classBlock + '__img'),
		imageUrlMobileFromElem = $img.attr('data-mobile-image'),
		imageUrlDesktopFromElem = $img.attr('data-desktop-image'),
		imageUrlMobile = imageUrlMobileFromElem || imageUrlDesktopFromElem,
		imageUrlDesktop = imageUrlDesktopFromElem || imageUrlMobileFromElem,
		currentImg = isMobile() ? imageUrlMobile : imageUrlDesktop;

	setImg(currentImg, $img);

	$(window).on('resize', function() {
		if (isMobile() && currentImg !== imageUrlMobile) {
			setImg(imageUrlMobile, $img);
			currentImg = imageUrlMobile;
		} else if (!isMobile() && currentImg !== imageUrlDesktop) {
			setImg(imageUrlDesktop, $img);
			currentImg = imageUrlDesktop;
		}
	});
});

function isMobile() {
	return window.innerWidth <= mobilePoint;
}

function setImg(url, $elem) {
	$elem.css({
		backgroundImage: 'url(' + url + ')'
	});
}