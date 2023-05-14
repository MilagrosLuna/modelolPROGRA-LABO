<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
require_once "./clases/Empleado.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
use ManejoDeUsuarios\Empleado;

$empleado_json = isset($_POST["empleado_json"]) ? $_POST["empleado_json"] : "sin empleado";

$empleado_decode = json_decode($empleado_json);
$empleado = new Empleado();
$empleado->nombre = $empleado_decode->nombre;
$empleado->correo = $empleado_decode->correo;
$empleado->clave = $empleado_decode->clave;
$empleado->id_perfil = $empleado_decode->id_perfil;
$empleado->sueldo = (int)$empleado_decode->sueldo;
$empleado->id = $empleado_decode->id;

$foto_name = $_FILES['foto']['name'];
$foto_tmp_name = $_FILES['foto']['tmp_name'];
$foto_extension = pathinfo($foto_name, PATHINFO_EXTENSION);
$hora = str_replace(':', '', date('H:i:s'));
$new_foto_name = $empleado->nombre . '.' . $hora. '.'. $foto_extension;    
$destinoFoto = "./empleados/fotos/" . $new_foto_name;    
$uploadOk = TRUE;   
if ($_FILES["foto"]["size"] > 5000000 ) {
   // echo "El archivo es demasiado grande. Verifique!!!";
    $uploadOk = FALSE;
}
$tipoArchivo = pathinfo($destinoFoto, PATHINFO_EXTENSION);
if($tipoArchivo != "jpg" && $tipoArchivo != "jpeg" && $tipoArchivo != "gif"
    && $tipoArchivo != "png") {
   // echo "Solo son permitidas imagenes con extension JPG, JPEG, PNG o GIF.";
    $uploadOk = FALSE;
}
$empleado->foto = $destinoFoto;
$modificar =$empleado->Modificar();
if($modificar){
    $retorno  = array("exito" => true, "mensaje" => "Modificado correctamente");
    
move_uploaded_file($foto_tmp_name, $destinoFoto);

    }
else $retorno  = array("exito" => false, "mensaje" => "ERROR al modificar");


echo json_encode($retorno);



?>