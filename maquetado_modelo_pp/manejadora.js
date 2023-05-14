"use strict";
window.addEventListener("load", () => {
    ModeloParcial.Manejadora.MostrarEmpleados();
});
var ModeloParcial;
(function (ModeloParcial) {
    class Manejadora {
        static AgregarUsuarioJSON() {
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let clave = document.getElementById("clave").value;
            let form = new FormData();
            form.append('nombre', nombre);
            form.append('correo', correo);
            form.append('clave', clave);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaUsuarioJSON.php", Manejadora.AgregarSuccessJSON, form, Manejadora.Fail);
        }
        static AgregarSuccessJSON(retorno) {
            console.log("Agregar: ", retorno);
            Manejadora.MostrarUsuariosJSON();
            alert("Agregar:" + retorno);
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static MostrarUsuariosJSON() {
            Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/ListadoUsuariosJSON.php", Manejadora.MostrarListadoSuccess, "", Manejadora.Fail);
        }
        static MostrarListadoSuccess(data) {
            let obj_array = JSON.parse(data);
            console.log("Mostrar: ", obj_array);
            let div = document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                        <tr>
                            <th>NOMBRE</th><th>CORREO</th><th>CLAVE</th>
                        </tr>`;
            if (obj_array.length < 1) {
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
        static VerificarUsuarioJSON() {
            let correo = document.getElementById("correo").value;
            let clave = document.getElementById("clave").value;
            let info = '{"correo":"' + correo + '","clave":"' + clave + '"}';
            let form = new FormData();
            form.append('usuario_json', info);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/VerificarUsuarioJSON.php", Manejadora.VerificarSuccess, form, Manejadora.Fail);
        }
        static VerificarSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Verificar: ", respuesta.mensaje);
            Manejadora.MostrarUsuarios();
            alert("Verificar:" + respuesta.mensaje);
        }
        static AgregarUsuario() {
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let clave = document.getElementById("clave").value;
            let id_perfil = document.getElementById("cboPerfiles").value;
            let form = new FormData();
            form.append('nombre', nombre);
            form.append('correo', correo);
            form.append('clave', clave);
            form.append('id_perfil', id_perfil);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaUsuario.php", Manejadora.AgregarSuccess, form, Manejadora.Fail);
        }
        static AgregarSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Agregar: ", respuesta.mensaje);
            Manejadora.MostrarUsuarios();
            alert("Agregar:" + respuesta.mensaje);
        }
        static MostrarUsuarios() {
            Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/ListadoUsuarios.php", Manejadora.MostrarUsuariosSuccess, "tabla=mostrar", Manejadora.Fail);
        }
        static MostrarUsuariosSuccess(retorno) {
            let div = document.getElementById("divTabla");
            div.innerHTML = retorno;
            document.getElementsByName("btnModificar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let obj = boton.getAttribute("data-obj");
                    let obj_dato = JSON.parse(obj);
                    document.getElementById("id").value = obj_dato.id;
                    document.getElementById("nombre").value = obj_dato.nombre;
                    document.getElementById("correo").value = obj_dato.correo;
                    document.getElementById("clave").value = obj_dato.clave;
                    document.getElementById("cboPerfiles").value = obj_dato.id_perfil;
                    let btn = document.getElementById("btn-modificar");
                    btn.addEventListener("click", () => {
                        Manejadora.ModificarUsuario();
                    });
                });
            });
            document.getElementsByName("btnEliminar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let id = boton.getAttribute("data-obj");
                    if (confirm(`¿Seguro de eliminar alumno con id ${id}?`)) {
                        let form = new FormData();
                        form.append('id', id);
                        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/EliminarUsuario.php", Manejadora.DeleteSuccess, form, Manejadora.Fail);
                    }
                });
            });
            console.log(retorno);
            alert(retorno);
        }
        static DeleteSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);
            Manejadora.MostrarUsuarios();
            alert("Eliminar:" + respuesta.mensaje);
        }
        static ModificarUsuario() {
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let clave = document.getElementById("clave").value;
            let id_perfil = document.getElementById("cboPerfiles").value;
            let id = document.getElementById("id").value;
            let form = new FormData();
            let info = '{"correo":"' + correo + '","clave":"' + clave + '"}';
            let user = new Entidades.Usuario(nombre, info, Number.parseInt(id_perfil));
            user.id = Number.parseInt(id);
            let usuario_json = JSON.stringify(user);
            form.append('usuario_json', usuario_json);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/ModificarUsuario.php", Manejadora.ModificarSuccess, form, Manejadora.Fail);
        }
        static ModificarSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Modificar: ", respuesta.mensaje);
            Manejadora.MostrarUsuarios();
            alert("Modificar:" + respuesta.mensaje);
        }
        static MostrarEmpleados() {
            Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/ListadoEmpleados.php", Manejadora.MostrarEmpleado, "tabla=mostrar", Manejadora.Fail);
        }
        static MostrarEmpleado(data) {
            console.log(data);
            let div = document.getElementById("divTablaEmpleados");
            div.innerHTML = data;
            document.getElementsByName("btnModificar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let obj = boton.getAttribute("data-obj");
                    let obj_dato = JSON.parse(obj);
                    document.getElementById("id").value = obj_dato.id;
                    document.getElementById("nombre").value = obj_dato.nombre;
                    document.getElementById("correo").value = obj_dato.correo;
                    document.getElementById("clave").value = obj_dato.clave;
                    document.getElementById("cboPerfiles").value = obj_dato.id_perfil;
                    document.getElementById("sueldo").value = obj_dato.sueldo;
                    document.getElementById("foto").src = "/maquetado_modelo_pp/backend" + obj_dato.foto;
                    let btn = document.getElementById("btn-modificar");
                    btn.addEventListener("click", () => {
                        Manejadora.ModificarEmpleado();
                    });
                });
            });
            document.getElementsByName("btnEliminar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let id = boton.getAttribute("data-obj");
                    if (confirm(`¿Seguro de eliminar empleado con id ${id}?`)) {
                        let form = new FormData();
                        form.append('id', id);
                        Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/EliminarEmpleado.php", Manejadora.DeleteSuccessEmpleado, form, Manejadora.Fail);
                    }
                });
            });
        }
        static AgregarEmpleado() {
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let clave = document.getElementById("clave").value;
            let id_perfil = document.getElementById("cboPerfiles").value;
            let sueldo = document.getElementById("sueldo").value;
            let foto = document.getElementById("foto");
            let form = new FormData();
            form.append('nombre', nombre);
            form.append('correo', correo);
            form.append('clave', clave);
            form.append('id_perfil', id_perfil);
            form.append('sueldo', sueldo);
            form.append('foto', foto.files[0]);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaEmpleado.php", Manejadora.AgregarEmpleadoSuccess, form, Manejadora.Fail);
        }
        static AgregarEmpleadoSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Agregar: ", respuesta.mensaje);
            Manejadora.MostrarEmpleados();
            alert("Agregar:" + respuesta.mensaje);
        }
        static ModificarEmpleado() {
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let clave = document.getElementById("clave").value;
            let id_perfil = document.getElementById("cboPerfiles").value;
            let sueldo = parseInt(document.getElementById("sueldo").value);
            let foto = document.getElementById("foto");
            let id = document.getElementById("id").value;
            let form = new FormData();
            let info = '{"correo":"' + correo + '","clave":"' + clave + '"}';
            let user = new Entidades.Empleado(nombre, info, parseInt(id_perfil), id_perfil, sueldo, "");
            user.id = Number.parseInt(id);
            let empleado_json = JSON.stringify(user);
            form.append('empleado_json', empleado_json);
            form.append('foto', foto.files[0]);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/ModificarEmpleado.php", Manejadora.ModificarEmpleadosSuccess, form, Manejadora.Fail);
        }
        static ModificarEmpleadosSuccess(retorno) {
            console.log(retorno);
            let respuesta = JSON.parse(retorno);
            console.log("Modificar: ", respuesta.mensaje);
            Manejadora.MostrarEmpleados();
            alert("Modificar:" + respuesta.mensaje);
        }
        static DeleteSuccessEmpleado(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);
            Manejadora.MostrarEmpleados();
            alert("Eliminar:" + respuesta.mensaje);
        }
    }
    Manejadora.URL_API = "./";
    Manejadora.AJAX = new ModeloParcial.Ajax();
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=manejadora.js.map