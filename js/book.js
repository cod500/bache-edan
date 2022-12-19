$(document).ready(function () {

	'use strict';
	var imagesLoaded = false;
	Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
		imagesLoaded = true;
	});
	var result = document.getElementById('result'); //Image where user selected silhouette will populate

	// Size of selected silhouette  around the coordinates
	var crop_img
		, CROPWIDTH = 280
		, CROPHEIGHT = 330
		, resize_canvas = document.createElement('canvas');

	//Creation of canvas and new image to be cropped
	function init() {
		var resizedImage = document.querySelector('.crop-image'); //Hidden image in DOM 
		resizedImage.dataset.isCrop = 'true';
		resizedImage.draggable = false;
		crop_img = new Image();
		crop_img.crossOrigin = resizedImage.crossOrigin;
		crop_img.src = resizedImage.src; //New image will be given src of image the user selects
		crop_img.draggable = false;
	}

	// Image is cropped and given width and height
	function crop(leftCoord, topCoord) {
		resize_canvas.width = CROPWIDTH;
		resize_canvas.height = CROPHEIGHT;

		var ctx = resize_canvas.getContext('2d');
		ctx.drawImage(crop_img,
			leftCoord, topCoord,
			1500, 2000 //All silhouette pages have same resolution 
		);
	}

	//Values of coordinates od user selected iamge is passed to crop function
	function openCropCanvasImg(x, y) {
		crop(x, y);

		try {
			var base64Img = resize_canvas.toDataURL('image/png', 1.0); //Image is created and populated in result img in DOM
			result.src = base64Img;
		} catch (e) {
			alert(e);
		} finally {

		}

	}



	//

	//Tooltip for every image
	//Makes request on over and stores in window so only has to make one request to Edan
	tippy('.tooltipLink', {
		followCursor: true,
		delay: 0,
		onShow(instance) {
			if (window.silhouettes === undefined) {
				window.silhouettes = {};
			}
			var url = instance.reference.dataset.tooltip;
			var data = {
				silhouette: url,
			};
			if (window.silhouettes.hasOwnProperty(url)) {
				window.silhouettes['' + url + ''].title
			}
			$.ajax({
				type: "POST",
				url: "../data/index.php",
				data: data
			}).done(function (result) {
				var jsonData = JSON.parse(result);
				if (!jsonData.title) {
					instance.setContent("Unidentified")
				} else {
					window.silhouettes[jsonData.id] = jsonData;
					instance.setContent(jsonData.title);
				}
			});
		},
	});


	//Panzoom for al odd pages
	const oddPages = document.querySelectorAll('.panzoom-odd');
	oddPages.forEach((elem) => {
		console.log(elem)
		const parent = elem.parentElement;
		const panzoom = Panzoom(elem, {
			autocenter: true,
			bounds: true,
			boundsPadding: 1,
			minScale: 1,
			maxScale: 5,
			contain: 'outside',
			panOnlyWhenZoomed: true,
			disableZoom: false,
			animate: true,
		});


		$('#reset-odd').click(function () {
			panzoom.reset();
		})

		$('#zoom-in-odd').click(function () {
			panzoom.zoomIn();
		})

		$('#zoom-out-odd').click(function () {
			var style = getComputedStyle(document.getElementsByClassName('panzoom-odd')[0], null);
			$(elem).each(function( index ) {
				if($(this).css('transform') != 'none'){
				var m = $(this).css('transform');
				var mt = m.substring(m.indexOf('(') + 1, m.indexOf(')')).split(',');
				if (mt[0] < 1.5) {
					panzoom.reset();
				} else {
					panzoom.zoomOut();
				}
					}
				});
			
		})

		$('#bb-nav-next, #bb-nav-last, #bb-nav-prev, #bb-nav-first').hover(function () {
			panzoom.reset();
		})

		$('#page-number').on('input', function () {
			panzoom.reset();
		});

		$(window).keydown(function (event) {
			if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
				panzoom.reset();
			}
		});



	});

	//Panzoom for all even pages
	const evenPages = document.querySelectorAll('.panzoom-even');
	evenPages.forEach((elem) => {

		const parent = elem.parentElement;
		const panzoom = Panzoom(elem, {
			autocenter: true,
			bounds: true,
			boundsPadding: 1,
			minScale: 1,
			maxScale: 5,
			contain: 'outside',
			panOnlyWhenZoomed: true,
			disableZoom: false,
			animate: true,
		});


		$('#reset-even').click(function () {
			panzoom.reset();
		})

		$('#zoom-in-even').click(function () {
			panzoom.zoomIn();
		})

		$('#zoom-out-even').click(function () {
			var m = $('.panzoom-even').css('transform');
			var mt = m.substring(m.indexOf('(') + 1, m.indexOf(')')).split(',');
			if (mt[0] < 1.5) {
				panzoom.reset();
			} else {
				panzoom.zoomOut();
			}
		})
		$('#bb-nav-next, #bb-nav-last, #bb-nav-prev, #bb-nav-first').hover(function () {
			panzoom.reset();
		})


		$('#page-number').on('input', function () {
			panzoom.reset();
		});

		$(window).keydown(function (event) {
			if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
				panzoom.reset();
			}
		});

	});


	//Keep image map resposive for firefox
	$('img[usemap]').rwdImageMaps();

	//Mapoid to highlight image areas
	var obj = {
		"fillColor": "#fff",
		"fillOpacity": .4,
		"selectOnClick": true,
		"fadeTime": 100,
		"hoverIn": function (j, e) {
			if ($('.crop-image').attr('src') != e[0].offsetParent.firstChild.src) { //Check if image for this map is loaded
				$(".crop-image").attr("src", e[0].offsetParent.firstChild.src); //Change image when using different map
				init();
			}
		},
		"click": function (j, e) {
			// if (window.silhouettes === undefined) {
			// 	window.silhouettes = {};
			// }
			console.log(window.silhouettes);
			let coords = e.attr('data-coords').split(',') //Find coordinates of area and pass to be cropped
			let url = e.attr('data-tooltip');
			console.log(url)
			let leftCoord = coords[0];
			let topCoord = coords[1];
			var data = {
				silhouette: url,
			};

			if (window.silhouettes.hasOwnProperty(url)) {
				// openCropCanvasImg(-leftCoord, -topCoord); //Send coordinates of this area to be cropped
				$('#silhouette-name').text(window.silhouettes['' + url + ''].title);
				$('#artist-name').text(window.silhouettes['' + url + ''].content.freetext.name[0].content);
				$('#sitter').text(window.silhouettes['' + url + ''].content.freetext.name[1].content);
				$('#medium').text(window.silhouettes['' + url + ''].content.freetext.physicalDescription[0].content);
				$('#dimensions').text(window.silhouettes['' + url + ''].content.freetext.physicalDescription[1].content);
				$('#book-closed').text(window.silhouettes['' + url + ''].content.freetext.physicalDescription[2].content);
				$('#book-open').text(window.silhouettes['' + url + ''].content.freetext.physicalDescription[3].content);
				$('#silhouette-date').text(window.silhouettes['' + url + ''].content.freetext.date[0].content);
				$('#credit-line').text(window.silhouettes['' + url + ''].content.freetext.physicalDescription[0].content);
				$('#obj-number').text(window.silhouettes['' + url + ''].content.freetext.identifier[0].content);
				$("#result").attr("src", window.silhouettes['' + url + ''].content.descriptiveNonRepeating.online_media.media[0].guid);
			} else {
				$.ajax({
					type: "POST",
					url: "../data/index.php",
					data: data
				}).done(function (msg) {
					var jsonData = JSON.parse(msg);
					if (!jsonData.title) {
						openCropCanvasImg(-leftCoord, -topCoord); //Send coordinates of this area to be cropped
						$('#silhouette-name').text("");
						$('#artist-name').text("");
						$('#sitter').text("");
						$('#medium').text("");
						$('#dimensions').text("");
						$('#book-closed').text("");
						$('#book-open').text("");
						$('#silhouette-date').text("");
						$('#credit-line').text("");
						$('#obj-number').text("");
						setTimeout(function () {
							$('#bache-modal').click();
							$('.bb-custom-wrapper, .book-link').animate({ 'opacity': .2 })
						}, 0)
					} else {
						console.log(jsonData);
						let image = jsonData.content.descriptiveNonRepeating.online_media.media[0].guid;
						$('#silhouette-name').text(jsonData.title);
						$('#artist-name').text(jsonData.content.freetext.name[0].content);
						$('#sitter').text(jsonData.content.freetext.name[1].content);
						$('#medium').text(jsonData.content.freetext.physicalDescription[0].content);
						$('#dimensions').text(jsonData.content.freetext.physicalDescription[1].content);
						$('#book-closed').text(jsonData.content.freetext.physicalDescription[2].content);
						$('#book-open').text(jsonData.content.freetext.physicalDescription[3].content);
						$('#silhouette-date').text(jsonData.content.freetext.date[0].content);
						$('#credit-line').text(jsonData.content.freetext.physicalDescription[0].content);
						$('#obj-number').text(jsonData.content.freetext.identifier[0].content);
						$("#result").attr("src", image);
						setTimeout(function () {
							$('#bache-modal').click();
							$('.bb-custom-wrapper, .book-link').animate({ 'opacity': .2 })
						}, 0)
					}

				});
			}


		}
	}

	$('#exampleModal').on('hide.bs.modal', function () {
		setTimeout(() => {
			$('.bb-custom-wrapper, .book-link').animate({ 'opacity': 1 })
		}, 0);
	});

	//initialize mapping
	$("map").mapoid(obj);
});




