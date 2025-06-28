
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText } from 'lucide-react';

interface Produto {
  id: number;
  nome: string;
  codigo: string;
}

interface Colaborador {
  id: number;
  nome: string;
}

const EmprestimoForm = () => {
  const [emprestimo, setEmprestimo] = useState({
    colaboradorId: '',
    produtoId: '',
    quantidade: '',
    dataEmprestimo: '',
    dataPrevistaDevolucao: '',
    observacoes: '',
    status: 'ativo'
  });

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  useEffect(() => {
    // Carregar produtos e colaboradores do localStorage
    const savedProdutos = JSON.parse(localStorage.getItem('produtos') || '[]');
    const savedColaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]');
    setProdutos(savedProdutos);
    setColaboradores(savedColaboradores);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emprestimos = JSON.parse(localStorage.getItem('emprestimos') || '[]');
    const novoEmprestimo = {
      ...emprestimo,
      id: Date.now(),
      dataCadastro: new Date().toISOString()
    };
    emprestimos.push(novoEmprestimo);
    localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
    
    toast.success("Empréstimo registrado com sucesso!");
    
    setEmprestimo({
      colaboradorId: '',
      produtoId: '',
      quantidade: '',
      dataEmprestimo: '',
      dataPrevistaDevolucao: '',
      observacoes: '',
      status: 'ativo'
    });
  };

  const handleChange = (field: string, value: string) => {
    setEmprestimo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Registro de Empréstimo</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="colaboradorId">Colaborador *</Label>
          <Select value={emprestimo.colaboradorId} onValueChange={(value) => handleChange('colaboradorId', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o colaborador" />
            </SelectTrigger>
            <SelectContent>
              {colaboradores.map((colaborador) => (
                <SelectItem key={colaborador.id} value={colaborador.id.toString()}>
                  {colaborador.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="produtoId">Produto *</Label>
          <Select value={emprestimo.produtoId} onValueChange={(value) => handleChange('produtoId', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o produto" />
            </SelectTrigger>
            <SelectContent>
              {produtos.map((produto) => (
                <SelectItem key={produto.id} value={produto.id.toString()}>
                  {produto.codigo} - {produto.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantidade">Quantidade *</Label>
          <Input
            id="quantidade"
            type="number"
            value={emprestimo.quantidade}
            onChange={(e) => handleChange('quantidade', e.target.value)}
            placeholder="1"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={emprestimo.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="devolvido">Devolvido</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dataEmprestimo">Data do Empréstimo *</Label>
          <Input
            id="dataEmprestimo"
            type="date"
            value={emprestimo.dataEmprestimo}
            onChange={(e) => handleChange('dataEmprestimo', e.target.value)}
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="dataPrevistaDevolucao">Data Prevista para Devolução</Label>
          <Input
            id="dataPrevistaDevolucao"
            type="date"
            value={emprestimo.dataPrevistaDevolucao}
            onChange={(e) => handleChange('dataPrevistaDevolucao', e.target.value)}
            className="bg-white/80"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={emprestimo.observacoes}
            onChange={(e) => handleChange('observacoes', e.target.value)}
            placeholder="Observações sobre o empréstimo..."
            className="bg-white/80"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Registrar Empréstimo
      </Button>
    </form>
  );
};

export default EmprestimoForm;
