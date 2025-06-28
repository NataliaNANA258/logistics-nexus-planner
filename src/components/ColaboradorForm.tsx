
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users } from 'lucide-react';

const ColaboradorForm = () => {
  const [colaborador, setColaborador] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    endereco: '',
    cargo: '',
    setor: '',
    dataAdmissao: '',
    salario: '',
    status: 'ativo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const colaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]');
    const novoColaborador = {
      ...colaborador,
      id: Date.now(),
      dataCadastro: new Date().toISOString()
    };
    colaboradores.push(novoColaborador);
    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
    
    toast.success("Colaborador cadastrado com sucesso!");
    
    setColaborador({
      nome: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      endereco: '',
      cargo: '',
      setor: '',
      dataAdmissao: '',
      salario: '',
      status: 'ativo'
    });
  };

  const handleChange = (field: string, value: string) => {
    setColaborador(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Cadastro de Colaborador</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input
            id="nome"
            value={colaborador.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="Ex: João Silva Santos"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={colaborador.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            value={colaborador.rg}
            onChange={(e) => handleChange('rg', e.target.value)}
            placeholder="00.000.000-0"
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={colaborador.dataNascimento}
            onChange={(e) => handleChange('dataNascimento', e.target.value)}
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={colaborador.telefone}
            onChange={(e) => handleChange('telefone', e.target.value)}
            placeholder="(11) 99999-9999"
            className="bg-white/80"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={colaborador.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="joao@empresa.com"
            className="bg-white/80"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            value={colaborador.endereco}
            onChange={(e) => handleChange('endereco', e.target.value)}
            placeholder="Rua, número, bairro, cidade - UF"
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="cargo">Cargo *</Label>
          <Select value={colaborador.cargo} onValueChange={(value) => handleChange('cargo', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gerente">Gerente</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="analista">Analista</SelectItem>
              <SelectItem value="assistente">Assistente</SelectItem>
              <SelectItem value="operador">Operador</SelectItem>
              <SelectItem value="tecnico">Técnico</SelectItem>
              <SelectItem value="auxiliar">Auxiliar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="setor">Setor *</Label>
          <Select value={colaborador.setor} onValueChange={(value) => handleChange('setor', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="administracao">Administração</SelectItem>
              <SelectItem value="logistica">Logística</SelectItem>
              <SelectItem value="vendas">Vendas</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
              <SelectItem value="ti">Tecnologia da Informação</SelectItem>
              <SelectItem value="producao">Produção</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
          <Input
            id="dataAdmissao"
            type="date"
            value={colaborador.dataAdmissao}
            onChange={(e) => handleChange('dataAdmissao', e.target.value)}
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="salario">Salário (R$)</Label>
          <Input
            id="salario"
            type="number"
            step="0.01"
            value={colaborador.salario}
            onChange={(e) => handleChange('salario', e.target.value)}
            placeholder="0,00"
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="status">Status *</Label>
          <Select value={colaborador.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="afastado">Afastado</SelectItem>
              <SelectItem value="ferias">Férias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Cadastrar Colaborador
      </Button>
    </form>
  );
};

export default ColaboradorForm;
