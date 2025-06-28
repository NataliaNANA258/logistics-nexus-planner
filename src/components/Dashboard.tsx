
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, FileText, Clipboard, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Produtos Cadastrados",
      value: "85",
      description: "Total de produtos no estoque",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Colaboradores Ativos",
      value: "42",
      description: "Funcionários registrados",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Empréstimos Ativos",
      value: "12",
      description: "Materiais emprestados",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Atestados do Mês",
      value: "8",
      description: "Atestados médicos registrados",
      icon: Clipboard,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const recentActivities = [
    { type: "produto", description: "Novo produto cadastrado: Notebook Dell", time: "2 horas atrás" },
    { type: "emprestimo", description: "Empréstimo registrado para João Silva", time: "4 horas atrás" },
    { type: "atestado", description: "Atestado médico de Maria Santos", time: "1 dia atrás" },
    { type: "colaborador", description: "Novo colaborador: Pedro Costa", time: "2 dias atrás" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas movimentações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Informações do Sistema
            </CardTitle>
            <CardDescription>
              Detalhes sobre as entidades e relacionamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Entidades Principais:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Produtos (código, nome, descrição, quantidade)</li>
                  <li>• Colaboradores (dados pessoais e profissionais)</li>
                  <li>• Empréstimos (controle de materiais)</li>
                  <li>• Atestados (registro médico com CID)</li>
                </ul>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Relacionamentos:</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Colaborador → Empréstimo (1:N)</li>
                  <li>• Produto → Empréstimo (1:N)</li>
                  <li>• Colaborador → Atestado (1:N)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
