import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import '../style/Busket.css'
import { removeCart, decreaseCart, addToCart, clearCart, getTotal } from "../store/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Busket() {

    const cart = useSelector((state) => state.cart)
    console.log(cart.cartItems.length)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTotal())
    }, [cart, dispatch])

    const handleRemove = (cartItem) => {
        dispatch(removeCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }

    const handleIncreaceCart = (cartItem) => {
        dispatch(addToCart(cartItem))
    }

    const handleClearCart = (cartItem) => {
        dispatch(clearCart(cartItem))
        navigate('/productlist')
    }
    return(
        <section className="busket">
            <Header/>
            <h1>Your Busket</h1>
            {cart.cartItems.length === 0 ? (<div className="empty">
                <p>your cart is empty !!!</p>
            </div>) : (<div className="full">
                {cart.cartItems.map((elem) => (
                    <div className="product" key={elem.id}>
                        <img src={elem.thumbnail} alt="" />
                        <div className="prod-description">
                            <h1>{elem.title}</h1>
                            <span>price: {elem.price}</span>
                            <div className="prod-quantity">
                                <button onClick={() => handleDecreaseCart(elem)}>-</button>
                                <div className="count">{elem.cartQuantity}</div>
                                <button onClick={() => handleIncreaceCart(elem)}>+</button>
                            </div>
                            <button onClick={() => handleRemove(elem)}>remove</button>
                        </div>
                        <div className="tottalPr">
                            total: {elem.price * elem.cartQuantity} $
                        </div>
                    </div>
                ))}

                <div className="busket-buttins">
                    <button onClick={() => handleClearCart(cart)} className="clear">clear</button>
                    <div className="order-products">
                        <span>{cart.cartTotalAmount} $</span>
                        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="text-white bg-gray-700 hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            order
                        </button>

                        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            READ
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Your order has been processed
                                        </p>
                                    </div>
                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button onClick={() => handleClearCart(cart)} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                        <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        
        </section>
    )
}