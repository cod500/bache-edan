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
    <ul id="dates" class="text-dark">
    <?php for ($i = 0; $i < count($array); $i++): ?>
      <li><a href="#<?php echo $array[$i]['start_date']['id'] ?>"><?php echo $array[$i]['start_date']['year'] ?></a></li>
    <?php endfor; ?>
    </ul>

    <ul id="issues">
      <?php for ($i = 0; $i < count($array); $i++): ?>
        <li id="<?php echo $array[$i]['start_date']['id'] ?>">
          <h1><?php echo $array[$i]['start_date']['year'] ?></h1>
          <div class="slider text-center">
          <?php echo $array[$i]['text']['text'] ?>
            </div>
        </li>
      <?php endfor; ?>
   
      
    </ul>
    <!-- <div id="grad_left"></div>
    <div id="grad_right"></div> -->
    <a href="#" id="next"><i class="bi-arrow-right"></i></a>
    <a href="#" id="prev">-</a>
  </div>
  
  <!-- <ul id="dates">
    
    <li><a href="#1900">1771</a></li>
      <li hidden><a href="#1930">1793</a></li>
      <li hidden><a href="#1944">1803</a></li>
      <li hidden><a href="#1950">1804</a></li>
      <li hidden><a href="#1971">1806</a></li>
      <li hidden><a href="#1977">1808</a></li>
      <li><a href="#1989">1989</a></li>
      <li><a href="#1999">1999</a></li>
      <li><a href="#2001">2001</a></li>
      <li><a href="#2011">2011</a></li>
      <li hidden><a href="#2011-2">2011</a></li>
  </ul> -->

  <ul id="dates" class="bottom-date" style="width:100%">
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


<?php include("includes/main_js.php");?>
<script src="js/jquery.timelinr-0.9.7.js"></script>
<script>
    $(function(){
      $().timelinr({
        arrowKeys: 'true'
      })
    });
  </script>

</body>
</html>