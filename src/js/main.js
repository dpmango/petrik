window.onbeforeunload = function(){
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
  var lastScroll = 0;
  var lastScrollDir = 0; // TODO

  var scroll = {
    y: _window.scrollTop(),
    direction: undefined,
    blocked: false
  }

  var header = {
    container: undefined,
    bottomPoint: undefined
  }

  var sliders = []

  ////////////
  // LIST OF FUNCTIONS
  ////////////

  // some functions should be called once only
  legacySupport();

  // triggered when PJAX DONE
  // The new container has been loaded and injected in the wrapper.
  function pageReady(fromPjax){
    getHeaderParams();
    updateHeaderActiveClass();
    closeMobileMenu();

    initVideos();

    initSliders();
    initPopups();
    initLazyLoad();
    initTeleport();
  }

  // The transition has just finished and the old Container has been removed from the DOM.
  function pageCompleated(fromPjax){
    setProjectColor();
    initMasonry();
    if ( fromPjax ){
      window.onLoadTrigger()
    }
  }


  // scroll/resize listener
  _window.on('scroll', getWindowScroll);
  _window.on('scroll', throttle(scrollHeader, 10));
  _window.on('resize', debounce(getHeaderParams, 100))
  _window.on('resize', debounce(setBreakpoint, 200))

  // this is a master function which should have all functionality
  pageReady();
  pageCompleated();

  // some plugins work best with onload triggers
  window.onLoadTrigger = function onLoad(){

  }

  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
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


  // just store global variable with scroll distance
  function getWindowScroll(){
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
      var fixedClassVis = 'is-fixed-visible';

      if ( scroll.blocked ) return

      if ( scroll.y > header.bottomPoint ){
        header.container.addClass(fixedClass);

        if ( (scroll.y > header.bottomPoint * 2) && scroll.direction === "up" ){
          header.container.addClass(fixedClassVis);
        } else {
          header.container.removeClass(fixedClassVis);
        }
      } else {
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
    lastScroll = _window.scrollTop();
    scroll.blocked = true
    $('.page__content').css({
      'margin-top': '-' + lastScroll + 'px'
    });
    $('body').addClass('body-lock');
  }

  function enableScroll() {
    scroll.blocked = false
    scroll.direction = "up" // to keep header TODO
    $('.page__content').css({
      'margin-top': '-' + 0 + 'px'
    });
    $('body').removeClass('body-lock');
    _window.scrollTop(lastScroll)
    lastScroll = 0;
  }

  function blockScroll() {
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

  function closeMobileMenu(){
    $('[js-hamburger]').removeClass('is-active');
    $('.mobile-navi').removeClass('is-active');

    blockScroll();
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

  function setProjectColor(){
    var $project = $('[js-set-project-colors]');
    $('#project-styles').remove(); // clean up prev styles

    if ( $project.length > 0 ){
      var colorBg = $project.data('bg-color');
      var colorFont = $project.data('font-color');
      var colorFont50 = rgba(colorFont, .5)

      // collect & build styles
      var styles = ""
      var colorBg_Background = "body, .header, .mobile-navi, .project"
      var colorFont_Background = ".hamburger span"
      var colorFontHover_Background = ".hamburger:hover span"
      var colorFont_Color = "body, .swiper-nav, .c-gray"
      var colorFontHover_Color = ".header__menu a:hover, .swiper-nav:hover, .swiper-bullet:hover, .mobile-navi__menu a:hover, .mobile-navi__cta a:hover"
      var colorFont_Border = ".swiper-bullet.swiper-pagination-bullet-active"
      var colorFontHover_Border = ".swiper-bullet:hover"

      styles += colorBg_Background + "{background-color:"+colorBg+"}"
      styles += colorFont_Background + "{background-color: "+colorFont+"}"
      styles += colorFontHover_Background + "{background-color: "+colorFont50+"}"
      styles += colorFont_Color + "{color: "+colorFont+"}"
      styles += colorFontHover_Color + "{color:"+colorFont50+"}"
      styles += colorFont_Border + "{border-color: "+colorFont+"}"
      styles += colorFontHover_Color + "{border-color:"+colorFont50+"}"

      // append styles
      var stylesheet = $("<style type='text/css' id='project-styles'>"+styles+"</style>")
      stylesheet.appendTo("head");
    }
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

    var $sliders = $('[js-slider]');

    if ( $sliders.length > 0 ){
      $sliders.each(function(i,slider){
        var sliderName = $(slider).data('slider-name');
        var paginationType = $(slider).find('.swiper-pagination').data('type');

        new Swiper('[js-slider][data-slider-name="'+sliderName+'"]', {
          wrapperClass: "swiper-wrapper",
          slideClass: "swiper-slide",
          direction: 'horizontal',
          loop: true,
          watchOverflow: false,
          setWrapperSize: false,
          spaceBetween: 0,
          slidesPerView: '1',
          normalizeSlideIndex: true,
          freeMode: false,
          effect: 'fade',
          navigation: {
            prevEl: '.swiper-nav--prev[data-for="'+sliderName+'"]',
            nextEl: '.swiper-nav--next[data-for="'+sliderName+'"]',
          },
          pagination: {
            el: '.swiper-pagination[data-for="'+sliderName+'"]',
            type: paginationType,
            clickable: true,
            renderBullet: function (index, className) {
              var $slide = $(this.slides[index + 1])
              var bulletText = $slide.data('bullet-text')
              return '<span data-index="'+index+'" class="'+className+' swiper-bullet p-label"><span>' + bulletText + '</span></span>';
            }
          },
          on: {
            init: function () {
              sliders.push({
                name: sliderName,
                instance: this
              })
            },
          },
        })
      })

      // _document
      //   .on('click', '.swiper-bullet', function(){
      //     var index = $(this).data('index')
      //     var sliderName = $(this).closest('[js-slider]').data('slider-name')
      //     var $slider
      //     sliders.forEach(function(slider){
      //       if ( slider.name === sliderName ){
      //         $slider = slider.instance
      //       }
      //     })
      //
      //     $slider.slideTo(index)
      //   })

    }
  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-buble',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    $('[js-popup-gallery]').magnificPopup({
  		delegate: 'a',
  		type: 'image',
  		tLoading: 'Загрузка #%curr%...',
  		mainClass: 'popup-buble',
  		gallery: {
  			enabled: true,
  			navigateByImgClick: true,
  			preload: [0,1]
  		},
  		image: {
  			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  		}
  	});
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  //////////
  // LAZY LOAD
  //////////
  function initLazyLoad(){
    var fadeTimeout = 400

    _document.find('[js-lazy]').Lazy({
      threshold: 400, //Amount of pixels below the viewport, in which all images gets loaded before the user sees them.
      enableThrottle: true,
      throttle: 100,
      scrollDirection: 'vertical',
      effect: 'fadeIn',
      effectTime: fadeTimeout,
      // visibleOnly: true,
      // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
      onError: function(element) {
          console.log('error loading ' + element.data('src'));
      },
      beforeLoad: function(element){
        // element.attr('style', '')
      },
      afterLoad: function(element){
        setTimeout(function(){
          element.closest('.scaler').addClass('is-loaded')
        }, fadeTimeout)
      }
    });
  }

  ////////////
  // TELEPORT PLUGIN
  ////////////
  function initTeleport(){
    $('[js-teleport]').each(function (i, val) {
      var self = $(val)
      var objHtml = $(val).html();
      var target = $('[data-teleport-target=' + $(val).data('teleport-to') + ']');
      var conditionMedia = $(val).data('teleport-condition').substring(1);
      var conditionPosition = $(val).data('teleport-condition').substring(0, 1);

      if (target && objHtml && conditionPosition) {

        function teleport() {
          var condition;

          if (conditionPosition === "<") {
            condition = _window.width() < conditionMedia;
          } else if (conditionPosition === ">") {
            condition = _window.width() > conditionMedia;
          }

          if (condition) {
            target.html(objHtml)
            self.html('')
          } else {
            self.html(objHtml)
            target.html("")
          }
        }

        teleport();
        _window.on('resize', debounce(teleport, 100));


      }
    })
  }


  ////////////
  // UI
  ////////////


  //////////
  // BARBA PJAX
  //////////
  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  Barba.Pjax.Dom.containerClass = "page";

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      var deferred = Barba.Utils.deferred();

      anime({
        targets: this.oldContainer,
        opacity : 0,
        easing: easingSwing, // swing
        duration: 500,
        complete: function(anim){
          deferred.resolve();
        }
      })

      return deferred.promise
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      anime({
        targets: "html, body",
        scrollTop: 0,
        easing: easingSwing, // swing
        duration: 150
      });

      anime({
        targets: this.newContainer,
        opacity: 1,
        easing: easingSwing, // swing
        duration: 500,
        complete: function(anim) {
          triggerBody()
          _this.done();
        }
      });
    }
  });

  // set barba transition
  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

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
      var wWidth = _window.width();

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

// i.e. linear-normalization or Number.pad

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
