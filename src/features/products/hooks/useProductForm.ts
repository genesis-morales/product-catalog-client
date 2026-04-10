// src/features/products/hooks/useProductForm.ts
import { message } from 'antd';
import { useCallback, useState } from 'react';
import { ProductService } from '../services/productService';
import type { Product, ProductFormData, Subcategory } from '../types/product';

interface UseProductFormReturn {
  loading: boolean;
  imageUrl: string | null;
  fileList: any[];
  filteredSubcategories: Subcategory[];
  handleCategoryChange: (categoryId: number, allSubcategories: Subcategory[]) => void;
  handleUpload: (file: File) => Promise<void>;
  handleSave: (values: ProductFormData, editingProduct: Product | null, onSuccess: () => void) => Promise<void>;
  handleRemoveImage: () => void;
  setInitialImage: (url: string | null) => void;
  resetForm: () => void;
}

export const useProductForm = (): UseProductFormReturn => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);

  const handleCategoryChange = useCallback((categoryId: number, allSubcategories: Subcategory[]) => {
    const filtered = allSubcategories.filter(sub => sub.category_id === categoryId);
    setFilteredSubcategories(filtered);
  }, []);

  const setInitialImage = useCallback((url: string | null) => {
    if (!url) {
      setImageUrl(null);
      setFileList([]);
      return;
    }

    setImageUrl(url);
    setFileList([{ uid: 'existing', name: 'image', status: 'done', url }]);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    try {
      const response = await ProductService.uploadImage(file);
      setImageUrl(response.url);
      setFileList([{
        uid: file.name,
        name: file.name,
        status: 'done',
        url: response.url,
      }]);
      message.success('Imagen subida exitosamente');
    } catch (error) {
      message.error('Error al subir la imagen');
      console.error('Upload error:', error);
    }
  }, []);

  const handleSave = useCallback(async (
    values: ProductFormData,
    editingProduct: Product | null,
    onSuccess: () => void
  ) => {
    setLoading(true);
    try {
      const dataToSend = { ...values, img: imageUrl };

      if (editingProduct) {
        await ProductService.updateProduct(editingProduct.id, dataToSend);
        message.success('Producto actualizado exitosamente');
      } else {
        await ProductService.createProduct(dataToSend);
        message.success('Producto creado exitosamente');
      }

      onSuccess();
    } catch (error) {
      message.error('Error al guardar el producto');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  }, [imageUrl]);

  const handleRemoveImage = useCallback(() => {
    setFileList([]);
    setImageUrl(null);
  }, []);

  const resetForm = useCallback(() => {
    setImageUrl(null);
    setFileList([]);
    setFilteredSubcategories([]);
  }, []);

  return {
    loading,
    imageUrl,
    fileList,
    filteredSubcategories,
    handleCategoryChange,
    handleUpload,
    handleSave,
    handleRemoveImage,
    setInitialImage,
    resetForm,
  };
};