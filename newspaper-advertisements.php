<!doctype html>
<html lang="en">
    <head>
    <?php 
    $title = "Newspaper Advertisements";
    include("includes/main_head.php");?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.0/css/lightgallery-bundle.min.css" integrity="sha512-nUqPe0+ak577sKSMThGcKJauRI7ENhKC2FQAOOmdyCYSrUh0GnwLsZNYqwilpMmplN+3nO3zso8CWUgu33BDag==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <body id="section_1">
        <?php include("includes/nav.php");?>
        <?php 
        $page = "Newspaper Advertisements";
        include("includes/page_header.php");
        ?>
        <main>
            <!-- BACHE INTRO-->
            <section class="section-padding section-bg pt-5" id="section_2">
            <div class="header d-flex flex-column align-items-center">
</div>
<div class="cont">

  <div class="demo-gallery">
    <ul id="lightgallery">
      <li data-responsive="https://sachinchoolur.github.io/lightgallery.js/static/img/1-375.jpg 375, https://sachinchoolur.github.io/lightgallery.js/static/img/1-480.jpg 480, https://sachinchoolur.github.io/lightgallery.js/static/img/1.jpg 800" data-src="https://sachinchoolur.github.io/lightgallery.js/static/img/1-1600.jpg"
      data-sub-html="<p>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>">
        <a href="">
          <img class="img-responsive" src="https://sachinchoolur.github.io/lightgallery.js/static/img/thumb-1.jpg">
          <div class="demo-gallery-poster">
            <img src="https://sachinchoolur.github.io/lightgallery.js/static/img/zoom.png">
          </div>
        </a>
      </li>
      <li data-responsive="https://sachinchoolur.github.io/lightgallery.js/static/img/2-375.jpg 375, https://sachinchoolur.github.io/lightgallery.js/static/img/2-480.jpg 480, https://sachinchoolur.github.io/lightgallery.js/static/img/2.jpg 800" data-src="https://sachinchoolur.github.io/lightgallery.js/static/img/2-1600.jpg"
      data-sub-html="<p>Bowness Bay</h4><p>A beautiful Sunrise this morning taken En-route to Keswick not one as planned but I'm extremely happy I was passing the right place at the right time....</p>">
        <a href="">
          <img class="img-responsive" src="https://sachinchoolur.github.io/lightgallery.js/static/img/thumb-2.jpg">
          <div class="demo-gallery-poster">
            <img src="https://sachinchoolur.github.io/lightgallery.js/static/img/zoom.png">
          </div>
        </a>
      </li>
      <li data-responsive="https://sachinchoolur.github.io/lightgallery.js/static/img/13-375.jpg 375, https://sachinchoolur.github.io/lightgallery.js/static/img/13-480.jpg 480, https://sachinchoolur.github.io/lightgallery.js/static/img/13.jpg 800" data-src="https://sachinchoolur.github.io/lightgallery.js/static/img/13-1600.jpg"
      data-sub-html="<p>Sunset Serenity</h4><p>A gorgeous Sunset tonight captured at Coniston Water....</p>">
        <a href="">
          <img class="img-responsive" src="https://sachinchoolur.github.io/lightgallery.js/static/img/thumb-13.jpg">
          <div class="demo-gallery-poster">
            <img src="https://sachinchoolur.github.io/lightgallery.js/static/img/zoom.png">
          </div>
        </a>
      </li>
      <li data-responsive="https://sachinchoolur.github.io/lightgallery.js/static/img/4-375.jpg 375, https://sachinchoolur.github.io/lightgallery.js/static/img/4-480.jpg 480, https://sachinchoolur.github.io/lightgallery.js/static/img/4.jpg 800" data-src="https://sachinchoolur.github.io/lightgallery.js/static/img/4-1600.jpg"
      data-sub-html="<h4>Coniston Calmness</h4><p>Beautiful morning</p>">
        <a href="">
          <img class="img-responsive" src="https://sachinchoolur.github.io/lightgallery.js/static/img/thumb-4.jpg">
          <div class="demo-gallery-poster">
            <img src="https://sachinchoolur.github.io/lightgallery.js/static/img/zoom.png">
          </div>
        </a>
      </li>
    </ul>
  </div>
</div>
            </section>
            <!-- END BOOK LINK-->
        </main>
        <?php include("includes/page_footer.php");?>
        <!-- JAVASCRIPT FILES -->
        <?php include("includes/main_js.php");?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.0/lightgallery.min.js" integrity="sha512-pG+XpUdyBtp28FzjpaIaj72KYvZ87ZbmB3iytDK5+WFVyun8r5LJ2x1/Jy/KHdtzUXA0CUVhEnG+Isy1jVJAbA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script>
lightGallery(document.getElementById('lightgallery'), {
  autoplayFirstVideo: false,
        pager: false,
        galleryId: "nature",
        plugins: [],
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false
        }
} )
        </script>
    </body>
</html>