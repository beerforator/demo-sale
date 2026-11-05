import { useState } from 'react'

export const COURIER_STAGES = [
  { label: 'Новый', cta: 'Принять заказ', color: 'var(--st-new)', fill: 0 },
  { label: 'Готовится', cta: 'Забрал из ресторана', color: 'var(--st-prep)', fill: 33 },
  { label: 'В пути', cta: 'Я на месте', color: 'var(--st-transit)', fill: 66 },
  { label: 'Доставлено', cta: 'Заказ завершён', color: 'var(--st-done)', fill: 100 }
]

export function useCourierStatus() {
  const [stageIndex, setStageIndex] = useState(0)
  const isFinal = stageIndex === COURIER_STAGES.length - 1

  function advance() {
    setStageIndex((i) => Math.min(i + 1, COURIER_STAGES.length - 1))
  }

  return { stage: COURIER_STAGES[stageIndex], stageIndex, isFinal, advance }
}
