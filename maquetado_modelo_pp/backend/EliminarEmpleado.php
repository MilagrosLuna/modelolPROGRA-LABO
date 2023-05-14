<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
require_once "./clases/Empleado.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
use ManejoDeUsuarios\Empleado;

 $id = isset($_POST["id"]) ? $_POST["id"] : "sin id";

if(Empleado::Eliminar($id)) $retorno = array("exito" => true, "mensaje" => "Empleado eliminado");
else  $retorno = array("exito" => false, "mensaje" => "Error al eliminar Empleado");



echo json_encode($retorno);
?>