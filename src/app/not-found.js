export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#333' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '10px 0', color: '#666' }}>Page Not Found</h2>
      <p style={{ fontSize: '1rem', color: '#888', textAlign: 'center', maxWidth: '400px' }}>
        The page you are looking for does not exist.
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Go Home
      </button>
    </div>
  )
}