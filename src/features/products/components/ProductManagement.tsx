import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Modal, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useProductFilters } from '../hooks/useProductFilters';
import { useProductForm } from '../hooks/useProductForm';
import { useProducts } from '../hooks/useProducts';
import { ProductService } from '../services/productService';
import type { Product } from '../types/product';
import { ProductFilters } from './ProductFilters';
import { ProductForm } from './ProductForm';
import { ProductTable } from './ProductTable';
import { PageHeader } from '../../../components/page-header/PageHeader';

export const ProductManagement: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form] = Form.useForm();

  // Hooks personalizados
  const { products, loading, total, currentPage, pageSize, loadProducts, refetch } = useProducts();
  const { categories, subcategories } = useCategories();
  const { filters, filteredProducts, setSearch, setCategoryId, setAvailable, clearFilters } = useProductFilters(products);
  const { imageUrl, fileList, filteredSubcategories, handleCategoryChange, handleUpload, handleSave, handleRemoveImage,
    setInitialImage, resetForm, loading: formLoading, } = useProductForm();

  // Handlers
  const handleAddProduct = useCallback(() => {
    setEditingProduct(null);
    form.resetFields();
    resetForm();
    setDrawerOpen(true);
  }, [form, resetForm]);

  const handleEditProduct = useCallback((record: Product) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    if (record.img) {
      setInitialImage(record.img);
    }
    setDrawerOpen(true);
  }, [form, setInitialImage]);

  const handleDeleteProduct = useCallback((id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteId) return;

    try {
      await ProductService.deleteProduct(deleteId);
      message.success('Producto eliminado exitosamente');
      setDeleteModalOpen(false);
      setDeleteId(null);
      await refetch();
    } catch (error) {
      message.error('Error al eliminar el producto');
      console.error('Delete error:', error);
    }
  }, [deleteId, refetch]);

  const handleSaveProduct = useCallback(async (values: any) => {
    await handleSave(values, editingProduct, async () => {
      setDrawerOpen(false);
      await refetch();
    });
  }, [handleSave, editingProduct, refetch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, [setSearch]);

  const handleCategoryFilterChange = useCallback((value?: number) => {
    setCategoryId(value);
  }, [setCategoryId]);

  const handleAvailableFilterChange = useCallback((value?: boolean | null) => {
    setAvailable(value ?? null);
  }, [setAvailable]);

  const handleClearFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleCategoryChangeWrapper = useCallback((categoryId: number) => {
    handleCategoryChange(categoryId, subcategories);
  }, [handleCategoryChange, subcategories]);

  const handlePaginationChange = useCallback((page: number, size: number) => {
    loadProducts(page, size);
  }, [loadProducts]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <PageHeader
            title="Productos"
            subtitle="Gestiona el catálogo de la tienda."
          />
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Añadir Producto
        </Button>
      </div>

      <ProductFilters
        filters={filters}
        categories={categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryFilterChange}
        onAvailableChange={handleAvailableFilterChange}
        onClearFilters={handleClearFilters}
      />

      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: handlePaginationChange,
        }}
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
          <ProductForm
            form={form}
            editingProduct={editingProduct}
            categories={categories}
            filteredSubcategories={filteredSubcategories}
            imageUrl={imageUrl}
            fileList={fileList}
            loading={formLoading}
            onCategoryChange={(id) => handleCategoryChange(id, subcategories)}
            onUpload={handleUpload}
            onRemoveImage={handleRemoveImage}
          />
        </Form>
      </Drawer>

      {/* Modal de confirmación de eliminación */}
      <Modal
        title="Confirmar eliminación"
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        ¿Estás seguro de que deseas eliminar este producto?
      </Modal>
    </div>
  );
};