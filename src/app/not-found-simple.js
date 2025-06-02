export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button 
        onClick={() => window.location.href = '/'}
        style={{ 
          color: 'blue', 
          textDecoration: 'underline',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'inherit'
        }}
      >
        Go back home
      </button>
    </div>
  )
}
