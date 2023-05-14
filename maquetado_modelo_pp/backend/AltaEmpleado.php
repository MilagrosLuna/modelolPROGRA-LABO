<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
require_once "./clases/Empleado.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;
use ManejoDeUsuarios\Empleado;

$nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : "sin nombre"; 
$correo = isset($_POST["correo"]) ? $_POST["correo"] : "sin correo"; 
$clave = isset($_POST["clave"]) ? $_POST["clave"] : "sin clave"; 
$id_perfil = isset($_POST["id_perfil"]) ? $_POST["id_perfil"] : "sin id_perfil";
$sueldo = isset($_POST["sueldo"]) ? $_POST["sueldo"] : "sin sueldo";

$empleado = new Empleado();
$empleado->nombre = $nombre;
$empleado->correo = $correo;
$empleado->clave = $clave;
$empleado->id_perfil = $id_perfil;
$empleado->sueldo =  (int)$sueldo;

$foto_name = $_FILES['foto']['name'];
$foto_tmp_name = $_FILES['foto']['tmp_name'];
$foto_extension = pathinfo($foto_name, PATHINFO_EXTENSION);
$hora = str_replace(':', '', date('H:i:s'));
$new_foto_name = $nombre . '.' . $hora. '.'. $foto_extension;    
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
//echo $empleado->foto;
if($uploadOk)
{
    if($empleado->Agregar())
    {
        if (move_uploaded_file($foto_tmp_name, $destinoFoto)) {
           // echo "<br/>LA foto  ". basename( $_FILES["foto"]["name"]). " ha sido subido exitosamente.";
        } else {
           // echo "<br/>Lamentablemente ocurri&oacute; un error y no se pudo subir el archivo.";
        }
        $respuesta = array('exito' => true, 'mensaje' => 'empleado agregado.');
    } else {
        $respuesta = array('exito' => false, 'mensaje' => 'empleado no agregado.');
    }
    echo json_encode($respuesta);
}
else
{
    echo json_encode( $respuesta = array('exito' => false, 'mensaje' => 'empleado no agregado problema con la foto.'));
}

