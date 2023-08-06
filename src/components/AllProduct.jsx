import { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "./Search";


export default function AllProduct(){
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState([])


    const history = useNavigate()


    useEffect( () => {
        const getCategory = () => {
            axios.get('https://dummyjson.com/products/categories')
            .then(res => {
                const halfDataIndex = Math.ceil(res.data.length / 2);
                const halfData = res.data.slice(0, halfDataIndex);
                setCategories(halfData)
            }) 
            .catch(err => {
                console.error(err);
            })
        }
        getCategory()
    },[])




    const GoToCategory = (route) => {
        try {
             axios.get(`https://dummyjson.com/products/category/${route}`)
            .then(res => {
                setData(res.data.products)
                history(`/productlist/${route}`);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
              });
            
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        const showAllProduct = async() => {
            await axios.get(`https://dummyjson.com/products?limit=30`)
            .then(res => {
                setProduct(res.data.products)
                setSearch(res.data.products)
                return res
            })
            .catch(error => {
                console.log('Error fetching data:', error);
              });
        }
        showAllProduct()
    },[])

    console.log(search)

    return(
        <>
        <Header/>
        
            <nav className="choosePosition">
                {categories.map((el) => (
                    <div key={el}>
                        <button className="prodCategore" onClick={() => GoToCategory(el)}>
                            {el}
                        </button>
                    </div>
                ))}
            </nav>
            <Search products={product} setSearch={setSearch}/>

            <div className="mainTovar">
                    {search.map((prod) => (
                        <div className="tovar" key={prod.id}>
                            <div className="up">
                                <img src={prod.thumbnail} alt="" className="thumbnail"/>
                                <span>{prod.title}</span>
                            </div>
                            <div className="down">
                                <span>price: {prod.price} $</span>
                                <Link to={`/productlist/product/${prod.id}`}>
                                    <button className="glow-on-hover">show</button>
                                </Link>
                                
                            </div>
                        </div>
                    ))}
                </div>
        </>
    )
}