import { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Product } from '@/types/types';
import { formatValue } from '@/utils/currency';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../Input';
import './styles.css';

interface ProductModalProps {
  visible: boolean;
  onHide: () => void;
  product?: Product;
  onSave: (productData: Partial<Product>) => void;
}

const productSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  price: z.string().min(0, 'Preço deve ser maior que zero'),
  quantity: z.number().min(0, 'Quantidade não pode ser negativa'),
});

type ProductForm = z.infer<typeof productSchema>;

export default function ProductModal({ visible, onHide, product, onSave }: ProductModalProps) {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price ? formatValue(product.price) : '',
      quantity: product?.quantity || 0,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: formatValue(product.price),
        quantity: product.quantity,
      });
    } else {
      reset({ name: '', price: '', quantity: 0 });
    }
  }, [product, reset, visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;

    if (field === 'price') {
      const numericValue = value.replace(/\D/g, '');
      const formattedValue = numericValue ? Math.floor(parseInt(numericValue, 10)) / 100 : 0;
      setValue(field, formatValue(formattedValue));
      return;
    }
  };

  const onSubmit = (data: ProductForm) => {
    const formattedData = {
      ...data,
      price: Number(data.price.replace(/\D/g, '')) / 100,
    };
    onSave(formattedData);
  };

  return (
    <Dialog 
      visible={visible} 
      onHide={onHide} 
      header={<div className="modal-header">{product ? 'Editar Produto' : 'Criar Produto'}</div>}
      footer={
        <div className="modal-footer">
          <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text space" />
          <Button label={product ? "Salvar" : 'Criar Produto'} icon="pi pi-check" onClick={handleSubmit(onSubmit)} className='space' />
        </div>
      }
      className="modal-container"
    >
      <div className="modal-content">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              id="name"
              label="Nome do Produto"
              placeholder="Digite o nome do produto"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              id="price"
              label="Preço"
              placeholder="Digite o preço do produto"
              value={field.value}
              onChange={(e) => handleChange(e, 'price')}
              type="text"
              error={errors.price?.message}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <Input
              id="quantity"
              label="Quantidade"
              placeholder="Digite a quantidade do produto"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              type="number"
              error={errors.quantity?.message}
            />
          )}
        />
      </div>
    </Dialog>
  );
}
