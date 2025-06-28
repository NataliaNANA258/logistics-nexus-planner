
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clipboard, Calendar, User, Activity } from 'lucide-react';

interface Atestado {
  id: number;
  colaboradorId: string;
  cid: string;
  descricaoDoenca: string;
  dataInicio: string;
  dataFim: string;
  diasAfastamento: string;
  medico: string;
  crm: string;
  hospital: string;
  observacoes: string;
  status: string;
  dataCadastro: string;
}

const AtestadoList = () => {
  const [atestados, setAtestados] = useState<Atestado[]>([]);
  const [filteredAtestados, setFilteredAtestados] = useState<Atestado[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('cid');
  const [colaboradores, setColaboradores] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const savedAtestados = JSON.parse(localStorage.getItem('atestados') || '[]');
      const savedColaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]');
      
      setAtestados(savedAtestados);
      setFilteredAtestados(savedAtestados);
      setColaboradores(savedColaboradores);
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = atestados.filter(atestado => {
      const colaborador = colaboradores.find(c => c.id.toString() === atestado.colaboradorId);
      
      return (
        (colaborador?.nome.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        atestado.cid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atestado.descricaoDoenca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atestado.medico.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'cid') return a.cid.localeCompare(b.cid);
      if (sortBy === 'dataInicio') return new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime();
      if (sortBy === 'diasAfastamento') return parseInt(b.diasAfastamento) - parseInt(a.diasAfastamento);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    setFilteredAtestados(filtered);
  }, [atestados, searchTerm, sortBy, colaboradores]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ativo': 'bg-green-100 text-green-800',
      'finalizado': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getColaboradorNome = (colaboradorId: string) => {
    const colaborador = colaboradores.find(c => c.id.toString() === colaboradorId);
    return colaborador?.nome || 'Colaborador não encontrado';
  };

  const isActive = (dataFim: string, status: string) => {
    if (status !== 'ativo') return false;
    return new Date(dataFim) >= new Date();
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clipboard className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Lista de Atestados Médicos</h3>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por colaborador, CID, doença ou médico..."
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
            <SelectItem value="cid">Ordenar por CID</SelectItem>
            <SelectItem value="dataInicio">Ordenar por Data de Início</SelectItem>
            <SelectItem value="diasAfastamento">Ordenar por Dias de Afastamento</SelectItem>
            <SelectItem value="status">Ordenar por Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Atestados */}
      <div className="grid gap-4">
        {filteredAtestados.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Clipboard className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
                {atestados.length === 0 ? 'Nenhum atestado registrado ainda.' : 'Nenhum atestado encontrado com os filtros aplicados.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAtestados.map((atestado) => (
            <Card key={atestado.id} className={`bg-white/90 backdrop-blur-sm border-l-4 ${
              isActive(atestado.dataFim, atestado.status) 
                ? 'border-l-green-500' 
                : 'border-l-purple-500'
            } hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {getColaboradorNome(atestado.colaboradorId)}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Activity className="w-4 h-4" />
                      CID: {atestado.cid} - {atestado.descricaoDoenca}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(atestado.status)}>
                      {atestado.status}
                    </Badge>
                    {isActive(atestado.dataFim, atestado.status) && (
                      <Badge className="bg-green-100 text-green-800">
                        Em vigor
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Período de Afastamento</p>
                    <p className="text-sm text-gray-800 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(atestado.dataInicio).toLocaleDateString('pt-BR')} a {new Date(atestado.dataFim).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-lg font-semibold text-blue-600">{atestado.diasAfastamento} dias</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Médico Responsável</p>
                    <p className="text-sm text-gray-800">{atestado.medico}</p>
                    {atestado.crm && (
                      <p className="text-xs text-gray-600">{atestado.crm}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Local</p>
                    <p className="text-sm text-gray-800">{atestado.hospital || 'Não informado'}</p>
                  </div>
                </div>
                {atestado.observacoes && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">Observações</p>
                    <p className="text-sm text-gray-700">{atestado.observacoes}</p>
                  </div>
                )}
                <div className="mt-4 text-xs text-gray-500">
                  Registrado em: {new Date(atestado.dataCadastro).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredAtestados.length > 0 && (
        <div className="text-center text-sm text-gray-600 mt-6">
          Mostrando {filteredAtestados.length} de {atestados.length} atestados
        </div>
      )}
    </div>
  );
};

export default AtestadoList;
