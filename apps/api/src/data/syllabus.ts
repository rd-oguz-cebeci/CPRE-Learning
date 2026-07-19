export const learningObjectiveIds = [
    'LZ 1.1',
    'LZ 1.2',
    'LZ 2.1',
    'LZ 2.2',
    'LZ 3.1',
    'LZ 3.2',
    'LZ 4.1',
    'LZ 4.2',
    'LZ 5.1',
    'LZ 5.2',
    'LZ 6.1',
] as const

export type LearningObjectiveId = typeof learningObjectiveIds[number]

export const officialSources = {
    reviewedAt: '2026-07-19',
    syllabus: {
        title: 'AI4RE Micro-Credential Syllabus und Studienleitfaden',
        version: '1.0.0',
        publishedAt: '2026-03-01',
        url: 'https://cpre.ireb.org/en/downloads-and-resources/downloads',
    },
    examinationRegulations: {
        title: 'CPRE Micro-Credential Prüfungsordnung',
        version: '1.1.0',
        publishedAt: '2026-03-05',
        url: 'https://cpre.ireb.org/en/downloads-and-resources/downloads',
    },
} as const

export const syllabusObjectives: ReadonlyArray<{
    id: LearningObjectiveId
    chapter: number
    cognitiveLevel: 'K1' | 'K2'
    sourceSection: string
}> = [
    { id: 'LZ 1.1', chapter: 1, cognitiveLevel: 'K1', sourceSection: '1.1' },
    { id: 'LZ 1.2', chapter: 1, cognitiveLevel: 'K2', sourceSection: '1.2' },
    { id: 'LZ 2.1', chapter: 2, cognitiveLevel: 'K1', sourceSection: '2.1' },
    { id: 'LZ 2.2', chapter: 2, cognitiveLevel: 'K2', sourceSection: '2.2' },
    { id: 'LZ 3.1', chapter: 3, cognitiveLevel: 'K2', sourceSection: '3.1' },
    { id: 'LZ 3.2', chapter: 3, cognitiveLevel: 'K1', sourceSection: '3.2' },
    { id: 'LZ 4.1', chapter: 4, cognitiveLevel: 'K1', sourceSection: '4.1' },
    { id: 'LZ 4.2', chapter: 4, cognitiveLevel: 'K2', sourceSection: '4.2' },
    { id: 'LZ 5.1', chapter: 5, cognitiveLevel: 'K1', sourceSection: '5.1-5.4' },
    { id: 'LZ 5.2', chapter: 5, cognitiveLevel: 'K2', sourceSection: '5.1-5.4' },
    { id: 'LZ 6.1', chapter: 6, cognitiveLevel: 'K1', sourceSection: '6' },
]