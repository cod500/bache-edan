<!DOCTYPE html>
<html lang="en">
<head>
<?php 
$title = "Timeline";
include("includes/main_head.php");
?>
 <link rel="stylesheet" href="css/timeline.css" media="screen" />
</head>


<body>
    <?php 
              $data = file_get_contents('data/timeline.json',true);
              $array = json_decode($data, true);
      ?>
  <div id="timeline">
    <ul id="dates" class="text-dark" style="margin-left:0">
    <?php for ($i = 0; $i < count($array); $i++): ?>
      <li class="<?php echo $array[$i]['group']?>"><a href="#<?php echo $array[$i]['start_date']['id'] ?>"><?php echo $array[$i]['start_date']['year'] ?></a></li>
    <?php endfor; ?>
    </ul>

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
    <!-- <div id="grad_left"></div>
    <div id="grad_right"></div> -->
    <a href="#" id="next"><i class="bi-arrow-right"></i></a>
    <a href="#" id="prev">-</a>
  </div>
 <div class="container">
 <ul id="dates" class="bottom-date" style="width:100%; margin-left:0">
    <?php for ($i = 0; $i < count($array); $i++): ?>
      <?php $hidden = $array[$i]['start_date']['hidden'];
        if($array[$i]['start_date']['hidden'] == 'true'){
            $hidden= 'hidden';
        }else{
          $hidden = "";
        }
      ?>
      <li <?php echo $hidden ?>><a href="<?php echo $array[$i]['start_date']['id'] ?>"><?php echo $array[$i]['start_date']['year'] ?></a></li>
    <?php endfor; ?>
  </ul>
 </div>
<br>
 <div class="container">
 <ul class="regions" id="dates" style="width:100%; margin-left:0">
 <li  id="england-dates" style="margin-right:140px!important">England</li>
 <li id="northeast-dates" style="margin-right:140px!important">Northeast</li>
 <li id="southeast-dates" style="margin-right:140px!important">Southeast</li>
 <li id="caribbean-dates"style="margin-right:140px!important">Caribbean</li>
  </ul>
 </div>

<?php include("includes/main_js.php");?>
<script src="js/jquery.timelinr-0.9.7.js"></script>
<script>
    $(function(){
      $().timelinr({
        arrowKeys: 'true'
      })
    });


$("#england-dates" ).on( "click", function() {
  $(this).toggleClass( "highlight");
    $('.England').toggleClass( "highlight");
});
$("#northeast-dates" ).on( "click", function() {
  $(this).toggleClass( "highlight");
    $('.Northeast').toggleClass( "highlight");
});
$("#southeast-dates" ).on( "click", function() {
  $(this).toggleClass( "highlight");
    $('.Southeast').toggleClass( "highlight");
});
$("#caribbean-dates" ).on( "click", function() {
  $(this).toggleClass( "highlight");
    $('.Caribbean').toggleClass( "highlight");
});
  </script>

</body>
</html>