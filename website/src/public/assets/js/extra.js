$( document ).ready( function(){

    var html = '<div id="ad">' +
        '<a href="http://www.ucll.be/mosselen" title="Meer info op ucll.be/mosselen!" target="_blank">' +
        '<img alt="Meer info op ucll.be/mosselen!" src="' + root + '/public/assets/img/_content/mosselenforlife.png">' +
        '</a></div>';

    if( window.location.pathname.indexOf( 'nl' ) !== -1 && !$.cookie( 'extra' ) )
        $( 'main' ).prepend( $( html ) );

    $( '#ad' ).click( function(){
        $( this ).remove();
        $.cookie( 'cookies', 'extra', { path : "/", expires : 5 } );
        $.cookie( 'extra', 'mosselen', { path : "/", expires : 5 } );
    } );

    $( '#lnk_prev, #lnk_next' ).click( function(){
        setTimeout( addFlame, 500 );
    } );
    addFlame();
} );

function addFlame(){
    if( window.location.pathname.indexOf( '/16-17/50' ) !== -1 ){
        $( '#woensdag .dish li:last-of-type, #wednesday .dish li:last-of-type' ).css(
            {
                'color' : '#be1117',
                'font-weight' : 'bold',
                'cursor' : 'pointer'
            }
        ).click( function(){
            window.location.href = 'http://www.ucll.be/mosselen';
        } );

        var flame = '<img src="' + root + '/public/assets/img/_content/musicforlife.png" style="background:none;position:absolute;top:-10px;right:10px;height:100px">';

        $( '#woensdag, #wednesday' ).prepend( flame );
    }
}