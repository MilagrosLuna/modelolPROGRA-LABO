/// <reference path="persona.ts" />
namespace Entidades{
   /*  Usuario, hereda de Persona, posee como atributo id(entero), id_perfil(entero) y perfil(cadena). Un
    constructor para inicializar los atributos. Un método ToJSON():JSON, que retornará la
    representación del objeto en formato JSON. Se debe de reutilizar el método ToString de la clase
    Persona. */
    export class Usuario extends Persona{
        public id : number;
        public id_perfil : number;
        public perfil : string;

        public constructor(nombre :string, json :string, id_perfil :number = 0,perfil:string =""){
            super(nombre,json);                   
            this.id = -1;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        public ToString() {
            return super.ToString()+",id: " + this.id + ",id_perfil: " + this.id_perfil + ",perfil: " + this.perfil;
        }
        public ToJson() {
            return  '{' + this.ToString() + '}';
        }
    }
}