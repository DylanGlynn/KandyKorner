export const Order = ({ purchaseObject }) => {
    return <section className="purchase" key={`purchase--${purchaseObject.id}`}>
        <header>{/* Order Number {purchaseObject.id} */}</header>
        <div className="purchase__productName"><b>{purchaseObject?.product?.name}</b></div>
        <div className="purchase__productPrice">${purchaseObject?.product?.price} per pound</div>
    </section>
}