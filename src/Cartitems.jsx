import React from "react";
import axios from "axios";
import bootstrap from 'bootstrap'

function TotalCart() {
    const [cartData, setCartItem] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        axios.get('https://dummyjson.com/carts')
            .then(function (res) {
                console.log()
                setCartItem([...res.data.carts[0].products])
                setLoading(false)
            })

    }, [])

    function incQnt(eachItem) {
        let temArr = cartData.map((each) => {
            if (each.id === eachItem.id) {
                each.quantity = each.quantity + 1
            }
            return each
        })
        console.log(eachItem)
        setCartItem([...temArr])

    }

    function decQnt(eachItem) {
        if(eachItem.quantity===1){
            // console.log(eachItem.quantity)
            console.log(cartData.indexOf(eachItem))
           
            onRmv(cartData.indexOf(eachItem))
        }
        else{
            let temArr = cartData.map((each) => {
                if (each.id === eachItem.id) {
                    each.quantity = each.quantity - 1
                }
                return each
            })
            setCartItem([...temArr])
        }
       
        // console.log(eachItem)
        

    }

    function onRmv(index){
        console.log('hi')
        console.log(index)
        let newArr=cartData
        newArr.splice(index,1)
        // console.log(newArr)
        setCartItem([...newArr])

    }
    function removeAll(){
        setCartItem([])
    }



    return <div>
        <h1>My Cart</h1>
        <div className="rem-btn">
        {cartData.length>0&&<button onClick={()=>removeAll()}>Remove all</button>}

        </div>
        <div class='d-flex flex-column justify-content-center'>
        {
            isLoading && <div class="text-center">
            <div class="spinner-border" role="status">
              {/* <span class="sr-only">Loading...</span> */}
            </div>
          </div>
        }
        </div>
       

        {cartData.length>0 &&

            <table style={{ textAlign: 'center' }}>
                
                <tbody>
                    {
                        cartData.map((eachItem, ind) =>
                            <tr key={ind} className="eachProduct">
                                <td><img id="itemImage" src={eachItem.thumbnail} /></td>
                                <td>{eachItem.title}</td>
                                <td>Price Rs: {eachItem.price}/-</td>
                                {/* <td>Qnty:{eachItem.quantity}</td> */}
                                <td>
                                    <div className="qnty-btn">
                                        <button onClick={() => { decQnt(eachItem) }}>-</button>
                                        {eachItem.quantity}
                                        <button onClick={() => { incQnt(eachItem) }}>+</button>
                                    </div>
                                </td>
                                <td> Rs: {eachItem.quantity * eachItem.price} /-</td>
                                <td><button onClick={()=>onRmv(ind)}>Remove from cart</button></td>
                                
                            </tr>
                        )
                    }
                </tbody>
                <tfoot></tfoot>
                
            </table>}
           {cartData.length>0
           && <h2>Total Cart Value: <span>{cartData?.reduce((summ, item) => {
                    return summ + (item.quantity * item.price)
                }, 0)}</span></h2>}
            {
                cartData.length===0&& isLoading===false&&<img src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg" alt="" />
            }
           

    </div>
}

export default TotalCart