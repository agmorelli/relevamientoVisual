import { Voto } from "./Voto";
import { Usuario } from "./Usuario";

export class Imagen{
    id: string;
    nombre:string;
    path:string;
    usuario:Usuario;
    positivo: number;
    negativo:number;
    votos: Array<Voto>;

    constructor()
    {
        this.usuario=new Usuario();
    }
}