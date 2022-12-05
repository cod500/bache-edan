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
<?php 
        $collectionsDataOne = file_get_contents('data/collections1.json',true);
        $collectionOne = json_decode($collectionsDataOne, true);
        $collOneLength = count($collectionOne);

        $collectionsDataTwo = file_get_contents('data/collections2.json',true);
        $collectionTwo = json_decode($collectionsDataTwo, true);
        $collTwoLength = count($collectionTwo);
    ?>

<section class="section-padding section-bg pt-5 biography-section">
<div class="container table-container">
    <nav>
    <div class="nav nav-tabs table-tabs mb-3" id="nav-tab" role="tablist">
        <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Collections One</a>
        <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Collections Two</a>
    </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
    <table id="" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Collection</th>
                    <th>Sitter</th>
                    <th>Accession number</th>
                </tr>
            </thead>
            <tbody>
                <?php for ($i = 0; $i < $collOneLength; $i++): ?>
                    <tr>
                        <td><?php echo $collectionOne[$i]["Collection"]?></td>
                        <td><?php echo $collectionOne[$i]["Sitter"]?></td>
                        <td><?php echo $collectionOne[$i]["Accession number"] ?></td>
                    </tr>
                <?php endfor; ?>
            </tbody>
    </table>
    </div>
    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    <table id="" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Accession number</th>
                    <th>Sitter</th>
                    <th>Artist</th>
                    <th>Collection</th>
                    <th>Date</th>
                    <th>Medium</th>
                    <th>Dimensions</th>
                </tr>
            </thead>
            <tbody>
                <?php for ($i = 0; $i < $collTwoLength; $i++): ?>
                    <tr>
                        <td><?php echo $collectionTwo[$i]["Accession number"]?></td>
                        <td><?php echo $collectionTwo[$i]["Sitter"]?></td>
                        <td><?php echo $collectionTwo[$i]["Artist"] ?></td>
                        <td><?php echo $collectionTwo[$i]["Collection"] ?></td>
                        <td><?php echo $collectionTwo[$i]["Date"] ?></td>
                        <td><?php echo $collectionTwo[$i]["Medium"] ?></td>
                        <td><?php echo $collectionTwo[$i]["Dimensions"] ?></td>
                    </tr>
                <?php endfor; ?>
            </tbody>
    </table>
    </div>
    </div>
  
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