import React from 'react'
import StoreCard from './StoreCard'


export default function StoreList({stores = [], sale, loadData}) {
  return (
    <div className={sale ? 'sale' : ''}>
      <h2>Store List</h2>
          {stores.map((item) => {
              return (<StoreCard
                  key={item.id}
                  address={item.address} />)
          })}
          <button onClick={loadData}>
              load more stores
          </button>
      </div>
    )
}

