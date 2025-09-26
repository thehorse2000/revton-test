require(['jquery'], function ($) {
    $(document).ready(function () {
        let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints || navigator.maxTouchPoints;
        let previousElement = null;
        $('.main-menu a[href]').click(function (e) {
            if ($(window).width() >= 1025 && supportsTouch && this !== previousElement) {
                e.preventDefault();
                previousElement = this;
            }
        });

        $('.main-menu .level1').click(function (e) {
            if ($(window).width() <= 1024 && supportsTouch) {
                window.location.href = $(e.target).closest('a').attr('href');
            }
        });

        $(document).click(function (e) {
            if (!$('.level-top').is(e.target) && $('.level-top').has(e.target).length === 0 && previousElement !== null) {
                previousElement = null;
            }
        });
    });
});
