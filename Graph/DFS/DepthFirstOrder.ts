/**
 * 基于深度优先搜索的顶点排序（有向图）
 *  */
import { Digraph } from "../common/Digraph";
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph";

export class DepthFirstOrder {
    private marked: boolean[]
    private pre: number[]
    private post: number[]
    private reversePost: number[]

    constructor(G: Digraph | EdgeWeightedDigraph) {
        this.pre = []
        this.post = []
        this.reversePost = []
        this.marked = []
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.dfs(G, v)
        }
    }

    private dfs(G: Digraph | EdgeWeightedDigraph, v: number) {
        this.pre.push(v)
        this.marked[v] = true

        if (G instanceof Digraph) {
            for (let w of G.adj(v)) {
                if (!this.marked[w]) {
                    this.dfs(G, w)
                }
            }
        }

        if (G instanceof EdgeWeightedDigraph) {
            for (let w of G.adj(v)) {
                if (!this.marked[w.to()]) {
                    this.dfs(G, w.to())
                }
            }
        }

        this.post.push(v)
        this.reversePost.unshift(v)
    }

    getPre(): number[] {
        return this.pre
    }

    getPost(): number[] {
        return this.post
    }

    getReversePost(): number[] {
        return this.reversePost
    }
}