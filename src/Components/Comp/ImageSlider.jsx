import { React } from 'react';


function ImageSlider() {
 return <>
    
    <div style={{width:"95%",margin:'auto'  }}  id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" >
    <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
    <div className="carousel-item active">
      <img style={{borderRadius:"25px"}}  src="https://appxcontent.kaxa.in/subject/2023-12-11-0.16596609933733064.jpeg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img style={{borderRadius:"25px"}} src="https://appxcontent.kaxa.in/subject/2023-12-11-0.7162866567693291.jpeg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img style={{borderRadius:"25px"}} src="https://appxcontent.kaxa.in/subject/2023-12-11-0.46695085017508653.jpeg" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span style={{color:"black"}}  className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span style={{color:"black"}}  className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

 </>
}

export default ImageSlider;