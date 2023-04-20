<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
require __DIR__ . '/../vendor/autoload.php';
 
const JWT_SECRET = "makey1234567";

$jwt = "";
$user = [];
$catalogue = '[
    {
      "id": 1,
      "name": "Aiguillettes de poulet",
      "description": "Poulet français - 1kg",
      "price": 10
    },
    {
      "id": 2,
      "name": "Curry Madras",
      "description": "Marque métro - 480g",
      "price": 9
    },
    {
      "id": 3,
      "name": "Riz Palais des Thés",
      "description": "1kg",
      "price": 2
    },
    {
      "id": 4,
      "name": "Dragon Quest VIII",
      "description": "PS2- 2004",
      "price": 20000
    }
]';

$app = AppFactory::create();

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/user"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

function addHeaders(Response $response) : Response {
    $response = $response
    ->withHeader("Content-Type", "application/json")
    // ->withHeader('Access-Control-Allow-Origin', ('http://localhost:4200'))
    ->withHeader('Access-Control-Allow-Origin', ('*'))
    ->withHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');

    return $response;
}

$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});

function createJwT (Response $response) : Response {

    $issuedAt = time();
    $expirationTime = $issuedAt + 60;
    $payload = array(
    'userid' => '1',
    'email' => 'enzo.valentin.auditeur@cnam.fr',
    'pseudo' => 'enzo',
    'iat' => $issuedAt,
    'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    $GLOBALS['jwt'] = $token_jwt;
    return $response;
}

$app->options('/api/user', function (Request $request, Response $response, $args) {
    
    // Evite que le front demande une confirmation à chaque modification
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    
    return addHeaders ($response);
});

$app->get('/api/user', function (Request $request, Response $response, $args) {   
        // $data = array('nom' => 'valentin', 'prenom' => 'enzo','adresse' => '6 rue des fleurs', 'tel' => '0606060607');
    $data = $GLOBALS['user'];
    $response->getBody()->write(json_encode($data));

    return addHeaders($response);
});

$app->post('/api/user', function (Request $request, Response $response, $args) {

    $err=false;
    $body = $request->getParsedBody();

    // $civilite = $body ['civilite'] ?? "";
    // $nom = $body ['nom'] ?? "";
    // $prenom = $body ['prenom'] ?? "";
    // $adresse = $body ['adresse'] ?? "";
    // $cp = $body ['cp'] ?? "";
    // $ville = $body ['ville'] ?? "";
    // $pays = $body ['pays'] ?? "";
    // $telephone = $body ['telephone'] ?? "";
    // $email = $body ['email'] ?? "";
    // $login = $body ['login'] ?? "";
    // $password = $body ['password'] ?? "";

    $GLOBALS['user'] = $body;
    $data = $body;

    $response->getBody()->write(json_encode($data));

    return addHeaders($response);
});


$app->options('/api/login', function (Request $request, Response $response, $args) {
    
    // Evite que le front demande une confirmation à chaque modification
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    
    return addHeaders ($response);
});
// APi d'authentification générant un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {   
    $err=false;
    $body = $request->getParsedBody();
    $email = $body ['email'] ?? "";
    $password = $body ['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$email))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$password))  {
        $err=true;
    }

    if (!$err) {
            $response = createJwT ($response);
            $data = array('nom' => 'valentin', 'prenom' => 'enzo');
            $response->getBody()->write(json_encode($data));
     } else {          
            $response = $response->withStatus(401);
     }
    return addHeaders($response);
});

$app->options('/api/catalogue', function (Request $request, Response $response, $args) {
    
    // Evite que le front demande une confirmation à chaque modification
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    
    return addHeaders ($response);
});
// API Nécessitant un Jwt valide
$app->get('/api/catalogue/filtre/{filtre}', function (Request $request, Response $response, $args) {
    $filtre = $args['filtre'];
    // $flux = '[{"titre":"linux","ref":"001","prix":"20"},{"titre":"java","ref":"002","prix":"21"},{"titre":"windows","ref":"003","prix":"22"},{"titre":"angular","ref":"004","prix":"23"},{"titre":"unix","ref":"005","prix":"25"},{"titre":"javascript","ref":"006","prix":"19"},{"titre":"html","ref":"007","prix":"15"},{"titre":"css","ref":"008","prix":"10"}]';
    $flux = $GLOBALS['catalogue'];
    if ($filtre) {
      $data = json_decode($flux, true); 
    	
        $res = array_filter($data, function($obj) use ($filtre)
        { 
            return strpos($obj["titre"], $filtre) !== false;
        });
        $response->getBody()->write(json_encode(array_values($res)));
    } else {
         $response->getBody()->write($flux);
    }

    return addHeaders($response);
});

$app->options('/api/catalogue/{id}', function (Request $request, Response $response, $args) {
    
    // Evite que le front demande une confirmation à chaque modification
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    
    return addHeaders ($response);
});

$app->get('/api/catalogue/{id}', function (Request $request, Response $response, $args) {
    $filtre = $args['id'];
    // $flux = '[{"titre":"linux","ref":"001","prix":"20"},{"titre":"java","ref":"002","prix":"21"},{"titre":"windows","ref":"003","prix":"22"},{"titre":"angular","ref":"004","prix":"23"},{"titre":"unix","ref":"005","prix":"25"},{"titre":"javascript","ref":"006","prix":"19"},{"titre":"html","ref":"007","prix":"15"},{"titre":"css","ref":"008","prix":"10"}]';
    $flux = $GLOBALS['catalogue'];
    if ($filtre) {
      $data = json_decode($flux, true); 
    	
        $res = array_filter($data, function($obj) use ($filtre)
        { 
            return strpos($obj["id"], $filtre) !== false;
        });
        $response->getBody()->write(json_encode(array_values($res)));
    } else {
         $response->getBody()->write($flux);
    }

    return addHeaders($response);
});

$app->get('/api/catalogue', function (Request $request, Response $response, $args) {
    $flux = $GLOBALS['catalogue'];
    $response->getBody()->write($flux);

    return addHeaders($response);
});
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();