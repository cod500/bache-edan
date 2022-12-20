<!doctype html>
<html lang="en">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php 
    $title = "Playground";
    include("includes/main_head.php");?>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/foundation/5.5.0/css/foundation.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://kenwheeler.github.io/slick/slick/slick-theme.css"/>
    
    <style type="text/css">
   

.js .slider-single > div:nth-child(1n+2) { display: none }

.js .slider-single.slick-initialized > div:nth-child(1n+2) { display: block }

h3 {
	background: #f0f0f0;
	color: #3498db;
	font-size: 2.25rem;
	margin: .5rem;
	padding: 2%;
	position: relative;
	text-align: center;
}

.slick-prev.slick-disabled:before, .slick-next.slick-disabled:before {
    opacity: 1;
    color: black!important;
}

slick-prev:before, .slick-next:before {
  opacity: 1;
    color: black!important;
}
.slider-single h3 {
	line-height: 10rem;
}

.slider-nav h3::before {
	content: "";
	display: block;
	padding-top: 75%;
}

.slider-nav h3 span {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.slider-nav .slick-slide { cursor: pointer; }

.slick-slide.is-active h3 {
	color: #c00;
	background-color: #fff
}
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
				
    </head>
    <body id="index-section">
        <?php include("includes/nav.php");?>
        <?php 
        $page = "Playground";
        include("includes/page_header.php");
        ?>

<div class="container section-padding section-bg pt-5 pb-5">
<div class="row">
		<div class="column small-11 small-centered">
			<div class="slider slider-single">
				<div><img src="/images/clippings/Clippings-1.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-2.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-3.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-4.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-5.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-6.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-7.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-12.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-18.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-19.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-20.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-21.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-22.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-23.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-24.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-26.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-28.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-29.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-30.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-31.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-32.png" alt=""></div>
			</div>
			<div class="slider slider-nav">
      <div><img src="/images/clippings/Clippings-1.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-2.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-3.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-4.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-5.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-6.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-7.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-12.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-18.png" alt=""></div>
				<div><img src="/images/clippings/Clippings-19.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-20.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-21.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-22.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-23.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-24.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-26.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-28.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-29.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-30.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-31.png" alt=""></div>
        <div><img src="/images/clippings/Clippings-32.png" alt=""></div>
			</div>
		</div>
	</div>
</div>

        <?php include("includes/page_footer.php");?>
        <!-- JAVASCRIPT FILES -->
     
        <script>

$('.slider-single').slick({
 	slidesToShow: 1,
 	slidesToScroll: 1,
 	arrows: true,
 	fade: false,
 	adaptiveHeight: true,
 	infinite: false,
	useTransform: true,
 	speed: 400,
 	cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
 });

 $('.slider-nav')
 	.on('init', function(event, slick) {
 		$('.slider-nav .slick-slide.slick-current').addClass('is-active');
 	})
 	.slick({
 		slidesToShow: 7,
 		slidesToScroll: 7,
 		dots: false,
 		focusOnSelect: false,
 		infinite: false,
 		responsive: [{
 			breakpoint: 1024,
 			settings: {
 				slidesToShow: 5,
 				slidesToScroll: 5,
 			}
 		}, {
 			breakpoint: 640,
 			settings: {
 				slidesToShow: 4,
 				slidesToScroll: 4,
			}
 		}, {
 			breakpoint: 420,
 			settings: {
 				slidesToShow: 3,
 				slidesToScroll: 3,
		}
 		}]
 	});

 $('.slider-single').on('afterChange', function(event, slick, currentSlide) {
 	$('.slider-nav').slick('slickGoTo', currentSlide);
 	var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
 	$('.slider-nav .slick-slide.is-active').removeClass('is-active');
 	$(currrentNavSlideElem).addClass('is-active');
 });

 $('.slider-nav').on('click', '.slick-slide', function(event) {
 	event.preventDefault();
 	var goToSingleSlide = $(this).data('slick-index');

 	$('.slider-single').slick('slickGoTo', goToSingleSlide);
 });
        </script>
    </body>
</html>