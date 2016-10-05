var today = new Date();
var todayString;
var swiper;

$( document ).ready( function(){

    todayString = $.cookie( 'lang' ) === 'en' ? 'Today' : 'Vandaag';

    swiper = new Swiper( 'main', {
        direction : 'horizontal',
        pagination : '.swiper-pagination',
        paginationClickable : true,
        keyboardControl : true
    } );

    $( 'time' ).each( function(){
        var date = new Date( $( this ).attr( 'datetime' ) );
        if( date.setHours( 0, 0, 0, 0 ) === today.setHours( 0, 0, 0, 0 ) )
            $( this ).text( todayString );
    } );

    $( '#hamburger' ).click( function(){
        $( this ).toggleClass( 'open' );
        alert( 'Binnenkort opent dit een preference pane waar je dingen kan instellen als je taal en je prijs (extern of student), maar ik moet dit nog schrijven. :(' );
    } );

    $( window ).resize( function(){

        if( $( window ).width() < 650 ){
            swiper.params.slidesPerView = 1;
            swiper.params.grabCursor = true;
        }else if( $( window ).width() < 1100 ){
            swiper.params.slidesPerView = 3;
            swiper.params.grabCursor = true;
        }else if( $( window ).width() < 1295 ){
            swiper.params.slidesPerView = 4;
            swiper.params.grabCursor = true;
        }else{
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

    if( /iPad|iPhone|iPod/.test( navigator.userAgent ) && !window.MSStream ){ // is iOS
        if( 'standalone' in window.navigator && window.navigator.standalone ){ // is standalone
            // window.location = 'http://labs.krivi.be/proxiresto/#today';
        }else if( $.cookie( 'addtohomescreen' ) !== 'no' ){
            //  alert( "Homescreen pls?" );
            // rip Safari's bars
            $( 'main' ).css( 'min-height', window.innerHeight - $( 'body > header' ).height() - $( 'body > footer' ).height() );
        }
    }

    window.scrollTo( 0, 1 );
} );