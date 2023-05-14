<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
require_once "./clases/Empleado.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
use ManejoDeUsuarios\Empleado;

$tabla = isset($_GET["tabla"]) ? $_GET["tabla"] : "sin tabla";

if($tabla == "mostrar"){
  $usuarios = Empleado::TraerTodos();
 echo Empleado::generarTablaBD($usuarios);
}