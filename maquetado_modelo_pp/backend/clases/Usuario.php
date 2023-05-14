<?php   
namespace ManejoDeUsuarios;
require_once("./clases/ibm.php");
use IBM;
use PDO;
use PDOException;
class Usuario implements IBM
{
    public string $nombre;
	public string $correo;
    public string $clave;
    public int $id;
    public int $id_perfil;
	public string $perfil;	

    public function toJson(){		
  		$json = array("nombre" => $this->nombre,
				"correo" => $this->correo,
				"clave" => $this->clave);
		return json_encode($json);
	}
	public function GuardarEnArchivo() {
		$retorno = "";		
		$ar = fopen("./archivos/usuarios.json", "a");
		$cant = fwrite($ar, $this->toJson() ."\r\n");		
		if($cant > 0)
		{
			$retorno= '{"exito" : true,"mensaje": "usuario agregado"}';
		}
		else{
			$retorno= '{"exito" : false,"mensaje": "hubo un problema con el archivo"}';
		}
		fclose($ar);
		return $retorno;		
	}  
    public static function TraerTodosJSON(){
		$usuarios = [];
		$ar = fopen("./archivos/usuarios.json", "r");
		while(!feof($ar))
		{
			$linea = fgets($ar);
            $usuario = json_decode($linea);
			if(isset($usuario))
			{
				$new = new Usuario();
				$new->nombre = $usuario->nombre;
				$new->correo = $usuario->correo;
				$new->clave = $usuario->clave;
				array_push($usuarios,$new);
			}
		}	
		return $usuarios;
	} 
	public function Agregar() {
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO usuarios (nombre, correo, clave, id_perfil)"
                                                  . "VALUES(:nombre, :correo, :clave , :id_perfil)");        
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
		$consulta->bindValue(':id_perfil', $this->id_perfil, PDO::PARAM_INT);
        return $consulta->execute();   			
	} 
	public static function TraerTodos(){		
		$usuarios = array();
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();		
        $consulta =$objetoAccesoDato->retornarConsulta("SELECT * FROM usuarios");
        $consulta->execute();
        while($fila = $consulta->fetch())
        {
          $item= new Usuario(); 
		  $item->id=$fila["id"];
		  $item->nombre=$fila["nombre"];
		  $item->correo=$fila["correo"];
		  $item->clave=$fila["clave"];
		  $item->id_perfil=$fila["id_perfil"];
		  $item->perfil="";
          array_push($usuarios, $item);
        }
		return $usuarios;         		
	}
	public static function TraerUno(string $correo, string $clave) : Usuario|null {
		$id=-1;
		$usuarios = Usuario::TraerTodos();
		foreach($usuarios as $user)
		{
			if($user->correo == $correo && $user->clave == $clave)
			{
				$id = $user->id;
				break;
			}
		}
		if($id > -1)
		{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE id=:id");
			$consulta->bindValue(':id',  $id, PDO::PARAM_INT);
			//echo ($id);
			$consulta->execute();
			$fila=$consulta->fetch();
			//var_dump($fila);
			if($fila!==null)
			{
				$item= new Usuario(); 
				$item->id=$fila[0];
				$item->nombre=$fila[1];
				$item->correo=$fila[2];
				$item->clave=$fila[3];
				$item->id_perfil=$fila[4];
				$retorno = $item;
			}
			else{
				$retorno = null;
			}
		}        
		else{
			$retorno = null;
		}
        return $retorno;
	}
	public function Modificar()
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->retornarConsulta("UPDATE usuarios SET nombre=:nombre,correo=:correo,clave=:clave,id_perfil=:id_perfil WHERE id = :id"); 
		$consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
		$consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
		$consulta->bindValue(':id_perfil', $this->id_perfil, PDO::PARAM_INT);
		$retorno = $consulta->execute();		 		
		return $retorno;
	}
    public static function Eliminar($id)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->retornarConsulta("DELETE FROM usuarios WHERE id = :id");        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);			
		$consulta->execute();
		if($consulta->rowCount()>0){return true;}
		else{return false;}
	}
}
?>