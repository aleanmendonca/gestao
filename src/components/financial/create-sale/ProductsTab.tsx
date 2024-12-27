import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  totalPrice: number;
  totalCost: number;
  profit: number;
}

interface ProductsTabProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProductsTab({ data, onChange }: ProductsTabProps) {
  const products = data.products || [];

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unitPrice: 0,
      unitCost: 0,
      totalPrice: 0,
      totalCost: 0,
      profit: 0
    };
    onChange({ products: [...products, newProduct] });
  };

  const removeProduct = (id: string) => {
    onChange({ products: products.filter((p: Product) => p.id !== id) });
  };

  const updateProduct = (id: string, field: keyof Product, value: number | string) => {
    const updatedProducts = products.map((p: Product) => {
      if (p.id === id) {
        const updated = { ...p, [field]: value };
        
        // Recalculate totals
        if (['quantity', 'unitPrice', 'unitCost'].includes(field)) {
          updated.totalPrice = updated.quantity * updated.unitPrice;
          updated.totalCost = updated.quantity * updated.unitCost;
          updated.profit = updated.totalPrice - updated.totalCost;
        }
        
        return updated;
      }
      return p;
    });
    
    onChange({ products: updatedProducts });
  };

  return (
    <div className="space-y-4">
      {products.map((product: Product) => (
        <div key={product.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Produto</label>
                  <Input
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantidade</label>
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateProduct(product.id, 'quantity', Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Valor Unitário</label>
                  <Input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) => updateProduct(product.id, 'unitPrice', Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Custo Unitário</label>
                  <Input
                    type="number"
                    value={product.unitCost}
                    onChange={(e) => updateProduct(product.id, 'unitCost', Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lucro Total</label>
                  <Input
                    type="number"
                    value={product.profit}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeProduct(product.id)}
              className="ml-4"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addProduct}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Produto
      </Button>
    </div>
  );
}
