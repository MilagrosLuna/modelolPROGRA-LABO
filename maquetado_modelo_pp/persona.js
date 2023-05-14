"use strict";
var Entidades;
(function (Entidades) {
    class Persona {
        constructor(nombre, json) {
            this.nombre = nombre;
            let datos = JSON.parse(json);
            this.correo = datos.correo;
            this.clave = datos.clave;
        }
        ToString() {
            return "nombre: " + this.nombre + ",correo: " + this.correo + ",clave: " + this.clave;
        }
        ToJson() {
            return "{" + this.ToString + '}';
        }
    }
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=persona.js.map