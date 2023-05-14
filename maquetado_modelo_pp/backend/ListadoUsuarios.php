<?php
require_once "./clases/Usuario.php";
require_once "./clases/accesoDeDatos.php";
use ManejoDeUsuarios\AccesoDatos;
use ManejoDeUsuarios\Usuario;

$tabla = isset($_GET["tabla"]) ? $_GET["tabla"] : "sin tabla";

if($tabla == "mostrar"){
  $usuarios = Usuario::TraerTodos();
}else{
  $usuarios = null;
}
if ($usuarios) {
  echo '<table><thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Perfil</th><th>Accion</th></tr></thead><tbody>';
  foreach ($usuarios as $usuario) {
    echo '<tr>';
    echo '<td>' . $usuario->id . '</td>';
    echo '<td>' . $usuario->nombre . '</td>';
    echo '<td>' . $usuario->correo . '</td>';
    echo '<td>' . $usuario->id_perfil . '</td>';
    echo '<td><button type="button" class="btn btn-info" id="" data-obj=' . json_encode($usuario) . '
        name="btnModificar"><span class="bi bi-pencil"></span>
        </button>
        <button type="button" class="btn btn-danger" id="" data-obj=' . $usuario->id . ' name="btnEliminar"> 
        <span class="bi bi-x-circle"></span>
        </button>
      </td></tr>';
  }
  echo '</tbody></table>';

} 
else {
  echo 'No se encontraron usuarios.';
}