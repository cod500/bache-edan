<!doctype html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="author" content="Made with ❤ by Jorge Epuñan - @csslab">
  
  <title>jQuery Timelinr - Dando vida al tiempo</title>
  <link rel="stylesheet" href="css/timeline-vertical.css" media="screen" />
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script src="js//jquery.timelinr-mobile.js"></script>
  <script>
    $(function(){
      $().timelinr({
        orientation:  'vertical',
        issuesSpeed:  300,
        datesSpeed:   100,
        arrowKeys:    'true',
        startAt:      3
      })
    });
  </script>

</head>

<body>
  
  <div id="vertical-timeline">
    <ul id="vertical-dates">
      <li><a href="#1900" class="vertical-selected">1900</a></li>
      <li><a href="#1930">1930</a></li>
      <li><a href="#1944">1944</a></li>
      <li><a href="#1950">1950</a></li>
      <li><a href="#1971">1971</a></li>
      <li><a href="#1977">1977</a></li>
      <li><a href="#1989">1989</a></li>
      <li><a href="#1999">1999</a></li>
      <li><a href="#2001">2001</a></li>
      <li><a href="#2011">2011</a></li>
    </ul>
    <ul id="vertical-issues">
      <li id="1900" class="vertical-selected">
        <h1>1900</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1930">
        <h1>1930</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1944">
        <h1>1944</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1950">
        <h1>1950</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1971">
        <h1>1971</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1977">
        <h1>1977</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1989">
        <h1>1989</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="1999">
        <h1>1999</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="2001">
        <h1>2001</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
      <li id="2011">
        <h1>2011</h1>
        <p>Donec semper quam scelerisque tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices mauris, eu consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla porta ligula.</p>
      </li>
    </ul>
    <!-- <div id="grad_top"></div>
    <div id="grad_bottom"></div> -->
    <a href="#" id="vertical-next">+</a>
    <a href="#" id="vertical-prev">-</a>
  </div>
</body>
</html>
