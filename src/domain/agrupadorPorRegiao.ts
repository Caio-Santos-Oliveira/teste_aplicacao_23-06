import { REGIAO_ORDEM, type BlocoLayout, type Regiao } from "./bloco.types";


export function ordenarBlocos(blocos: BlocoLayout[] | undefined): BlocoLayout[] {
    return [...(blocos ?? [])].filter((b) => b.visivel).sort(compararBlocos)
}

export function ordenarBlocosParaLista(blocos: BlocoLayout[] | undefined): BlocoLayout[] {
    return [...(blocos ?? [])].sort(compararBlocos)
}

function compararBlocos(a: BlocoLayout, b: BlocoLayout): number {
    const ordemRegiao = REGIAO_ORDEM.indexOf(a.regiao) - REGIAO_ORDEM.indexOf(b.regiao)
    if(ordemRegiao !== 0) {
        return ordemRegiao
    }    
    return a.ordem - b.ordem
}

export function agruparBlocosPorRegiao(blocos: BlocoLayout[] | undefined): Record<Regiao, BlocoLayout[]> {
    const grupos = Object.fromEntries(
        REGIAO_ORDEM.map((r) => [r,[] as BlocoLayout[]]),
    ) as Record<Regiao, BlocoLayout[]>
    for(const bloco of ordenarBlocos(blocos)){
        grupos[bloco.regiao].push(bloco)
    } return grupos
}

