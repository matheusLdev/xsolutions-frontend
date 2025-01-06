import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Product } from '@/types/types';
import { formatValue } from '@/utils/currency';
// import { createProduct, updateProduct } from '@/services/productsService';
import Input from '../Input';
import './styles.css';

interface ProductModalProps {
  visible: boolean;
  onHide: () => void;
  product?: Product;
}

export default function ProductModal({ visible, onHide, product }: ProductModalProps) {
  const [productData, setProductData] = useState<Partial<Product>>(product ?? {});

  useEffect(() => {
    if (product) setProductData(product);
  }, [product]);

  const handleSave = async () => {
    try {
      console.log('productData', productData);
      if (productData?.id) {
        // const updateData = {
        //   name: productData.name,
        //   price: productData.price,
        //   quantity: productData.quantity,
        // };
        // await updateProduct(productData.id, updateData);
      } else {
        // if (productData) await createProduct(productData);
      }
      // onHide();
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  const handleChange = (value: string | number, field: 'name' | 'price' | 'quantity') => {
    if (value === undefined || value === null) return;  
  
    if (field === 'price') {
      const numericValue = value.toString().replace(/\D/g, '');
      const formattedValue = numericValue ? Math.floor(parseInt(numericValue, 10)) / 100 : 0;
  
      setProductData(prevData => ({
        ...prevData,
        [field]: formattedValue || 0,
      }));
  
      return;
    }
  
    if (field === 'quantity') {
      const parsedValue = parseInt(value.toString(), 10);
      setProductData(prevData => ({
        ...prevData,
        [field]: parsedValue,
      }));
      return;
    }
  
    if (field === 'name') {
      setProductData(prevData => ({
        ...prevData,
        [field]: value.toString(),
      }));
      return;
    }
  };

  return (
    <Dialog 
      visible={visible} 
      onHide={onHide} 
      header={<div className="modal-header">{product ? 'Editar Produto' : 'Criar Produto'}</div>}
      footer={
        <div className="modal-footer">
          <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text space" />
          <Button label={product ? "Salvar" : 'Criar Produto'} icon="pi pi-check" onClick={handleSave} className='space' />
        </div>
      }
      className="modal-container"
    >
      <div className="modal-content">
        <Input
          id="name"
          label="Nome do Produto"
          placeholder="Digite o nome do produto"
          value={productData.name || ''}
          onChange={e => handleChange(e, 'name')}
        />
        <Input
          id="price"
          label="Preço"
          placeholder='Digite o preço do produto'
          value={productData?.price ? formatValue(productData.price) : ''}
          onChange={e => handleChange(e, 'price')}
          type="text"
        />
        <Input
          id="quantity"
          label="Quantidade"
          placeholder='Digite a quantidade do produto'
          value={productData?.quantity?.toString() || ''}
          onChange={e => handleChange(e, 'quantity')}
          type="number"
        />
      </div>
    </Dialog>
  );
}
