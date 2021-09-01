import React,{useState} from 'react'


import {Carousel} from "react-bootstrap"



function CarouselPage(props) {
    
    
    return (
    //     <div id="myCarousel" className="carousel slide" data-ride="carousel">
            
    //          {props.data.map((product,index)=>(
    //                 <div className="carousel-inner">
           
    //                 <div className="carousel-item active">
    //                   <img className="d-block w-100" src={product.mainImage} alt="First slide" />
    //                 </div>
                    
    //               </div>
    //             ))}
       
    //     <a
    //       className="carousel-control-prev"
    //       href="myCarousel"
    //       role="button"
    //       data-slide="prev"
    //     >
    //       <span
    //         className="carousel-control-prev-icon"
    //         aria-hidden="true"
    //       ></span>
    //       <span className="sr-only">Previous</span>
    //     </a>
    //     <a
    //       className="carousel-control-next"
    //       href="#myCarousel"
    //       role="button"
    //       data-slide="next"
    //     >
    //       <span
    //         className="carousel-control-next-icon"
    //         aria-hidden="true"
    //       ></span>
    //       <span className="sr-only">Next</span>
    //     </a>
    //   </div>
    // <section className="slider">
    //  <i className="fa fa-arrow-left left-arrow" onClick={previousSlide}></i>
    //  <i className="fa fa-arrow-right right-arrow" onClick={nextSlide}></i>
    // {props.data.map((slide,index)=>{

    //     return (
    //         <div className={index===current ?'slide-active':'silde'} key={index}>
    //         {index ===current && (  <img className="image-slide" src={slide.mainImage} alt={slide.mainImage}/>)}

    //         </div>
    //     )
      
    // })}
    // </section>
    <>
    <Carousel>
      {props.data.map((product,index)=>(
        
        <Carousel.Item>
          <img
            style={{width:"100%"}}
            src={product.mainImage}
            alt={product.mainImage}
          />
         
        </Carousel.Item>
       
     
      ))}
       </Carousel>
    </>
        
    
    
    
    )
}

export default CarouselPage
