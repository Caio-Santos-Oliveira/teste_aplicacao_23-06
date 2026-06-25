import type { TipoProdutoId } from "./catalog";
import type { BlocoLayout } from "../domain/bloco.types";


export const BLOCOS_SEED: Record<TipoProdutoId, BlocoLayout[]> = {
    carro: [
        {
            id: 'bloco-carro-resumo',
            titulo: 'Resumo do Produto',
            campos: [
                { id: 'modelo', rotulo: 'Modelo', tipo: 'texto', valorExemplo: 'Sedan Premium 2026' },
                { id: 'preco', rotulo: 'Preço', tipo: 'texto', valorExemplo: 'R$6.889,00' },
                { id: 'status', rotulo: 'Status', tipo: 'texto', valorExemplo: 'Disponível' },
            ],
            vizualizacao: 'card',
            regiao: 'topo',
            ordem: 1,
            visivel: true
        },
        {
            id: 'bloco-carro-cor',
            titulo: 'Cor',
            campos: [
                { id: 'cor_externa', rotulo: 'Cor Externa', tipo: 'selecao', valorExemplo: 'Prata Metálico', opcoes: ['vermelho', 'branco', 'prata'] },
            ],
            vizualizacao: 'card',
            regiao: 'conteudo_principal',
            ordem: 1,
            visivel: true
        },
        {
            id: 'bloco-carro-roda',
            titulo: 'Roda',
            campos: [
                { id: 'aro', rotulo: 'Aro', tipo: 'texto', valorExemplo: 'Aro Desygn 18' },
                { id: 'largura', rotulo: 'Largura', tipo: 'texto', valorExemplo: '225 x 45' },
                { id: 'material', rotulo: 'Material', tipo: 'texto', valorExemplo: 'Liga Leve' },
                { id: 'acabamento', rotulo: 'Acabamento', tipo: 'selecao', valorExemplo: 'Polido', opcoes: ['polido', 'fosco', 'escovado'] },
            ],
            vizualizacao: 'tabela',
            regiao: 'conteudo_principal',
            ordem: 2,
            visivel: true
        },
        {
            id: 'bloco-carro-motor',
            titulo: 'Motorização',
            campos: [
                { id: 'motor', rotulo: 'Motor', tipo: 'selecao', valorExemplo: '2.0 Turbo', opcoes: ['1.6 flex', 'eletrico', '2.0 Super'] },
            ],
            vizualizacao: 'lista',
            regiao: 'conteudo_principal',
            ordem: 3,
            visivel: true
        },
    ],
    caminhao: [
        {
            id: 'bloco-caminhao-resumo',
            titulo: 'Resumo do Produto',
            campos: [
                { id: 'modelo', rotulo: 'Modelo', tipo: 'texto', valorExemplo: 'Hilux Truck 2023' },
                { id: 'preco', rotulo: 'Preço', tipo: 'texto', valorExemplo: 'R$96.889,00' },
                { id: 'status', rotulo: 'Status', tipo: 'texto', valorExemplo: 'Configuracao Comercial' },
            ],
            vizualizacao: 'card',
            regiao: 'topo',
            ordem: 1,
            visivel: true
        },
        {
            id: 'bloco-caminhao-carga',
            titulo: 'Carga',
            campos: [
                { id: 'config', rotulo: 'Configuracao', tipo: 'texto', valorExemplo: '8x2'},
                { id: 'capacidade', rotulo: 'Capacidade', tipo: 'texto', valorExemplo: '14 T'},
                { id: 'comprimento', rotulo: 'Comprimento', tipo: 'texto', valorExemplo: '7,2m'},
            ],
            vizualizacao: 'tabela',
            regiao: 'conteudo_principal',
            ordem: 1,
            visivel: true
        },
        {
            id: 'bloco-caminhao-roda',
            titulo: 'Eixo',
            campos: [
                { id: 'config_eixo', rotulo: 'Configuracao', tipo: 'selecao', valorExemplo: '8x2', opcoes: ['8x2', '4x2', '6x2'] },
            ],
            vizualizacao: 'seletor',
            regiao: 'lateral',
            ordem: 1,
            visivel: true
        },
        {
            id: 'bloco-caminhao-motor',
            titulo: 'Motorização',
            campos: [
                { id: 'motor', rotulo: 'Motor', tipo: 'texto', valorExemplo: 'Diesel 350 cv'},
                { id: 'uso', rotulo: 'Uso', tipo: 'texto', valorExemplo: 'Longa distancia'},
            ],
            vizualizacao: 'lista',
            regiao: 'lateral',
            ordem: 2,
            visivel: true
        },
    ]
}

function cloneBloco(bloco: BlocoLayout): BlocoLayout{
    return{
        ...bloco,
        campos: bloco.campos.map((campo) => ({
            ...campo,
            opcoes: campo.opcoes ? [...campo.opcoes] : undefined
        }))
    }
}

export function cloneBlocosSeed(): Record<TipoProdutoId, BlocoLayout[]> {
    return {
        carro: BLOCOS_SEED.carro.map(cloneBloco),
        caminhao: BLOCOS_SEED.caminhao.map(cloneBloco),
    }
}

export function proximaOrdem(blocos: BlocoLayout[], regiao: BlocoLayout['regiao']): number {
    const naRegiao = blocos.filter((b)=> b.regiao === regiao)
    if(naRegiao.length === 0) {
        return 1
    }
    return Math.max(...naRegiao.map((b)=> b.ordem)) +1
}

export function criarBlocoVazio(tipoProduto: TipoProdutoId, blocos: BlocoLayout[]): BlocoLayout {
    const suffix = Date.now().toString(36)
    const regiao = 'conteudo_principal' as const 
    return {
        id: `bloco-${tipoProduto}-novo-${suffix}`,
        titulo: 'Novo Bloco',
        campos: [
            {
                id: `campos_${suffix}`,
                rotulo: 'campo 1',
                tipo: 'texto',
                valorExemplo: 'exemplo'
            }
        ],
        vizualizacao: 'card',
        regiao,
        ordem: proximaOrdem(blocos, regiao),
        visivel: true
    }
}
