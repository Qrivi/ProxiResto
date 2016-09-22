var swiper;

$( document ).ready( function(){

    swiper = new Swiper( 'body', {
        direction : 'horizontal',
        hashnav : true //vervangen door slideTo want buggy met meer slidesPerView
    } );

    $( window ).resize( function(){

        if( $( window ).width() < 650 ){
            console.log( "slides: 1" );
            swiper.params.slidesPerView = 1;
            swiper.params.grabCursor = true;
        }else if( $( window ).width() < 1100 ){
            console.log( "slides: 3" );
            swiper.params.slidesPerView = 3;
            swiper.params.grabCursor = true;
        }else if( $( window ).width() < 1295 ){
            console.log( "slides: 4" );
            swiper.params.slidesPerView = 4;
            swiper.params.grabCursor = true;
        }else{
            console.log( "slides: 5" );
            swiper.params.slidesPerView = 5;
            swiper.params.grabCursor = false;
        }
        swiper.update();

    } ).trigger( "resize" );

} );