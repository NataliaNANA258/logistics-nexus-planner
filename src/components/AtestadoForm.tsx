
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Clipboard } from 'lucide-react';

interface Colaborador {
  id: number;
  nome: string;
}

const AtestadoForm = () => {
  const [atestado, setAtestado] = useState({
    colaboradorId: '',
    cid: '',
    descricaoDoenca: '',
    dataInicio: '',
    dataFim: '',
    diasAfastamento: '',
    medico: '',
    crm: '',
    hospital: '',
    observacoes: '',
    status: 'ativo'
  });

  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  useEffect(() => {
    const savedColaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]');
    setColaboradores(savedColaboradores);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const atestados = JSON.parse(localStorage.getItem('atestados') || '[]');
    const novoAtestado = {
      ...atestado,
      id: Date.now(),
      dataCadastro: new Date().toISOString()
    };
    atestados.push(novoAtestado);
    localStorage.setItem('atestados', JSON.stringify(atestados));
    
    toast.success("Atestado registrado com sucesso!");
    
    setAtestado({
      colaboradorId: '',
      cid: '',
      descricaoDoenca: '',
      dataInicio: '',
      dataFim: '',
      diasAfastamento: '',
      medico: '',
      crm: '',
      hospital: '',
      observacoes: '',
      status: 'ativo'
    });
  };

  const handleChange = (field: string, value: string) => {
    setAtestado(prev => ({ ...prev, [field]: value }));
    
    // Calcular dias de afastamento automaticamente
    if (field === 'dataInicio' || field === 'dataFim') {
      const dataInicio = field === 'dataInicio' ? value : atestado.dataInicio;
      const dataFim = field === 'dataFim' ? value : atestado.dataFim;
      
      if (dataInicio && dataFim) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffTime = Math.abs(fim.getTime() - inicio.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setAtestado(prev => ({ ...prev, diasAfastamento: diffDays.toString() }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clipboard className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Registro de Atestado Médico</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="colaboradorId">Colaborador *</Label>
          <Select value={atestado.colaboradorId} onValueChange={(value) => handleChange('colaboradorId', value)}>
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
          <Label htmlFor="cid">CID (Código Internacional de Doenças) *</Label>
          <Input
            id="cid"
            value={atestado.cid}
            onChange={(e) => handleChange('cid', e.target.value.toUpperCase())}
            placeholder="Ex: M54.5"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="descricaoDoenca">Descrição da Doença *</Label>
          <Input
            id="descricaoDoenca"
            value={atestado.descricaoDoenca}
            onChange={(e) => handleChange('descricaoDoenca', e.target.value)}
            placeholder="Ex: Lombalgia"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="dataInicio">Data de Início do Afastamento *</Label>
          <Input
            id="dataInicio"
            type="date"
            value={atestado.dataInicio}
            onChange={(e) => handleChange('dataInicio', e.target.value)}
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="dataFim">Data de Fim do Afastamento *</Label>
          <Input
            id="dataFim"
            type="date"
            value={atestado.dataFim}
            onChange={(e) => handleChange('dataFim', e.target.value)}
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="diasAfastamento">Dias de Afastamento</Label>
          <Input
            id="diasAfastamento"
            type="number"
            value={atestado.diasAfastamento}
            onChange={(e) => handleChange('diasAfastamento', e.target.value)}
            placeholder="Calculado automaticamente"
            className="bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <Label htmlFor="medico">Nome do Médico *</Label>
          <Input
            id="medico"
            value={atestado.medico}
            onChange={(e) => handleChange('medico', e.target.value)}
            placeholder="Dr. João Silva"
            required
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="crm">CRM do Médico</Label>
          <Input
            id="crm"
            value={atestado.crm}
            onChange={(e) => handleChange('crm', e.target.value)}
            placeholder="CRM/SP 123456"
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="hospital">Hospital/Clínica</Label>
          <Input
            id="hospital"
            value={atestado.hospital}
            onChange={(e) => handleChange('hospital', e.target.value)}
            placeholder="Hospital São Paulo"
            className="bg-white/80"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={atestado.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger className="bg-white/80">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={atestado.observacoes}
            onChange={(e) => handleChange('observacoes', e.target.value)}
            placeholder="Observações adicionais sobre o atestado..."
            className="bg-white/80"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Registrar Atestado
      </Button>
    </form>
  );
};

export default AtestadoForm;
