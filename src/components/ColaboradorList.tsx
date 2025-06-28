
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Calendar, Briefcase } from 'lucide-react';

interface Colaborador {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  endereco: string;
  cargo: string;
  setor: string;
  dataAdmissao: string;
  salario: string;
  status: string;
  dataCadastro: string;
}

const ColaboradorList = () => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [filteredColaboradores, setFilteredColaboradores] = useState<Colaborador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nome');

  useEffect(() => {
    const loadColaboradores = () => {
      const savedColaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]');
      setColaboradores(savedColaboradores);
      setFilteredColaboradores(savedColaboradores);
    };
    loadColaboradores();
  }, []);

  useEffect(() => {
    let filtered = colaboradores.filter(colaborador =>
      colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.setor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'nome') return a.nome.localeCompare(b.nome);
      if (sortBy === 'dataNascimento') return new Date(a.dataNascimento).getTime() - new Date(b.dataNascimento).getTime();
      if (sortBy === 'dataAdmissao') return new Date(b.dataAdmissao).getTime() - new Date(a.dataAdmissao).getTime();
      if (sortBy === 'cargo') return a.cargo.localeCompare(b.cargo);
      return 0;
    });

    setFilteredColaboradores(filtered);
  }, [colaboradores, searchTerm, sortBy]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ativo': 'bg-green-100 text-green-800',
      'inativo': 'bg-red-100 text-red-800',
      'afastado': 'bg-yellow-100 text-yellow-800',
      'ferias': 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Lista de Colaboradores</h3>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nome, cargo ou setor..."
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
            <SelectItem value="nome">Ordenar por Nome</SelectItem>
            <SelectItem value="dataNascimento">Ordenar por Data de Nascimento</SelectItem>
            <SelectItem value="dataAdmissao">Ordenar por Data de Admissão</SelectItem>
            <SelectItem value="cargo">Ordenar por Cargo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Colaboradores */}
      <div className="grid gap-4">
        {filteredColaboradores.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Users className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
                {colaboradores.length === 0 ? 'Nenhum colaborador cadastrado ainda.' : 'Nenhum colaborador encontrado com os filtros aplicados.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredColaboradores.map((colaborador) => (
            <Card key={colaborador.id} className="bg-white/90 backdrop-blur-sm border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800">{colaborador.nome}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {colaborador.cargo} - {colaborador.setor}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(colaborador.status)}>
                    {colaborador.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Informações Pessoais</p>
                    <p className="text-sm text-gray-800">CPF: {colaborador.cpf}</p>
                    <p className="text-sm text-gray-800 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {calculateAge(colaborador.dataNascimento)} anos
                    </p>
                    {colaborador.telefone && (
                      <p className="text-sm text-gray-800">Tel: {colaborador.telefone}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contato</p>
                    {colaborador.email && (
                      <p className="text-sm text-gray-800">{colaborador.email}</p>
                    )}
                    {colaborador.endereco && (
                      <p className="text-xs text-gray-600">{colaborador.endereco}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dados Profissionais</p>
                    <p className="text-sm text-gray-800">
                      Admissão: {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}
                    </p>
                    {colaborador.salario && (
                      <p className="text-sm text-gray-800">
                        Salário: R$ {parseFloat(colaborador.salario).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Cadastrado em: {new Date(colaborador.dataCadastro).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredColaboradores.length > 0 && (
        <div className="text-center text-sm text-gray-600 mt-6">
          Mostrando {filteredColaboradores.length} de {colaboradores.length} colaboradores
        </div>
      )}
    </div>
  );
};

export default ColaboradorList;
