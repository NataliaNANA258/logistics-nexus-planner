
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Package } from 'lucide-react';

const ProdutoForm = () => {
  const [produto, setProduto] = useState({
    codigo: '',
    nome: '',
    descricao: '',
    categoria: '',
    quantidade: '',
    unidadeMedida: '',
    valor: '',
    localizacao: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salvar no localStorage para simular banco de dados
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    const novoProduto = {
      ...produto,
      id: Date.now(),
      dataCadastro: new Date().toISOString()
    };
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    toast.success("Produto cadastrado com sucesso!");
    
    // Limpar formulário
    setProduto({
      codigo: '',
      nome: '',
      descricao: '',
      categoria: '',
      quantidade: '',
      unidadeMedida: '',
      valor: '',
      localizacao: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setProduto(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Cadastro de Produto</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="codigo">Código do Produto *</Label>
          <Input
            id="codigo"
            value={produto.codigo}
            onChange={(e) => handleChange('codigo', e.target.value)}
            placeholder="Ex: PROD001"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="nome">Nome do Produto *</Label>
          <Input
            id="nome"
            value={produto.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="Ex: Notebook Dell Inspiron"
            required
            className="bg-white/80"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            value={produto.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
            placeholder="Descrição detalhada do produto..."
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="categoria">Categoria *</Label>
          <Select value={produto.categoria} onValueChange={(value) => handleChange('categoria', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eletronicos">Eletrônicos</SelectItem>
              <SelectItem value="mobiliario">Mobiliário</SelectItem>
              <SelectItem value="equipamentos">Equipamentos</SelectItem>
              <SelectItem value="materiais">Materiais de Escritório</SelectItem>
              <SelectItem value="consumiveis">Consumíveis</SelectItem>
              <SelectItem value="ferramentas">Ferramentas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantidade">Quantidade *</Label>
          <Input
            id="quantidade"
            type="number"
            value={produto.quantidade}
            onChange={(e) => handleChange('quantidade', e.target.value)}
            placeholder="0"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="unidadeMedida">Unidade de Medida</Label>
          <Select value={produto.unidadeMedida} onValueChange={(value) => handleChange('unidadeMedida', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unidade">Unidade</SelectItem>
              <SelectItem value="caixa">Caixa</SelectItem>
              <SelectItem value="pacote">Pacote</SelectItem>
              <SelectItem value="kit">Kit</SelectItem>
              <SelectItem value="metro">Metro</SelectItem>
              <SelectItem value="litro">Litro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="valor">Valor Unitário (R$)</Label>
          <Input
            id="valor"
            type="number"
            step="0.01"
            value={produto.valor}
            onChange={(e) => handleChange('valor', e.target.value)}
            placeholder="0,00"
            className="bg-white/80"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="localizacao">Localização no Estoque</Label>
          <Input
            id="localizacao"
            value={produto.localizacao}
            onChange={(e) => handleChange('localizacao', e.target.value)}
            placeholder="Ex: Prateleira A - Posição 15"
            className="bg-white/80"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Cadastrar Produto
      </Button>
    </form>
  );
};

export default ProdutoForm;
