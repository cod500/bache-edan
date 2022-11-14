<?php 

// Get the contents of the JSON file 
// Convert to array 
$data = file_get_contents(dirname(__DIR__).'/data/bache.json',true);
$array = json_decode($data, true);

//Image for page
$image = $array[76]['image'];

?>

<div class="panzoom-odd">
    <div class="cut-seam-odd">
        <img class="fixed-height"src=<?php echo $image?> usemap="#page-77" />
    </div>
</div>
        
<map name="page-77">
    <?php for ($i = 0; $i < count($array[76]["silhouettes"]); $i++): ?>
    <?php $id = 771 + $i?>
            <area shape="rect" class="tooltipLink" coords=<?php echo $array[76]["silhouettes"][$i]["coordinates"]?> data-coords=<?php echo $array[76]["silhouettes"][$i]["coordinates"]?> data-id=<?php echo $id ?> data-tooltip="<?php print $array[76]["silhouettes"][$i]["url"] ?>">
    <?php endfor; ?>
</map>