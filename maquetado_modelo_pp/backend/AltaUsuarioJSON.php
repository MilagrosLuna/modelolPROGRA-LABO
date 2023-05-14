<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
$correo = isset($_POST["correo"]) ? $_POST["correo"] : "sin correo"; 
$clave = isset($_POST["clave"]) ? $_POST["clave"] : "sin clave"; 
$nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : "sin nombre"; 
$usuario = new Usuario();
$usuario->nombre =$nombre;
$usuario->clave =$clave;
$usuario->correo =$correo;
$usuario->toJson();
$respuesta =  $usuario->GuardarEnArchivo();
$messi = json_decode($respuesta);
echo $messi->mensaje;
