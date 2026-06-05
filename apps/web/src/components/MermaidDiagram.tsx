import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#6366f1',
        lineColor: '#6366f1',
        secondaryColor: '#f0fdf4',
        tertiaryColor: '#fef3c7',
    },
    flowchart: { curve: 'basis', padding: 16 },
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
})

let idCounter = 0

export default function MermaidDiagram({ chart }: { chart: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const id = `mermaid-${idCounter++}`
        let cancelled = false

        mermaid
            .render(id, chart.trim())
            .then(({ svg: renderedSvg }) => {
                if (!cancelled) {
                    setSvg(renderedSvg)
                    setError(null)
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(String(err))
                    setSvg('')
                }
            })

        return () => {
            cancelled = true
        }
    }, [chart])

    if (error) {
        return (
            <pre className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 overflow-x-auto">
                {chart}
            </pre>
        )
    }

    return (
        <div
            ref={containerRef}
            className="my-4 flex justify-center overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
