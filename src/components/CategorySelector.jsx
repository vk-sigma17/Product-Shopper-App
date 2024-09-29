
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategory } from '../store/productsSlice';
// import { categories } from './Categories';


// const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
//     const dispatch = useDispatch();

//     const handleChange = (event) => {
//         const category = event.target.value;
//         dispatch(setSelectedCategory(category));
//         onCategoryChange(); // Call the passed function to reset page
//     };

//     return (
//         <select onChange={handleChange} value={selectedCategory || ''} className='selector'>
//             <option value="">All Categories</option>
//             {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//             ))}
//         </select>
//     );
// };

// export default CategorySelector;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, fetchCategories, selectAllCategories } from '../store/productsSlice';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories); // Get categories from the Redux state

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (event) => {
        const category = event.target.value;
        dispatch(setSelectedCategory(category));
        onCategoryChange(); // Call the passed function to reset page
    };

    return (
        <select onChange={handleChange} value={selectedCategory || ''} className='selector'>
            <option value="">All Categories</option>
            {categories.map(category => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    );
};

export default CategorySelector;
