'use client';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Product } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Logo from '../../public/assets/images/logo-xsolution.png'; 
import Image from 'next/image';
import './globals.css';
import './page.css';
import ProductModal from '@/components/ModalProduct';
import { deleteProduct, fetchProducts, createProduct, updateProduct } from '@/services/productsService';
import { formatValue } from '@/utils/currency';
import { useAlert } from '@/hooks/useAlert';

export default function Page() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const { showSuccess, showError, ToastComponent } = useAlert();
  const queryClient = useQueryClient();

  const { data: produtos, isLoading } = useQuery<Product[]>({
    queryKey: ['produtos'],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      showSuccess('Produto deletado com sucesso!');
    },
    onError: () => {
      showError('Erro ao deletar produto, tente novamente.');
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      if (product.id) {
        return updateProduct(product.id as number, product as Product);
      } else {
        return createProduct({ ...product } as Product);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      showSuccess('Produto salvo com sucesso!');
      closeModal();
    },
    onError: () => {
      showError('Erro ao salvar produto.');
    },
  });

  const handleDelete = (productId: number) => {
    deleteMutation.mutate(productId);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setDialogVisible(true);
  };

  const handleCreate = () => {
    setSelectedProduct(undefined);
    setDialogVisible(true);
  };

  const handleSave = (productData: Partial<Product>) => {
    saveMutation.mutate({
      ...productData,
      id: selectedProduct?.id,
    });
  };

  const closeModal = () => {
    setDialogVisible(false);
    setSelectedProduct(undefined);
  };

  const priceBodyTemplate = (rowData: Product) => formatValue(rowData.price);

  return (
    <>
      <ToastComponent />
      <header>
        <Image src={Logo} alt="Logo X-Solutions" className="image" />
      </header>
      <main>
        <div className="sub-header">
          <h1>Produtos cadastrados</h1>
          <Button label="Criar Produto" icon="pi pi-plus" onClick={handleCreate} className="space" />
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <DataTable value={produtos} className="centered-table">
            <Column field="id" header="ID" />
            <Column field="name" header="Nome" />
            <Column field="price" header="Preço" body={priceBodyTemplate} />
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
                    onClick={() => handleDelete(rowData.id)}
                  />
                </div>
              )}
            />
          </DataTable>
        )}
      </main>
      <ProductModal
        visible={dialogVisible}
        onHide={closeModal}
        product={selectedProduct}
        onSave={handleSave}
      />
    </>
  );
}
