<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
$correo = isset($_POST["correo"]) ? $_POST["correo"] : "sin correo"; 
$clave = isset($_POST["clave"]) ? $_POST["clave"] : "sin clave"; 
$nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : "sin nombre"; 
$id_perfil = isset($_POST["id_perfil"]) ? $_POST["id_perfil"] : "sin id_perfil";

$usuario = new Usuario();
$usuario->correo = $correo;
$usuario->clave = $clave;
$usuario->nombre = $nombre;
$usuario->id_perfil = $id_perfil;

if($usuario->Agregar())
{
    $respuesta = array('exito' => true, 'mensaje' => 'Usuario agregado.');
} else {
  $respuesta = array('exito' => false, 'mensaje' => 'Usuario no agregado.');
}
echo json_encode($respuesta);

