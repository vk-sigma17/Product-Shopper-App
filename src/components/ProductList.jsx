import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsStatus, selectProductsError, setPage } from '../store/productsSlice';
import CategorySelector from './CategorySelector';
import SearchInput from './SearchInput';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductsStatus);
    const error = useSelector(selectProductsError);
    const state = useSelector((state) => state.products); // Assuming your products state is here


    //state for search input
    const [searchItem, setSearchItem] = React.useState('');

    const indexOfLastProduct = state.currentPage * state.itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - state.itemsPerPage;
    
    const filteredProducts = products.filter(product => 
      (!state.selectedCategory || product.category === state.selectedCategory) &&
      product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

  // Get current products for display
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / state.itemsPerPage);
    

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleCategoryChange = () => {
      dispatch(setPage(1)); // Reset to first page when category changes
  };

  //handle search for input change
  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
    dispatch(setPage(1)) //Reset
  }

    if (status === 'loading') {
        return <div className='loading'>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className='error'>Error: {error}</div>;
    }

    return (
        <div>
            <div className='header'>
              <CategorySelector 
              selectedCategory={state.selectedCategory}
              onCategoryChange={handleCategoryChange}
              />
              <SearchInput 
              searchItem={searchItem}
              onSearchChange={handleSearchChange}
              />
            </div>
            
            <div className='product-container'>
                {currentProducts.map((product) => (
                    <div key={product.id} className="product">
                        <img src={product.thumbnail} alt={product.title} width="100px" />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <button 
                    onClick={() => dispatch(setPage(state.currentPage - 1))} 
                    disabled={state.currentPage === 1} // Disable if on first page
                >
                    Previous
                </button>
                <span> Page {state.currentPage} of {totalPages || 1} </span>
                <button 
                    onClick={() => dispatch(setPage(state.currentPage + 1))} 
                    disabled={state.currentPage === totalPages} // Disable if on last page
                >
                    Next
                </button>
            </div>    
        </div>
    );
};

export default ProductList;





