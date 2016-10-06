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

    $( '#hamburger' ).click( function(){
        $( "#hamburger, #prefs, .hide, body > header" ).toggleClass( 'open' );

        if( $( this ).hasClass( 'open' ) ){
            swiper.params.allowSwipeToPrev = false;
            swiper.params.allowSwipeToNext = false;
        }else{
            $( window ).trigger( 'resize' );
        }
    } );

    $( '#lnk_donate' ).click( function(){
        alert( 'Thanks!' )
    } );

    $( '#lnk_contact' ).click( function(){
        $( '#contact' ).addClass( 'show' );
    } );

    $( '#contact button' ).click( function(){
        $( '#contact' ).removeClass( 'show' );
    } );

    $( 'a.mail' ).attr( 'href', 'mailto:kristof.dewilde@student.ucll.be' );

    $( 'a.internal' ).click( function( e ){
        e.preventDefault();
        window.location = $( this ).attr( 'href' );
        console.log( "navved" );
        return false;
    } );

    $( '#lnk_prev, #lnk_next' ).click( function( e ){
        e.preventDefault();
        var href = $( this ).attr( 'href' );
        window.history.replaceState( {}, "ProxiResto", href );

        $( '#menu' ).addClass( 'rotated' );
        setTimeout( function(){
            $( '#menu article' ).remove();

            $.get( href, function( data ){
                $( '#menu' ).html( $( data ).find( '#menu article' ) );
                $( '#lnk_prev' ).attr( 'href', $( data ).find( '#lnk_prev' ).attr('href') );
                $( '#lnk_next' ).attr( 'href', $( data ).find( '#lnk_next' ).attr('href') );

                setTimeout( function(){
                    $( '#menu' ).removeClass( 'rotated' );
                    swiper.update();
                }, 150 );
            } );
        }, 300 );

        return false;
    } );

    $( 'time' ).each( function( index ){
        var date = new Date( $( this ).attr( 'datetime' ) );
        if( date.setHours( 0, 0, 0, 0 ) === today.setHours( 0, 0, 0, 0 ) ){
            $( this ).text( todayString );
            swiper.slideTo( index );
        }
    } );

    $( window ).resize( function(){

        swiper.params.grabCursor = true;
        swiper.params.allowSwipeToPrev = true;
        swiper.params.allowSwipeToNext = true;

        if( $( window ).width() < 650 ){
            swiper.params.slidesPerView = 1;
        }else if( $( window ).width() < 1100 ){
            swiper.params.slidesPerView = 3;
        }else if( $( window ).width() < 1295 ){
            swiper.params.slidesPerView = 4;
        }else{
            swiper.params.slidesPerView = 5;
            swiper.params.grabCursor = false;
            swiper.params.allowSwipeToPrev = false;
            swiper.params.allowSwipeToNext = false;
        }
        swiper.update();

    } ).trigger( 'resize' );

    switch( window.location.hash.toLowerCase() ){
        case '#monday':
        case '#maandag':
        case '#1':
            swiper.slideTo( 0 );
            break;
        case '#tuesday':
        case '#dinsdag':
        case '#2':
            swiper.slideTo( 1 );
            break;
        case '#woensdag':
        case '#wednesday':
        case '#3':
            swiper.slideTo( 2 );
            break;
        case '#thursday':
        case '#donderdag':
        case '#4':
            swiper.slideTo( 3 );
            break;
        case '#friday':
        case '#vrijdag':
        case '#5':
            swiper.slideTo( 4 );
            break;
    }

    if( window.matchMedia( '(display-mode: standalone)' ).matches || window.navigator.standalone )
        $( '.mobile' ).hide();

    window.scrollTo( 0, 1 );
} );