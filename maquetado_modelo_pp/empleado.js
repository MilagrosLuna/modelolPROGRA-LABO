"use strict";
var Entidades;
(function (Entidades) {
    class Empleado extends Entidades.Usuario {
        constructor(nombre, json, id_perfil, perfil, sueldo, foto) {
            super(nombre, json, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
        static a() {
            console.log("perroprimo");
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=empleado.js.map