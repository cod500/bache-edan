/* ----------------------------------
jQuery Timelinr 0.9.7
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

function timelinr(options) {
  // default plugin settings
  settings = jQuery.extend({
    orientation: 'horizontal', // value: horizontal | vertical, default to horizontal
    containerDiv: '#timeline',  // value: any HTML tag or #id, default to #timeline
    datesDiv: '.dates',     // value: any HTML tag or #id, default to #dates
    datesSelectedClass: 'selected',   // value: any class, default to selected
    datesSpeed: 'normal',     // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
    issuesDiv: '#issues',    // value: any HTML tag or #id, default to #issues
    issuesSelectedClass: 'selected',   // value: any class, default to selected
    issuesSpeed: 'fast',       // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
    issuesTransparency: 0.2,          // value: integer between 0 and 1 (recommended), default to 0.2
    issuesTransparencySpeed: 500,          // value: integer between 100 and 1000 (recommended), default to 500 (normal)
    prevButton: '#prev',      // value: any HTML tag or #id, default to #prev
    nextButton: '#next',      // value: any HTML tag or #id, default to #next
    arrowKeys: 'false',      // value: true | false, default to false
    startAt: 1,            // value: integer, default to 1 (first)
    autoPlay: 'false',      // value: true | false, default to false
    autoPlayDirection: 'forward',    // value: forward | backward, default to forward
    autoPlayPause: 2000          // value: integer (1000 = 1 seg), default to 2000 (2segs)
  }, options);



  $(function () {
    // Checks if required elements exist on page before initializing timelinr | improvement since 0.9.55
    if ($(settings.datesDiv).length > 0 && $(settings.issuesDiv).length > 0) {
      // setting variables... many of them
      var howManyDates = $(settings.datesDiv + ' li').length;
      var howManyIssues = $(settings.issuesDiv + ' li').length;
      var currentDate = $(settings.datesDiv).find('a.' + settings.datesSelectedClass);
      var currentIssue = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass);
      var widthContainer = $(settings.containerDiv).width();
      var heightContainer = $(settings.containerDiv).height();
      var widthIssues = $(settings.issuesDiv).width();
      var heightIssues = $(settings.issuesDiv).height();
      var widthIssue = $(settings.issuesDiv + ' li').width();
      var heightIssue = $(settings.issuesDiv + ' li').height();
      var widthDates = $(settings.datesDiv).width();
      var heightDates = $(settings.datesDiv).height();
      var widthDate = $(settings.datesDiv + ' li').width();
      var heightDate = $(settings.datesDiv + ' li').height();
      // set positions!
      if (settings.orientation == 'horizontal') {
        $(settings.issuesDiv).width(widthIssue * howManyIssues);
        $('.timeline-dates').width(widthDate * howManyDates).css('marginLeft', (widthContainer / 3 - widthDate / 3));
        var defaultPositionDates = parseInt($('.timeline-dates').css('marginLeft').substring(0, $('.timeline-dates').css('marginLeft').indexOf('px')));
      }
      $('.nav-dates').width(55);
      $('.bottom-dates').css('display', 'flex');
      $('.bottom-dates').css('justify-content', 'space-around')

      $('.bottom-date a').click(function (e) {
        e.preventDefault();
        let url = $(this).prop('href');
        let dateClass = url.substr(url.length - 6);
        setTimeout(() => {
          $("." + dateClass + ' a').click();
        }, 0);

      })

      $(settings.datesDiv + ' a').click(function (event) {
        event.preventDefault();
        // first vars
        var whichIssue = $(this).text();
        var currentIndex = $(this).parent().prevAll().length;
        // moving the elements
        if (settings.orientation == 'horizontal') {
          $(settings.issuesDiv).animate({ 'marginLeft': -widthIssue * currentIndex }, { queue: false, duration: settings.issuesSpeed });
        }
        $(settings.issuesDiv + ' li').animate({ 'opacity': 0 }, { queue: false, duration: settings.issuesSpeed }).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed, 1);

        $(settings.issuesDiv + ' li').eq(currentIndex).addClass(settings.issuesSelectedClass).next().animate({ 'opacity': .2 })
        $(settings.issuesDiv + ' li').eq(currentIndex).addClass(settings.issuesSelectedClass).prev().animate({ 'opacity': .2 })
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
        if (howManyDates == 1) {
          $(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          }
          else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeIn('fast');
            $(settings.prevButton).fadeOut('fast');
          }
          else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeIn('fast');
            $(settings.nextButton).fadeOut('fast');
          }
          else {
            $(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
          }
        }
        // now moving the dates
        $(settings.datesDiv + ' a').removeClass(settings.datesSelectedClass);
        $('.selected-year').removeClass('selected-year');
        $(this).addClass(settings.datesSelectedClass);
        let dateUrl = $(this).prop('href');
        let dateClass = dateUrl.substr(dateUrl.length - 6);
        let dateGroup = dateClass.substring(0, dateClass.length - 2);
        $('.group-' + dateGroup + '-1' + ' a').addClass('selected-year');
        if (settings.orientation == 'horizontal') {
          $(settings.datesDiv + ".timeline-dates").animate({ 'marginLeft': (defaultPositionDates - (widthDate + 120 * currentIndex)) }, { queue: false, duration: 'settings.datesSpeed' });
        } else if (settings.orientation == 'vertical') {
          $(settings.datesDiv).animate({ 'marginTop': defaultPositionDates - (heightDate * currentIndex) }, { queue: false, duration: 'settings.datesSpeed' });
        }
      });

      $(settings.nextButton).bind('click', function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass).index();
        if (settings.orientation == 'horizontal') {
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0, $(settings.issuesDiv).css('marginLeft').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / widthIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px')));
          var currentIssueDate = currentPositionDates - widthDate;
          if (currentPositionIssues <= -(widthIssue * howManyIssues - (widthIssue))) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv + ' li:last-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.52: now the dates gets centered when there's too much dates.
              $(settings.datesDiv + ' li').eq(currentIndex + 1).find('a').trigger('click');
            }
          }
        }
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if (howManyDates == 1) {
          $(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          }
          else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
          }
          else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
          }
          else {
            $(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
          }
        }
      });

      $(settings.prevButton).click(function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass).index();
        if (settings.orientation == 'horizontal') {
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0, $(settings.issuesDiv).css('marginLeft').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / widthIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px')));
          var currentIssueDate = currentPositionDates + widthDate;
          if (currentPositionIssues >= 0) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv + ' li:first-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $(settings.datesDiv + ' li').eq(currentIndex - 1).find('a').trigger('click');
            }
          }
        }
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if (howManyDates == 1) {
          $(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          }
          else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
          }
          else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
          }
          else {
            $(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
          }
        }
      });
      // keyboard navigation, added since 0.9.1
      if (settings.arrowKeys == 'true') {
        if (settings.orientation == 'horizontal') {
          $(document).keydown(function (event) {
            if (event.keyCode == 39) {
              $(settings.nextButton).click();
            }
            if (event.keyCode == 37) {
              $(settings.prevButton).click();
            }
          });
        }
      }
      // default position startAt, added since 0.9.3
      $('.timeline-dates li').eq(settings.startAt - 1).find('a').trigger('click');
      // autoPlay, added since 0.9.4
      if (settings.autoPlay == 'true') {
        // set default timer
        var timer = setInterval(autoPlay, settings.autoPlayPause);
        // pause autoplay on hover
        $(settings.containerDiv).hover(function (ev) {
          clearInterval(timer);
        }, function (ev) {
          // start again timer on mouse out
          timer = setInterval(autoPlay, settings.autoPlayPause);
        });

      }
    }
  });

}

