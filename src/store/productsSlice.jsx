import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch products for each category
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const categoriesResponse = await fetch(`https://dummyjson.com/products/categories`);
    const categories = await categoriesResponse.json();
    const categorySlugs = categories.map(category => category.slug);

    const productPromises = categorySlugs.map(slug =>
        fetch(`https://dummyjson.com/products/category/${slug}`).then(res => res.json())
    );

    const productData = await Promise.all(productPromises);
    return productData.flatMap(data => data.products);
});

// Fetch categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
    const response = await fetch(`https://dummyjson.com/products/categories`);
    return await response.json();
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        categories: [],
        status: 'idle', //no data fetching till now
        error: null,
        currentPage: 1,
        itemsPerPage: 10,
        selectedCategory: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload; 
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload.map(category => category.slug); // Store slugs or relevant data
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const selectAllProducts = (state) => state.products.items;
export const selectAllCategories = (state) => state.products.categories; // Selector for categories
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
export const { setPage, setSelectedCategory } = productsSlice.actions;
