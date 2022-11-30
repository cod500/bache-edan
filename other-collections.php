<!DOCTYPE html>
<html lang="en">
<head>
<?php 
$title = "Silhouettes in Other Collections";
include("includes/main_head.php");
?>
 
</head>
<body>
<?php include("includes/nav.php");?>
<?php 
        $page = "Silhouettes in Other Collections";
        include("includes/page_header.php");
        ?>
<!-- OTHER COLLECTIONS-->
<section class="section-padding section-bg pt-5 biography-section">
<div class="container">
    <?php 
        $data = file_get_contents('data/collections1.json',true);
        $array = json_decode($data, true);
        $length = count($array);
    ?>
<table id="" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Collection</th>
                <th>Sitter</th>
                <th>Accession number</th>
            </tr>
        </thead>
        <tbody>
        <?php for ($i = 0; $i < $length; $i++): ?>
            <tr>
                <td><?php echo $array[$i]["Collection"]?></td>
                <td><?php echo $array[$i]["Sitter"]?></td>
                <td><?php echo $array[$i]["Accession number"] ?></td>
            </tr>
    <?php endfor; ?>
        </tbody>
    </table>
</div>
</section>
<!-- END OTHER COLLECTIONS-->
<?php include("includes/page_footer.php");?>
<?php include("includes/main_js.php");?>
<script type="text/javascript" src="/js/datatables.js"></script>

<script>
$(document).ready(function () {
    $('table.display').DataTable({
        "pageLength": 25
    });
});
</script>
</body>
</html>