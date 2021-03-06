/**
 * 无向图中的双色问题
 */
import { Graph } from "../common/Graph"

export class TwoColor {
    private marked: boolean[]
    private color: boolean[]
    private isTwoColorable: boolean = true

    constructor(G: Graph) {
        this.marked = []
        this.color = new Array(G.V())
        this.color.fill(false)
        for (let s = 0; s < G.V(); s++) {
            if (!this.marked[s]) {
                this.dfs(G, s)
            }
        }
    }

    private dfs(G: Graph, v: number) {
        this.marked[v] = true
        for (let w of G.adj(v)) {
            if (!this.marked[w]) {
                this.color[w] = this.color[v]
                this.dfs(G, w)
            } else if (this.color[w] === this.color[v]) {
                this.isTwoColorable = false
            }
        }
    }

    isBipartite(): boolean {
        return this.isTwoColorable
    }
}