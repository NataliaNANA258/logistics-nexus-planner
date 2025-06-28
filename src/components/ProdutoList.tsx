
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Eye, Edit, Trash2 } from 'lucide-react';

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  categoria: string;
  quantidade: string;
  unidadeMedida: string;
  valor: string;
  localizacao: string;
  dataCadastro: string;
}

const ProdutoList = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nome');

  useEffect(() => {
    const loadProdutos = () => {
      const savedProdutos = JSON.parse(localStorage.getItem('produtos') || '[]');
      setProdutos(savedProdutos);
      setFilteredProdutos(savedProdutos);
    };
    loadProdutos();
  }, []);

  useEffect(() => {
    let filtered = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'nome') return a.nome.localeCompare(b.nome);
      if (sortBy === 'codigo') return a.codigo.localeCompare(b.codigo);
      if (sortBy === 'categoria') return a.categoria.localeCompare(b.categoria);
      if (sortBy === 'quantidade') return parseInt(b.quantidade) - parseInt(a.quantidade);
      return 0;
    });

    setFilteredProdutos(filtered);
  }, [produtos, searchTerm, sortBy]);

  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      'eletronicos': 'bg-blue-100 text-blue-800',
      'mobiliario': 'bg-green-100 text-green-800',
      'equipamentos': 'bg-purple-100 text-purple-800',
      'materiais': 'bg-orange-100 text-orange-800',
      'consumiveis': 'bg-red-100 text-red-800',
      'ferramentas': 'bg-gray-100 text-gray-800',
    };
    return colors[categoria] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Lista de Produtos</h3>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nome, código ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48 bg-white/80">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nome">Ordenar por Nome</SelectItem>
            <SelectItem value="codigo">Ordenar por Código</SelectItem>
            <SelectItem value="categoria">Ordenar por Categoria</SelectItem>
            <SelectItem value="quantidade">Ordenar por Quantidade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Produtos */}
      <div className="grid gap-4">
        {filteredProdutos.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Package className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
                {produtos.length === 0 ? 'Nenhum produto cadastrado ainda.' : 'Nenhum produto encontrado com os filtros aplicados.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProdutos.map((produto) => (
            <Card key={produto.id} className="bg-white/90 backdrop-blur-sm border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800">{produto.nome}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Código: {produto.codigo}
                    </CardDescription>
                  </div>
                  <Badge className={getCategoryColor(produto.categoria)}>
                    {produto.categoria}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quantidade</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {produto.quantidade} {produto.unidadeMedida}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Valor Unitário</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {produto.valor ? `R$ ${parseFloat(produto.valor).toFixed(2)}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Localização</p>
                    <p className="text-sm text-gray-800">{produto.localizacao || 'Não informado'}</p>
                  </div>
                </div>
                {produto.descricao && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">Descrição</p>
                    <p className="text-sm text-gray-700">{produto.descricao}</p>
                  </div>
                )}
                <div className="mt-4 text-xs text-gray-500">
                  Cadastrado em: {new Date(produto.dataCadastro).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredProdutos.length > 0 && (
        <div className="text-center text-sm text-gray-600 mt-6">
          Mostrando {filteredProdutos.length} de {produtos.length} produtos
        </div>
      )}
    </div>
  );
};

export default ProdutoList;
