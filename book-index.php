<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <link rel="shortcut icon" href="https://npg.si.edu/favicon.ico" type="image/vnd.microsoft.icon" />
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Ledger Book Index</title>
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
<body style="overflow: scroll;">
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
          <div class="silhouette col-lg-5 col-12">
            <div class="silhouette__focus zoom-main"><img id="result" src="" alt="single silhouette image"/></div>
          </div>
          <div class="col-lg-7 col-12">
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
<div class="table-container">
    <table id="index-table" class="display" style="width:100%">
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
                        <td><?php 
                              if(isset($array[$i]["Number"])){
                                echo $array[$i]["Number"];
                              }else{
                                echo "";
                              }
                        ?>
                      
                      </td>
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
    var datatable = $('table.display').DataTable({
        "pageLength": 25,
        "order": [1, 'asc'],
        responsive: true
    });
    
    //Call edan funciton on every table redraw to show modal
    datatable.on('draw', function() {
   edanCall();
});

 function edanCall(){
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
					$('#credit-line').text(jsonData.content.freetext.creditLine[0].content);
					$('#obj-number').text(jsonData.content.freetext.identifier[0].content);
					$("#result").attr("src", image);
						setTimeout(() => {
                            $('#bache-modal').click();
                        }, 0);

				})

			});
 }
 edanCall();
});

</script>
</body>
</html>