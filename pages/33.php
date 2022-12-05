<?php 

// Get the contents of the JSON file 
// Convert to array 
$data = file_get_contents(dirname(__DIR__).'/data/bache.json',true);
$array = json_decode($data, true);

//Image for page
$image = $array[32]['image'];

?>

<div class="panzoom-odd">
    <div class="cut-seam-odd" id="seam-33">
        <img class="fixed-height"src=<?php echo $image?> usemap="#page-33" />
    </div>
</div>
        
<map name="page-33">
    <?php for ($i = 0; $i < count($array[32]["silhouettes"]); $i++): ?>
    <?php $id = 331 + $i?>
            <area shape="rect" class="tooltipLink" coords=<?php echo $array[32]["silhouettes"][$i]["coordinates"]?> data-coords=<?php echo $array[32]["silhouettes"][$i]["coordinates"]?> data-id=<?php echo $id ?> data-tooltip="<?php print $array[32]["silhouettes"][$i]["url"] ?>">
    <?php endfor; ?>
</map>