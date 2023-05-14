<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
$id = isset($_POST["id"]) ? (int) $_POST["id"] : -1; 
if(Usuario::Eliminar($id)) {
    $respuesta = array("exito" => true, "mensaje" => "Usuario eliminado exitosamente.");
} else {
    $respuesta = array("exito" => false, "mensaje" => "Error al eliminar el usuario.");
} 
echo json_encode($respuesta);