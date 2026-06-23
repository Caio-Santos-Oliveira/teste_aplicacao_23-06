

export const TIPOS_PRODUTO = ['carro','caminhao'] as const
export type TipoProdutoId = (typeof TIPOS_PRODUTO)[number]
export const DEFAULT_TIPO_PRODUTO: TipoProdutoId = 'carro'
export const TIPOS_PRODUTO_LABELS: Record<TipoProdutoId, string> = {
    carro: 'Carro',
    caminhao: 'Caminhao',
}
export function normalizeTipoProdutoId(value: string): value is TipoProdutoId{
    return (TIPOS_PRODUTO as readonly string[]).includes(value)
}