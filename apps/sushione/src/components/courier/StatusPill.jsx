export default function StatusPill({ stage }) {
  return (
    <span className="status-pill" style={{ background: stage.color }}>
      {stage.label}
    </span>
  )
}
