export default function StatusProgress({ stage }) {
  return (
    <div className="co-progress">
      <div className="co-progress__track">
        <i style={{ width: `${stage.fill}%`, background: stage.color }} />
      </div>
    </div>
  )
}
