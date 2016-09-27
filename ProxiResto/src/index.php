<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;

    require_once './vendor/autoload.php';
    require_once './config/config.php';

    spl_autoload_register( function ( $classname ){
        require( "../classes/" . $classname . ".php" );
    } );

    $app = new \Slim\App( [ "settings" => $config ] );
    $container = $app->getContainer();
    $container['view'] = new \Slim\Views\PhpRenderer( "./templates/" );
    $container['pdo'] = new \Slim\PDO\Database( $config["db"]["dbms"] . ":" .
                                                "host:" . $config["db"]["dbms"] . ";" .
                                                "dbname:" . $config["db"]["name"] . ";" .
                                                "charset:" . $config["db"]["charset"],
                                                $config["db"]["user"], $config["db"]["pass"] );

    /* routes */

    $app->get( '/', function ( Request $request, Response $response ){
        $selectStatement = $this->pdo->select()
                                     ->from( 'proxiresto.menu' );

        $stmt = $selectStatement->execute();
        $data = $stmt->fetchAll();

        $response = $this->view->render( $response, "hello.phtml", ["data", $data] );
        return $response;
    } );

    $app->get( '/hello/{name}', function ( Request $request, Response $response ){
        $name = $request->getAttribute( 'name' );
        $response->getBody()->write( "Hello, $name" );

        return $response;
    } );
    $app->run();