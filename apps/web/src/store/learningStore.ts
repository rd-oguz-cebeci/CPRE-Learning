import { create } from 'zustand'

export interface LearningModule {
    id: string
    title: string
    description: string
    domain: string
    content: string
    summary?: string
    keywords: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface LearningStore {
    modules: LearningModule[]
    selectedModule: LearningModule | null
    setModules: (modules: LearningModule[]) => void
    selectModule: (module: LearningModule | null) => void
}

export const useLearningStore = create<LearningStore>((set) => ({
    modules: [],
    selectedModule: null,

    setModules: (modules) => set({ modules }),

    selectModule: (module) => set({ selectedModule: module }),
}))
