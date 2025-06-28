
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, User, Package } from 'lucide-react';

interface Emprestimo {
  id: number;
  colaboradorId: string;
  produtoId: string;
  quantidade: string;
  dataEmprestimo: string;
  dataPrevistaDevolucao: string;
  observacoes: string;
  status: string;
  dataCadastro: string;
}

const EmprestimoList = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [filteredEmprestimos, setFilteredEmprestimos] = useState<Emprestimo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dataEmprestimo');
  const [produtos, setProdutos] = useState<any[]>([]);
  const [colaboradores, setColaboradores] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const savedEmprestimos = JSON.parse(localStorage.getItem('emprestimos') || '[]');
      const savedProdutos = JSON.parse(localStorage.getItem('produtos') || '[]');
      const savedColaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]');
      
      setEmprestimos(savedEmprestimos);
      setFilteredEmprestimos(savedEmprestimos);
      setProdutos(savedProdutos);
      setColaboradores(savedColaboradores);
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = emprestimos.filter(emprestimo => {
      const colaborador = colaboradores.find(c => c.id.toString() === emprestimo.colaboradorId);
      const produto = produtos.find(p => p.id.toString() === emprestimo.produtoId);
      
      return (
        (colaborador?.nome.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (produto?.nome.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        emprestimo.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'dataEmprestimo') return new Date(b.dataEmprestimo).getTime() - new Date(a.dataEmprestimo).getTime();
      if (sortBy === 'dataPrevistaDevolucao') return new Date(a.dataPrevistaDevolucao).getTime() - new Date(b.dataPrevistaDevolucao).getTime();
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    setFilteredEmprestimos(filtered);
  }, [emprestimos, searchTerm, sortBy, produtos, colaboradores]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ativo': 'bg-green-100 text-green-800',
      'devolvido': 'bg-blue-100 text-blue-800',
      'atrasado': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getColaboradorNome = (colaboradorId: string) => {
    const colaborador = colaboradores.find(c => c.id.toString() === colaboradorId);
    return colaborador?.nome || 'Colaborador não encontrado';
  };

  const getProdutoInfo = (produtoId: string) => {
    const produto = produtos.find(p => p.id.toString() === produtoId);
    return produto ? `${produto.codigo} - ${produto.nome}` : 'Produto não encontrado';
  };

  const isOverdue = (dataPrevista: string, status: string) => {
    if (status === 'devolvido' || !dataPrevista) return false;
    return new Date(dataPrevista) < new Date();
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Lista de Empréstimos</h3>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por colaborador, produto ou status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-64 bg-white/80">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dataEmprestimo">Ordenar por Data do Empréstimo</SelectItem>
            <SelectItem value="dataPrevistaDevolucao">Ordenar por Data de Devolução</SelectItem>
            <SelectItem value="status">Ordenar por Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Empréstimos */}
      <div className="grid gap-4">
        {filteredEmprestimos.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
                {emprestimos.length === 0 ? 'Nenhum empréstimo registrado ainda.' : 'Nenhum empréstimo encontrado com os filtros aplicados.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEmprestimos.map((emprestimo) => (
            <Card key={emprestimo.id} className={`bg-white/90 backdrop-blur-sm border-l-4 ${
              isOverdue(emprestimo.dataPrevistaDevolucao, emprestimo.status) 
                ? 'border-l-red-500' 
                : 'border-l-orange-500'
            } hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {getColaboradorNome(emprestimo.colaboradorId)}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Package className="w-4 h-4" />
                      {getProdutoInfo(emprestimo.produtoId)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(emprestimo.status)}>
                      {emprestimo.status}
                    </Badge>
                    {isOverdue(emprestimo.dataPrevistaDevolucao, emprestimo.status) && (
                      <Badge className="bg-red-100 text-red-800">
                        Atrasado
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quantidade</p>
                    <p className="text-lg font-semibold text-gray-800">{emprestimo.quantidade}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Data do Empréstimo
                    </p>
                    <p className="text-sm text-gray-800">
                      {new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Previsão de Devolução
                    </p>
                    <p className="text-sm text-gray-800">
                      {emprestimo.dataPrevistaDevolucao 
                        ? new Date(emprestimo.dataPrevistaDevolucao).toLocaleDateString('pt-BR')
                        : 'Não definida'
                      }
                    </p>
                  </div>
                </div>
                {emprestimo.observacoes && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">Observações</p>
                    <p className="text-sm text-gray-700">{emprestimo.observacoes}</p>
                  </div>
                )}
                <div className="mt-4 text-xs text-gray-500">
                  Registrado em: {new Date(emprestimo.dataCadastro).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredEmprestimos.length > 0 && (
        <div className="text-center text-sm text-gray-600 mt-6">
          Mostrando {filteredEmprestimos.length} de {emprestimos.length} empréstimos
        </div>
      )}
    </div>
  );
};

export default EmprestimoList;
