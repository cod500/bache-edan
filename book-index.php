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
<!-- BOOK INDEX-->
<?php 
    $data = file_get_contents('data/book-index.json',true);
    $array = json_decode($data, true);
    $indexCount = count($array);
    ?>

    <!-- MODAL -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4">
          <button hidden id="bache-modal" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Open Modal</button>
        </div>
      </div>
      
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="row">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body row">
          <div class="silhouette col-5">
            <div class="silhouette__focus zoom-main"><img id="result" src="" alt="single silhouette image"/></div>
          </div>
          <div class="col-7">
            <h2 class="text-center text-decoration-underline" id="silhouette-name"></h2>
           <div class="silhouette-content-block">
           <span>Artist:</span> <p id="artist-name"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Sitter:</span> <p id="sitter"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Medium:</span> <p id="medium"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Dimensions:</span> <p id="dimensions"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Book Closed:</span> <p id="book-closed"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Book Open:</span> <p id="book-open"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Date:</span> <p id="silhouette-date"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Credit Line:</span> <p id="credit-line"></p>
           </div>
           <div class="silhouette-content-block">
           <span>Object Number:</span> <p id="obj-number"></p>
           </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- END MODAL -->

<section class="section-padding section-bg pt-5 biography-section">
<div class="container">
    <table id="" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Sitter</th>
                    <th>Page</th>
                    <th>Row</th>
                    <th>Column</th>
                    <th>Number</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
            <?php for ($i = 0; $i < $indexCount; $i++): ?>
                    <tr>
                        <td><a class="book-index-link" data-link="<?php echo $array[$i]["URL"]?>"><?php echo $array[$i]["Sitter"]?></a></td>
                        <td><?php echo $array[$i]["Page"]?></td>
                        <td><?php echo $array[$i]["Row"] ?></td>
                        <td><?php echo $array[$i]["Column"] ?></td>
                        <td><?php echo $array[$i]["Number"] ?></td>
                        <td><?php echo $array[$i]["URL"] ?></td>
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
        "pageLength": 25,
        "fnDrawCallback": function( oSettings ) {
          //Modal for Book Index
    $('.book-index-link').click(function(){
    var data = {
			silhouette: 'edanmdm:npg_S_'+$(this).attr('data-link'),
		};
        $.ajax({
				type: "POST",
				url: "/data/index.php",
				data: data
			}).done(function (msg) {
				var jsonData = JSON.parse(msg);
					console.log(jsonData);
					let image = jsonData.content.descriptiveNonRepeating.online_media.media[0].guid;
					$('#silhouette-name').text(jsonData.title);
					$('#artist-name').text(jsonData.content.freetext.name[0].content);
					$('#sitter').text(jsonData.content.freetext.name[1].content);
					$('#medium').text(jsonData.content.freetext.physicalDescription[0].content);
                    $('#dimensions').text(jsonData.content.freetext.physicalDescription[1].content);
                    if(data.silhouette == 'edanmdm:npg_S_NPG.2002.184.50'){
                        $('#book-closed').text('');
                        $('#book-open').text('');
                    }else{
                        $('#book-closed').text(jsonData.content.freetext.physicalDescription[2].content);
                        $('#book-open').text(jsonData.content.freetext.physicalDescription[3].content);
                    }
					$('#silhouette-date').text(jsonData.content.freetext.date[0].content);
					$('#credit-line').text(jsonData.content.freetext.physicalDescription[0].content);
					$('#obj-number').text(jsonData.content.freetext.identifier[0].content);
					$("#result").attr("src", image);
						$('#bache-modal').click();

				})

			});
        }
    });
});

</script>
</body>
</html>