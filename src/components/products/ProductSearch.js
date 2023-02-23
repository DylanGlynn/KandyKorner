export const ProductSearch = ({ setterFunction }) => {
    return (
        <div>
            <input
                className="product__searchBar"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" placeholder="What candy are you looking for?" />
        </div>
    )
}