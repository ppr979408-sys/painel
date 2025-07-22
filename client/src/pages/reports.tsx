import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Eye, FileText, Calendar } from "lucide-react";

export default function ReportsPage() {
  const { user } = useAuth();
  const [reportType, setReportType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("pdf");

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log("Generating report:", { reportType, startDate, endDate, format });
  };

  const recentReports = [
    {
      id: 1,
      title: "Relatório de Vendas - Janeiro 2024",
      date: "15/01/2024 às 14:30",
      description: "Contém análise completa de vendas, produtos e margens",
      type: "pdf",
      icon: FileText,
      color: "text-red-600 bg-red-100"
    },
    {
      id: 2,
      title: "Produtos Mais Vendidos - Dezembro 2023",
      date: "02/01/2024 às 09:15",
      description: "Lista detalhada dos produtos mais vendidos no período",
      type: "excel",
      icon: FileText,
      color: "text-green-600 bg-green-100"
    },
    {
      id: 3,
      title: "Análise de Margem - Novembro 2023",
      date: "28/11/2023 às 16:45",
      description: "Relatório completo de margens por categoria e produto",
      type: "pdf",
      icon: FileText,
      color: "text-blue-600 bg-blue-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Relatórios" />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Relatórios</h2>
            <p className="text-gray-600">Gere relatórios detalhados para análise</p>
          </div>

          {/* Report Generator */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Gerar Novo Relatório
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="reportType">Tipo de Relatório</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Vendas Completas</SelectItem>
                      <SelectItem value="products">Produtos Mais Vendidos</SelectItem>
                      <SelectItem value="margins">Análise de Margem</SelectItem>
                      <SelectItem value="category">Performance por Categoria</SelectItem>
                      <SelectItem value="financial">Relatório Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="startDate">Data Inicial</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">Data Final</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="format">Formato</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={handleGenerateReport}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Gerar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Gerados Recentemente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => {
                  const IconComponent = report.icon;
                  return (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-4 ${report.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600">Gerado em {report.date}</p>
                          <p className="text-sm text-gray-500">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Visualizar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
