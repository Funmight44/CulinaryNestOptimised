function Loader({ label = 'Finding something delicious…' }) {
  return (
    <div className="loading-message" role="status">
      <span className="loader-mark">✳</span>
      <p>{label}</p>
    </div>
  )
}

export default Loader
