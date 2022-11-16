<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Ledger book of William Bache</title>
	<meta name="description" content="Bookblock: A Content Flip Plugin - Demo 4" />
	<meta name="keywords" content="javascript, jquery, plugin, css3, flip, page, 3d, booklet, book, perspective" />
	<meta name="author" content="Codrops" />
	<link rel="shortcut icon" href="../favicon.ico">
	<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
	<script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link rel="stylesheet" href="css/book.css">
	<link rel="stylesheet" href="css/crop.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/default.css" /> -->
	<link rel="stylesheet" type="text/css" href="css/bookblock.css" />
	<script src="js/modernizr.custom.js"></script>
</head>

<body>
	<img crossorigin="Anonymous" src="" class="crop-image" alt=""/>
<header>
	<div class="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center" style="min-width:100%; background:#527081">
		<a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="https://tailblocks.cc" target="_blank">
		<span class="ml-3 text-white text-xl">Bache</span>
		</a>
		<nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
		<a class="mr-5 text-white hover:text-gray-900">First Link</a>
		<a class="mr-5 text-white hover:text-gray-900">Second Link</a>
		<a class="mr-5 text-white hover:text-gray-900">Third Link</a>
		<a class="mr-5 text-white hover:text-gray-900">Fourth Link</a>
		</nav>
		<button class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">Button
		<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
			<path d="M5 12h14M12 5l7 7-7 7"></path>
		</svg>
		</button>
	</div>
</header>
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
          <button class="myButton">My Button</button>

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
<footer class="text-gray-700 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
      <div class="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
    </div>
  </div>
  <div class="border-t border-gray-200">
    <div class="container px-5 py-8 flex flex-wrap mx-auto items-center">
      <div class="flex md:flex-no-wrap flex-wrap justify-center md:justify-start">
        <input class="sm:w-64 w-40 bg-gray-100 rounded sm:mr-4 mr-2 border border-gray-400 focus:outline-none focus:border-indigo-500 text-base py-2 px-4" placeholder="Placeholder" type="text">
        <button class="inline-flex text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-800 rounded">Button</button>
        <p class="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          <br class="lg:block hidden">Lorem ipsum dolor
        </p>
      </div>
      <span class="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
        <a class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
  <div class="bg-gray-200">
    <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      
      <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
    </div>
  </div>
</footer>

  <!-- <script src="https://code.jquery.com/jquery-2.2.4.js"></script> -->
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