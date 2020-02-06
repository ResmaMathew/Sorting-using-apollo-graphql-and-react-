import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS_FOR_UNITS } from '../../../../queries/object'
import ProductListView from './ProductListView'


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const ProductList = ({ unitId, filter, getProductFields }) => {

  const [paginationState, setPaginationState] = useState({ limit: 10, skip: 0, count: 0 })
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('car_make');

  const { data: getProductsForUnits, error: getProductsError, loading: getProductsLoading, refetch } = useQuery(GET_PRODUCTS_FOR_UNITS, {
    variables: {
      unitIds: unitId,
      limit: paginationState.limit,
      skip: paginationState.skip,
      sort: [{ field: orderBy, order: (order == "asc") ? 1 : -1 }],
    
    }
  }, 
 
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    console.log("Prop:", property, isDesc);
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  
  const products = (getProductsForUnits && !getProductsLoading) ? getProductsForUnits.getProductsForUnits.products : []
  
  return (

    <ProductListView headers={headers} products={products} paginatorProps={paginatorProps} loading={getProductsLoading} order={order} setOrder={setOrder} orderBy={orderBy} setOrderBy={setOrderBy} onRequestSort={handleRequestSort} />
  )
}
export default ProductList
