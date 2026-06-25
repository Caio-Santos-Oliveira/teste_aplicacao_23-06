import { defineStore } from "pinia";
import { ref } from 'vue';
import type { TipoProdutoId } from "../default/catalog";
import { cloneBlocosSeed, criarBlocoVazio } from "../default/blocos.seed";
import { agruparBlocosPorRegiao, ordenarBlocos } from '../domain/agrupadorPorRegiao';
import {adaptarCamposParaVizualizacao} from '../domain/vizualizacaoView';
import type { BlocoLayout, CampoBloco, Regiao, Vizualizacao } from "../domain/bloco.types";

function cloneCampo(campo: CampoBloco): CampoBloco {
    return {
        ...campo,
        opcoes: campo.opcoes ? [...campo.opcoes] : undefined
    }
}

export const useRuntimeStore = defineStore('runtime', () => {

    const blocosByProductType = ref(cloneBlocosSeed())

    const activeBlocoIdByProductType = ref<Record<TipoProdutoId, string | null>>({
        carro: null,
        caminhao: null
    })

    function getBlocos(tipoProduto: TipoProdutoId): BlocoLayout[] {
        return blocosByProductType.value[tipoProduto] ?? []

    }

    function getBloco(tipoProduto: TipoProdutoId, blocoId: string): BlocoLayout | undefined {
        return blocosByProductType.value[tipoProduto].find((bloco) => bloco.id === blocoId)
    }

    function getActiveBlocoId(tipoProduto: TipoProdutoId): string | null {
        return activeBlocoIdByProductType.value[tipoProduto]
    }

    function setActiveBlocoId(tipoProduto: TipoProdutoId, blocoId: string | null): void {
        activeBlocoIdByProductType.value[tipoProduto] = blocoId
    }

    function criarBloco(tipoProduto: TipoProdutoId): BlocoLayout {
        const bloco = criarBlocoVazio(tipoProduto, getBlocos(tipoProduto))
        blocosByProductType.value[tipoProduto].push(bloco)
        activeBlocoIdByProductType.value[tipoProduto] = bloco.id
        return bloco
    }

    function atualizarBloco(
        tipoProduto: TipoProdutoId,
        blocoId: string,
        patch: Partial<Omit<BlocoLayout, 'id'>>
    ): void {
        const bloco = getBloco(tipoProduto, blocoId)
        if (!bloco) {
            return
        }
        if (patch.titulo !== undefined) {
            bloco.titulo = patch.titulo
        }
        if (patch.descricao !== undefined) {
            bloco.descricao = patch.descricao
        }
        if (patch.campos !== undefined) {
            bloco.campos = patch.campos.map(cloneCampo)
        }
        if (patch.vizualizacao !== undefined) {
            bloco.vizualizacao = patch.vizualizacao
        }
        if (patch.regiao !== undefined) {
            bloco.regiao = patch.regiao
        }
        if (patch.ordem !== undefined) {
            bloco.ordem = patch.ordem
        }
        if (patch.visivel !== undefined) {
            bloco.visivel = patch.visivel
        }
    }

    function removerBloco(tipoProduto: TipoProdutoId, blocoId: string): void {
        blocosByProductType.value[tipoProduto] = getBlocos(tipoProduto).filter(
            (bloco) => bloco.id !== blocoId
        )
        if (activeBlocoIdByProductType.value[tipoProduto] === blocoId) {
            activeBlocoIdByProductType.value[tipoProduto] = null
        }
    }

    function setBlocoVizualizacao(
        tipoProduto: TipoProdutoId,
        blocoId: string,
        vizualizacao: Vizualizacao
    ): void {
        const bloco = getBloco(tipoProduto, blocoId)
        if (!bloco) {
            return
        }
        bloco.campos = adaptarCamposParaVizualizacao(bloco.campos, vizualizacao)
        bloco.vizualizacao = vizualizacao
    }

    function setBlocoRegiao(
        tipoProduto: TipoProdutoId,
        blocoId: string,
        regiao: Regiao
    ) {
        const bloco = getBloco(tipoProduto, blocoId)
        if (bloco) {
            bloco.regiao = regiao
        }
    }

    function setBlocoOrdem(
        tipoProduto: TipoProdutoId,
        blocoId: string,
        ordem: number
    ) {
        const bloco = getBloco(tipoProduto, blocoId)
        if (bloco) {
            bloco.ordem = Math.max(1, ordem)
        }
    }

    function setBlocoVisivel(
        tipoProduto: TipoProdutoId,
        blocoId: string,
        visivel: boolean
    ) {
        const bloco = getBloco(tipoProduto, blocoId)
        if (bloco) {
            bloco.visivel = visivel
        }
    }

    function adicionarCampo(tipoProduto: TipoProdutoId, blocoId: string): void {
        const bloco = getBloco(tipoProduto, blocoId)
        if (!bloco) {
            return
        }
        const suffix = Date.now().toString(36)
        bloco.campos.push({
            id: `campo_${ suffix }`,
            rotulo: `Campo ${ bloco.campos.length + 1 }`,
            tipo: 'texto',
            valorExemplo: '',
        })
    }

    function removerCampo(tipoProduto: TipoProdutoId, blocoId: string, campoId: string): void {
        const bloco = getBloco(tipoProduto, blocoId)
        if (!bloco || bloco.campos.length <= 1) {
            return
        }
        bloco.campos = bloco.campos.filter((campo) => campo.id !== campoId)
    }

    function atualizarCampo(
        tipoProduto: TipoProdutoId,
        blocoId: string,
        campoId: string,
        patch: Partial<CampoBloco>,
    ): void {
        const bloco = getBloco(tipoProduto, blocoId)
        if (!bloco) {
            return
        }
        const campo = bloco.campos.find((item) => item.id === campoId)
        if (!campo) {
            return
        }
        Object.assign(campo, patch)
        if (campo.tipo !== 'selecao') {
            delete campo.opcoes
        }
    }

    function reset(): void {
        blocosByProductType.value = cloneBlocosSeed()
        activeBlocoIdByProductType.value = { carro: null, caminhao: null }
    }

    return {
        blocosByProductType,
        activeBlocoIdByProductType,
        getBlocos,
        getBloco,
        getActiveBlocoId,
        setActiveBlocoId,
        criarBloco,
        atualizarBloco,
        removerBloco,
        setBlocoVizualizacao,
        setBlocoRegiao,
        setBlocoOrdem,
        setBlocoVisivel,
        adicionarCampo,
        removerCampo,
        atualizarCampo,
        reset,
        ordenarBlocos,
        agruparBlocosPorRegiao,
    }




})
