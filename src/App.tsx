import React, { useEffect, useState } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductList/ProductList';
import FavoritesList from './components/FavoritesList/FavoritesList';
import ItemPage from './pages/ItemPage/ItemPage';


export interface IItem {
  id: number;
  name: string;
  src: string;
  price: number;
  favorite: boolean;
}

const initialState = {
  data: [{
    id: 0,
    name: "",
    src: "",
    price: 0,
    favorite: false
  }]
}

export const { useGlobalState } = createGlobalState(initialState);
export const url = 'https://testbackend.nc-one.com';

function App() {
  const [items, setItems] = useGlobalState('data');
  const [favorites, setFavorites] = useState<IItem[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(`${url}/image`);
        const json = await res.json();
        setItems(json.map((item: IItem) => ({ ...item, favorite: false })));
      }

      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onChangeLike = (event: React.MouseEvent) => {
    const newItems = items.map(el => el.id === Number(event.currentTarget.id) ? { ...el, favorite: !el.favorite } : { ...el });
    setItems([...newItems]);

    const newFavorites = newItems.filter(el => el.favorite === true);
    setFavorites([...newFavorites]);
  }

  return (
    <>
      <FavoritesList favorites={favorites} onChangeLike={onChangeLike} />
      <Routes>
        <Route path="/" element={<ProductList onChangeLike={onChangeLike} />} />
        <Route path="/:id" element={<ItemPage isLike={false} onChangeLike={onChangeLike} items={items} />} />
      </Routes>
    </>
  );
}

export default App;
