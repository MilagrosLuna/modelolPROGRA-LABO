/// <reference path="usuario.ts" />
namespace Entidades{
/*     Empleado, hereda de Usuario, posee como atributos id(entero), sueldo(numérico) y foto(cadena).
        Un constructor para inicializar los atributos. */
    export class Empleado extends Usuario{

        public sueldo : number;
        public foto : string;
        
        public constructor(nombre :string, json :string,id_perfil :number,perfil:string,sueldo:number,foto:string)
        {
            super(nombre,json,id_perfil,perfil);       
            this.sueldo = sueldo;
            this.foto = foto;
        }


        public static a()
        {
            console.log("perroprimo");
        }


    }
}