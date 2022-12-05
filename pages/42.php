<?php 

// Get the contents of the JSON file 
// Convert to array 
$data = file_get_contents(dirname(__DIR__).'/data/bache.json',true);
$array = json_decode($data, true);

//Image for page
$image = $array[41]['image'];

?>

<div class="panzoom-even">
    <div class="cut-seam-even" id="seam-42">
        <img class="fixed-height"src=<?php echo $image?> usemap="#page-42" />
    </div>
</div>
        
<map name="page-42">
    <?php for ($i = 0; $i < count($array[41]["silhouettes"]); $i++): ?>
    <?php $id = 421 + $i?>
            <area shape="rect" class="tooltipLink" coords=<?php echo $array[41]["silhouettes"][$i]["coordinates"]?> data-coords=<?php echo $array[41]["silhouettes"][$i]["coordinates"]?> data-id=<?php echo $id ?> data-tooltip="<?php print $array[41]["silhouettes"][$i]["url"] ?>">
    <?php endfor; ?>
</map>