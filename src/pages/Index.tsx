
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Users, FileText, Clipboard, Plus, Search } from 'lucide-react';
import ProdutoForm from '@/components/ProdutoForm';
import ColaboradorForm from '@/components/ColaboradorForm';
import EmprestimoForm from '@/components/EmprestimoForm';
import AtestadoForm from '@/components/AtestadoForm';
import ProdutoList from '@/components/ProdutoList';
import ColaboradorList from '@/components/ColaboradorList';
import EmprestimoList from '@/components/EmprestimoList';
import AtestadoList from '@/components/AtestadoList';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            Sistema de Logística
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Gerencie produtos, colaboradores, empréstimos e atestados médicos de forma eficiente
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Clipboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="produtos" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="colaboradores" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Colaboradores
            </TabsTrigger>
            <TabsTrigger value="emprestimos" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Empréstimos
            </TabsTrigger>
            <TabsTrigger value="atestados" className="flex items-center gap-2">
              <Clipboard className="w-4 h-4" />
              Atestados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="produtos">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Gerenciar Produtos
                  </CardTitle>
                  <CardDescription>
                    Cadastre e gerencie produtos do estoque
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cadastro" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
                      <TabsTrigger value="listar">Listar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cadastro">
                      <ProdutoForm />
                    </TabsContent>
                    <TabsContent value="listar">
                      <ProdutoList />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="colaboradores">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Gerenciar Colaboradores
                  </CardTitle>
                  <CardDescription>
                    Cadastre e gerencie informações dos colaboradores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cadastro" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
                      <TabsTrigger value="listar">Listar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cadastro">
                      <ColaboradorForm />
                    </TabsContent>
                    <TabsContent value="listar">
                      <ColaboradorList />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emprestimos">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Gerenciar Empréstimos
                  </CardTitle>
                  <CardDescription>
                    Registre empréstimos de materiais para colaboradores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cadastro" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cadastro">Registrar</TabsTrigger>
                      <TabsTrigger value="listar">Listar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cadastro">
                      <EmprestimoForm />
                    </TabsContent>
                    <TabsContent value="listar">
                      <EmprestimoList />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="atestados">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clipboard className="w-5 h-5 text-blue-600" />
                    Gerenciar Atestados
                  </CardTitle>
                  <CardDescription>
                    Registre e acompanhe atestados médicos dos colaboradores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cadastro" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cadastro">Registrar</TabsTrigger>
                      <TabsTrigger value="listar">Listar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cadastro">
                      <AtestadoForm />
                    </TabsContent>
                    <TabsContent value="listar">
                      <AtestadoList />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
