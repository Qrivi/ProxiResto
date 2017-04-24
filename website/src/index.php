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
                                                'host:' . $config['db']['host'] . ';' .
                                                'dbname:' . $config['db']['name'] . ';' .
                                                'charset:' . $config['db']['charset'],
                                                $config['db']['user'], $config['db']['pass'] );

    /* routes */

    $app->get( '/', function ( Request $request, Response $response ){
        $date = date( 'y' );
        $lang = empty( $_COOKIE['language'] ) ? 'nl' : $_COOKIE['language'];

        $week = date( 'W' ) + ( date( 'N' ) < 6 ? 0 : 1 );
        $year = ( $week > 35 ? ( $date . '-' . ( $date + 1 ) ) : ( ( $date - 1 ) . '-' . $date ) );

        return $response->withRedirect( $request->getUri()->getBaseUrl() . "/{$lang}/{$year}/{$week}", 302 );
    } );

    $app->get( '/{lang}', function ( Request $request, Response $response ){
        $date = date( 'y' );
        $lang = $request->getAttribute( 'lang' );

        if( $lang == 'app' ){
            $lang = empty( $_COOKIE['language'] ) ? 'nl' : $_COOKIE['language'];
            return $response->withRedirect( $request->getUri()->getBaseUrl() . '/' . $lang . '/app', 302 );
        }

        $week = date( 'W' ) + ( date( 'N' ) < 6 ? 0 : 1 );
        $year = ( $week > 35 ? ( $date . '-' . ( $date + 1 ) ) : ( ( $date - 1 ) . '-' . $date ) );

        return $response->withRedirect( $request->getUri()->getBaseUrl() . "/{$lang}/{$year}/{$week}", 302 );
    } );

    $app->get( '/{lang}/{year}', function ( Request $request, Response $response ){
        $week = date( 'W' ) + ( date( 'N' ) < 6 ? 0 : 1 );
        $year = $request->getAttribute( 'year' );
        $lang = $request->getAttribute( 'lang' );

        if( $year == 'app' ){
            $response = $this->view->render( $response, 'app_' . $lang . '.phtml', [
                'request' => $request
            ] );
            return $response->withHeader( 'Content-Type', 'text/html; charset=utf-8' );
        }

        return $response->withRedirect( $request->getUri()->getBaseUrl() . "/{$lang}/{$year}/{$week}", 302 );
    } );

    $app->get( '/{lang}/{year}/{week}', function ( Request $request, Response $response ){
        $week = $request->getAttribute( 'week' );
        $year = $request->getAttribute( 'year' );
        $lang = $request->getAttribute( 'lang' );

        if( $week > 52 || $week < 1 || !preg_match( '/^[1-9]{2}-[1-9]{2}$/', $year ) )
            return $response->withRedirect( $request->getUri()->getBaseUrl() );

        $menu = [];

        $stmt = $this->pdo->select( [ 'day', 'type', 'name', 'name_en', 'price', 'price_ext', 'veggie' ] )
                          ->from( 'kristhb42_resto.menu' )
                          ->whereMany( [ 'week' => $week, 'year' => $year ], '=' )
                          ->execute();
        $data = $stmt->fetchAll();

        foreach( $data as &$item )
            $menu[$item['day']][$item['type']][] = $item;

        switch( $lang ){
            case 'nl':
            case 'en':
                $content = 'text/html; charset=utf-8';
                $response = $this->view->render( $response, 'menu_' . $lang . '.phtml', [
                    'request' => $request,
                    'week'    => $week,
                    'year'    => '20' . ( $week > 35 ? substr( $year, 0, 2 ) : substr( $year, -2, 2 ) ),
                    'menu'    => $menu
                ] );
                break;
            case 'api':
                $content = 'application/json; charset=utf-8';
                $response = $this->view->render( $response, 'api.phtml', [
                    'menu' => $menu
                ] );
                break;
            default:
                return $response->withRedirect( $request->getUri()->getBaseUrl() );
        }

        return $response->withHeader( 'Content-Type', $content );
    } );

    $app->run();