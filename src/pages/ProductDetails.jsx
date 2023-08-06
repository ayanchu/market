import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";




export default function ProductDetails(){
    const { prodID } = useParams();

    const [productData, setProductData] = useState([])
    const [image, setImage] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const dispatch = useDispatch()


    useEffect(() => {
        const getproductData = () => {
            axios.get(`https://dummyjson.com/products/${prodID}`)
            .then(res => {
                setProductData(res.data)
                setImage(res.data.images)
            })
            .catch(err => {
                console.error(err);
            })
        }
        getproductData()
            
    },[])



    useEffect(() => {
        const carouselInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
        }, 3000); // Change the slide every 3 seconds

        return () => clearInterval(carouselInterval);
    }, [image]);

    const handleAddTooCart = (prod) => {
        dispatch(addToCart(prod))
    }
    
    return(
        <>
        <Header/>
    
        <section className="carousel">
            <div id="controls-carousel" className="relative w-full" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {image.map((img, idx) => (
                <div
                    key={idx}
                    className={`duration-700 ease-in-out ${
                    idx === currentImageIndex ? 'data-carousel-item' : 'hidden'
                    }`}
                >
                    <img
                    src={img}
                    className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={`Image ${idx + 1}`}
                    />
                </div>
                ))}
            </div>
            <div className="">
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                    onClick={() =>
                    setCurrentImageIndex((prevIndex) =>
                        (prevIndex - 1 + image.length) % image.length
                    )
                    }
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                    onClick={() =>
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length)
                    }
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        
            </div>
        </section>

        <section className="description" style={{fontSize: '15px', fontFamily:'cursive'}}>
            <div>
                <h1 style={{fontSize: '20px'}}>{productData.title}</h1>
                <span>{productData.description}</span>  
            </div>
            
            <div>
                <span>prise: {productData.price} $</span>
                <br />
                <span>brand: {productData.brand}</span>
            </div>

            <button onClick={() => handleAddTooCart(productData)} style={{marginTop: '10px'}}>add to cart</button>
        </section>

        </>
    )
}