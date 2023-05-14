/// <reference path="ajax.ts" />
/// <reference path="empleado.ts" />

window.addEventListener("load", ():void => {
    ModeloParcial.Manejadora.MostrarEmpleados();
}); 

namespace ModeloParcial{
    export class  Manejadora{

    static URL_API : string = "./"; 
    static AJAX : Ajax = new Ajax();
    
    public static AgregarUsuarioJSON()
    {
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;        
        let form : FormData = new FormData()
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaUsuarioJSON.php", 
                    Manejadora.AgregarSuccessJSON, 
                    form, 
                    Manejadora.Fail); 
    }
    public static AgregarSuccessJSON(retorno:string):void {
        console.log("Agregar: ", retorno);        
        Manejadora.MostrarUsuariosJSON();
        alert("Agregar:"+retorno);
    }
    public static Fail(retorno:string):void {

        console.error(retorno);
        alert("Ha ocurrido un ERROR!!!");
    }
    public static MostrarUsuariosJSON()
    {       
        Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/ListadoUsuariosJSON.php", 
                    Manejadora.MostrarListadoSuccess, 
                    "", 
                    Manejadora.Fail); 
    }
    public static MostrarListadoSuccess(data:string):void {

        let obj_array: any[] = JSON.parse(data);

        console.log("Mostrar: ", obj_array);
        let div = <HTMLDivElement>document.getElementById("divTabla");
        let tabla = `<table class="table table-hover">
                        <tr>
                            <th>NOMBRE</th><th>CORREO</th><th>CLAVE</th>
                        </tr>`;
                    if(obj_array.length < 1){
                        tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                            <td>---</td></tr>`;
                    }
                    else {
                        for (let index = 0; index < obj_array.length; index++) {
                            const dato = obj_array[index];
                            tabla += `<tr><td>${dato.nombre}</td><td>${dato.correo}</td><td>${dato.clave}</td></tr>`;
                        }  
                    }
        tabla += `</table>`;
        div.innerHTML = tabla;            
    }
    public static VerificarUsuarioJSON(){
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;
        let info :string = '{"correo":"'+correo+'","clave":"'+clave+'"}';
        let form : FormData = new FormData()
        form.append('usuario_json', info);
        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/VerificarUsuarioJSON.php", 
                    Manejadora.VerificarSuccess, 
                    form, 
                    Manejadora.Fail); 
    }
    public static VerificarSuccess(retorno:string):void {
        let respuesta = JSON.parse(retorno);
        console.log("Verificar: ", respuesta.mensaje);        
        Manejadora.MostrarUsuarios();
        alert("Verificar:"+respuesta.mensaje);
    } 
    public static AgregarUsuario()
    {
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;      
        let id_perfil:string = (<HTMLInputElement>document.getElementById("cboPerfiles")).value;            
        let form : FormData = new FormData()
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', id_perfil);
        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaUsuario.php", 
                    Manejadora.AgregarSuccess, 
                    form, 
                    Manejadora.Fail);         
    }
    public static AgregarSuccess(retorno:string):void {
        let respuesta = JSON.parse(retorno);
        console.log("Agregar: ", respuesta.mensaje);        
        Manejadora.MostrarUsuarios();
        alert("Agregar:"+respuesta.mensaje);
    }
    public static MostrarUsuarios()
    {
        Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/ListadoUsuarios.php", 
                    Manejadora.MostrarUsuariosSuccess, 
                    "tabla=mostrar", 
                    Manejadora.Fail);         
    }
    public static MostrarUsuariosSuccess(retorno:string):void {        
        let div = <HTMLDivElement>document.getElementById("divTabla");        
        div.innerHTML = retorno;  
        document.getElementsByName("btnModificar").forEach((boton)=>{
            boton.addEventListener("click", ()=>{ 
                let obj : any = boton.getAttribute("data-obj");
                let obj_dato = JSON.parse(obj);
                (<HTMLInputElement>document.getElementById("id")).value = obj_dato.id;
                (<HTMLInputElement>document.getElementById("nombre")).value = obj_dato.nombre;
                (<HTMLInputElement>document.getElementById("correo")).value = obj_dato.correo;   
                (<HTMLInputElement>document.getElementById("clave")).value = obj_dato.clave; 
                (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj_dato.id_perfil; 
                let btn = (<HTMLInputElement>document.getElementById("btn-modificar"));
                btn.addEventListener("click", ():void=>{
                    Manejadora.ModificarUsuario();
                });
            });
        });
        document.getElementsByName("btnEliminar").forEach((boton)=>{
            boton.addEventListener("click", ()=>{ 
                let id : any = boton.getAttribute("data-obj");          
                if(confirm(`¿Seguro de eliminar alumno con id ${id}?`)){                  
                    let form : FormData = new FormData()
                    form.append('id', id);             
                    Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/EliminarUsuario.php", 
                    Manejadora.DeleteSuccess, 
                                form, 
                                Manejadora.Fail);
                }                
            });
        }); 
         console.log(retorno);        
        alert(retorno);
    }   
    public static DeleteSuccess(retorno:string):void {
        let respuesta = JSON.parse(retorno);
        console.log("Eliminar: ", respuesta.mensaje);        
        Manejadora.MostrarUsuarios();
        alert("Eliminar:"+respuesta.mensaje);
    }
    public static ModificarUsuario()
    {
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;       
        let id_perfil:string = (<HTMLInputElement>document.getElementById("cboPerfiles")).value;        
        let id:string = (<HTMLInputElement>document.getElementById("id")).value;        
        let form : FormData = new FormData()
        let info :string = '{"correo":"'+correo+'","clave":"'+clave+'"}';    
        let user : Entidades.Usuario = new Entidades.Usuario(nombre,info,Number.parseInt(id_perfil));
        user.id = Number.parseInt(id);
        let usuario_json = JSON.stringify(user);
        form.append('usuario_json', usuario_json);
        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/ModificarUsuario.php", 
                    Manejadora.ModificarSuccess, 
                    form, 
                    Manejadora.Fail); 
    }
    public static ModificarSuccess(retorno:string):void {
        let respuesta = JSON.parse(retorno);
        console.log("Modificar: ", respuesta.mensaje);        
        Manejadora.MostrarUsuarios();
        alert("Modificar:"+respuesta.mensaje);
    }
    public static MostrarEmpleados()
    {
        Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/ListadoEmpleados.php", 
        Manejadora.MostrarEmpleado, 
        "tabla=mostrar", 
        Manejadora.Fail);    
    }
    public static MostrarEmpleado(data:string)
    {
        console.log(data);
        let div = <HTMLDivElement>document.getElementById("divTablaEmpleados");             
        div.innerHTML = data;    
        document.getElementsByName("btnModificar").forEach((boton)=>{
            boton.addEventListener("click", ()=>{ 
                let obj : any = boton.getAttribute("data-obj");
                let obj_dato = JSON.parse(obj);
                (<HTMLInputElement>document.getElementById("id")).value = obj_dato.id;
                (<HTMLInputElement>document.getElementById("nombre")).value = obj_dato.nombre;
                (<HTMLInputElement>document.getElementById("correo")).value = obj_dato.correo;   
                (<HTMLInputElement>document.getElementById("clave")).value = obj_dato.clave; 
                (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj_dato.id_perfil; 
                (<HTMLInputElement>document.getElementById("sueldo")).value = obj_dato.sueldo; 
                (<HTMLInputElement>document.getElementById("foto")).src = "/maquetado_modelo_pp/backend"+ obj_dato.foto; 
                let btn = (<HTMLInputElement>document.getElementById("btn-modificar"));
                btn.addEventListener("click", ():void=>{
                    Manejadora.ModificarEmpleado();
                });
            });
        });
        document.getElementsByName("btnEliminar").forEach((boton)=>{
            boton.addEventListener("click", ()=>{ 
                let id : any = boton.getAttribute("data-obj");          
                if(confirm(`¿Seguro de eliminar empleado con id ${id}?`)){                  
                    let form : FormData = new FormData()
                    form.append('id', id);             
                    Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/EliminarEmpleado.php", 
                    Manejadora.DeleteSuccessEmpleado, 
                                form, 
                                Manejadora.Fail);
                }                
            });
        }); 
    }
    public static AgregarEmpleado()
    {
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;      
        let id_perfil:string = (<HTMLInputElement>document.getElementById("cboPerfiles")).value;  
        let sueldo : string = (<HTMLInputElement>document.getElementById("sueldo")).value;  
        let foto : any = (<HTMLInputElement> document.getElementById("foto"));
    
        let form : FormData = new FormData();
        form.append('nombre',nombre );
        form.append('correo',correo );
        form.append('clave',clave );
        form.append('id_perfil',id_perfil );
        form.append('sueldo', sueldo );
        form.append('foto', foto.files[0]);
        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaEmpleado.php",
                Manejadora.AgregarEmpleadoSuccess, 
                form, 
                Manejadora.Fail); 
    }
    public static AgregarEmpleadoSuccess(retorno:string):void {
        let respuesta = JSON.parse(retorno);
        console.log("Agregar: ", respuesta.mensaje);        
        Manejadora.MostrarEmpleados();
        alert("Agregar:"+respuesta.mensaje);
    }
    public static ModificarEmpleado()
    {
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;       
        let id_perfil:string = (<HTMLInputElement>document.getElementById("cboPerfiles")).value;  
        let sueldo:number = parseInt((<HTMLInputElement>document.getElementById("sueldo")).value);         
        let foto: any = (<HTMLInputElement> document.getElementById("foto"));        
        let id:string = (<HTMLInputElement>document.getElementById("id")).value;        
        let form : FormData = new FormData()
        let info :string = '{"correo":"'+correo+'","clave":"'+clave+'"}'; 
        let user : Entidades.Empleado = new Entidades.Empleado(nombre,info,parseInt(id_perfil),id_perfil,sueldo,"");
        user.id = Number.parseInt(id);
        let empleado_json = JSON.stringify(user);
        form.append('empleado_json', empleado_json);
        form.append('foto', foto.files[0]);
        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/ModificarEmpleado.php", 
                    Manejadora.ModificarEmpleadosSuccess, 
                    form, 
                    Manejadora.Fail); 
    }
    public static ModificarEmpleadosSuccess(retorno:string):void {
        console.log(retorno);
        let respuesta = JSON.parse(retorno);
        console.log("Modificar: ", respuesta.mensaje);        
        Manejadora.MostrarEmpleados();
        alert("Modificar:"+respuesta.mensaje);
    }
    public static DeleteSuccessEmpleado(retorno:string)
    {             
        let respuesta = JSON.parse(retorno);
        console.log("Eliminar: ", respuesta.mensaje);        
        Manejadora.MostrarEmpleados();
        alert("Eliminar:"+respuesta.mensaje);
    }
   
    }
}