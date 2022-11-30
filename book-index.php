<!DOCTYPE html>
<html lang="en">
<head>
<?php 
$title = "Ledger Book Index";
include("includes/main_head.php");
?>
 
</head>
<body>
<?php include("includes/nav.php");?>
<?php 
        $page = "Ledger Book Index";
        include("includes/page_header.php");
        ?>
<!-- OTHER COLLECTIONS-->
<?php 
    $data = file_get_contents('data/bache.json',true);
    $array = json_decode($data, true);
    ?>

<section class="section-padding section-bg pt-5 biography-section">
<div class="container">
    <table id="" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Collection</th>
                    <th>Sitter</th>
                    <th>Accession number</th>
                </tr>
            </thead>
            <tbody>
           
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