import type { CampoBloco } from "./bloco.types";


export function formatValueCamp(campo: CampoBloco): string {
    if(campo.valorExemplo === undefined || campo.valorExemplo === '') return '-'
    if(campo.tipo === 'boleano') return campo.valorExemplo ? 'Sim' : 'Não' 
    return String(campo.valorExemplo) 
}