<!doctype html>
<html>
<head>
<title>EDAN</title>
</head>
<body>

<?php
require 'edan.php';

$server = 'https://edan.si.edu';
$app_id = 'QUOTIENTTEST';
$key = 'b846922f298366c4a2c236215d28c33e622f3595';
$tier = 2;

$edan = new EDANInterface($server, $app_id, $key, $tier);

$service = '/content/v2.0/content/getContent.htm';
$parameters = [
  'url' => 'edanmdm:npg_S_NPG.2002.184.5',
];
$uri = http_build_query($parameters);

$info = [];
$results = $edan->sendRequest($uri, $service, FALSE, $info);
$json = json_decode($results);
echo '<pre>';

var_dump($results);

echo '</pre>';
?>
</body>
</html>
