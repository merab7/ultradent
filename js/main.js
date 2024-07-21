/* -------------------------------------------------------
 
 Theme Name: Crafto - The Multipurpose HTML5 Template
 Theme URL: https://craftohtml.themezaa.com/
 Description: Elevate your online presence with Crafto - a modern, versatile, multipurpose Bootstrap 5 responsive HTML5, SCSS template using highly creative 48+ ready demos.
 Author: ThemeZaa - https://www.themezaa.com/
 Author ThemeForest URL: https://themeforest.net/user/themezaa
 Copyright(c) 2024 themezaa.com
 Version: 1.0
 
 ------------------------------------------------------- */

(function ($) {


    /* ===================================
     Box shadow animation
     ====================================== */

    $(window).scroll(function (event) {
        $('[data-shadow-animation="true"]').each(function () {
            addBoxAnimationClass($(this))
        });
    });
    $('[data-shadow-animation="true"]').removeClass('shadow-in');
    $('[data-shadow-animation="true"]').each(function () {
        addBoxAnimationClass($(this))
    });
    function addBoxAnimationClass(boxObj) {
        if (boxObj.length) {
            var w = boxObj.width();
            var h = boxObj.height();
            var offset = boxObj.offset();
            var right = offset.left + parseInt(boxObj.width());
            var bottom = offset.top + parseInt(boxObj.height());
            var visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - offset.left, right - window.pageXOffset));
            var visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - offset.top, bottom - window.pageYOffset));
            var visible = visibleX * visibleY / (w * h);
            if (visible >= 0.5) {
                if (typeof boxObj.attr('data-animation-delay') !== 'undefined' && boxObj.attr('data-animation-delay') > 10) {
                    setTimeout(function () {
                        boxObj.addClass('shadow-in');
                    }, boxObj.attr('data-animation-delay'));
                } else {
                    boxObj.addClass('shadow-in');
                }
            }
        }
    }

    /* ===================================
     Skrollr animation
     ====================================== */

    var skroller;
    function initSkrollr() {
        if (typeof skrollr !== 'undefined' && typeof skrollr !== null) {
            skroller = skrollr.init({
                'forceHeight': false,
                'smoothScrollingDuration': 1000,
                'mobileCheck': function () {
                    return false;
                }
            });
        }
    }

    function reInitSkrollr() {
        destroySkrollr();
        if ($(window).width() >= 1200) {
            setTimeout(function () {
                initSkrollr();
            }, 1000);
        }
    }

    function destroySkrollr() {
        if (typeof skroller !== typeof undefined && skroller != 'undefined') {
            skroller.destroy();
        }
    }

    if ($(window).width() >= 1200) {
        initSkrollr();
    }






    /* ===================================
     Image tilt 3d effect using atropos
     ====================================== */

    var atroposItems = document.querySelectorAll('[data-atropos]')
    function initAtropos() {
        if (atroposItems.length && $(window).width() > 1199) {
            atroposItems.forEach(function (atroposItem) {
                var myAtropos = Atropos({
                    el: atroposItem
                });
            });
        }
    }
    if (typeof Atropos !== 'undefined' && Atropos !== null) {
        initAtropos();
    }
    function destroyAtropos() {
        if (atroposItems.length && $(window).width() > 1199) {
            atroposItems.forEach(function (atroposItem) {
                if (atroposItem.__atropos__) {
                    atroposItem.__atropos__.destroy();
                }
            });
        }
    }



    /* ===================================
     Infinite looping animation
     ====================================== */

    const wrapperEl = document.querySelector('.looping-wrapper') || false;
    const numberOfEls = 100;
    const duration = 6000;
    const delay = duration / numberOfEls;

    let tl = anime.timeline({
        duration: delay,
        complete: function () {
            tl.restart();
        }
    });

    function createEl(i) {
        let el = document.createElement('div');
        const rotate = (360 / numberOfEls) * i;
        const translateY = -50;
        el.classList.add('el');
        el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
        tl.add({
            begin: function () {
                anime({
                    targets: el,
                    rotate: [rotate + 'deg', rotate + 10 + 'deg'],
                    translateY: [translateY + '%', translateY + 10 + '%'],
                    scale: [1, 1.25],
                    easing: 'easeInOutSine',
                    direction: 'alternate',
                    duration: duration * .1
                });
            }
        });
        if (wrapperEl)
            wrapperEl.appendChild(el);
    }

    for (let i = 0; i < numberOfEls; i++)
        createEl(i);

    /* ===================================
     Background color change on scroll - Adaptive Backgrounds
     ====================================== */
    window.sections = [...document.querySelectorAll('[data-background]')];
    window.lastScrollTop = window.pageYOffset;
    let activeSection;

    onScroll();
    window.addEventListener('scroll', onScroll);

    function onScroll() {
        if (window.sections.length > 0) {
            const section = window.sections
                    .map(section => {
                        const el = section;
                        const rect = el.getBoundingClientRect();
                        return {el, rect};
                    })
                    .find(section => section.rect.bottom >= (window.innerHeight * 0.5));
            if (section && section.el !== activeSection) {
                activeSection = section.el;
                const sectionBg = activeSection.getAttribute('data-background');
                activeSection.closest(".page-content").querySelectorAll("[data-background]").forEach(item => item.classList.remove("active"))
                activeSection.classList.add("active")
                if (typeof gsap !== "undefined") {
                    gsap.to(activeSection.closest(".page-content"), {backgroundColor: sectionBg})
                }
            }
        }
    }



    /* ===================================
     Back to top scroll
     ====================================== */
    $(document).on('click', '.scroll-top', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    function scrollIndicator() {
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 200) {
            $('.scroll-progress').addClass('visible');
        } else {
            $('.scroll-progress').removeClass('visible');
        }

        var scrollHeight = document.documentElement.scrollHeight;
        var windowHeight = document.documentElement.clientHeight;
        var maxScrollTop = scrollHeight - windowHeight;
        var scrollTop = document.documentElement.scrollTop;
        var scrollPercentage = (scrollTop / (maxScrollTop - 200)) * 100;

        $('.scroll-point').css('height', Math.min(scrollPercentage, 100) + '%');

        /***** Theme demos button scroll to show *****/
        var scrollPos = $(window).scrollTop();
        if (scrollPos > 150) {
            $('.theme-demos').fadeIn(600);
        }
    }
    $(window).scroll(function () {
        scrollIndicator();
    });

    /* ===================================
     Trusted customers
     ====================================== */

    $('.bg-more-trusted .btn').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().addClass('show-trusted-customers');
    });


    /* ===================================
     Theme demo panel
     ====================================== */



})(jQuery);
