/**
 * Sliding animation for Cleaning Teak Furniture CMS page sections
 *
 * @vendor      Revton
 * @theme       Revton_Amr
 * @copyright   Copyright (c) 2017 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

(function () {
    const mainContent = document.getElementById('maincontent');
    const headerOffset = mainContent.getBoundingClientRect().top + window.scrollY;
    for (const elem of document.getElementsByClassName('headings')) {
        elem.style.scrollMarginTop = (headerOffset) + 'px';
    }
})();

require([
    'jquery',
    'mage/translate'
], function ($) {

    var container = $('#open-content'),
        hash = location.href.split("#")[1],
        headings = container.find('.section .headings'),
        controlExpand = container.find('.controls .expand'),
        articleNavLinks = $('.article-nav-link');

    if (hash) {
        container.find('.section .headings#' + hash)
            .first()
            .addClass('active')
            .siblings('.content')
            .show();

        controlExpand.text($.mage.__('- Close all')).addClass('active');
    }

    articleNavLinks.click(function () {
        const linkHref = $(this).attr('href');

        if (linkHref) {
            const linkHash = linkHref.split("#")[1];

            if (linkHash) {
                container.find('.section .headings#' + linkHash)
                    .first()
                    .addClass('active')
                    .siblings('.content')
                    .show();
            }
        }
    })
    controlExpand.click(function () {
        if ($(this).hasClass('active')) {
            $(this).text($.mage.__('+ Expand all')).removeClass('active');
            $(this).attr('aria-expanded', 'false');
            $(headings).attr('aria-expanded', 'false');
            $(headings).removeClass('active').siblings('.content').slideUp();
        } else {
            $(this).text($.mage.__('- Close all')).addClass('active');
            $(this).attr('aria-expanded', 'true');
            $(headings).attr('aria-expanded', 'true');
            $(headings).addClass('active').siblings('.content').slideDown();
        }
    });

    headings.click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').siblings('.content').slideToggle()
            $(this).attr('aria-expanded', 'false');
        } else {
            $(this).addClass('active').siblings('.content').slideToggle()
            $(this).attr('aria-expanded', 'true');
        }

        var activeTabs = 0;
        $(headings).each(function () {
            activeTabs += $(this).hasClass('active') ? 1 : 0;
        });

        if (activeTabs > 1) {
            controlExpand.text($.mage.__('- Close all')).addClass('active');
        } else {
            controlExpand.text($.mage.__('+ Expand all')).removeClass('active');
        }
    })
});
