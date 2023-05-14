<?php   
namespace ManejoDeUsuarios;
require_once("./clases/icrud.php");
use ICRUD;
use PDO;
use PDOException;
class Empleado extends Usuario implements ICRUD
{
    public string $foto;
    public int $sueldo;

    public static function TraerTodos()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
       /*  $consulta = $objetoAccesoDato->retornarConsulta("SELECT * FROM empleados");
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_CLASS,'Empleado');
        return $consulta->fetchAll(); */
        $empleados = array();
        $consulta =$objetoAccesoDato->retornarConsulta("SELECT * FROM  empleados");
        $consulta->execute();

        while($fila = $consulta->fetch())
        {
          $item= new Empleado(); 
		  $item->id=$fila[0];
		  $item->correo=$fila[1];
		  $item->clave=$fila[2];
		  $item->nombre=$fila[3];
		  $item->id_perfil=$fila[4];
		  $item->foto=$fila[5];
		  $item->sueldo=$fila[6];
          array_push($empleados, $item);
		  // $consulta->setFetchMode(pdo::)
        }
		return $empleados;         		

    }
    public  function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO empleados (nombre, correo, clave, id_perfil, foto, sueldo)"
                                                  . "VALUES(:nombre, :correo, :clave , :id_perfil, :foto, :sueldo)");        
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
		$consulta->bindValue(':id_perfil', $this->id_perfil, PDO::PARAM_INT);
        $consulta->bindValue(':foto', $this->foto, PDO::PARAM_STR);
		$consulta->bindValue(':sueldo', $this->sueldo, PDO::PARAM_INT);
        return $consulta->execute();   		
    }
    public  function Modificar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->retornarConsulta("UPDATE empleados SET foto = :foto, correo = :correo, id_perfil = :id_perfil, nombre = :nombre, clave = :clave WHERE id = :id");
    
        $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':clave', strval($this->clave), PDO::PARAM_STR);
        $consulta->bindValue(':id_perfil', $this->id_perfil, PDO::PARAM_INT);
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindValue(':foto', $this->foto, PDO::PARAM_STR);
       
        $modificado = $consulta->execute();   
        if ($modificado && $consulta->rowCount() > 0) return true;
        else return false;    
    }
    public static function Eliminar($id)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->retornarConsulta("DELETE FROM empleados WHERE id = :id");    
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        return $consulta->execute(); 
    }    
    public static function generarTablaBD($array)
    {        
        echo "<style>
        table {
          border-collapse: collapse; 
          width: 80%; 
          padding: 10px;
          margin: 50px auto;
          text-align: center;
        }
        td, th {
          border: 1px solid black;
          padding: 8px; 
          text-align: center;
        }
        </style>";
        echo "
        <table >
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Perfil</th>
                    <th>Sueldo</th>
                    <th>Path</th>
                    <th>Foto</th>
                </tr>
            </thead>"; 
        foreach($array as $usuario)
        {
            echo "<tr>";
                echo "<td>" . $usuario->nombre . "</td>";
                echo "<td>" . $usuario->correo . "</td>";
                echo "<td>" . $usuario->id_perfil . "</td>";
                echo "<td>" . $usuario->sueldo . "</td>";
                echo "<td>" . $usuario->foto . "</td>";
                echo "<td>";
                if($usuario->foto != "")
                {
                    if(file_exists("".$usuario->foto)) {
                        echo '<img src=/maquetado_modelo_pp/backend'.$usuario->foto.' alt='.$usuario->foto . ' height="100px" width="100px">'; 
                    }else{
                        echo 'No hay imagen guardada en '. $usuario->foto; 
                    }
                }else{
                    echo "Sin datos //";
                }
                echo "</td>";
                echo '<td><button type="button" class="btn btn-info" id="" data-obj=' . json_encode($usuario) . '
                        name="btnModificar"><span class="bi bi-pencil"></span>
                        </button>
                        <button type="button" class="btn btn-danger" id="" data-obj=' . $usuario->id . ' name="btnEliminar"> 
                        <span class="bi bi-x-circle"></span>
                        </button>
                    </td>';
            echo "</tr>";
        }
        echo "</table>";
    }

}
