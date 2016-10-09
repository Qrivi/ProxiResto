$( document ).ready( function(){
    if( window.location.hash === '#android' || /Android/.test( navigator.userAgent ) )
        $( '#android' ).fadeIn();
    else
        $( '#ios' ).fadeIn();
} );