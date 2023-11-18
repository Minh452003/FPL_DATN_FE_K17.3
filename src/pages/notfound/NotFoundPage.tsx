import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="error-container" style={{marginTop: "60px"}}>
      <img className='image20' src="https://st5.depositphotos.com/2466369/66485/v/450/depositphotos_664857888-stock-illustration-page-found-concept-people-scene.jpg" alt="Error Image" />
      <div className="error-content">
        <h1 className='notfound1'>Oops! Something went wrong.</h1>
        <p className='notfound2'>We're sorry, but it seems that an error has occurred.</p>
        <p className='notfound2'>Please try again later or contact support.</p>
      </div>
    </div>
  )
}

export default NotFoundPage