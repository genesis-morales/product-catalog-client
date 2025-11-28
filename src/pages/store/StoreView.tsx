import { useEffect, useState } from 'react';
import { Input, Select, Slider, Button, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Product } from '../../types/product';
import './StoreView.css';

export default function StoreView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sort, setSort] = useState<'relevance' | 'price_asc' | 'price_desc'>('relevance');

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data.data || data) ? (data.data || data) : [];
        setProducts(arr);
        setFilteredProducts(arr);
      })
      .catch(() => {});
  }, []);

  const applyFilters = () => {
    let list = [...products];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    list = list.filter(p => {
      const priceNum = Number(p.price);
      return priceNum >= priceRange[0] && priceNum <= priceRange[1];
    });

    if (sort === 'price_asc') {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === 'price_desc') {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts(list);
  };

  const clearFilters = () => {
    setSearchText('');
    setPriceRange([0, 3000]);
    setSort('relevance');
    setFilteredProducts(products);
  };

  return (
    <div className="store-wrapper">
    <div className="store-page">
      {/* Top bar */}
      <header className="store-header">
        <div className="store-logo">TechStore</div>
        <Input
          className="store-search"
          placeholder="Buscar productos..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <div className="store-header-actions">
          {/* Aquí luego puedes poner iconos de carrito / usuario */}
        </div>
      </header>

      <div className="store-main">
        {/* Sidebar filtros */}
        <aside className="store-filters">
          <h3 className="store-filters-title">Filtros</h3>

          <div className="store-filter-block">
            <h4>Categorías</h4>
            <Tag className="store-filter-tag">Laptops</Tag>
            <Tag className="store-filter-tag">Smartphones</Tag>
            <Tag className="store-filter-tag">Accessories</Tag>
          </div>

          <div className="store-filter-block">
            <h4>Rango de Precios</h4>
            <Slider
              range
              min={0}
              max={3000}
              step={50}
              value={priceRange}
              onChange={(val: any) => setPriceRange(val)}
            />
            <div className="store-price-labels">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <Button type="primary" block onClick={applyFilters}>
            Aplicar Filtros
          </Button>
          <Button block style={{ marginTop: 8 }} onClick={clearFilters}>
            Limpiar
          </Button>
        </aside>

        {/* Grid productos */}
        <section className="store-content">
          <div className="store-list-header">
            <span>
              Mostrando {filteredProducts.length} de {products.length} productos
            </span>
            <div className="store-order">
              <span>Ordenar por:</span>
              <Select
                value={sort}
                onChange={val => setSort(val)}
                options={[
                  { label: 'Relevancia', value: 'relevance' },
                  { label: 'Precio: menor a mayor', value: 'price_asc' },
                  { label: 'Precio: mayor a menor', value: 'price_desc' },
                ]}
                style={{ width: 220 }}
              />
            </div>
          </div>

          <div className="store-grid">
            {filteredProducts.map(p => (
              <article key={p.id} className="store-card">
                {p.img && (
                  <div className="store-card-image">
                    <img src={p.img} alt={p.name} />
                  </div>
                )}
                <div className="store-card-body">
                  <h4>{p.name}</h4>
                  <p className="store-card-desc">{p.description}</p>
                  <div className="store-card-footer">
                    <span className="store-card-price">
                      ${Number(p.price).toFixed(2)}
                    </span>
                    <Button type="default" shape="circle">
                      🛒
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}