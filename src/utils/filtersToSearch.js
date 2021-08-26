const filtersToSearch = (filters = {}) => {
  const entries = Object.entries(filters);
  const filtersArray = entries.map(([name, value]) => `${name}: ${value}`);
  return filtersArray?.join(', ') || '';
};

export default filtersToSearch;