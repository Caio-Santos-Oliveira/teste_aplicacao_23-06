import { defineStore } from "pinia";
import { ref } from 'vue';
import { cloneBlocosSeed } from "../default/blocos.seed";
import type { TipoProdutoId } from "../default/catalog";
import type { BlocoLayout, CampoBloco, Regiao, Vizualizacao } from "../domain/bloco.types";

function cloneCampo(campo: CampoBloco): CampoBloco {
    return {
        ...campo,
        opcoes: campo.opcoes ? [...campo.opcoes] : undefined
    }
}

export const useRuntimeStore = defineStore('runtime', () => {

    const blocosByProdutcType = ref(cloneBlocosSeed())

    const activeBlocoIdByProductType = ref<Record<TipoProdutoId, string | null>>({
        carro: null,
        caminhao: null
    })

    function getBlocos(tipoProduto: TipoProdutoId): BlocoLayout[] {
        return blocosByProdutcType.value[tipoProduto]

    }

    function getBloco(tipoProduto: TipoProdutoId, blocoId: string): BlocoLayout | undefined {
        return blocosByProdutcType.value[tipoProduto].find((bloco) => bloco.id === blocoId)
    }

    function getActiveBlocoId(tipoProduto: TipoProdutoId): string | null {
        return activeBlocoIdByProductType.value[tipoProduto]
    }

    function setActiveBlocoId(tipoProduto: TipoProdutoId, blocoId: string): void {
        activeBlocoIdByProductType.value[tipoProduto] = blocoId
    }

    function criarBloco(tipoProduto: TipoProdutoId): BlocoLayout {
        const bloco = criarBlocoVazio(tipoProduto, getBlocos(tipoProduto))
        blocosByProdutcType.value[tipoProduto].push(bloco)
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

    function removerBloco(tipoProduto: TipoProdutoId, blocoId: BlocoLayout): void {
        blocosByProdutcType.value[tipoProduto] = getBlocos(tipoProduto).filter(
            (bloco) => bloco.id !== blocoId
        )
        if (activeBlocoIdByProductType.value[tipoProduto] === blocoId) {
            activeBlocoIdByProductType.value[tipoProduto] = null
        }
    }

    function setBlocoVizualizacao(
        tipoProduto: TipoProdutoId,
        blocoId: BlocoLayout,
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
        blocoId: BlocoLayout,
        regiao: Regiao
    ) {
        const bloco = getBloco(tipoProduto, blocoId)
        if(bloco){
            bloco.regiao = regiao
        }
    }

    function setBlocoOrdem(
        tipoProduto: TipoProdutoId,
        blocoId: BlocoLayout,
        ordem: number
    ) {
        const bloco = getBloco(tipoProduto, blocoId)
        if(bloco){
            bloco.ordem = Math.max(1, ordem)
        }
    }

    function setBlocoVisivel(
        tipoProduto: TipoProdutoId,
        blocoId: BlocoLayout,
        visivel: boolean
    ) {
        const bloco = getBloco(tipoProduto, blocoId)
        if(bloco){
            bloco.visivel = visivel
        }
    }

    //adicionar campos, remover campo, atualizar campo
    //criar reset para o clone do BlocoSeed
    //dar o return de tudo

})

