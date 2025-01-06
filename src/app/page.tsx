'use client'

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Product } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import Logo from '@/assets/images/logo-xsolution.png';
import Image from 'next/image';
import './globals.css';
import './page.css';
import ProductModal from '@/components/ModalProduct';
import { deleteProduct, fetchProducts } from '@/services/productsService';
import { formatValue } from '@/utils/currency';

export default function Page() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const { data: produtos, isLoading } = useQuery<Product[]>({
    queryKey: ['produtos'],
    queryFn: fetchProducts,
  });

  const handleEdit = (product: Product) => {
    // Lógica de edição
    console.log('Editar produto', product);
    setDialogVisible(true);
  };

  const priceBodyTemplate = (rowData: Product) => {
    return formatValue(rowData.price);
  };

  return (
    <>
      <header>
        <Image 
          src={Logo} 
          alt="Logo X-Solutions" 
          className="image" 
        />
      </header>
      <main>
        <div className='sub-header'>
          <h1>Produtos cadastrados</h1>
          <Button label="Criar Produto" icon="pi pi-plus" onClick={() => setDialogVisible(true)} className='space'/>
        </div>
        <DataTable value={produtos} className="centered-table">
          <Column field="id" header="ID" />
          <Column field="name" header="Nome" />
          <Column 
            field="price" 
            header="Preço" 
            body={priceBodyTemplate} 
          />
          <Column field="quantity" header="Quantidade" />
          <Column 
            header="Ações" 
            body={(rowData: Product) => (
              <div className="actions">
                <Button 
                  icon="pi pi-pencil" 
                  className="p-button-rounded p-button-info p-button-text" 
                  onClick={() => handleEdit(rowData)} 
                />
                <Button 
                  icon="pi pi-trash" 
                  className="p-button-rounded p-button-danger p-button-text" 
                  onClick={() => deleteProduct(rowData.id)} 
                />
              </div>
            )}
          />
        </DataTable>
      </main>
      
      <ProductModal visible={dialogVisible} onHide={() => setDialogVisible(false)} />
    </>
  );
}
