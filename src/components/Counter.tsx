'use client'
 
export default function Counter({
  onClick }: { onClick: () => void } /* ❌ Function is not serializable */,
) {
  return (
    <div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}