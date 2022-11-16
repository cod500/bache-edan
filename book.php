<!DOCTYPE html>
<html lang="en">
<head>
<?php include("includes/header.php");?>
<title>Book</title>
</head>

<body>
<?php include("includes/nav_bar.php");?>
<section class="text-gray-700 body-font">
  <div class="container mx-auto flex px-5 pt-24 md:flex-row flex-col items-center" style="text-align:-webkit-right; text-align:-moz-right">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Ledger book of William Bache, with associated pieces

      </h1>
      <p class="mb-8 leading-relaxed">National Portrait Gallery, Smithsonian Institution; partial gift of Sarah Bache Bloise</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-800 rounded text-lg">Link</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Link</button>
      </div>
    </div>
  <div class="flex">
	<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
		<img id="result"  class="img-box object-cover object-center rounded" alt="image" src="https://ids.si.edu/ids/deliveryService?id=NPG-NPG_2002_184_FrontCover-000001">
		</div>
		<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex flex-col">
		<strong class="text-center">Silhouette Name</strong>
		<hr class="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 dark:bg-gray-700">
		<p id="image-info"  class="img-box object-cover object-center rounded text-start mx-8" alt="image info">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quis laboriosam repellat doloribus minima iste vitae qui, error debitis ducimus eum quia ullam harum molestias, recusandae consectetur? Cumque, iusto a?	
		<p>
	</div>
  </div>
  </div>
</section>

<section class="text-gray-700 body-font border-t border-gray-200">
<img crossorigin="Anonymous" src="" class="crop-image" alt=""/>
  <div class="container px-5 py-8 pb-24 mx-auto flex flex-wrap">
  <div class="bb-custom-wrapper">
			<div id="bb-bookblock" class="bb-bookblock">

      <?php 
      $data = file_get_contents('data/bache.json',true);
      $array = json_decode($data, true);
      // starting page
      $page = 2;
      ?>

				<?php for ($i = 2; $i < 76; $i+=2): ?>
					<?php $next = $page + 1 ?>
          <?php 
            if($page > 76){
              break;
            }
          ?>
					<div class="bb-item">
					<div class="bb-custom-side">
					<?php include_once "./pages/$page.php";?>
					</div>
					<div class="bb-custom-side">
					<?php include_once "./pages/$next.php";?>
          <?php $page = $page + 2;?>
					</div>
				</div>
				<?php endfor; ?>
				
				
			</div>

			<nav>
				<button id="bb-nav-first" class="inline-flex text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-800 rounded text-lg"><i class="fa-sharp fa-solid fa-backward text-white"></i></i></i></button>
        <button id="bb-nav-prev" class="inline-flex text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-800 rounded text-lg"><i class="fa-solid fa-caret-left text-white"></i></i></button>
        <label for="page-number" style="font: 20px arial; font-family: Lato, sans-serif;">Page:</label> <input type="text" size="2" id="page-number" min="1" max="76" style="font: 20px arial; font-family: Lato, sans-serif;"> <span
			style="font: 20px arial; font-family: Lato, sans-serif;">of  </span> <span id="number-pages"></span>
				<button id="bb-nav-next" class="inline-flex text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-800 rounded text-lg"><i class="fa-solid fa-caret-right text-white"></i></button>
				<button id="bb-nav-last" class="inline-flex text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-800 rounded text-lg"><i class="fa-solid fa-forward text-white"></i></button>
			</nav>

			<div class="zoom-controls">
				<div>
				<button id="zoom-in-even"
					class="rounded px-4 py-2 text-xs text-gray-800 bg-gray-200  rounded my-2 md:my-6 py-2 px-8 shadow-lg">Zoom
					In </button>
				<button id="zoom-out-even"
					class="rounded px-4 py-2 text-xs text-gray-800 bg-gray-200  rounded my-2 md:my-6 py-2 px-8 shadow-lg ">Zoom
					Out</button>
				<!-- <input type="range" class="zoom-range"> -->
				<button
					class="rounded px-4 py-2 text-xs text-gray-800 bg-gray-200  rounded my-2 md:my-6 py-2 px-8 shadow-lg"
					id="reset-even">Reset</button>
			</div>

			<div>
				<button id="zoom-in-odd"
					class="rounded px-4 py-2 text-xs text-gray-800 bg-gray-200  rounded my-2 md:my-6 py-2 px-8 shadow-lg">Zoom
					In </button>
				<button id="zoom-out-odd"
					class="rounded px-4 py-2 text-xs text-gray-800 bg-gray-200  rounded my-2 md:my-6 py-2 px-8 shadow-lg ">Zoom
					Out</button>
				<!-- <input type="range" id="zoom-range" min="0.1" max="4" step="0.1" value="1"> -->
				<button
					class="rounded px-4 py-2 text-xs text-gray-800 bg-gray-200  rounded my-2 md:my-6 py-2 px-8 shadow-lg"
					id="reset-odd">Reset</button>
			</div>
		</div>
	</div>
  </div>
