 
// Создание объекта плеера YouTube вне объекта document для видимости iframe_api

 var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	

 	var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: '57vTOdawe5w',
          
        });
      }

 
 $(document).ready(function(){

 	var itemWidth = $('.slider__container_item').width();				 // Item width
 	var itemMarginR = $('.slider__container_item').css('margin-right');  // Item margin-right
 	var itemWidthMargin = parseInt(itemWidth) + parseInt(itemMarginR);   // Sum of item width and MR
 		itemWidthMarginStr = String(itemWidthMargin + 'px');				 // translate to string

 	var childrenNum = $('.slider__container_list').children().length
 	var i = 0;
 	var invisibleItems = $('.slider__container_list').children().length - 3;

 	//Процедура previous слайдера

 	$('.slider__block_prev').click(function(){

 		var contMarginL = $('.slider__container_list').css('margin-left');
 			contMarginL = parseInt(contMarginL);
 		
 		if ( i > 0) {

 			contMarginL = contMarginL + itemWidthMargin;
 			$('.slider__container_list').css('margin-left', contMarginL);

 			i--;

 		}	
 	})

 	//Процедура next слайдера

 	$('.slider__block_next').click(function(){

 		var contMarginL = $('.slider__container_list').css('margin-left');
 			contMarginL = parseInt(contMarginL);
 		var itemWidthMargin = parseInt(itemWidth) + parseInt(itemMarginR);
 		
 		if ( i < invisibleItems) {

 			contMarginL = contMarginL - itemWidthMargin;
 			$('.slider__container_list').css('margin-left', contMarginL);

 			i++;

 		}	
 	
 	})

 	//Воспроизведение трейлера

    $('.trailer__block_pause-image').click(function(){

 			$('.trailer__block_pause').css('visibility', 'hidden');
 			$('.trailer__block_video').css('visibility', 'visible');
    		player.playVideo();
    })


    //Задание фона рецензий вычислением соотшений.

    var positive = parseInt($('.reviews__item_number.positive').text());
    var neutral = parseInt($('.reviews__item_number.neutral').text());
    var negative = parseInt($('.reviews__item_number.negative').text());

    var reviewsSum = positive + neutral + negative;
    var percent = reviewsSum/100;

    var positiveStr = positive/percent + '%';
    var neutralStr  = neutral/percent + '%';
    var negativeStr = negative/percent + '%';


    $('.reviews__item_background.positive').css('width', positiveStr);
    $('.reviews__item_background.neutral').css('width', neutralStr);
    $('.reviews__item_background.negative').css('width', negativeStr);

    console.log(positiveStr);


    // Menu button

    var menuButton = $('.menu__button');

    function addClassMenu() {
        menuButton.toggleClass("clickMenuFive");
        menuButton.toggleClass("fixed-button");
        $('.sidebar__menu').toggleClass("sidebar__menu-visible");
    }

    menuButton.click(addClassMenu);
});