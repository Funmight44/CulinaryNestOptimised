function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <span aria-hidden="true">♡</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

export default EmptyState
