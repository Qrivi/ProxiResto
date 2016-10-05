<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;

    require_once './vendor/autoload.php';
    require_once './config/config.php';

    spl_autoload_register( function ( $classname ){
        require( '../classes/' . $classname . '.php' );
    } );

    $app = new \Slim\App( [ 'settings' => $config ] );
    $container = $app->getContainer();
    $container['view'] = new \Slim\Views\PhpRenderer( './templates/' );
    $container['pdo'] = new \Slim\PDO\Database( $config['db']['dbms'] . ':' .
                                                'host:' . $config['db']['dbms'] . ';' .
                                                'dbname:' . $config['db']['name'] . ';' .
                                                'charset:' . $config['db']['charset'],
                                                $config['db']['user'], $config['db']['pass'] );

    /* routes */

    $app->get( '/test', function ( Request $request, Response $response ){
        $selectStatement = $this->pdo->select()
                                     ->from( 'kristhb42_resto.menu' );

        $stmt = $selectStatement->execute();
        $data = $stmt->fetchAll();

        $response = $this->view->render( $response, 'hello.phtml', [ 'data', $data ] );
        return $response;
    } );

    $app->get( '/', function ( Request $request, Response $response ) use ( $app ){
        $date = date( 'y' );
        $lang = 'nl'; //TODO get from cookie

        $week = date( 'W' );
        $year = ( $week > 35 ? ( $date . '-' . ( $date + 1 ) ) : ( ( $date - 1 ) . '-' . $date ) );

        //$app->redirect( '/nl/year/week', 301 );
        return $response->withRedirect( $request->getUri()->getBaseUrl() . "/{$lang}/{$year}/{$week}" );
    } );

    $app->get( '/nl/{year}/{week}', function ( Request $request, Response $response ){
        $week = $request->getAttribute( 'week' );
        $year = $request->getAttribute( 'year' );
        $menu = [];

        $stmt = $this->pdo->select( [ 'day', 'type', 'name', 'name_en', 'price', 'price_ext', 'veggie' ] )
                          ->from( 'kristhb42_resto.menu' )
                          ->whereMany( [ 'week' => $week, 'year' => $year ], '=' )
                          ->execute();
        $data = $stmt->fetchAll();

        foreach( $data as &$item )
            $menu[$item['day']][$item['type']][] = $item;

        $response = $this->view->render( $response, 'menu_nl.phtml', [
            'request' => $request,
            'week'    => $week,
            'year'    => '20' . ( $week > 35 ? substr( $year, 0, 2 ) : substr( $year, -2, 2 ) ),
            'menu'    => $menu
        ] );
        return $response;
    } );

    $app->run();