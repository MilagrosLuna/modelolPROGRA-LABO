<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
$user = isset($_POST["usuario_json"]) ? $_POST["usuario_json"] : "sin user"; 
$usuario = json_decode($user);
/* echo $usuario->correo;
echo $usuario->clave; */
$resultado = Usuario::TraerUno($usuario->correo, $usuario->clave);
if ($resultado != null) {
    $respuesta = array('exito' => true, 'mensaje' => 'Usuario encontrado.');
  } else {
    $respuesta = array('exito' => false, 'mensaje' => 'Usuario no encontrado.');
  }
echo json_encode($respuesta);
