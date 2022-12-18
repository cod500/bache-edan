"use strict";

//Zoom for single image

// Store initial image size
function setImageSize() {
  var imageSize = Math.floor($('.zoom-main img').height());
  if (imageSize <= 100) {
    requestAnimationFrame(setImageSize);
  }
  else {
    $('.zoom-main').css({ width: imageSize, height: imageSize });
    $('.zoom-main img').addClass('is-loaded');
  }
}

requestAnimationFrame(setImageSize);

// Set state for first image
$('.silhouette img:first-child').addClass('is-active');


// Main image click to zoom event listener
$('.zoom-main img').on('click', function (e) {
  // Toggle zoom-out cursor and unset max-width
  $(this).toggleClass('is-zoomed-in');

  // Zoom in
  if ($(this).hasClass('is-zoomed-in')) {
    // Variables for calculating relative position
    var scale = e.target.naturalWidth / $(e.target).parent().width();
    var max = -(1 - 1 / scale);

    // Adjust mouse scale to the full-size image, then redraw
    e.offsetX *= scale;
    e.offsetY *= scale;
    calculateZoom(e);

    // Mouse event listener
    $(this).on('mousemove', calculateZoom);

    function calculateZoom(e) {
      var x = e.offsetX * max + 'px';
      var y = e.offsetY * max + 'px';
      $(e.target).css({ left: x, top: y });
    }
  }
  // Zoom out
  else {
    $(this).off('mousemove').prop('style', '');
  }
});

$('#bache-modal').on('click', function (e) {
  setImageSize();
});




