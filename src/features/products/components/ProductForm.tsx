import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Divider, Form, Input, InputNumber, Select, Upload } from 'antd';
import React, { useEffect } from 'react';
import type { Category, Product, Subcategory } from '../types/product';

interface ProductFormProps {
  form: FormInstance;
  editingProduct: Product | null;
  categories: Category[];
  filteredSubcategories: Subcategory[];
  imageUrl: string | null;
  fileList: any[];
  loading: boolean;
  onCategoryChange: (categoryId: number) => void;
  onRemoveImage: () => void;
  onUpload: (file: File) => Promise<void>;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  form, editingProduct, categories, filteredSubcategories, 
  imageUrl, fileList, loading, onCategoryChange, onUpload, onRemoveImage,
}) => {
  useEffect(() => {
    if (editingProduct) {
      if (editingProduct.subcategory?.category_id) {
        form.setFieldsValue({
          ...editingProduct,
          category_id: editingProduct.subcategory.category_id,
        });
        onCategoryChange(editingProduct.subcategory.category_id);
      } else {
        form.setFieldsValue(editingProduct);
      }

      if (editingProduct.img) {
        
      }
    }
  }, [editingProduct]);

  return (
    <>
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
          onChange={onCategoryChange}
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
          prefix="₡"
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
        rules={[{ required: true, message: 'El estado es requerido' }]}
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


      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={(file) => {
          onUpload(file);
          return false;
        }}
        onRemove={onRemoveImage}
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

      <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
        <Button type="primary" htmlType="submit" loading={loading} size="large">
          {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </Form.Item>
    </>
  );
};