var today = new Date();
var external = false;
var swiper;

$( document ).ready( function(){

    swiper = new Swiper( 'main', {
        direction : 'horizontal',
        pagination : '.swiper-pagination',
        paginationClickable : true,
        keyboardControl : false
    } );

    $( 'body' ).removeClass( 'loading' );
    $( 'body, main' ).css( 'overflow-x', 'hidden' );

    $( '#hamburger' ).click( function(){
        $( '#hamburger, #prefs, .hide, body > header' ).toggleClass( 'open' );
        $( '#contact' ).removeClass( 'show' );
        $( '#set_lang' ).slideUp();

        if( $( this ).hasClass( 'open' ) ){
            swiper.params.allowSwipeToPrev = false;
            swiper.params.allowSwipeToNext = false;
        }else if( swiper.params.slidesPerView != 5 ){
            swiper.params.allowSwipeToPrev = true;
            swiper.params.allowSwipeToNext = true;
        }
    } );

    $( 'a.internal' ).click( function( e ){
        e.preventDefault();
        window.location = $( this ).attr( 'href' );
    } );

    $( '#lnk_donate' ).click( function( e ){
        e.preventDefault();

        var href = $( this ).attr( 'href' );

        $( 'body' ).append( '<img src="' + root + '/public/assets/img/like.svg">' );

        setTimeout( function(){
            window.location = href;
        }, 750 );
    } );

    $( '#lnk_contact' ).click( function( e ){
        e.preventDefault();
        $( '#contact' ).addClass( 'show' );
    } );

    $( '#contact button, #contact a' ).click( function(){
        $( '#contact' ).removeClass( 'show' );
    } );

    $( '.mail a' ).attr( 'href', 'mailto:kristof.dewilde@student.ucll.be' );

    $( '#box_cookie' ).change( function(){
        if( $( this ).prop( 'checked' ) ){
            $.cookie( 'cookies', 'carl_is_corrupt', { path : "/", expires : 300 } );
            $( '.needcookie' ).removeClass( 'disabled' );
            $( '.needcookie select, .needcookie input' ).prop( 'disabled', false );
        }else{
            $.removeCookie( 'cookies', { path : "/" } );
            $.removeCookie( 'external', { path : "/" } );
            $.removeCookie( 'language', { path : "/" } );
            $.removeCookie( 'extra', { path : "/" } );
            $( '.needcookie' ).addClass( 'disabled' );
            $( '.needcookie select, .needcookie input' ).prop( 'disabled', true );
            $( '#box_price' ).prop( 'checked', true ).trigger( 'change' );
            $( '#sel_lang' ).val( 'nl' );
            $( '#opt_lang' ).text( 'nl' );
        }
    } );

    $( '#box_price' ).change( function(){
        external = !$( this ).prop( 'checked' );

        if( !(!$.cookie( 'cookies' )) )
            $.cookie( 'external', external, { path : "/", expires : 300 } );

        checkPrices();
    } );

    $( '#sel_lang' ).change( function(){
        $( '#opt_lang' ).text( $( this ).val() );
        $( '#set_lang' ).slideDown();

        if( !(!$.cookie( 'cookies' )) )
            $.cookie( 'language', $( this ).val(), { path : "/", expires : 300 } );
    } );

    $( '#sel_lang' ).on( 'mousedown touchstart MSPointerDown', function( e ){
        e.stopPropagation();
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
                $( '#lnk_prev' ).attr( 'href', $( data ).find( '#lnk_prev' ).attr( 'href' ) );
                $( '#lnk_next' ).attr( 'href', $( data ).find( '#lnk_next' ).attr( 'href' ) );

                checkToday();
                checkPrices();
                setTimeout( function(){
                    $( '#menu' ).removeClass( 'rotated' );
                    swiper.update();
                    swiper.slideTo( 0 );
                }, 150 );
            } );
        }, 300 );
    } );

    $( document ).keydown( function( e ){
        if( e.which == 37 )
            $( '#lnk_prev' ).click();
        else if( e.which == 39 )
            $( '#lnk_next' ).click();
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
        swiper.slideTo( 0 );

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

    if( !(!$.cookie( 'cookies' )) )
        $( '#box_cookie' ).prop( 'checked', true ).trigger( 'change' );

    if( !(!$.cookie( 'external' )) )
        $( '#box_price' ).prop( 'checked', ( $.cookie( 'external' ) === 'false') ).trigger( 'change' );

    if( !(!$.cookie( 'language' )) )
        $( '#sel_lang' ).val( $.cookie( 'language' ) ).trigger( 'change' );

    if( window.matchMedia( '(display-mode: standalone)' ).matches || window.navigator.standalone )
        $( '.mobile' ).hide();

    if( /MSIE 10|rv:11.0|Edge/i.test( navigator.userAgent ) ){
        $( '#sel_lang' ).css( 'z-index', '-69' );
        $( '#opt_lang' ).click( function(){
            $( '#sel_lang option:selected' ).removeAttr( 'selected' ).next( 'option' ).attr( 'selected', 'selected' );
            $( '#sel_lang' ).trigger( 'change' );
        } );
        $( '#contact li, #contact button' ).each( function(){
            var uri = $( this ).css( 'background-image' ).replace( '.png', '_ie.png' );
            $( this ).css( 'background-image', uri );
        } );
    }

    checkToday();
    window.scrollTo( 0, 1 );
} );

function checkToday(){
    $( 'time' ).each( function( index ){
        var date = new Date( $( this ).attr( 'datetime' ) );
        if( date.setHours( 0, 0, 0, 0 ) === today.setHours( 0, 0, 0, 0 ) ){
            $( this ).text( $( 'html' ).attr( 'lang' ) === 'en' ? 'Today' : 'Vandaag' );
            swiper.slideTo( index );
        }
    } );
}

function checkPrices(){
    var prices = $( '#menu li span' );

    $( prices ).each( function(){
        if( external )
            $( this ).text( $( this ).attr( 'data-external' ) );
        else
            $( this ).text( $( this ).attr( 'data-students' ) );
    } );
}