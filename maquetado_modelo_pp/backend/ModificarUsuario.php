<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;

$usuario_json = $_POST['usuario_json'];
$usuario = json_decode($usuario_json);
$usuario_modificar = new Usuario();
$usuario_modificar->id = $usuario->id;
$usuario_modificar->nombre = $usuario->nombre;
$usuario_modificar->correo = $usuario->correo;
$usuario_modificar->clave = $usuario->clave;
$usuario_modificar->id_perfil = $usuario->id_perfil;

if ($usuario_modificar->Modificar()) {
    $respuesta = array(
        'exito' => true,
        'mensaje' => 'Usuario modificado con exito'
    );
} else {
    $respuesta = array(
        'exito' => false,
        'mensaje' => 'No se pudo modificar el usuario'
    );
}

// Devolver la respuesta como JSON
echo json_encode($respuesta);