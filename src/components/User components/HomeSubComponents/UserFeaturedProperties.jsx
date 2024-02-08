import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../Hooks/useGlobalContext";
import "../../../styles/User Styles/UserFeature.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LiaBathSolid } from "react-icons/lia";
import { IoBedOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import { GrLink } from "react-icons/gr";
import { IoMdVideocam } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loading from "../../Loading";


const UserFeaturedProperties = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
        className: "center",
        centerPadding: "60px",
        // swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              // swipeToSlide: true,
              infinite: true,
              dots: false,
              
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1 ,
              slidesToScroll: 1
            }
          }
        ]
      };
      const [featured, setFeatured] = useState([])
      const [isLoading, setIsLoading] = useState()
    const { properties , BASE_URL} = useGlobalContext();

    const getFeaturedProperties = async () => {
      try {
        const { data } = await axios(`${BASE_URL}/property/featured`);
        setFeatured(data.featuredProperties)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      getFeaturedProperties()
    },[])

    if (isLoading) {
      return <Loading/>
    }
      
  return (
    <section className="feature-container py-4 overflow-hidden container  ">

      <div className="UserPropertiesCard-Container pt--lg-5 mt-lg-5">
        <div className=" w-100 mt-lg-5">
         <h2 className="text-start mt-5 d-block ">Featured Properties</h2>
         </div>
       
       <div className="card-cover d-flex overflow-x-scroll gap-3 align-items-center">
       {/* <Slider {...settings}> */}
        {featured.map((property) => {
          const {_id, media: {images} , title, price, location, bedroom, bathrooms } = property;
          return (
            <div key={_id}>
              <div className="card border border-white">
                <div className="featured">Featured</div>

                <div className="forSale">For sale</div>
                <div className="properties-image">
                  <img src={images[0]} alt="Properties Image" />
                   <div className="inner-icons">
                    <Link to={`/properties/${_id}`}>
                      <GrLink className="icon" />
                    </Link>
                    <Link to={`/properties/${_id}`}>
                      <IoMdVideocam className="icon" />
                    </Link>
                    <Link to={`/properties/${_id}`}>
                      <AiFillPicture className="icon" />
                    </Link>
                  </div>
                 </div>

                <div className="card-content">
                  <div className="card-title">{title}</div>
                  <div className="location">
                    <ImLocation />
                    <span style={{ marginLeft: "5px" }}>{location}</span>
                  </div>

                  <div className="bed-toilet">
                    <div className="bedroom">
                      <IoBedOutline className="fs-4" />
                      <span>{bedroom} bedrooms </span>
                    </div>

                    <div className="toilet">
                      <LiaBathSolid className="fs-3" />
                      <span>{bathrooms} bathrooms</span>
                    </div>
                  </div>

                  <hr />

                  <div className="price-icon">
                    <div className="price difft">
                      <span>{price}</span>
                    </div>

                    <div className="share-like-icons">
                      <HiArrowsRightLeft />
                      <CiShare2 />
                      <CiHeart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
         {/* </Slider>  */}
      </div> 
     
      </div>

    </section>
  )
}

export default UserFeaturedProperties;