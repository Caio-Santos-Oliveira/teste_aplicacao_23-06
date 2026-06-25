import type { BlocoLayout, CampoBloco, Vizualizacao } from "./bloco.types";


export function formatValueCamp(campo: CampoBloco): string {
    if (campo.valorExemplo === undefined || campo.valorExemplo === '') return '-'
    if (campo.tipo === 'boleano') return campo.valorExemplo ? 'Sim' : 'Não'
    return String(campo.valorExemplo)
}

export interface OpcaoSeletorView {
    id: string,
    label: string,
    ativo: boolean
}

export interface SeletorViewModel {
    rotulo: string,
    valorExibido: string,
    opcoes: OpcaoSeletorView[]
}

export function camposParaExibicao(campos: CampoBloco[]): CampoBloco[] {
    if (campos.length > 0) {
        return campos
    }
    return [
        {
            id: '__placeholder__',
            rotulo: 'informacao',
            tipo: 'texto',
            valorExemplo: '_',
        },
    ]
}

export function camposParaTabela(campos: CampoBloco[]): CampoBloco[] {
    return camposParaExibicao(campos)
}

export function camposParaLista(campos: CampoBloco[]): CampoBloco[] {
    return camposParaExibicao(campos)
}

export function camposParaCard(campos: CampoBloco[]): CampoBloco[] {
    return camposParaExibicao(campos)
}

export function camposParaSeletor(campos: CampoBloco[]): SeletorViewModel {
    const base = camposParaExibicao(campos)
    const selecao = base.find(
        (campo) => campo.tipo === 'selecao' && (campo.opcoes?.length ?? 0) >= 1
    )
    if (selecao) {
        const opcoes = selecao.opcoes ?? [formatValueCamp(selecao)]
        const valorAtual = formatValueCamp(selecao)
        return {
            rotulo: selecao.rotulo,
            valorExibido: valorAtual,
            opcoes: opcoes.map((opcao, index) => ({
                id: `${selecao.id}-${index}`,
                label: opcao,
                ativo: opcao === String(selecao.valorExemplo) || opcao === valorAtual
            }))
        }
    }
    return {
        rotulo: base[0]?.rotulo ?? 'Opções',
        valorExibido: formatValueCamp(base[0]),
        opcoes: base.map((campo) => ({
            id: campo.id,
            label: `${campo.rotulo}:${formatValueCamp(campo)}`,
            ativo: campo.id === base[0]?.id
        }))
    }

}

export function cloneCampo(campo: CampoBloco): CampoBloco {
    return {
        ...campo,
        opcoes: campo.opcoes ? [...campo.opcoes] : undefined
    }
}

export function adaptarCamposParaVizualizacao(
    campos: CampoBloco[],
    vizualizacao: Vizualizacao,
): CampoBloco[] {
    const copia = campos.map(cloneCampo)

    if(copia.length === 0){
        return camposParaExibicao([])
    }
    
    if(vizualizacao==='seletor') {
        const jaTemSelecao = copia.some(
            (campo) => campo.tipo === 'selecao' && (campo.opcoes?.length ?? 0) >= 1
        )
        if(!jaTemSelecao) {
            const alvo = copia[0]
            const derivadas = [
                ...new Set(
                    copia
                        .map((campo)=>String(campo.valorExemplo ?? campo.rotulo))
                        .filter((valor) => valor && valor !== '_')
                )
            ]
            alvo.tipo = 'selecao'
            alvo.opcoes = 
                derivadas.length >= 2
                ? derivadas
                : [String(alvo.valorExemplo ?? alvo.rotulo), 'Alternativa']
            alvo.valorExemplo = alvo.opcoes[0]
        }
    }
    return copia
}

export function prepararBlocoParaVizualizacao(
    bloco: BlocoLayout, 
    vizualizacao: Vizualizacao
): Pick<BlocoLayout, 'campos' | 'vizualizacao'> {
    return {
        vizualizacao,
        campos: adaptarCamposParaVizualizacao(bloco.campos, vizualizacao),
    }
}

export function resolverCamposPorVizualizacao(
    bloco: BlocoLayout
): CampoBloco[] {
    switch(bloco.vizualizacao) {
        case 'card':
            return camposParaCard(bloco.campos)
        case 'lista':
            return camposParaLista(bloco.campos)
        case 'tabela':
            return camposParaTabela(bloco.campos)
        case 'seletor':
            return camposParaExibicao(bloco.campos)
        default:
            return camposParaExibicao(bloco.campos)
    }
}