</section>

<section class="text-gray-700 body-font border-t border-gray-200 mt-20">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">National Portrait Gallery
</h1>
      <p class="lg:w-1/2 w-full leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reprehenderit molestias quia eius labore at commodi saepe cum maiores, aperiam sint. Tenetur ratione quisquam quibusdam praesentium cupiditate quis ipsam autem.</p>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-300 p-6 rounded-lg">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
           
          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Content</h2>
          <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquam obcaecati incidunt accusamus placeat deserunt neque sapiente eaque recusandae, dolor tempora voluptatibus odio eum ipsa sint doloribus. A, suscipit iure?</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-300 p-6 rounded-lg">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
  
          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Content</h2>
          <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure temporibus aperiam ipsam at quae, atque quam libero ex odit cumque suscipit ad excepturi inventore blanditiis facilis eaque nemo tempore nostrum!</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-300 p-6 rounded-lg">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">

          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Content</h2>
          <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod incidunt sint consectetur repellendus? Modi suscipit quia ex ullam accusamus. Deleniti nam ullam et, dolores perferendis minima incidunt aliquid illum! Odio.</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-300 p-6 rounded-lg">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
 
          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Content</h2>
          <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus debitis, aliquam omnis eveniet eum neque vero maxime officiis porro repellat quo sit adipisci veritatis, et quod, enim voluptate sunt quas.</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-300 p-6 rounded-lg">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            
          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Content</h2>
          <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quo aspernatur, aperiam neque laudantium esse sequi officia sed doloribus reiciendis laborum quia velit molestias unde hic cupiditate odit incidunt quasi!</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-300 p-6 rounded-lg">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            
          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Content</h2>
          <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ipsa laboriosam? Animi sit dolorum doloremque laudantium quos nostrum obcaecati cupiditate harum adipisci non autem ipsum, quidem magni asperiores qui. Sit.</p>
        </div>
      </div>
    </div>
    <button class="flex mx-auto mt-16 text-white bg-cyan-700 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-800 rounded text-lg">Button</button>
  </div>
