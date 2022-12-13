<!DOCTYPE html>
<html lang="en">
<head>
  <?php 
  $title = "Biography";
  include("includes/main_head.php");
  ?>
<link rel="stylesheet" href="css/timeline.css" media="screen" />

</head>
<body>
  <?php include("includes/nav.php");?>
  <?php 
      $page = "A Brief Biography of William Bache";
      include("includes/page_header.php");
  ?>
  <?php 
        $data = file_get_contents('data/timeline.json',true);
        $array = json_decode($data, true);
    ?>
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

    <!-- MODAL -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4">
          <button hidden id="timeline-modal" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#timelineeModal">Open Modal</button>
        </div>
      </div>
      
      <div class="modal fade" id="timelineeModal" tabindex="-1" aria-labelledby="timelineModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen" style="margin:0!important; top:-10%">
        <div class="modal-content">
          <div class="row">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div id='modal-timeline'></div>
        </div>
      </div>
    </div>
  </div>
<!-- END MODAL -->
<!-- BIOGRAPHY-->
<section class="section-padding section-bg pt-5 biography-section">
    
  <div class="container">
<p dir="ltr" style=" text-indent: 40px;">
        William Bache (1771–1845) emigrated from England to Philadelphia in May
    1793 with no apparent training as an artist. Yet from 1803 to 1812, he
    pursued a prolific and successful career as an itinerant maker of
    silhouette portraits, traveling up and down the eastern seaboard, from
    Maine to Virginia, and further south to Louisiana and Cuba. Working
    sporadically over that nine-year period, he produced thousands of shaded
    profiles with the aid of a physiognotrace, a mechanical device used to
    trace the outline of a person’s face (fig. <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.1104">1</span>). Bache and two partners,
    Augustus Day and Isaac Todd, had patented their physiognotrace on June 15,
    1803. According to Todd, it differed from similar devices in that it “can
    trace the human face with ‘mathematical correctness’ without touching it.”
</p>
<br>
<!-- MOBILE TIMELINE-->
<div class="container vertical-container">
<ul style="width:100%; margin-left:0" class="vertical-dates vertical-time">
          <?php for ($i = 0; $i < 23; $i++): ?>
            <?php $hidden = $array[$i]['start_date']['hidden'];
              if($array[$i]['start_date']['hidden'] == 'true'){
                  $hidden= 'hidden';
              }else{
                $hidden = "";
              }
            ?>
            <li <?php echo $hidden ?> class="group-<?php echo $array[$i]['start_date']['id'] ?> nav-dates"><a href="<?php echo $array[$i]['start_date']['id'] ?>"><?php echo $array[$i]['start_date']['year'] ?></a></li>
          <?php endfor; ?>
  </ul>
  <div id="vertical-timeline">
    <ul class="vertical-dates vertical-times">
      <?php for ($i = 0; $i < count($array); $i++): ?>
        <?php 
          $seleced = "";
          if($i == 0){
            $selected = "vertical-selected";
          }
          ?>
            <li class="<?php echo $array[$i]['start_date']['id'], " ",$array[$i]['group'].'-'.'mobile', $seleced ?>"><a href="#<?php echo $array[$i]['start_date']['id'] ?>"><span class="vertical-span"><?php echo $array[$i]['start_date']['month'] ?></span><?php echo $array[$i]['start_date']['year'] ?></a></li>
        <?php endfor; ?>
    </ul>
    <ul id="vertical-issues">
        <?php for ($i = 0; $i < count($array); $i++): ?>
          <?php 
          $seleced = "";
          if($i == 0){
            $selected = "vertical-selected";
          }
          ?>
        <li id="<?php echo $array[$i]['start_date']['id'] ?>" class="<?php echo $selected?>">
          <h1 style="padding: 0 40px"><?php echo $array[$i]['text']['headline'] ?></h1>
          <p style="padding: 0 30px">- <?php echo $array[$i]['start_date']['month']." ".$array[$i]['start_date']['day'].", ".$array[$i]['start_date']['year']?> </p>
          <div class="slider">
            <p><?php echo $array[$i]['text']['text'] ?></p>
          </div>
        </li>
        <?php endfor; ?>
    </ul>
    <a href="#" id="vertical-next">+</a>
    <a href="#" id="vertical-prev">-</a>
  </div>

  <ul style="width:100%; margin-left:0" class="vertical-dates vertical-time">
          <?php for ($i = 23; $i < count($array); $i++): ?>
            <?php $hidden = $array[$i]['start_date']['hidden'];
              if($array[$i]['start_date']['hidden'] == 'true'){
                  $hidden= 'hidden';
              }else{
                $hidden = "";
              }
            ?>
            <li <?php echo $hidden ?> class="group-<?php echo $array[$i]['start_date']['id'] ?> nav-dates"><a href="<?php echo $array[$i]['start_date']['id'] ?>"><?php echo $array[$i]['start_date']['year'] ?></a></li>
          <?php endfor; ?>
  </ul>
</div>
<!-- END MOBILE TIMELINE-->
 
<!-- TIMELINE-->
  <div class="container">
      <ul id="dates" class="bottom-date dates" style="width:100%; margin-left:0">
          <?php for ($i = 0; $i < count($array); $i++): ?>
            <?php $hidden = $array[$i]['start_date']['hidden'];
              if($array[$i]['start_date']['hidden'] == 'true'){
                  $hidden= 'hidden';
              }else{
                $hidden = "";
              }
            ?>
            <li <?php echo $hidden ?> class="group-<?php echo $array[$i]['start_date']['id'] ?> nav-dates"><a href="<?php echo $array[$i]['start_date']['id'] ?>"><?php echo $array[$i]['start_date']['year'] ?></a></li>
          <?php endfor; ?>
        </ul>
  </div>
  <div id="timeline">
      <div class="container timeline-group">
          <ul id="issues">
                <?php for ($i = 0; $i < count($array); $i++): ?>
                  <li id="<?php echo $array[$i]['start_date']['id'] ?>">
                    <h1 style="padding: 0 40px"><?php echo $array[$i]['text']['headline'] ?></h1>
                    <p class="timeline-date" style="padding: 0 30px">- <?php echo $array[$i]['start_date']['month']." ".$array[$i]['start_date']['day'].", ".$array[$i]['start_date']['year']?> </p>
                    <div class="slider">
                    <p><?php echo $array[$i]['text']['text'] ?></p>
                      </div>
                  </li>
                <?php endfor; ?>
            
                
          </ul>
              <a href="#" id="next"><i class="bi-arrow-right"></i></a>
              <a href="#" id="prev">-</a>

            <div class="dates-div">
            <ul id="" class="dates text-dark timeline-dates" style="margin-left:0">
              <?php for ($i = 0; $i < count($array); $i++): ?>
                <li class="<?php echo $array[$i]['start_date']['id'], " ",$array[$i]['group']  ?>"><a href="#<?php echo $array[$i]['start_date']['id'] ?>"><span><?php echo $array[$i]['start_date']['month'] ?></span> <?php echo $array[$i]['start_date']['year'] ?></a></li>
              <?php endfor; ?>
              </ul>
            </div>
      </div>
   </div>
   <!-- END TIMELINE-->

   <!-- REGION LEGEND -->
   <div class="container regions-container">
        <ul class="regions" id="dates">
          <li  id="england-dates" >England</li>
          <li id="northeast-dates" >U.S. Northeast</li>
          <li id="southeast-dates" >U.S. Southeast</li>
          <li id="caribbean-dates">Caribbean</li>
        </ul>
        <small class="mt-5"><i>Click to specify region</i></small>
    </div>
    <!-- END REGION LEGEND -->


  <br>
<p dir="ltr" class="biography-content" style=" text-indent: 40px;" style="margin-top:120px">
    On August 16, 1803, Bache and Todd advertised that they had “commenced
    taking likenesses in profile” in Baltimore, offering customers “four
    correct profiles for 25 cents.” They used the physiognotrace to outline a
    sitter’s profile on a piece of light-colored paper that was folded in half
    twice. When they cut out the tracing, four copies were produced (fig. <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.50">2</span>).
    Each “hollow-cut” sheet was adhered to a dark ground, creating the
    appearance of a black profile on a white background
</p>
<br>
<p dir="ltr" style=" text-indent: 40px;">
    Bache left Baltimore and took his silhouette practice on the road to
    Virginia. From November 1803 to June 1804, he advertised his presence in
    Richmond, Petersburg, and Fredericksburg. He also began keeping a record of
    his work in a ledger book, blackening one of the four cut-out heads left
    over from his hollow-cut technique and pasting it into the album above a
    number that corresponded with an index of numbered names at the back of the
    book (fig. <span class="article-figure" data-tippy-content="Click to go to album."><a href="/book.php">3</a></span>). As Bache traveled from place to place, the ledger book
    provided samples of his past work and attested to his bona fides. President
    Thomas Jefferson, former president George Washington, and First Lady Martha
    Washington are among the celebrated figures represented on the first page
    of Bache’s album (figs. <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.62">4</span>, <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.6">5</span>).
</p>
<p dir="ltr" style=" text-indent: 40px;">
    Sensing an opportunity in the Louisiana Purchase of 1803, Bache reunited
    with Isaac Todd and together they journeyed to New Orleans, a bustling,
    polyglot town with a constant stream of visitors. On November 16, 1804,
    Bache and Todd published advertisements in English and French offering
    “Four correct likenesses, neatly cut in Vellum paper for one dollar.” The
    index of Bache’s ledger book attests to the great variety of his patrons in
    New Orleans, which included American, French, Spanish, and British men,
    women, and children, with several military figures in bicorne hats (fig. <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.223">6</span>,
    <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.702">7</span>).
</p>
<br>
<p dir="ltr" style=" text-indent: 40px;">
    Toward the end of 1804, Bache relocated to Havana, drawing on the Cuban
    connections of his New Orleans patrons in his pursuit of a new, untapped
    market. The first 75 silhouettes in Bache’s ledger book were made in
    Virginia. The next 672 were made in New Orleans. The remaining 1,060
    unnumbered and unnamed silhouettes were most likely made in Cuba. They
    represent even greater diversity than his New Orleans clientele, including
    Catholic priests in birettas, women with elaborate floral hairdressings,
    and numerous individuals of African heritage (figs. <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.1042">8</span>, <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.986">9</span>, <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.1599">10</span>, <span class="article-figure" data-tippy-content="Click to view figure." data-link="edanmdm:npg_S_NPG.2002.184.1630">11</span>).
    According to a newspaper editorial published in Havana in 1806, Bache
    enjoyed phenomenal success in the city, going from house to house with his
    physiognotrace and making silhouettes of everyone in the family, “right
    down to the cat.” Twentieth-century historians credit Bache with initiating
    the tradition of caricature art in Cuba.
</p>
<br>
<p dir="ltr" style=" text-indent: 40px;">
    Bache returned from Havana to Philadelphia in May 1806 and was naturalized
    as a U.S. citizen in October. From July 1808 through June 1811, he revived
    his career as an itinerant silhouette artist, traveling from town to town
    in Massachusetts, Connecticut, Rhode Island, New Hampshire, and Maine.
    Following his marriage in November 1811, he spent the first three months of
    1812 working as a silhouette artist in Philadelphia, but by the end of the
    year, he had moved to Wellsboro, Pennsylvania where he began a new career
    as the proprietor of a general store. One of the most respected members of
    the community, he became a founding trustee of the Wellsboro Academy in
    1817 and served as the town’s postmaster from 1822 until his death on July
    9, 1845.
</p>
<br/>
<p dir="ltr">
    Illustration List
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.1104">
    <a>Fig. 1 Unidentified Man (possibly William Bache), S/NPG.2002.184.1104</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.50">
    <a>Fig. 2 Unidentified Woman, NPG.2002.184.50</a>
</p>
<p dir="ltr" class="article-hyperlink">
    <a href="/book.php">Fig. 3 A detail from Bache's album showing a group of numbered silhouettes</a>
  </p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.62">
    <a>Fig. 4 Thomas Jefferson; NPG.2002.184.62</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.6">
    <a>Fig. 5 Martha Washington; NPG.2002.184.6</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.223">
    <a>Fig. 6 Unidentified Girl; S/NPG.2002.184.223</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.702">
    <a>Fig. 7 Unidentified Man (possibly Sgt. Matthew Boon); S/NPG.2002.184.702</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.1042">
    <a>Fig. 8 Unidentified Woman; S/NPG.2002.184.1042</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.986">
    <a>Fig. 9 Unidentified Man, S/NPG.2002.184.986</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.1599">
    <a>Fig.10 Unidentified Woman, S/NPG.2002.184.1599</a>
</p>
<p dir="ltr" class="article-link" data-link="edanmdm:npg_S_NPG.2002.184.1630">
    <a>Fig. 11 Unidentified Man, S/NPG.2002.184.1630</a>
</p>
<div>
    <br/>
</div>
  </div>
</section>
<!-- END BIOGRAPHY-->
<?php include("includes/page_footer.php");?>
<?php include("includes/main_js.php");?>
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
<script src="js/jquery.timelinr-0.9.7.js"></script>
<script src="js/jquery.timelinr-mobile.js"></script>
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
<script>
  

    timelinrMobile({
        orientation:  'vertical',
        issuesSpeed:  300,
        datesSpeed:   100,
        arrowKeys:    'true',
        startAt:      3
      });

    timelinr({arrowKeys:    'true',});
 
    //Mobile timeline
    
    
tippy('.article-figure, #expand-timeline', { arrow: true });

//Hide timeline behind modal
// $('#expand-timeline').click(function(){
//   $('#timeline-modal').click();
//   $('.time-line').css('z-index', '-1');
// })

// //Bring back timeline when modal is closed
// $('#exampleModal, #timelineeModal').on('hide.bs.modal', function(){
//       setTimeout(() => {
//     $('.time-line').css('z-index', '1');
//   }, 300);
// });

$('.article-figure, .article-link').click(function(){
    var data = {
			silhouette: $(this).attr('data-link'),
		};
        $.ajax({
				type: "POST",
				url: "/data/index.php",
				data: data
			}).done(function (msg) {
				var jsonData = JSON.parse(msg);
					console.log(jsonData);
					let image = jsonData.content.descriptiveNonRepeating.online_media.media[0].guid;
					$('#silhouette-name').text(jsonData.title);
					$('#artist-name').text(jsonData.content.freetext.name[0].content);
					$('#sitter').text(jsonData.content.freetext.name[1].content);
					$('#medium').text(jsonData.content.freetext.physicalDescription[0].content);
                    $('#dimensions').text(jsonData.content.freetext.physicalDescription[1].content);
                    if(data.silhouette == 'edanmdm:npg_S_NPG.2002.184.50'){
                        $('#book-closed').text('');
                        $('#book-open').text('');
                    }else{
                        $('#book-closed').text(jsonData.content.freetext.physicalDescription[2].content);
                        $('#book-open').text(jsonData.content.freetext.physicalDescription[3].content);
                    }
					$('#silhouette-date').text(jsonData.content.freetext.date[0].content);
					$('#credit-line').text(jsonData.content.freetext.physicalDescription[0].content);
					$('#obj-number').text(jsonData.content.freetext.identifier[0].content);
					$("#result").attr("src", image);
						$('#bache-modal').click();
            $('.time-line').css('z-index', '-1');

				})

      });
      
      
$("#england-dates" ).on( "click", function() {
  $(this).toggleClass( "region-highlight");
    $('.England').toggleClass( "highlight");
    $('.England-mobile').toggleClass( "mobile-highlight");
});
$("#northeast-dates" ).on( "click", function() {
  $(this).toggleClass( "region-highlight");
  $('.Northeast-mobile').toggleClass( "mobile-highlight");
});
$("#southeast-dates" ).on( "click", function() {
  $(this).toggleClass( "region-highlight");
    $('.Southeast').toggleClass( "highlight");
    $('.Southeast-mobile').toggleClass( "mobile-highlight");
});
$("#caribbean-dates" ).on( "click", function() {
  $(this).toggleClass( "region-highlight");
    $('.Caribbean').toggleClass( "highlight");
    $('.Caribbean-mobile').toggleClass( "mobile-highlight");
});
</script>
</body>
</html>