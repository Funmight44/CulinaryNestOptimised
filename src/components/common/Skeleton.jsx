function Skeleton() {
  return (
    <div className="recipe-grid" aria-label="Loading recipes">
      {[1, 2, 3, 4].map((item) => (
        <div className="skeleton-card" key={item}>
          <div className="skeleton-image" />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line small" />
        </div>
      ))}
    </div>
  )
}

export default Skeleton
