<?php
require_once "./clases/Usuario.php";
use ManejoDeUsuarios\Usuario;
$usuarios = Usuario::TraerTodosJSON();
//var_dump(Usuario::TraerTodosJSON());
echo json_encode($usuarios);