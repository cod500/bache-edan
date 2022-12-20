<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <link rel="shortcut icon" href="https://npg.si.edu/favicon.ico" type="image/vnd.microsoft.icon" />
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Silhouettes in Other Collections</title>
    <!-- CSS FILES -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/datatables.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="css/bache.css" rel="stylesheet">
    <link href="css/modalzoom.css" rel="stylesheet">
    <link href="css/npg.css" rel="stylesheet">
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
<div class="table-container">
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
                    <th>Collection</th>
                    <th>Medium</th>
                    <th>Dimensions</th>
                </tr>
            </thead>
            <tbody>
                <?php for ($i = 0; $i < $collTwoLength; $i++): ?>
                    <tr>
                        <td><?php echo $collectionTwo[$i]["Accession number"]?></td>
                        <td><?php echo $collectionTwo[$i]["Sitter"]?></td>
                        <td><?php echo $collectionTwo[$i]["Collection"] ?></td>
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