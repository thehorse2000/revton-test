/**
 * @vendor      Revton
 * @theme       Revton_Amr
 * @copyright   Copyright (c) 2023 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

require([
    'jquery',
    'mage/cookies', 'openContent'
], function ($) {
    //Polyfills
    if (!Object.entries) {
        Object.entries = function (obj) {
            var ownProps = Object.keys(obj),
                i = ownProps.length,
                resArray = new Array(i);
            while (i--) {
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
            }

            return resArray;
        };
    }

    //Theme
    var checkSourcecode = function () {
        jQuery.ajax({
            url: "/sourcecode/index/index",
            cache: false
        });
    };

    var setRefererUrl = function () {
        var refererUrl = document.referrer;

        if (refererUrl) {
            var countryCasualHost = refererUrl.indexOf(document.domain);

            if (countryCasualHost < 0) {
                $.cookie('referer_url', document.referrer);
            }
        } else {
            $.cookie('referer_url', ' ');
        }
    };

    var getUrlParameter = function getUrlParameter(sParam) {
        var sURLVariables = decodeURIComponent(window.location.search.substring(1)).split('&'), sParameterName;

        for (var i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var validateDotmailerForm = function (frm) {
        var emailAddress = frm.Email.value;
        var errorString = '';

        if (emailAddress == '' || emailAddress.indexOf('@') == -1) {
            errorString = 'Please enter your email address';
        }

        var els = frm.getElementsByTagName('input');

        for (var i = 0; i < els.length; i++) {
            if (els[i].className == 'text' || els[i].className == 'date' || els[i].className == 'number') {
                if (els[i].value == '') {
                    errorString = 'Please complete all required fields.';
                }
            } else if (els[i].className == 'radio') {
                var toCheck = document.getElementsByName(els[i].name);
                var radioChecked = false;

                for (var j = 0; j < toCheck.length; j++) {
                    if (toCheck[j].name == els[i].name && toCheck[j].checked) {
                        radioChecked = true;
                    }
                }

                if (!radioChecked) {
                    errorString = 'Please complete all required fields.';
                }
            }
        }

        return errorString;
    };

    var showPopup = function ($elem) {
        $elem.show();

        if ($('.overlay').length === 0) {
            $elem.after('<div class="overlay"></div>')
        }

        $('.overlay').show();
    };

    var mobileBp = 1025;

    $(document).ready(function () {
        $('#search_mini_form').submit(function () {
            var $search = $('#search');
            $search.val($search.val().replace('<', '').replace('>', ''));
        });

        if (getUrlParameter('result') === 'success') {
            $('.dotmailer-form').hide();
            $('.dotmailer-success').show();
            showPopup($('.timeout'));
        } else {
            setTimeout(function () {
                showPopup($('.timeout'));
            }, 3000);
        }

        /* Main navigation */
        const navMenu = $('#navigation');
        const openMenuButton = $('.action.menu-toggle');
        openMenuButton.attr('aria-expanded', 'false');
        if (window.innerWidth < 1024) {
            navMenu.attr(
                {
                    'role': 'dialog',
                    'aria-modal': 'true',
                    'aria-label': 'menu',
                    'aria-hidden': '',
                });
        }

        $('.menu-toggle').on('click', function (event) {
            if ($('body, html').hasClass('menu-open')) {
                $('body, html').toggleClass('menu-open');
                $('.level-top.parent.open-mobile')?.removeClass('open-mobile');
                navMenu.removeClass('open-menu-mobile');
                navMenu.find('.main-menu').removeClass('open-menu-mobile');
                openMenuButton.attr('aria-expanded', 'false');
                openMenuButton.focus();
                setTimeout(function () {
                    navMenu.attr('aria-hidden', 'true');
                }, 400);
            } else {
                navMenu.attr('aria-hidden', 'false');
                openMenuButton.attr('aria-expanded', 'true')
                setTimeout(function () {
                    $('body, html').toggleClass('menu-open');
                }, 20);
                $('.menu-close-button').focus();
            }
        });

        $('.page-main, .block-search').on('click', function (e) {
            if ($('body').hasClass('menu-open') && $(window).width() < mobileBp) {
                e.preventDefault();
                var $link = $('.main-menu a.level-top');
                $link.parent('.level-top').removeClass('open-mobile');
                $link.parents('.main-menu').removeClass('open-menu-mobile');
                $('.navigaton').removeClass('open-menu-mobile');
                $('body, html').removeClass('menu-open');
            }
        });

        $('.main-menu a.level-top').on('click', function (e) {
            if ($(window).width() < mobileBp) {
                e.preventDefault();

                if ($(this).parent('.parent-node').length) {
                    $(this).closest('li.level-top').removeClass('open-mobile');
                } else {
                    $(this).parent('.level-top').addClass('open-mobile');
                }

                $(this).parents('.main-menu').toggleClass('open-menu-mobile');
                $('.navigation').toggleClass('open-menu-mobile');
            }
        });

        if ($('.category-cms').length && $('.category-cms .breadcrumbs').length > 1) {
            $('.category-cms .breadcrumbs:first').remove();
        }

        var url = window.location.href;
        var sourceCode = window.valuesConfig;

        checkSourcecode();
        setRefererUrl();

        $('.cms-teak-care a.learnmore, .cms-outdoor-furniture-covers a.learnmore').click(function () {
            var $div = $($(this).attr('href'));

            $div.show()

            if ($('.overlay').length === 0) {
                $div.after('<div class="overlay"></div>')
            }

            $div.find('.content').css('height', $div.find('.learn-image img').height());

            $('.overlay').show();
        });

        $(window).resize(function () {
            $('.sealer-popup').each(function () {
                var self = $(this);

                self.find('.content').css('height', self.find('.learn-image img').height());
            })

            if (window.innerWidth < 1025) {
                $('#navigation').attr('aria-hidden', 'true');
            } else {
                $('#navigation').removeAttr('aria-hidden');
            }
        });

        $('.cms-teak-care .page-wrapper, .cms-outdoor-furniture-covers .page-wrapper, .cms-our-teak-quality-difference .page-wrapper').click(function (event) {
            if ($(event.target).is('.overlay') || $(event.target).is('.action-close')) {
                $('.sealer-popup').each(function () {
                    this.style.display = 'none';
                });
                $('.overlay').each(function () {
                    this.style.display = 'none';
                });
            }
        });

        $('.payment-method input').click(function () {
            if ($(".payment-method").hasClass('_active')) {
                $(".payment-method-content").show();
            } else {
                $(".payment-method-content").hide();
            }
        });

        $('.dotmailer-form').submit(function (e) {
            var validation = validateDotmailerForm(this);

            if (validation.length > 0) {
                alert(validation);
                return false;
            }

            window.liQ = window.liQ || [];
            window.liQ.push({ "event": "conversion", "email": $('.dotmailer-form input[name="Email"]').val() });
        });

        /**
         * Quantity selectors functionality to change quantity with plus and minus buttons
         */
        $('.control .plus, .control .minus').on('click', function (event) {
            var $inputSelector = $(this).siblings('.input-text');
            var options = {
                currentVal: parseInt($inputSelector.val()),
                lessClass: 'minus',
                moreClass: 'plus',
                min: 1,
                max: 10000,
                step: 1
            };
            var result;

            if ($(this).hasClass(options.lessClass)) {
                result = options.currentVal - options.step;
            }
            if ($(this).hasClass(options.moreClass)) {
                result = options.currentVal + options.step;
            }

            if (result >= options.min && result <= options.max) {
                $inputSelector.val(result);
            }
        });

        const firstFocusableElement = $('.first-element');
        const lastFocusableElement = $('.last-element');
        navMenu.keydown(function (event) {
            if (event.target.classList.contains('first-element') && event.key === 'Tab' && event.shiftKey) {
                event.preventDefault();
                lastFocusableElement.focus();
            } else if (event.target.classList.contains('last-element') && event.key === 'Tab' && !event.shiftKey) {
                event.preventDefault();
                firstFocusableElement.focus();
            } else if (event.keyCode === 27) { // escape key
                event.preventDefault()

                if (window.innerWidth < 1025) {
                    $('body, html').toggleClass('menu-open');
                    $('.level-top.parent.open-mobile')?.removeClass('open-mobile');
                    navMenu.removeClass('open-menu-mobile');
                    navMenu.find('.main-menu').removeClass('open-menu-mobile');
                    openMenuButton.attr('aria-expanded', 'false');
                    openMenuButton.focus();
                    setTimeout(function () {
                        navMenu.attr('aria-hidden', 'true');
                    }, 400);
                } else {
                    $(navMenu).find('.parent.touched').removeClass('touched');
                    $(navMenu).find('.submenu.touchedStyle').removeClass('touchedStyle');
                }
            }
        })

        $(".navigation .main-menu .level0 .submenu .level1 a .limiter-options .sorter-options").each(function () {
            $(this).on('touchstart', function () {
                $(this).click();
            })
        });

        if (window.innerWidth >= 1025) {
            let touchstartCount = 0;
            $('.level0.level-top.parent').on('touchstart', function (e) {
                e.preventDefault();
                if (!e.target.closest('.level-top.parent').classList.contains('touched')) {
                    Array.from(document.querySelectorAll('.level0.level-top.parent')).forEach((elem, j) => {
                        if ($(this).index() !== j) {
                            $('.touched > .submenu').removeClass('touchedStyle');
                            elem.classList.remove('touched')
                        }
                    })

                    // Close customer menu and minicart
                    $('.minicart-wrapper.active')?.trigger('click');
                    $('#customer-dropdown-trigger[aria-expanded=true]')?.click();
                } else {
                    if (typeof $(e.target).closest('a').attr('href') != 'undefined') {
                        window.location.href = $(e.target).closest('a').attr('href');
                    }
                }
                e.target.closest('.level-top.parent').classList.toggle('touched');
                $('.touched > .submenu').addClass('touchedStyle');
                touchstartCount = 0;
                touchstartCount++
            });

            $('.level0').on('click', function (event) {
                if (matchMedia('(pointer:fine)').matches) {
                    if (typeof $(event.target).closest('a').attr('href') != 'undefined') {
                        window.location.href = $(event.target).closest('a').attr('href');
                    }
                }
                touchstartCount++
            });

            $('.level0 .submenu li').on('click touchend', function (event) {
                if (touchstartCount == 1 && event.type === 'touchend' && typeof $(event.target).closest('a').attr('href') != 'undefined') {
                    window.location.href = $(event.target).closest('a').attr('href');
                }

                if (touchstartCount == 0 && event.type === 'click' && typeof $(event.target).closest('a').attr('href') != 'undefined') {
                    window.location.href = $(event.target).closest('a').attr('href');
                }
                touchstartCount = 0;
            });

            // Close menu on click outside
            $(document).on('touchend', function (event) {
                if (!$(event.target).parents('#navigation').length) {
                    $(navMenu).find('.parent.touched').removeClass('touched');
                    $(navMenu).find('.submenu.touchedStyle').removeClass('touchedStyle');
                }
            })
        }

        $('.menu-toggle').on("click", function () {
            let element = $('#navigation');
            let currentLearnMoreElement = this;

            element.on('keyup', function (e) {
                let tabbable = $(this).find('select, input, textarea, button, a').filter(function () {
                    return !($(this).css('visibility') === 'hidden' || !$(this).is(':visible'));
                });
                let firstTabbable = tabbable.first();
                let lastTabbable = tabbable.last();
                /*redirect last tab to first input*/
                lastTabbable.on('keydown', function (e) {
                    if ((e.which === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        firstTabbable.focus();
                    }
                });

                /*redirect first shift+tab to last input*/
                firstTabbable.on('keydown', function (e) {
                    if ((e.which === 9 && e.shiftKey)) {
                        e.preventDefault();
                        lastTabbable.focus();
                    }
                });

                $('.level-top.parent-node').on('keyup', function (e) {
                    if (e.key === 'Enter') {
                        $(this).siblings('a.level-top').focus();
                    }
                })
            });

            $('.close-menu-icon').on('click', function () {
                currentLearnMoreElement.focus();
            });

            // Close menu on click outside
            $(document).on('touchend', function (event) {
                if (!$(event.target).parents('#navigation').length && !$(event.target).parents('.menu-toggle').length) {
                    $('body, html').removeClass('menu-open');
                    $('.level-top.parent.open-mobile')?.removeClass('open-mobile');
                    navMenu.removeClass('open-menu-mobile');
                    navMenu.find('.main-menu').removeClass('open-menu-mobile');
                    openMenuButton.attr('aria-expanded', 'false');
                    setTimeout(function () {
                        navMenu.attr('aria-hidden', 'true');
                    }, 400);
                }
            })
        });

        $('.page-header').on('keyup', function (e) {
            if ($('.block-search').hasClass('searchfield_active')) {
                let tabbable = $(this).find('select, input, textarea, button, a, img').filter(':visible');
                let lastTabbable = tabbable.last();
                if (lastTabbable.is(':focus')) {
                    lastTabbable.on('keydown', function (e) {
                        $('.block-search').removeClass('searchfield_active');
                        $('#page-overlay').removeClass('page-overlay');
                        $('#html-body').removeClass('disable-scroll');
                        $('.kuQuickSearchAutoCompleteLayout').attr('style', 'display:none !important');
                    });
                }
            }
        });

        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            $(document).on('keydown', function () {
                $(':focusable').addClass('focusable-in-old-browser');
            });
        }

        // Check if the user agent is Safari on mobile
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {
            $(document).on('focusin', '.menu-toggle,#emailpopup,#passpopup,#btn-minicart-close', function () {
                $(this).css('outline', 'none');
            });
        }

        $('.sorter-options,.limiter-options').on('mousedown', function () {
            $(this).addClass('keyboard-focus');
        });

        $('.sorter-options,.limiter-options').on('keydown', function (e) {
            if (e.key === 'Tab' && $(this).hasClass('keyboard-focus')) {
                $(this).removeClass('keyboard-focus');
            }
        });
    });
});