</section>
</section>
<?php include("includes/footer.php");?>

  <script src="js/jquery-2.2.4.js"></script>
	<script src="js/jquerypp.custom.js"></script>
	<script src="js/jquery.panzoom.js"></script>
	<script src="js/mapoid.js"></script>
  <script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
  <script src="js/jquery.bookblock.js"></script>
  <script src="js/jquery.rwdImageMaps.js"></script>
	<script src="js/book.js"></script>
	<script>
    var numberOfPages = 76;
    var pageNumber = 1;
	
		var Page = (function () {

			var config = {
				$bookBlock: $('#bb-bookblock'),
				$navNext: $('#bb-nav-next'),
				$navPrev: $('#bb-nav-prev'),
				$navFirst: $('#bb-nav-first'),
				$navLast: $('#bb-nav-last')
			},
				init = function () {
					config.$bookBlock.bookblock({
						speed: 1000,
						shadowSides: 0.8,
						shadowFlip: 0.4
					});
					initEvents();
				},
				initEvents = function () {

					var $slides = config.$bookBlock.children();

					// add navigation events
					config.$navNext.on('click touchstart', function () {
            config.$bookBlock.bookblock('next');
            if(pageNumber == numberOfPages - 1){
              pageNumber = pageNumber + 1;
            $('#page-number').val(pageNumber);
            }else if(pageNumber < numberOfPages){
              pageNumber = parseInt(pageNumber) + 2;
            $('#page-number').val(pageNumber);
            }
						return false;
					});

					config.$navPrev.on('click touchstart', function () {
            config.$bookBlock.bookblock('prev');
            if(pageNumber > 2){
              pageNumber = pageNumber - 2;
              $('#page-number').val(pageNumber);
            }else{
              pageNumber = 1;
              $('#page-number').val(pageNumber);
            }
						return false;
					});

					config.$navFirst.on('click touchstart', function () {
            config.$bookBlock.bookblock('first');
            pageNumber = 1;
            $('#page-number').val(pageNumber);
						return false;
					});

					config.$navLast.on('click touchstart', function () {
            config.$bookBlock.bookblock('last');
            pageNumber = numberOfPages;
            $('#page-number').val(pageNumber);
						return false;
					});

					// add swipe events
					$slides.on({
						'swipeleft': function (event) {
							config.$bookBlock.bookblock('next');
              if(pageNumber == numberOfPages - 1){
              pageNumber = pageNumber + 1;
            $('#page-number').val(pageNumber);
            }else if(pageNumber < numberOfPages){
              pageNumber = parseInt(pageNumber) + 2;
            $('#page-number').val(pageNumber);
            }
							return false;
						},
						'swiperight': function (event) {
							config.$bookBlock.bookblock('prev');
              if(pageNumber > 2){
              pageNumber = pageNumber - 2;
              $('#page-number').val(pageNumber);
            }else{
              pageNumber = 1;
              $('#page-number').val(pageNumber);
            }
							return false;
						}
					});

					// add keyboard events
					$(document).keydown(function (e) {
						var keyCode = e.keyCode || e.which,
							arrow = {
								left: 37,
								up: 38,
								right: 39,
								down: 40
							};

						switch (keyCode) {
							case arrow.left:
								config.$bookBlock.bookblock('prev');
                config.$bookBlock.bookblock('prev');
              if(pageNumber > 2){
              pageNumber = pageNumber - 2;
              $('#page-number').val(pageNumber);
            }else{
              pageNumber = 1;
              $('#page-number').val(pageNumber);
            }
								break;
							case arrow.right:
								config.$bookBlock.bookblock('next');
                if(pageNumber == numberOfPages - 1){
              pageNumber = pageNumber + 1;
            $('#page-number').val(pageNumber);
            }else if(pageNumber < numberOfPages){
              pageNumber = parseInt(pageNumber) + 2;
            $('#page-number').val(pageNumber);
            }
								break;
						}
          });

          //Page input event
          $('#page-number').keydown(function (e) {
            if($('#page-number').val() > numberOfPages){
              $('#page-number').val(numberOfPages);
            }
            if (e.keyCode == 13){
              if($('#page-number').val() < 1){
                $('#page-number').val(1)
              }
              config.$bookBlock.bookblock('jump', Math.ceil($('#page-number').val() /2));
              $('#page-number').val($('#page-number').val());
              pageNumber = $('#page-number').val();
            }
            
            });
          
          $('#number-pages').text(numberOfPages);
          $('#page-number').val(pageNumber);

				};

			return { init: init };

		})();
	</script>
	<script>
		Page.init();
	</script>
</body>

</html>