

export type Regiao = 'topo' | 'lateral' | 'conteudo_principal' | 'rodape'

export type Vizualizacao = 'card' | 'lista' | 'tabela' | 'seletor'

export type TipoCampo = 'texto' | 'numero' | 'boleano' | 'selecao'

export interface CampoBloco {
    id: string,
    rotulo: string,
    tipo: TipoCampo,
    valorExemplo?: string | number | boolean,
    opcoes?: string[] 
}

export interface BlocoLayout {
    id: string,
    titulo: string,
    descricao?: string,
    campos: CampoBloco[],
    vizualizacao: Vizualizacao,
    regiao: Regiao,
    ordem: number,
    visivel: boolean
}

export const REGIAO_LABELS: Record<Regiao, string> = {
    topo: 'Topo',
    lateral: 'Lateral',
    conteudo_principal: 'Conteúdo Principal',
    rodape: 'Rodapé'
}

export const VIZUALIZACAO_LABELS: Record<Vizualizacao, string> = {
    card: 'Card',
    lista: 'Lista',
    tabela: 'Tabela',
    seletor: 'Seletor'
}

export const REGIAO_ORDEM: Regiao[] = [
    'topo',
    'lateral',
    'conteudo_principal',
    'rodape'
]

export const TIPOS_CAMPO: TipoCampo[] = [
    'texto', 'numero', 'boleano', 'selecao'
]