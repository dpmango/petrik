window.onbeforeunload = function(){
  console.log('onbeforeunload')
  window.scrollTo(0,0)
}

$(window).on("load", function(){
  $.ready.then(function(){
    window.onLoadTrigger()
  });
})

function onYouTubePlayerAPIReady(){
  var $youtubeVideos = $('[js-video][data-provider="youtube"]')
  $youtubeVideos.each(function(i, video){
    var iframe = $(video).find('iframe');
    new YT.Player(iframe[0], {
      events: {
        'onReady': window.onYoutubeTrigger
      }
    });
  })
}

$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);
  var lastScrollBodyLock = 0;
  var lastScrollDir = 0;

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing

  var scroll = {
    y: _window.scrollTop(),
    direction: undefined,
    blocked: false
  }

  var header = {
    container: undefined,
    bottomPoint: undefined
  }

  var browser = {
    isRetinaDisplay: isRetinaDisplay(),
    isIe: msieversion(),
    isMobile: isMobile()
  }

  var sliders = [] // collection of all sliders
  var lazyCache = []

  ////////////
  // LIST OF FUNCTIONS
  ////////////

  // some functions should be called once only
  legacySupport();

  // The new container has been loaded and injected in the wrapper.
  function pageReady(fromPjax){
    getHeaderParams();
    updateHeaderActiveClass();
    closeMobileMenu(true);
    getScalerResponsive();
    setScalerResponsive();
    initVideos();
    initSliders();
    initPopups();
  }

  // The transition has just finished and the old Container has been removed from the DOM.
  function pageCompleated(fromPjax){
    setProjectColor();
    setImageMargin();
    setFlowClasses();
    initMasonry();
    if ( fromPjax ){
      window.onLoadTrigger()
    }
  }


  // scroll/resize listener
  _window.on('scroll', getWindowScroll);
  _window.on('scroll', scrollHeader);
  _window.on('resize', debounce(getHeaderParams, 100))
  _window.on('resize', debounce(setScalerResponsive, 100))
  _window.on('resize', debounce(setBreakpoint, 200))
  _window.on('resize', debounce(setImageMargin, 100))

  // this is a master function which should have all functionality
  pageReady();
  pageCompleated();

  // some plugins work best with onload triggers
  window.onLoadTrigger = function onLoad(){
    initLazyLoad();
    preloaderDone();
  }

  //////////
  // COMMON
  //////////

  // detectors
  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true
    } else {
      return false
    }
  }

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });

    if ( msieversion() ){
      $('body').addClass('is-ie');
    }

    if ( isMobile() ){
      $('body').addClass('is-mobile');
    }

  }

  // preloader
  function preloaderDone(){
    $('#barba-wrapper').addClass('is-preloaded');
  }

  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
      e.preventDefault();
    })
    .on('click', '[js-link]', function(e){
      var dataHref = $(this).data('href');
      if (dataHref && dataHref !== "#"){
        e.preventDefault();
        e.stopPropagation();
        Barba.Pjax.goTo(dataHref);
      }
    })
    // prevent going the same link (as barba is connected)
    .on('click', 'a, [js-link]', function(e){
      var href = $(this).data('href') || $(this).attr('href');
      var path = window.location.pathname

      if ( href === path.slice(1, path.length) ){
        e.preventDefault();
        e.stopPropagation();
      }
    })
    .on('click', '[js-show-grid]', function(){
      $(this).toggleClass('is-active')
      $('.demo-grid').fadeToggle()
    })

  // just store global variable with scroll distance
  function getWindowScroll(){
    if ( scroll.blocked ) return

    var wScroll = _window.scrollTop()
    scroll.y = wScroll
    scroll.direction = wScroll > lastScrollDir ? "down" : "up"

    lastScrollDir = wScroll <= 0 ? 0 : wScroll;
  }


  // HEADER SCROLL
  function getHeaderParams(){
    var $header = $('.header')
    var headerAbs = 35
    var headerHeight = $header.outerHeight() + headerAbs

    header = {
      container: $header,
      bottomPoint: headerHeight
    }
  }

  function scrollHeader(){
    if ( header.container !== undefined ){
      var fixedClass = 'is-fixed';
      var visibleClass = 'is-fixed-visible';

      if ( scroll.blocked ) return

      if ( scroll.y > header.bottomPoint ){
        header.container.addClass(fixedClass);

        if ( (scroll.y > header.bottomPoint * 2) && scroll.direction === "up" ){
          header.container.addClass(visibleClass);
        } else {
          header.container.removeClass(visibleClass);
        }
      } else {
        // emulate position absolute by giving negative transform on initial scroll
        var normalized = Math.floor(normalize(scroll.y, header.bottomPoint, 0, 0, 100))
        var reverseNormalized = (100 - normalized) * -1
        reverseNormalized = reverseNormalized * 1.2 // a bit faster transition

        header.container.css({
          "transform": 'translate3d(0,'+ reverseNormalized +'%,0)',
        })

        header.container.removeClass(fixedClass);
      }
    }

  }

  ////////////////////
  // HAMBURGER TOGGLER
  ////////////////////
  // disable / enable scroll by setting negative margin to page-content eq. to prev. scroll
  // this methods helps to prevent page-jumping on setting body height to 100%
  function disableScroll() {
    lastScrollBodyLock = _window.scrollTop();
    scroll.blocked = true
    $('.page__content').css({
      'margin-top': '-' + lastScrollBodyLock + 'px'
    });
    $('body').addClass('body-lock');
  }

  function enableScroll(isOnload) {
    scroll.blocked = false
    scroll.direction = "up" // keeps header
    $('.page__content').css({
      'margin-top': '-' + 0 + 'px'
    });
    $('body').removeClass('body-lock');
    if ( !isOnload ){
      _window.scrollTop(lastScrollBodyLock)
      lastScrollBodyLock = 0;
    }
  }

  function blockScroll(isOnload) {
    if ( isOnload ){
      enableScroll(isOnload)
      return
    }
    if ($('[js-hamburger]').is('.is-active')) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  _document.on('click', '[js-hamburger]', function(){
    $(this).toggleClass('is-active');
    $('.mobile-navi').toggleClass('is-active');

    blockScroll();
  });

  function closeMobileMenu(isOnload){
    $('[js-hamburger]').removeClass('is-active');
    $('.mobile-navi').removeClass('is-active');

    blockScroll(isOnload);
  }

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  function updateHeaderActiveClass(){
    $('.header__menu li').each(function(i,val){
      if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }



  /***************
  * PAGE SPECIFIC *
  ***************/

  function setProjectColor(fromPjax){
    var $nextSectionTransition
    var $project = $('[js-set-project-colors]');
    if ( fromPjax ){
      $nextSectionTransition = $('.next').first();
      $project = $project.last()
    }

    // clean up prev styles
    if ( $('#project-styles').length > 0 ){
      $('#project-styles').remove();
    }

    if ( $project.length > 0 ){
      var colorBg = $project.data('bg-color');
      var colorFont = $project.data('font-color');
      var colorFont50 = rgba(colorFont, .5);
      var colorBg99 = rgba(colorBg, .99)
      var colorBg01 = rgba(colorBg, .01)

      // collect & build styles
      var styles = ""
      var colorBg_Background = "body, .mobile-navi, .project"
      var colorFont_Background = ".hamburger span, .swiper-bullets-lines.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet:after"
      // var colorFontHover_Background = ".hamburger:hover span"
      var colorFont_Color = "body, .swiper-nav, .c-gray, .swiper-bullets-text .swiper-bullet.swiper-pagination-bullet-active:hover"
      var colorFontHover_Color = ".header__menu a:hover, .swiper-nav:hover, .swiper-bullets-text .swiper-bullet:hover, .mobile-navi__menu a:hover, .mobile-navi__cta a:hover"
      var colorFont_Border = ".swiper-bullets-text .swiper-bullet.swiper-pagination-bullet-active"
      var colorFontHover_Border = ""

      styles += colorBg_Background + "{background-color:"+colorBg+"}"
      styles += colorFont_Background + "{background-color: "+colorFont+"}"
      // styles += colorFontHover_Background + "{background-color: "+colorFont50+"}"
      styles += colorFont_Color + "{color: "+colorFont+"}"
      styles += colorFontHover_Color + "{color:"+colorFont50+"}"
      styles += colorFont_Border + "{border-color: "+colorFont+"}"
      styles += colorFontHover_Border + "{border-color:"+colorFont50+"}"

      // manually set selection style
      styles += "::-moz-selection {background: "+colorFont+"; color: "+colorBg+" } ::selection {background: "+colorFont+"; color: "+colorBg+" }"

      // manually set linear-gradients
      styles += "@media only screen and (max-width: 767px) {.swiper-bullets-text.swiper-container-horizontal .swiper-pagination-container:before {background: -webkit-gradient(linear, left top, right top, from(" + colorBg99 + "), to(" + colorBg01 + "));background: -webkit-linear-gradient(left, " + colorBg99 + ", " + colorBg01 + ");background: -o-linear-gradient(left, " + colorBg99 + ", " + colorBg01 + ");background: linear-gradient(to right, " + colorBg99 + ", " + colorBg01 + ");}.swiper-bullets-text.swiper-container-horizontal .swiper-pagination-container:after {background: -webkit-gradient(linear, right top, left top, from(" + colorBg99 + "), to(" + colorBg01 + "));background: -webkit-linear-gradient(right, " + colorBg99 + ", " + colorBg01 + ");background: -o-linear-gradient(right, " + colorBg99 + ", " + colorBg01 + ");background: linear-gradient(to left, " + colorBg99 + ", " + colorBg01 + ");}}"

      if ( fromPjax ){
        // for project transition we also need to color $nextSection texts
        $nextSectionTransition.css({'color': colorFont})
        // nevermind about hover styles as it's pointer-events none
      }
      // append styles
      var stylesheet = $("<style type='text/css' id='project-styles'>"+styles+"</style>")
      stylesheet.appendTo("head");
    }
  }

  // set image margin
  function setImageMargin(){
    var $images = $('[js-set-image-margin]');

    if ( $images.length > 0 ){
      $images.each(function(i, image){
        var $image = $(image);

        var imageHeight = $image.outerHeight()

        $image.css({
          'margin-bottom': '-' + Math.floor(imageHeight/1.5) + 'px'
        })
      })
    }
  }

  // set flow classes
  function setFlowClasses(){
    var $cards = $('.c-flow');
    var singleMediaClass = "c-flow__message--media-single";
    var gluedClass ="c-flow--glued";

    if ( $cards.length > 0 ){
      $cards.each(function(i, card){
        var $card = $(card);
        var $messages = $card.find('.c-flow__message');
        var $contents = $card.find('.c-flow__content');

        // add class when there is an single media file
        if ( $messages.length === 1 && $messages.is('.c-flow__message--media')){
          $messages.addClass(singleMediaClass)
        }

        // detect glued messages
        if ( $contents.length > 1 ){
          $card.addClass(gluedClass)
        }

      })
    }
  }

  ///////////////
  // resize scaler
  ///////////////
  function getScalerResponsive(){
    var $images = $('[js-scaler-mobile]');
    if ( $images.length > 0 ){
      $images.each(function(i, img){
        var $img = $(img);
        var desktopArPx = $img.css('padding-bottom');
        var imgWidth = $img.width()
        var dekstopArPercent = (desktopArPx.slice(0, -2) / imgWidth) * 100 + '%';
        // save desktop ar value in %
        $img.attr('data-ar-desktop', dekstopArPercent)
      });
    }
  }

  function setScalerResponsive(){
    var $images = $('[js-scaler-mobile]');

    if ( $images.length > 0 ){
      var wWidth = getWindowWidth();
      $images.each(function(i, img){
        var $img = $(img);
        var mobileAr = $img.data('ar-767');
        var desktopAr = $img.data('ar-desktop')

        if ( mobileAr ){
          if ( wWidth <= 767 ){
            $img.css({'padding-bottom': setAr(mobileAr)})
          } else {
            $img.css({'padding-bottom': setAr(desktopAr)})
          }
        }
      })
    }
  }

  function setAr(ar){
    // please also check _media.sass for possible values
    if ( ar === "1:1" ){
      return "100%"
    } else if ( ar === "16:9" ){
      return "56.25%"
    } else if ( ar === "4:3" ){
      return "75%"
    } else if ( ar === "21:9" ){
      return "42.85%"
    }
    return ar
  }

  ///////////////
  // video module
  ///////////////

  function initVideos(){
    var $videos = $('[js-video]');

    if ( $videos.length > 0 ){
      $videos.each(function(i,video){
        // elements
        var $video = $(video);
        var $placeholder = $video.find('.video__placeholder');
        var $player = $video.find('.video__player');

        // params
        var provider = $video.data('provider');
        var videoSource = $video.data('src');
        var buildIframe
        if ( provider === "vimeo" ){
          buildIframe = '<iframe src="'+videoSource+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        } else if ( provider === "youtube"){
          buildIframe = '<iframe width="100%" height="100%" src="'+videoSource+'?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }

        // action
        $player.html(buildIframe)
      })

      var $youtubeVideos = $('[js-video][data-provider="youtube"]')
      if ( $youtubeVideos.length > 0 ){
        // Inject YouTube API script
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // onYouTubePlayerAPIReady will called async
      }
    }
  }

  // when player instance is created - youtube click handler
  window.onYoutubeTrigger = function onYoutubeReady(e){
    _document
      .on('click', '[js-video][data-provider="youtube"]', function(event){
        playIframeVideo($(this), e.target)
      })
  }

  // vimeo click handler
  _document
    .on('click', '[js-video][data-provider="vimeo"]', function(){
      playIframeVideo($(this))
    })

  function playIframeVideo($this, YTtarget){
    if ( !$this.is('is-playing') ){
      $this.addClass('is-playing');
      if ( !YTtarget ){
        var iframe = $this.find('iframe')
        var player = new Vimeo.Player(iframe);
        player.play()
      } else {
        YTtarget.playVideo()
      }
    }
  }


  // TABS
  _document
    .on('click', '[js-tabs] .tab', function(){
      var $tab = $(this);
      var $siblings = $tab.siblings();

      $siblings.removeClass('is-active')
      $siblings.find('.tab__content').slideUp();

      $tab.toggleClass('is-active');
      $tab.find('.tab__content').slideToggle();
    })

  /**********
  * PLUGINS *
  **********/

  //////////
  // MASONRY
  //////////
  function initMasonry(shouldReload){
    if ( $('[js-masonry]').length > 0 ){
      $('[js-masonry]').each(function(i, masonry){
        var $masonry = $(masonry);
        var $grid;
        var masonryOption = {
          // layoutMode: 'masonry',
          layoutMode: 'packery',
          itemSelector: '[js-masonry-card]',
          percentPosition: true,
          originLeft: true,
          // gutter: 36,
          // masonry: {
          //   columnWidth: '[js-masonry-grid-sizer]'
          // },
          packery: {
            // https://packery.metafizzy.co/options.html
            columnWidth: '[js-masonry-grid-sizer]',
            originLeft: true,
            originTop: true,
            gutter: 0
          }
        }
        $grid = $masonry.isotope(masonryOption);

        // order layout TODO
        function orderItems() {
          var $gridItems = $($grid.isotope('getItemElements'));
            $($gridItems).each(function(i, el) {
              $(el).attr('data-index', i);
          });
        };
        orderItems();

      })
    }
  }

  //////////
  // SLIDERS
  //////////
  function initSliders(){
    var prevResize = getWindowWidth();
    var $sliders = $('[js-slider]');

    if ( $sliders.length > 0 ){
      $sliders.each(function(i,slider){
        var sliderName = $(slider).data('slider-name');
        var paginationType = $(slider).find('.swiper-pagination').data('type');

        function initSwiper(){
          new Swiper('[js-slider][data-slider-name="'+sliderName+'"]', {
            wrapperClass: "swiper-wrapper",
            slideClass: "swiper-slide",
            direction: 'horizontal',
            touchEventsTarget: "wrapper",
            loop: true,
            watchOverflow: false,
            setWrapperSize: false,
            spaceBetween: 0,
            slidesPerView: '1',
            normalizeSlideIndex: true,
            freeMode: false,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            navigation: {
              prevEl: '.swiper-nav--prev[data-for="'+sliderName+'"]',
              nextEl: '.swiper-nav--next[data-for="'+sliderName+'"]',
            },
            pagination: {
              el: '.swiper-pagination[data-for="'+sliderName+'"]',
              type: paginationType,
              clickable: true,
              // renderBullet: // moved to post-init
            },
            on: {
              init: function () {
                sliders.push({
                  name: sliderName,
                  instance: this
                })

                optionsRouter(this);
              },
            },
          })
        }

        // options routes
        function optionsRouter(swiper){
          if ( paginationType === "bullets" ){
            swiper.params.pagination.renderBullet = function (index, className) {
              var $slide = $(this.slides[index + 1])
              var bulletText = $slide.data('bullet-text')
              return '<span data-index="'+index+'" class="'+className+' swiper-bullet p-label"><span>' + bulletText + '</span></span>';
            }

            swiper.params.noSwipingClass = 'swiper-pagination-container'

            swiper.on('slideChange', function () {
              var wWidth = getWindowWidth()

              // center position pagination when scrollable
              // if ( wWidth <= 767 ){
              //   var curSlide = swiper.realIndex
              //   var $scrollable = $(swiper.$el.find('[js-swiper-scrollable]'))
              //
              //   if ( $scrollable.length > 0 ){
              //     var $curPagination = $(swiper.$el.find('.swiper-bullet.swiper-pagination-bullet-active'))
              //     var curPaginationLeft = $curPagination.offset().left
              //     var curPaginationWidth = $curPagination.width();
              //     // console.log(curSlide, curPaginationLeft);
              //
              //     var calcedScrollLeft = curPaginationLeft - (wWidth / 2) + (curPaginationWidth / 2)
              //     $scrollable.scrollLeft(calcedScrollLeft)
              //   }
              // }
            });
            // swiper.update()
          } else if ( paginationType === "fraction" ) {
            swiper.params.breakpoints = {
              767: {
                pagination: {
                  type: 'bullets'
                }
              }
            }
            swiper.update();

            // fraction will change to bullets - resize listeners
            var debounceInstance = debounce(function(){
              var curWidth = getWindowWidth();

              if ( hasCrossedBreakpoint(prevResize, curWidth, 767) ){
                // destroy and init again
                swiper.destroy( true, true );
                window.removeEventListener('resize', debounceInstance, false); // clear debounce
                initSwiper();
              }

              prevResize = curWidth
            }, 100)

            // because swiper don't support reinitialization on resize in responsive (params.breakpoint) mode
            window.addEventListener('resize', debounceInstance, false);
          }
        }

        initSwiper();

      })
    }
  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    var $galleries = $('[js-popup-gallery]')

    if ( $galleries.length > 0 ){

      var closeMarkup = '<button title="%title%" class="mfp-close"><svg class="ico ico-mono-close"><use xlink:href="img/sprite-mono.svg#ico-mono-close"></use></svg></button>'
      var arrowMarkup = '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><svg class="ico ico-mono-nav-arrow-%dir%"><use xlink:href="img/sprite-mono.svg#ico-mono-nav-arrow-%dir%"></use></svg></button>'

      $galleries.each(function(i, gallery){
        var $gallery = $(gallery);
        var delegate = '.gallery-item:not(.swiper-slide-duplicate) a' // default for sliders
        // if ( $gallery.data("delegate") ){
        //   delegate = $gallery.data("delegate")
        // }

        $gallery.magnificPopup({
          delegate: delegate,
          type: 'image',
          tLoading: 'Загрузка #%curr%...',
          mainClass: 'mfp-margin-50 mfp-with-zoom',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: false,
          // closeOnContentClick: true,
          preloader: false,
          midClick: true,
          // removalDelay: 300,
          closeMarkup: closeMarkup,
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1],
            arrowMarkup: arrowMarkup, // markup of an arrow button
            tCounter: '<span class="mfp-counter p-label">%curr% / %total%</span>'
          },
          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            verticalFit: true
          },
          zoom: {
            enabled: true,
            duration: 300, // also to be changed in CSS
            opener: function(element) {
              return element.find('img');
            }
          },
          callbacks: {
            imageLoadComplete: function() {
              var self = this;
              setTimeout(function() {
                self.wrap.addClass('mfp-image-loaded');
              }, 16);
            },
            beforeOpen: function() {
              // startWindowScroll = _window.scrollTop();
              // $('html').addClass('mfp-helper');
              var _self = this
              var $linkedSwiper = this.ev.closest('[js-slider]');

              // store connected swiper
              if ( $linkedSwiper ){
                var linkedSwiperName = $linkedSwiper.data('slider-name')
                $.each(sliders, function(i, swiper){
                  if ( swiper.name === linkedSwiperName ){
                    _self.linkedSwiperIntance = swiper.instance
                  }
                })
              }
            },
            close: function() {
              this.wrap.removeClass('mfp-image-loaded');
              // $('html').removeClass('mfp-helper');
              // _window.scrollTop(startWindowScroll);
            },
            change: function() {
              // when slides are changing - change the swiper
              if ( this.linkedSwiperIntance ){
                this.linkedSwiperIntance.slideToLoop(this.currItem.index)
              }
            },
          }
        });
      })

      // SINGLE GALLERY
      _document.find('[js-popup-media]').magnificPopup({
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'mfp-margin-50 mfp-with-zoom',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        // closeOnContentClick: true,
        preloader: false,
        midClick: true,
        // removalDelay: 300,
        closeMarkup: closeMarkup,
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          verticalFit: true
        },
        zoom: {
          enabled: true,
          duration: 300, // also to be changed in CSS
          opener: function(element) {
            return element.find('img');
          }
        },
        callbacks: {
          imageLoadComplete: function() {
            var self = this;
            setTimeout(function() {
              self.wrap.addClass('mfp-image-loaded');
            }, 16);
          },
          close: function() {
            this.wrap.removeClass('mfp-image-loaded');
          }
        }
      });


    }
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  //////////
  // LAZY LOAD
  //////////
  function initLazyLoad(){

    var $lazy = _document.find('[js-lazy]');
    if ($lazy.length === 0 ) return

    var fadeTimeout = 250

    $lazy.Lazy({
      threshold: 400, //Amount of pixels below the viewport, in which all images gets loaded before the user sees them.
      enableThrottle: true,
      throttle: 100,
      scrollDirection: 'vertical',
      // effect: 'fadeIn',
      // effectTime: fadeTimeout,
      // visibleOnly: true,
      onError: function(element) {
          console.log('error loading ' + element.data('src'));
      },
      beforeLoad: function(element){
        // element.attr('style', '')
      },
      afterLoad: function(element){
        if ( browser.isIe ){
          picturefill(); // ie pollyfil
        }
        animateLazy(element)
      }
    });

  }


  //////////
  // BARBA PJAX
  //////////
  Barba.Pjax.Dom.containerClass = "page";
  var transitionInitElement

  // default super-simple transition
  var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.finish.bind(this));
    },

    finish: function() {
      document.body.scrollTop = 0;
      this.done();
    }
  });

  // project transition
  var ProjectTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.landOut()])
        .then(this.landIn.bind(this));
    },

    landOut: function() {
      var deferred = Barba.Utils.deferred();
      var $oldPage = $(this.oldContainer)
      var $nextSection = $oldPage.find('.next');
      var nextSectionHeight = $nextSection.height()
      var $projectContent = $oldPage.find('.project');
      var $worksContent = $oldPage.find('.works');
      var $header = $('.header');

      // disable scroll
      // disableScroll();

      // hide header
      scroll.blocked = true
      $header.addClass('is-transitioning')

      // fade content when $next text&image animated (css)
      var contentFadeOptions = {
        opacity: 0,
        delay: .35,
        ease: Power0.easeNone,
        onComplete: function() {
          deferred.resolve(); // resolver for FadeIn
        }
      }

      if ( $projectContent.length > 0 ){
        TweenLite.to($projectContent, .15, contentFadeOptions);
      }

      if ( $worksContent.length > 0 ){
        TweenLite.to($worksContent, .15, contentFadeOptions);
      }

      // when clicking back in browser
      if ( $projectContent.length === 0 && $worksContent.length === 0 ){
        this.navBrowserBack = true
        TweenLite.to($oldPage, .5, {
          opacity: 0,
          ease: Power1.easeIn,
          onComplete: function() {
            deferred.resolve();
          }
        });
      }

      return deferred.promise
    },

    _landInBasic: function() {
      document.body.scrollTop = 0;
      this.done();
    },

    landIn: function() {
      var _this = this;
      var $oldPage = $(this.oldContainer)
      var $newPage = $(this.newContainer);
      var $nextSection = $oldPage.find('.next');
      var $oldPageContent = $oldPage.find('.page__content')
      var nextSectionHeight = $nextSection.height()
      var $header = $('.header');

      // nav back in browser animation
      if ( this.navBrowserBack === true ){
        regularPageFadeIn($oldPage, $newPage, _this, $header)
        return
      }

      // When to show page? - save timer for later logic
      var minTransitionMs = 650 // -50ms for edge cases
      var isFirstImageLoaded = false
      var timeStarted = Date.now()

      // mostly css animatge
      // ! DON't USE animations are on 'position: fixed' element
      $nextSection.addClass('is-transitioning')

      // apply new colors
      setProjectColor(true); // pjax flag to get last element

      var pageNextDiffPadding = 170 - 125
      var calcNextTransformY = ($nextSection[0].getBoundingClientRect().top - pageNextDiffPadding) * -1 // what the diff on window
      // var hasBlankSpaceBottom = $nextSection.height > _window.height()
      // if ( hasBlankSpaceBottom ) // don't care, just show first section image

      // animate next section to the TOP of browser
      // by giving .page__content offset
      TweenLite.to($oldPageContent, .2, {
        y: calcNextTransformY,
        delay: .5,
        ease: Power1.easeOut,
        onComplete: showRouter
      });

      // wait till image is pre-loaded
      var targetImage = $newPage.find('[js-lazy]').first();
      if ( targetImage.length === 0 ){
        isFirstImageLoaded = true
      }
      if ( targetImage.attr('src') ){
        // when src is present - assume that image is already loaded
        isFirstImageLoaded = true
        showRouter();
      }
      // otherwise preload data-src and wait
      var targetImageLazyInstance = targetImage.Lazy({
        chainable: false,
        afterLoad: function(element) {
          // setTimeout(function(){
          //   isFirstImageLoaded = true
          //   showRouter()
          // }, 5000) // emulate slow loading (testing)
          animateLazy(element);

          isFirstImageLoaded = true
          showRouter()
        }
      })
      targetImageLazyInstance.force(targetImage);

      function showRouter(){
        if ( ((Date.now() - timeStarted) >= minTransitionMs) && isFirstImageLoaded ){
          showNewPage()
        }
      }

      // just hide/show
      function showNewPage(){
        $header.css({'transition': 'transform .25s ease-in-out'})
        $header.removeClass('is-transitioning')
        setTimeout(function(){
          $header.css('transition', '');
        }, 250)

        setTimeout( function(){

          _window.scrollTop(0) // no need in animation here

          $newPage.css({
            visibility : 'visible'
          });

          $oldPage.hide();

          triggerBody()
          _this.done();
        }, 50)
      }
    }
  });


  // default transition
  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      var deferred = Barba.Utils.deferred();

      TweenLite.to(this.oldContainer, .5, {
        opacity: 0,
        ease: Power1.easeIn,
        onComplete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise
    },

    fadeIn: function() {
      var _this = this;
      var $oldPage = $(this.oldContainer)
      var $newPage = $(this.newContainer);

      regularPageFadeIn($oldPage, $newPage, _this)

    }
  });

  // shared animation functions
  function regularPageFadeIn($oldPage, $newPage, _this, $header){
    if ( $header !== undefined && $header.is('.is-transitioning') ){
      $header.css({'transition': 'transform .25s ease-in-out'})
      $header.removeClass('is-transitioning')
      setTimeout(function(){
        $header.css('transition', '');
      }, 250)
    }

    $oldPage.hide();

    $newPage.css({
      visibility : 'visible',
      opacity : 0
    });

    TweenLite.to(window, .15, {
      scrollTo: {y:0, autoKill:false},
      ease: easingSwing
    });

    TweenLite.to($newPage, .5, {
      opacity: 1,
      ease: Power1.easeOut,
      onComplete: function() {
        triggerBody()
        _this.done();
      }
    });
  }

  // set barba transition
  Barba.Pjax.getTransition = function() {
    if ( transitionInitElement ){
      if ( transitionInitElement.attr('data-transition') ){
        var transition = transitionInitElement.data('transition');
        // console.log(transition)
        if ( transition === "project" ){
          return ProjectTransition
        }
      }
      return FadeTransition;
    } else {
      // first visit + refresh - redirect
      // return FadeTransition;
      window.location.href = Barba.HistoryManager.history[1].url
      // console.log()
      // console.log(Barba.HistoryManager.history)
    }
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

  // initialized transition
  Barba.Dispatcher.on('linkClicked', function(el) {
    transitionInitElement = el instanceof jQuery ? el : $(el)
  });

  // The new container has been loaded and injected in the wrapper.
  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    pageReady(true);
  });

  // The transition has just finished and the old Container has been removed from the DOM.
  Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus) {
    pageCompleated(true);
  });

  // some plugins get bindings onNewPage only that way
  function triggerBody(){
    $(window).scroll();
    $(window).resize();
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint(){
    var wHost = window.location.host.toLowerCase()
    var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
    if (displayCondition){
      var wWidth = getWindowWidth();

      var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";

      $('.page').append(content);
      setTimeout(function(){
        $('.dev-bp-debug').fadeOut();
      },1000);
      setTimeout(function(){
        $('.dev-bp-debug').remove();
      },1500)
    }
  }

});


// HELPERS and PROTOTYPE FUNCTIONS

// LINEAR NORMALIZATION
function normalize(value, fromMin, fromMax, toMin, toMax) {
  var pct = (value - fromMin) / (fromMax - fromMin);
  var normalized = pct * (toMax - toMin) + toMin;

  //Cap output to min/max
  if (normalized > toMax) return toMax;
  if (normalized < toMin) return toMin;
  return normalized;
}

function rgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

// check if certain breakpoint was went through
function hasCrossedBreakpoint(prevResize, curWidth, targetBp){
  var returnable = false
  if (
    ( (curWidth >= targetBp) && (prevResize <= targetBp) ) // resize +
    || ( (curWidth <= targetBp) && (prevResize >= targetBp) ) // resize -
    ){
    returnable = true
  }

  return returnable
}

// get window width (ie, win, scrollbars, etc)
function getWindowWidth(){
  return window.innerWidth
}

// animate lazy class toggler
function animateLazy(element){
  var fadeTimeout = 250
  var $scaler = element.closest('.scaler')
  $scaler.addClass('is-loaded');

  if ( $scaler.is('.no-bg-onload') ){
    setTimeout(function(){
      $scaler.addClass('is-bg-hidden');
    }, fadeTimeout)
  }
}
