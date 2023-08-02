import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import '../style/ProductList.css'
import { useNavigate } from "react-router-dom"



export default function List() {

    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([])
    const history = useNavigate();



    useEffect( () => {
        const getCategory = async() => {
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
        const currentRoute = window.location.pathname.split('/productlist/')[1];
        if (currentRoute) {
            GoToCategory(currentRoute);
          }
    },[])

    console.log(data)




    return(
        <>
            <Header/>
            <section className="list">
                <nav className="choosePosition">
                    {categories.map((el) => (
                            <div key={el}>
                                <button className="prodCategore" onClick={() => GoToCategory(el)}>
                                    {el}
                                </button>
                            </div>
                        
                    ))}
                </nav>

                <div className="mainTovar">
                    {data.map((prod) => (
                        <div className="tovar" key={prod.id}>
                            <div className="up">
                                <img src={prod.thumbnail} alt="" className="thumbnail"/>
                                <span>{prod.title}</span>
                            </div>
                            <div className="down">
                                <span>price: {prod.price} $</span>
                                <button className="glow-on-hover"></button>
                            </div>
                        </div>
                    ))}
                </div>
                
            </section>
        </>
    )
}