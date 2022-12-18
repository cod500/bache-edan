<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="https://npg.si.edu/favicon.ico" type="image/vnd.microsoft.icon" />
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Ledger Book of William Bache</title>
    <!-- CSS FILES -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/datatables.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="css/bache.css" rel="stylesheet">
    <link href="css/modalzoom.css" rel="stylesheet">
    <link href="css/npg.css" rel="stylesheet">
  <link rel="stylesheet" href="css/book.css">
	<link rel="stylesheet" href="css/crop.css">
  <link rel="stylesheet" type="text/css" href="css/bookblock.css" />
</head>

<body>
<?php include("includes/nav.php");?>
        <?php 
        $page = "Ledger Book of William Bache";
        include("includes/page_header.php");
        ?>
  <main>
     <!-- MODAL -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4">
          <button hidden id="bache-modal" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Open Modal</button>
        </div>
      </div>
      
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="row">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body row">
          <div class="silhouette col-lg-5 col-12">
            <div class="silhouette__focus zoom-main"><img id="result" src="" alt="single silhouette image"/></div>
          </div>
          <div class="col-lg-7 col-12">
            <h2 class="text-center text-decoration-underline" id="silhouette-name"></h2>
           <div class="silhouette-content-block">
           <span>Artist:</span> <p id="artist-name"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Sitter:</span> <p id="sitter"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Medium:</span> <p id="medium"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Dimensions:</span> <p id="dimensions"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Book Closed:</span> <p id="book-closed"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Book Open:</span> <p id="book-open"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Date:</span> <p id="silhouette-date"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Credit Line:</span> <p id="credit-line"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Object Number:</span> <p id="obj-number"></p>
           </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- END MODAL -->
<!-- BOOK SECTION-->
    <div class="col-12 d-flex justify-content-center flex-wrap pt-5">
                                <a href="book-index.php">
                                <div class="text-center book-link">
                                    <p>View Book Index</p>
                                </div>
                                </a>
    </div>
    <section class="pt-3">
      <img crossorigin="Anonymous" src="" class="crop-image" alt=""/>
      <div class="">
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
                  <div class="bb-custom-side bb-left">
                  <?php include_once "./pages/$page.php";?>
                  </div>
                  <div class="bb-custom-side bb-right">
                  <?php include_once "./pages/$next.php";?>
                  <?php $page = $page + 2;?>
                  </div>
                </div>
                <?php endfor; ?>
            </div>

            <div class="book-controls text-center mt-4">
            <div class="zoom-controls mt-3 mb-3">
                <div>
                <button id="zoom-in-even"
                  class="px-4 py-2 my-2 md:my-6 py-2 px-8"  aria-label="Zoom In Left Page"><i class="bi-zoom-in" aria-hidden="false"></i>ZOOM
                  IN </button>
                <button id="zoom-out-even"
                  class="px-4 py-2 my-2 md:my-6 py-2 px-8"  aria-label="Zoom Out Left Page"><i class="bi-zoom-out" aria-hidden="false"></i>ZOOM
                  OUT</button>
                <!-- <input type="range" class="zoom-range"> -->
                <button
                  class="px-4 py-2 my-2 md:my-6 py-2 px-8" aria-label="Reset Left Page Zoom"
                  id="reset-even"><i class="bi-arrow-counterclockwise" aria-hidden="false"></i>RESET</button>
              </div>

              <div>
                <button id="zoom-in-odd"
                  class="px-4 py-2 my-2 md:my-6 py-2 px-8" aria-label="Zoom In Right Page"><i class="bi-zoom-in" aria-hidden="false"></i>ZOOM
                  IN </button>
                <button id="zoom-out-odd"
                  class="px-4 py-2 my-2 md:my-6 py-2 px-8"  aria-label="Zoom Out Right Page"><i class="bi-zoom-out" aria-hidden="false"></i>ZOOM
                  OUT</button>
                <!-- <input type="range" id="zoom-range" min="0.1" max="4" step="0.1" value="1"> -->
                <button
                  class="px-4 py-2 my-2 md:my-6 py-2 px-8"  aria-label="Reset Right Page Zoom"
                  id="reset-odd"><i class="bi-arrow-counterclockwise" aria-hidden="false"></i>RESET</button>
              </div>
            </div>
              <nav>
                <button id="bb-nav-first" aria-label="First Page" class="text-white border-0 py-1 px-6 focus:outline-none rounded-pill nav-btn"><i class="bi-skip-backward-fill text-white"></i></button>
                <button id="bb-nav-prev" aria-label="Previous Page" class="text-white border-0 py-1 px-6 focus:outline-none rounded-pill nav-btn"><i class="fa-solid fa-caret-left text-white"></i></i></button>
                <div id="book-pagination">
                <label for="page-number" >Page:</label> <input type="text" size="2" id="page-number" min="1" max="76"> <span
             >of  </span> <span id="number-pages"></span>
                </div>
                <button id="bb-nav-next" aria-label="Next Page" class="text-white border-0 py-1 px-6 focus:outline-none rounded-pill nav-btn"><i class="fa-solid fa-caret-right text-white"></i></button>
                <button id="bb-nav-last" aria-label="Last Page" class="text-white border-0 py-1 px-6 focus:outline-none rounded-pill nav-btn"><i class="bi-skip-forward-fill text-white"></i></button>
              </nav>
          </div>
          </div>
      </div>
    </section>
    <!-- END BOOK SECTION-->
  </main>

  <?php include("includes/page_footer.php");?>
  <!-- JAVASCRIPT FILES -->
  <?php include("includes/main_js.php");?>
    <script src="js/mapoid.js"></script>
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
    <script src="js/modernizr.custom.js"></script>
    <script src="js/jquery.bookblock.js"></script>
    <script src="js/jquery.rwdImageMaps.js"></script>
    <script src="js/panzoom.4.5.js"></script>
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
              // shadowSides: 0.8,
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