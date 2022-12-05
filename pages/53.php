<?php 

// Get the contents of the JSON file 
// Convert to array 
$data = file_get_contents(dirname(__DIR__).'/data/bache.json',true);
$array = json_decode($data, true);

//Image for page
$image = $array[52]['image'];

?>

<div class="panzoom-odd">
    <div class="">
        <img class="fixed-height"src=<?php echo $image?> usemap="#page-53" />
    </div>
</div>
        
<map name="page-53">
    <?php for ($i = 0; $i < count($array[52]["silhouettes"]); $i++): ?>
    <?php $id = 531 + $i?>
            <area shape="rect" class="tooltipLink" coords=<?php echo $array[52]["silhouettes"][$i]["coordinates"]?> data-coords=<?php echo $array[52]["silhouettes"][$i]["coordinates"]?> data-id=<?php echo $id ?> data-tooltip="<?php print $array[52]["silhouettes"][$i]["url"] ?>">
    <?php endfor; ?>
</map>