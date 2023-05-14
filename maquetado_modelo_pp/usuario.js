"use strict";
var Entidades;
(function (Entidades) {
    class Usuario extends Entidades.Persona {
        constructor(nombre, json, id_perfil = 0, perfil = "") {
            super(nombre, json);
            this.id = -1;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        ToString() {
            return super.ToString() + ",id: " + this.id + ",id_perfil: " + this.id_perfil + ",perfil: " + this.perfil;
        }
        ToJson() {
            return '{' + this.ToString() + '}';
        }
    }
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=usuario.js.map