<?php
require 'edan.php';

$server = 'https://edan.si.edu';
$app_id = 'QUOTIENTTEST';
$key = 'b846922f298366c4a2c236215d28c33e622f3595';
$tier = 2;
$silhouette = '';

$silhouetteUrl = $_POST['silhouette'];

$edan = new EDANInterface($server, $app_id, $key, $tier);

$service = '/content/v2.0/content/getContent.htm';
$parameters = [
  'url' => $silhouetteUrl,
];
$uri = http_build_query($parameters);

$info = [];
$results = $edan->sendRequest($uri, $service, FALSE, $info);
echo $results;
?>

