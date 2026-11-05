export default function StatusButton({ stage, stageIndex, isFinal, onAdvance }) {
  return (
    <div className="co-cta-wrap">
      <button
        className="co-cta"
        style={{
          background: stageIndex === 0 ? 'var(--ink)' : stage.color,
          color: stageIndex === 0 ? 'var(--rice)' : '#fff'
        }}
        onClick={onAdvance}
        disabled={isFinal}
      >
        {isFinal ? `✓ ${stage.cta}` : stage.cta}
      </button>
    </div>
  )
}
