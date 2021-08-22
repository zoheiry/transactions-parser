const searchToFilters = (searchTerm = '') => {
    const optionsArray = searchTerm?.split(',');
    
    return optionsArray?.reduce((res, option) => ({
        ...res,
        [option.split(':')[0]?.trim()]: option.split(':')[1]?.trim()
    }), {}) || {};
};

export default searchToFilters;