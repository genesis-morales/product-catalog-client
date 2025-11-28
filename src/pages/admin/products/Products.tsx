import { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Select, Drawer, Form, InputNumber, Modal, message,Tag, Badge, Divider } from 'antd';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { Product } from '../../../types/product';
import './Products.css';


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedAvailable, setSelectedAvailable] = useState<boolean | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
  fetchData(currentPage, pageSize);
}, []);


  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/products?page=${page}&per_page=${perPage}`;
      const productsRes = await fetch(url);
      const resJson = await productsRes.json();

      const productsArray = Array.isArray(resJson.data) ? resJson.data : [];
      console.log('Productos cargados:', productsArray);

      const normalizedProducts = productsArray.map((p: any) => ({
        ...p,
        available: p.available === true || p.available === 1 || p.available === '1',
      }));

      setProducts(normalizedProducts);
      setTotalItems(resJson.total || 0);
      setCurrentPage(resJson.current_page || page);
      setPageSize(resJson.per_page || perPage);

      // 1) Cargar categorías
      const categoriesRes = await fetch('http://localhost:8000/api/categories');
      const categoriesData = await categoriesRes.json();
      console.log('Categorías cargadas:', categoriesData);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);

      // 2) Cargar subcategorías
      const subcategoriesRes = await fetch('http://localhost:8000/api/subcategories');
      const subcategoriesData = await subcategoriesRes.json();
      console.log('Subcategorías cargadas:', subcategoriesData);
      setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);

      // 3) Aplicar filtros después de tener todo
      applyFilters(normalizedProducts, searchText, selectedCategory, selectedAvailable);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      message.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  // Función para aplicar filtros
  const applyFilters = (
    prods: Product[],
    search: string,
    cat: number | undefined,
    avail: boolean | null
  ) => {

  let filtered = prods;

  if (search.trim()) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (cat) {
    filtered = filtered.filter(p => {
      const subcategory = subcategories.find(s => s.id === p.subcategory_id);
      return subcategory?.category_id === cat;
    });
  }

  // Filtro por disponibilidad
  if (avail !== null) {
    filtered = filtered.filter(p => p.available === avail);
  }
  setFilteredProducts(filtered);
};

  // Actualiza los filtros cuando cambian
  useEffect(() => {
    applyFilters(products, searchText, selectedCategory, selectedAvailable);
  }, [searchText, selectedCategory, selectedAvailable, products, subcategories]);

  // Limpiar todos los filtros
  const clearAllFilters = () => {
  setSearchText('');
  setSelectedCategory(undefined);
  setSelectedAvailable(null);
  setFilteredProducts(products);
};

  const handleCategoryChange = (categoryId: number) => {
    let filtered = subcategories.filter((sub: any) => {
      return sub.category_id === categoryId;
    });

    setFilteredSubcategories(filtered);
    form.setFieldValue('subcategory_id', undefined);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setFilteredSubcategories([]);
    setFileList([]);        // ← limpia archivos
    setImageUrl(null);      // ← limpia URL
    setDrawerOpen(true);
  };


  const handleEditProduct = (record: Product) => {
    setEditingProduct(record);

    // Si viene la relación subcategory.category desde el backend:
    if (record.subcategory?.category_id) {
      form.setFieldsValue({
        ...record,
        category_id: record.subcategory.category_id,
      });
    } else {
      form.setFieldsValue(record);
    }

    if (record.subcategory_id) {
      const subcategory = subcategories.find(
        (sub: any) => sub.id === record.subcategory_id
      );
      if (subcategory) {
        const filtered = subcategories.filter(
          (sub: any) => sub.category_id === subcategory.category_id
        );
        setFilteredSubcategories(filtered);
        if (record.img) {
          setImageUrl(record.img);
          setFileList([
            {
              uid: '-1',
              name: 'image',
              status: 'done',
              url: record.img,
            } as UploadFile,
          ]);
        } else {
          setImageUrl(null);
          setFileList([]);
        }
      }
    }

    setDrawerOpen(true);
  };


  const handleDeleteProduct = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const res = await fetch(`http://localhost:8000/api/products/${deleteId}`, {
        method: 'DELETE',
      });
      
      if (res.status === 204 || res.ok) {
        message.success('Producto eliminado');
        setDeleteModalOpen(false);
        fetchData();
      } else {
        message.error('Error al eliminar');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al eliminar');
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleSaveProduct = async (values: any) => {
  console.log('imageUrl en estado:', imageUrl);
  values.img = imageUrl || null;
  console.log('Valores enviados:', values);
  // resto...


    try {
      if (editingProduct) {
        const res = await fetch(`http://localhost:8000/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          message.success('Producto actualizado');
        } else {
          message.error('Error al actualizar');
        }
      } else {
        const res = await fetch('http://localhost:8000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          message.success('Producto creado');
        } else {
          message.error('Error al crear');
        }
      }
      setDrawerOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al guardar');
    }
  };

  const handleUploadChange = async (info: any) => {
    const { file } = info;

    if (info.fileList.length === 0) {
      setFileList([]);
      setImageUrl(null);
      return;
    }

    if (file.originFileObj) {
      const formData = new FormData();
      formData.append('image', file.originFileObj);

      const res = await fetch('http://localhost:8000/api/products/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Imagen subida:', data);

      setImageUrl(data.url);        // <- solo esto es imprescindible
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: data.url,
        } as UploadFile,
      ]);
    }
  };



  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'red', text: 'Agotado' };
    if (stock < 20) return { color: 'orange', text: `${stock} en stock` };
    return { color: 'green', text: `${stock} en stock` };
  };

  const columns = [
    {
      title: 'PRODUCTO',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text: string, record: Product) => (
        <Space>
          {record.img && (
            <img
              src={record.img}
              alt={text}
              className="product-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <span>{text}</span>
        </Space>
      ),
    },
    {
    title: 'PRECIO',
    dataIndex: 'price',
    key: 'price',
    sorter: (a: Product, b: Product) => a.price - b.price,
    render: (price: any) => {
      if (!price) return '$0.00';
      return `$${parseFloat(price).toFixed(2)}`;
    },
  },
{
  title: 'STOCK',
  dataIndex: 'stock',
  key: 'stock',
  sorter: (a: Product, b: Product) => a.stock - b.stock,
  render: (stock: number) => {
    const status = getStockStatus(stock);
    return <Badge color={status.color} text={status.text} />;
  },
},

    {
    title: 'CATEGORÍA',
    key: 'category',
    width: '15%',
    render: (_: any, record: Product) => {
      const categoryName = record.subcategory?.category?.name || 'Sin categoría';
      return (
        <Tag color="blue" style={{ borderRadius: 999 }}>
          {categoryName}
        </Tag>
      );
    },
  },
  {
    title: 'SUBCATEGORÍA',
    key: 'subcategory',
    width: '15%',
    render: (_: any, record: Product) => {
      const subcategoryName = record.subcategory?.name || 'Sin subcategoría';
      return <span>{subcategoryName}</span>;
    },
  },
    {
      title: 'DISPONIBLE',
      dataIndex: 'available',
      key: 'available',
      render: (available: boolean) => (
        <Tag color={available ? 'green' : 'red'}>
          {available ? 'Sí' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'ACCIONES',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1 className="products-title">Catálogo de Productos</h1>
          <p className="products-subtitle">
            Gestiona tu catálogo de productos, incluyendo inventario y precios.
          </p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
          className="btn-add-product"
        >
          Añadir Producto
        </Button>
      </div>

      <div className="products-filters">
        <Input
          placeholder="Buscar por nombre de producto o SKU"
          prefix={<SearchOutlined />}
          className="filter-search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <Select
          placeholder="Categoría"
          className="filter-select"
          allowClear
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          options={categories.map(cat => ({
            label: cat.name,
            value: cat.id,
          }))}
        />
        <Select
          placeholder="Disponibilidad"
          className="filter-select"
          allowClear
          value={selectedAvailable}
          onChange={(value) => {
            // value puede ser true, false o undefined al limpiar
            setSelectedAvailable(
              value === undefined ? null : value
            );
          }}
          options={[
            { label: 'Disponible', value: true },
            { label: 'No disponible', value: false },
          ]}
        />
        <Button
          icon={<ClearOutlined />}
          onClick={clearAllFilters}
          className="btn-clear-filters"
        >
          Ver Todo
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          total: totalItems,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
            fetchData(page, size);
          },
        }}
        className="products-table"
      />

      {/* Drawer para agregar/editar */}
      <Drawer
        title={editingProduct ? 'Editar Producto' : 'Añadir Producto'}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveProduct}
        >
          <Divider orientation="left">Información Básica</Divider>

          <Form.Item
            name="name"
            label="Nombre del Producto"
            rules={[{ required: true, message: 'El nombre es requerido' }]}
          >
            <Input placeholder="Ej: Laptop Gaming Pro" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: 'La descripción es requerida' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Descripción detallada del producto" 
            />
          </Form.Item>

          <Divider orientation="left">Organización</Divider>

          <Form.Item
            name="category_id"
            label="Categoría"
            rules={[{ required: true, message: 'La categoría es requerida' }]}
          >
            <Select
              placeholder="Selecciona una categoría"
              onChange={handleCategoryChange}
              options={categories.map(cat => ({
                label: cat.name,
                value: cat.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="subcategory_id"
            label="Subcategoría"
            rules={[{ required: true, message: 'La subcategoría es requerida' }]}
          >
            <Select
              placeholder={filteredSubcategories.length === 0 ? "Primero selecciona una categoría" : "Selecciona una subcategoría"}
              options={filteredSubcategories.map(sub => ({
                label: sub.name,
                value: sub.id,
              }))}
            />
          </Form.Item>

          <Divider orientation="left">Inventario y Precio</Divider>

          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: 'El precio es requerido' }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              placeholder="0.00"
              style={{ width: '100%' }}
              prefix="$"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Cantidad en Stock"
            rules={[{ required: true, message: 'El stock es requerido' }]}
          >
            <InputNumber
              min={0}
              placeholder="0"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="available"
            label="Estado"
          >
            <Select
              placeholder="Selecciona disponibilidad"
              options={[
                { label: 'Disponible', value: true },
                { label: 'No disponible', value: false },
              ]}
            />
          </Form.Item>

          <Divider orientation="left">Imágenes del Producto</Divider>
          {/* Campo oculto donde se guarda la URL de la imagen */}
          {/*<Form.Item name="img" label="URL de imagen">
            //<Input />
          </Form.Item>*/}


          <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              onRemove={() => {
                setFileList([]);
                setImageUrl(null);
                form.setFieldValue('img', null);
              }}
              accept="image/*"
              maxCount={1}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Subir</div>
                </div>
              )}
            </Upload>


          {(imageUrl || editingProduct?.img) && (
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <img
                src={imageUrl || editingProduct?.img || ''}
                alt="preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
        )}

          <Button type="primary" htmlType="submit" block size="large">
            {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
        </Form>
      </Drawer>

      {/* Modal de confirmación de eliminación */}
      <Modal
        title="Confirmar eliminación"
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        ¿Estás seguro de que deseas eliminar este producto?
      </Modal>
    </div>
  );
}
