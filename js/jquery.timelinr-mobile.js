/* ----------------------------------
jQuery Timelinr 0.9.7
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

function timelinrMobile(options) {
  // default plugin virtSettings
  virtSettings = jQuery.extend({
    orientation: 'virtical', // value: horizontal | vertical, default to horizontal
    containerDiv: '#vertical-timeline',  // value: any HTML tag or #id, default to #timeline
    datesDiv: '.vertical-dates',     // value: any HTML tag or #id, default to #dates
    datesSelectedClass: 'vertical-selected',   // value: any class, default to selected
    datesSpeed: 'normal',     // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
    issuesDiv: '#vertical-issues',    // value: any HTML tag or #id, default to #issues
    'vertical-selected': 'vertical-selected',   // value: any class, default to selected
    issuesSpeed: 'fast',       // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
    issuesTransparency: 0.2,          // value: integer between 0 and 1 (recommended), default to 0.2
    issuesTransparencySpeed: 500,          // value: integer between 100 and 1000 (recommended), default to 500 (normal)
    prevButton: '#vertical-prev',      // value: any HTML tag or #id, default to #prev
    '#vertical-next': '#vertical-next',      // value: any HTML tag or #id, default to #next
    arrowKeys: 'false',      // value: true | false, default to false
    startAt: 1,            // value: integer, default to 1 (first)
    autoPlay: 'false',      // value: true | false, default to false
    autoPlayDirection: 'forward',    // value: forward | backward, default to forward
    autoPlayPause: 2000          // value: integer (1000 = 1 seg), default to 2000 (2segs)
  }, options);

  $(function () {
    // Checks if required elements exist on page before initializing timelinr | improvement since 0.9.55
    if ($('.vertical-dates').length > 0 && $('#vertical-issues').length > 0) {
      // setting variables... many of them

      var howManyDates = $('.vertical-dates' + ' li').length;
      var howManyIssues = $('#vertical-issues' + ' li').length;
      var currentDate = $('.vertical-dates').find('a.' + 'vertical-selected');
      var currentIssue = $('#vertical-issues').find('li.' + 'vertical-selected');
      var widthContainer = $('#vertical-timeline').width();
      var heightContainer = $('#vertical-timeline').height();
      var widthIssues = $('#vertical-issues').width();
      var heightIssues = $('#vertical-issues').height();
      var widthIssue = $('#vertical-issues' + ' li').width();
      var heightIssue = $('#vertical-issues' + ' li').height();
      var widthDates = $('.vertical-dates').width();
      var heightDates = $('.vertical-dates').height();
      var widthDate = $('.vertical-dates' + ' li').width();
      var heightDate = $('.vertical-dates' + ' li').height();
      // set positions!
      if (virtSettings.orientation == 'vertical') {
        $('#vertical-issues').height(heightIssue * howManyIssues);
        $('.vertical-times').height(heightDate * howManyDates).css('marginTop', heightContainer / 2 - heightDate / 2);
        var defaultPositionDates = parseInt($('.vertical-times').css('marginTop').substring(0, $('.vertical-times').css('marginTop').indexOf('px')));
      }

      $('.vertical-time a').click(function (e) {
        e.preventDefault();
        let url = $(this).prop('href');
        let dateClass = url.substr(url.length - 6);
        setTimeout(() => {
          $("." + dateClass + ' a').click();
        }, 0);

      })

      $('.vertical-dates' + ' a').click(function (event) {
        event.preventDefault();
        // first vars
        var whichIssue = $(this).text();
        var currentIndex = $(this).parent().prevAll().length;
        // moving the elements
        if (virtSettings.orientation == 'vertical') {
          $('#vertical-issues').animate({ 'marginTop': -heightIssue * currentIndex }, { queue: false, duration: virtSettings.issuesSpeed });
        }
        $('#vertical-issues' + ' li').animate({ 'opacity': virtSettings.issuesTransparency }, { queue: false, duration: virtSettings.issuesSpeed }).removeClass('vertical-selected').eq(currentIndex).addClass('vertical-selected').fadeTo(virtSettings.issuesTransparencySpeed, 1);
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
        if (howManyDates == 1) {
          $('#vertical-prev' + ',' + '#vertical-next').fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($('#vertical-issues' + ' li:first-child').hasClass('vertical-selected')) {
            $('#vertical-prev').fadeOut('fast');
            $('#vertical-next').fadeIn('fast');
          }
          else if ($('#vertical-issues' + ' li:last-child').hasClass('vertical-selected')) {
            $('#vertical-next').fadeOut('fast');
            $('#vertical-prev').fadeIn('fast');
          }
        } else {
          if ($('#vertical-issues' + ' li:first-child').hasClass('vertical-selected')) {
            $('#vertical-next').fadeIn('fast');
            $('#vertical-prev').fadeOut('fast');
          }
          else if ($('#vertical-issues' + ' li:last-child').hasClass('vertical-selected')) {
            $('#vertical-prev').fadeIn('fast');
            $('#vertical-next').fadeOut('fast');
          }
          else {
            $('#vertical-next' + ',' + '#vertical-prev').fadeIn('slow');
          }
        }
        // now moving the dates
        $('.vertical-dates' + ' a').removeClass('vertical-selected');
        $(this).addClass('vertical-selected');

        $('.vertical-times').animate({ 'marginTop': defaultPositionDates - (heightDate * currentIndex) }, { queue: false, duration: 'virtSettings.datesSpeed' });

      });

      $('#vertical-next').bind('click', function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $('#vertical-issues').find('li.' + 'vertical-selected').index();
        if (virtSettings.orientation == 'vertical') {
          var currentPositionIssues = parseInt($('#vertical-issues').css('marginTop').substring(0, $('#vertical-issues').css('marginTop').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / heightIssue;
          var currentPositionDates = parseInt($('.vertical-dates').css('marginTop').substring(0, $('.vertical-dates').css('marginTop').indexOf('px')));
          var currentIssueDate = currentPositionDates - heightDate;
          if (currentPositionIssues <= -(heightIssue * howManyIssues - (heightIssue))) {
            $('#vertical-issues').stop();
            $('.vertical-dates' + ' li:last-child a').click();
          } else {
            if (!$('#vertical-issues').is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $('.vertical-dates' + ' li').eq(currentIndex + 1).find('a').trigger('click');
            }
          }
        }
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if (howManyDates == 1) {
          $('#vertical-prev' + ',' + '#vertical-next').fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($('#vertical-issues' + ' li:first-child').hasClass('vertical-selected')) {
            $('#vertical-prev').fadeOut('fast');
            $('#vertical-next').fadeIn('fast');
          }
          else if ($('#vertical-issues' + ' li:last-child').hasClass('vertical-selected')) {
            $('#vertical-next').fadeOut('fast');
            $('#vertical-prev').fadeIn('fast');
          }
        } else {
          if ($('#vertical-issues' + ' li:first-child').hasClass('vertical-selected')) {
            $('#vertical-prev').fadeOut('fast');
          }
          else if ($('#vertical-issues' + ' li:last-child').hasClass('vertical-selected')) {
            $('#vertical-next').fadeOut('fast');
          }
          else {
            $('#vertical-next' + ',' + '#vertical-prev').fadeIn('slow');
          }
        }
      });

      $('#vertical-prev').click(function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $('#vertical-issues').find('li.' + 'vertical-selected').index();
        if (virtSettings.orientation == 'vertical') {
          var currentPositionIssues = parseInt($('#vertical-issues').css('marginTop').substring(0, $('#vertical-issues').css('marginTop').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / heightIssue;
          var currentPositionDates = parseInt($('.vertical-dates').css('marginTop').substring(0, $('.vertical-dates').css('marginTop').indexOf('px')));
          var currentIssueDate = currentPositionDates + heightDate;
          if (currentPositionIssues >= 0) {
            $('#vertical-issues').stop();
            $('.vertical-dates' + ' li:first-child a').click();
          } else {
            if (!$('#vertical-issues').is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $('.vertical-dates' + ' li').eq(currentIndex - 1).find('a').trigger('click');
            }
          }
        }
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if (howManyDates == 1) {
          $('#vertical-prev' + ',' + '#vertical-next').fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($('#vertical-issues' + ' li:first-child').hasClass('vertical-selected')) {
            $('#vertical-prev').fadeOut('fast');
            $('#vertical-next').fadeIn('fast');
          }
          else if ($('#vertical-issues' + ' li:last-child').hasClass('vertical-selected')) {
            $('#vertical-next').fadeOut('fast');
            $('#vertical-prev').fadeIn('fast');
          }
        } else {
          if ($('#vertical-issues' + ' li:first-child').hasClass('vertical-selected')) {
            $('#vertical-prev').fadeOut('fast');
          }
          else if ($('#vertical-issues' + ' li:last-child').hasClass('vertical-selected')) {
            $('#vertical-next').fadeOut('fast');
          }
          else {
            $('#vertical-next' + ',' + '#vertical-prev').fadeIn('slow');
          }
        }
      });
      // keyboard navigation, added since 0.9.1
      if (virtSettings.arrowKeys == 'true') {
        if (virtSettings.orientation == 'vertical') {
          $(document).keydown(function (event) {
            if (event.keyCode == 40) {
              $('#vertical-next').click();
            }
            if (event.keyCode == 38) {
              $('#vertical-prev').click();
            }
          });
        }
      }
      // default position startAt, added since 0.9.3
      $('.vertical-times' + ' li').eq(virtSettings.startAt - 1).find('a').trigger('click');
      // autoPlay, added since 0.9.4
      if (virtSettings.autoPlay == 'true') {
        // set default timer
        var timer = setInterval(autoPlay, virtSettings.autoPlayPause);
        // pause autoplay on hover
        $('#vertical-timeline').hover(function (ev) {
          clearInterval(timer);
        }, function (ev) {
          // start again timer on mouse out
          timer = setInterval(autoPlay, virtSettings.autoPlayPause);
        });

      }
    }
  });
}
