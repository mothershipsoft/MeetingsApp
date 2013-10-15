<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->add(new \Slim\Middleware\ContentTypes());   // JSON to associative array

$app->get('/meeting/:id', function ($meeting_id) {
    echo file_get_contents ( '../json/meeting/1.json');
});

$app->post('/meeting/', function() use ($app) {
    $dataIn = $app->request()->getBody();
    file_put_contents ( '../json/meeting/3.json', $dataIn);
});

$app->put('/meeting/:id', function($id) use ($app) {
    $request = $app->request();
    $body = $request->getBody();

    $json = json_encode($body);
    file_put_contents ( '../json/meeting/1.json', json_encode($body));

    //echo $body;
    // Save to DB $dataIn['name'], $dataIn['age'], etc.
    echo $json;
});


$app->run();



