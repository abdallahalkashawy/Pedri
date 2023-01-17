const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Learn Mania</h1>
        <div className="links">
          <a href="/">Home</a>
          <a href="/Perspectives" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>Logout</a>
        </div>
      </nav>
    );
  }
   
  export default Navbar;