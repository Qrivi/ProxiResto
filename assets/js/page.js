var swiper;

$( document ).ready( function(){

    swiper = new Swiper( 'main', {
        direction : 'horizontal',
        pagination : '.swiper-pagination',
        paginationClickable : true,
        keyboardControl : true
    } );

    $( window ).resize( function(){

        if( $( window ).width() < 650 ){
            console.log( 'slides: 1' );
            swiper.params.slidesPerView = 1;
            swiper.params.grabCursor = true;
        }else if( $( window ).width() < 1100 ){
            console.log( 'slides: 3' );
            swiper.params.slidesPerView = 3;
            swiper.params.grabCursor = true;
        }else if( $( window ).width() < 1295 ){
            console.log( 'slides: 4' );
            swiper.params.slidesPerView = 4;
            swiper.params.grabCursor = true;
        }else{
            console.log( 'slides: 5' );
            swiper.params.slidesPerView = 5;
            swiper.params.grabCursor = false;
        }
        swiper.update();

    } ).trigger( 'resize' );

    switch( window.location.hash ){
        case '#monday':
        case '#maandag':
            swiper.slideTo( 0 );
            break;
        case '#tuesday':
        case '#dinsdag':
            swiper.slideTo( 1 );
            break;
        case '#woensdag':
        case '#wednesday':
            swiper.slideTo( 2 );
            break;
        case '#thursday':
        case '#donderdag':
            swiper.slideTo( 3 );
            break;
        case '#friday':
        case '#vrijdag':
            swiper.slideTo( 4 );
            break;
    }

} );