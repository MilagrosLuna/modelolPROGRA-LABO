namespace Entidades{
   /*  a. Persona: nombre(cadena), correo(cadena) y clave(cadena) como atributos. Un constructor que
    reciba dos parámetros. Un método, ToString():string, que retorne la representación de la clase en
    formato cadena (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena
    JSON válida). */
    
    export class Persona{
        public nombre : string;
        public correo : string;
        public clave : string;
        
        public constructor(nombre :string, json :string){
            this.nombre = nombre;
            let datos = JSON.parse(json);
            this.correo = datos.correo;
            this.clave = datos.clave;
        }
        public ToString() {
            return "nombre: " + this.nombre + ",correo: " + this.correo + ",clave: " + this.clave;
        }
        public ToJson() {
            return  "{" + this.ToString + '}';
        }
    }
}