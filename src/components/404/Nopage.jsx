import { Link } from "react-router-dom";

const Nopage = () =>{

  return(
    <>
    <h1
    style={{textAlign: 'center',
      fontSize: '50px',
      color: '#fff', 
      fontFamily: 'sans-serif'
    }}
    >
      <h1>404</h1>
    Page Not Found
    </h1>
    <Link
    to={"/"}
    style={{position:'absolute', top: '10px', left: '10px', color: '#fff', width: '100px'}}
    >Go Back</Link>
    </>
  );
}
export default Nopage;