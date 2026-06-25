

export const TIPOS_PRODUTO = ['carro','caminhao'] as const
export type TipoProdutoId = (typeof TIPOS_PRODUTO)[number]
export const DEFAULT_TIPO_PRODUTO: TipoProdutoId = 'carro'
export const TIPOS_PRODUTO_LABELS: Record<TipoProdutoId, string> = {
    carro: 'Carro',
    caminhao: 'Caminhao',
}

export function isTipoProdutoId(value: string): value is TipoProdutoId{
    return(TIPOS_PRODUTO as readonly string[]).includes(value)
}

export function normalizeTipoProdutoId(value: string): TipoProdutoId{
    return isTipoProdutoId(value) ? value : DEFAULT_TIPO_PRODUTO
}

export interface CarateristicasCatalogo {
    id: string
    label: string
}

export const CARACTERISTICAS: Record<string, CarateristicasCatalogo> =  {
    cor: { id: 'cor', label: 'Cor' },
    motorizacao: { id: 'motorizacao', label: 'Motorização' },
    teto_solar: { id: 'teto_solar', label: 'Teto Solar' },
    acabamento: { id: 'acabamento', label: 'Acabamento' },
    capacidade_carga: { id: 'capacidade_carga', label: 'Capacidade de Carga' },
    eixos: { id: 'eixos', label: 'Eixos' }
}

export interface ProdutoMockInfo {
    nome: string
    precoLabel: string
    statusLabel: string
}

export const PRODUTO_MOCK_INFO: Record<TipoProdutoId, ProdutoMockInfo> = {
    carro: {
        nome: 'Sedan Premiun 2027',
        precoLabel: 'R$95.990',
        statusLabel: 'Disponivel para configuração'
    },
    caminhao: {
        nome: 'Mega Truck Premium',
        precoLabel: 'R$785.990',
        statusLabel: 'Configuração Comercial'
    }
}