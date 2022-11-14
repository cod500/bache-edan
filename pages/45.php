<?php 

// Get the contents of the JSON file 
// Convert to array 
$data = file_get_contents(dirname(__DIR__).'/data/bache.json',true);
$array = json_decode($data, true);

//Image for page
$image = $array[44]['image'];

?>

<div class="panzoom-odd">
    <div class="cut-seam-odd">
        <img class="fixed-height"src=<?php echo $image?> usemap="#page-45" />
    </div>
</div>
        
<map name="page-45">
    <?php for ($i = 0; $i < count($array[44]["silhouettes"]); $i++): ?>
    <?php $id = 451 + $i?>
            <area shape="rect" class="tooltipLink" coords=<?php echo $array[44]["silhouettes"][$i]["coordinates"]?> data-coords=<?php echo $array[44]["silhouettes"][$i]["coordinates"]?> data-id=<?php echo $id ?> data-tooltip="<?php print $array[44]["silhouettes"][$i]["url"] ?>">
    <?php endfor; ?>
</map>