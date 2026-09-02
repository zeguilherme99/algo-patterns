export default function CodeView({ snippet, line, title }: { snippet: string; line: number; title: string }) {
  const lines = snippet.split('\n')
  return (
    <div className="code-view">
      <div className="panel-title">{title}</div>
      <pre>
        {lines.map((text, i) => {
          const n = i + 1
          return (
            <div key={n} className={`code-line${n === line ? ' current' : ''}`}>
              <span className="ln">{n}</span>
              <code>{text || ' '}</code>
            </div>
          )
        })}
      </pre>
    </div>
  )
}
