<?php 

// Get the contents of the JSON file 
// Convert to array 
$data = file_get_contents(dirname(__DIR__).'/data/bache.json',true);
$array = json_decode($data, true);

//Image for page
$image = $array[24]['image'];

?>

<div class="panzoom-odd">
    <div class="cut-seam-odd">
        <img class="fixed-height"src=<?php echo $image?> usemap="#page-25" />
    </div>
</div>
        
<map name="page-25">
    <?php for ($i = 0; $i < count($array[24]["silhouettes"]); $i++): ?>
    <?php $id = 251 + $i?>
            <area shape="rect" class="tooltipLink" coords=<?php echo $array[24]["silhouettes"][$i]["coordinates"]?> data-coords=<?php echo $array[24]["silhouettes"][$i]["coordinates"]?> data-id=<?php echo $id ?> data-tooltip="<?php print $array[4]["silhouettes"][$i]["url"] ?>">
    <?php endfor; ?>
</map>