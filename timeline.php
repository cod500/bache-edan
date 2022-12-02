<!DOCTYPE html>
<html lang="en">
<head>
<?php 
$title = "Timeline";
include("includes/main_head.php");
?>
<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
</head>
<body>
  <div id='timeline-embed'></div>
 <!-- END TIMELINE-->
  <br>

<?php include("includes/main_js.php");?>
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
<script>

      
    var options = {
      script_path:                "",
      height:                     100,
      width:                      100,
      initial_zoom:               1,
      scale_factor:               0.5,              // How many screen widths wide should the timeline be
      zoom_sequence:89,
      layout:                     "portrait",    // portrait or landscape
      timenav_position:           "bottom",       // timeline on top or bottom
      // optimal_tick_width:         100,            // optimal distance (in pixels) between ticks on axis
      // base_class:                 "",
      // timenav_height:             150,
      // timenav_height_percentage:  25,             // Overrides timenav height as a percentage of the screen
      // timenav_height_min:         150,            // Minimum timenav height
      // marker_height_min:          30,             // Minimum Marker Height
      // marker_width_min:           100,            // Minimum Marker Width
      // marker_padding:             5,              // Top Bottom Marker Padding
      // start_at_slide:             0,
      // menubar_height:             0,
      // skinny_size:                650,
      // relative_date:              false,          // Use momentjs to show a relative date from the slide.text.date.created_time field
      // use_bc:                     false,          // Use declared suffix on dates earlier than 0
      // // animation
      // duration:                   1000,
      // // interaction
      // dragging:                   true,
      // trackResize:                true,
      // map_type:                   "stamen:toner-lite",
      // slide_padding_lr:           100,            // padding on slide of slide
      // slide_default_fade:         "0%",           // landscape fade

      // api_key_flickr:             "",             // Flickr API Key
      // language:                   "en"        
};
  var timeline = new TL.Timeline('timeline-embed',
                                 'https://docs.google.com/spreadsheets/d/1meNa1_81w3_u6F2QJi2UWnzjTFZukRP9qjSCVWe2O6I/edit#gid=0',
                                 options);
</script>
</body>
</html>