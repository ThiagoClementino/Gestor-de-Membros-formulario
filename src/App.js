import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Importando os componentes de cada etapa
import Step1 from './components/etapas/step1';
import Step2 from './components/etapas/step2';
import Step3 from './components/etapas/step3';
import Step4 from './components/etapas/step4';
import Step5 from './components/etapas/step5';

import ErrorFeedback from './ErrorFeedback';

// Importando os schemas de validação
import step1Schema from './components/Validation/step1Schema';
import step2Schema from './components/Validation/step2Schema';
import step3Schema from './components/Validation/step3Schema';
import step4Schema from './components/Validation/step4Schema';
import step5Schema from './components/Validation/step5Schema';

// Estilos globais para o formulário
import './index.css';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  // Função para selecionar o schema de validação com base na etapa atual
  const getValidationSchema = () => {
    switch (currentStep) {
      case 1: return step1Schema;
      case 2: return step2Schema;
      case 3: return step3Schema;
      case 4: return step4Schema;
      case 5: return step5Schema;
      default: return step1Schema;
    }
  };

  // Configuração do React Hook Form com o schema de validação dinâmico
  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
    defaultValues: formData,
    mode: 'onChange'
  });

  // Função para avançar para a próxima etapa
  const nextStep = async (data) => {
    const isValid = await methods.trigger();

    if (isValid) {
      const updatedData = { ...formData, ...data };
      setFormData(updatedData);

      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        methods.reset(updatedData);
      }
    }
  };

  // Função para voltar para a etapa anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Combinar os dados de todas as etapas
      const finalData = { ...formData, ...data };

      // Criar um objeto limpo para enviar ao backend
      const formattedData = {};

      // Copiar apenas campos com valores definidos (não undefined, não null, não string vazia)
      Object.keys(finalData).forEach(key => {
        if (finalData[key] !== undefined && finalData[key] !== null && finalData[key] !== '') {
          formattedData[key] = finalData[key];
        }
      });

      // Converter campos numéricos
      if (formattedData.qtdfilhos) {
        formattedData.qtdfilhos = parseInt(formattedData.qtdfilhos, 10);
      }

      if (formattedData.idadefilhoum) {
        formattedData.idadefilhoum = parseInt(formattedData.idadefilhoum, 10);
      }

      if (formattedData.idadefilhodois) {
        formattedData.idadefilhodois = parseInt(formattedData.idadefilhodois, 10);
      }

      if (formattedData.idadefilhotres) {
        formattedData.idadefilhotres = parseInt(formattedData.idadefilhotres, 10);
      }

      if (formattedData.idadefilhoquatro) {
        formattedData.idadefilhoquatro = parseInt(formattedData.idadefilhoquatro, 10);
      }

      // Converter campos de data do formato DD/MM/YYYY para YYYY-MM-DD
      const convertDateFormat = (dateStr) => {
        if (!dateStr || dateStr.includes('-')) return dateStr; // Já está no formato correto ou não é uma data

        const parts = dateStr.split('/');
        if (parts.length !== 3) return dateStr; // Não é uma data no formato DD/MM/YYYY

        return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
      };

      // Converter campos de data conhecidos
      if (formattedData.dateBirth) {
        formattedData.dateBirth = convertDateFormat(formattedData.dateBirth);
      }

      if (formattedData.databatismo) {
        formattedData.databatismo = convertDateFormat(formattedData.databatismo);
      }

      if (formattedData.dataconversao) {
        formattedData.dataconversao = convertDateFormat(formattedData.dataconversao);
      }

      console.log('Dados a serem enviados:', formattedData);

      // Resto do código permanece igual...


      // Enviando dados para a API
      const response = await fetch('https://api-gestao-igreja-jcod.vercel.app/membros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      // Tratamento de resposta unificado (removida a duplicação)
      if (!response.ok) {
        const responseText = await response.text();
        let errorMessage = `Erro ${response.status}: Problema ao cadastrar membro`;

        try {
          const errorData = JSON.parse(responseText);
          console.log('Detalhes do erro:', errorData);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          console.log('Resposta de erro (texto bruto):', responseText);
        }

        throw new Error(errorMessage);
      }

      // Processar resposta de sucesso
      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      console.log('Cadastro realizado com sucesso:', responseData);
      alert('Cadastro realizado com sucesso:')


      // Resetar o formulário após o envio bem-sucedido
      setIsSubmitted(true);
      setFormData({});
      setCurrentStep(1);
      methods.reset();

      setTimeout(() => {
        setIsSubmitted(false);
        // Recarregar a página após esconder a mensagem
        window.location.reload();
      }, 2000);

      // Mostrar mensagem de sucesso por 3 segundos e depois resetar
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      console.log(error);

      // Adiciona um estado de erro que poderia ser exibido na interface
      setFormError(error.message);
      <ErrorFeedback />
      alert(`Erro ao cadastrar membro: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar o componente da etapa atual
  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      case 5: return <Step5 />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl p-6 text-white">
        <h1 className="text-3xl font-bold text-center text-primary-500 mb-6">Cadastro de novos membros</h1>

        {/* Barra de progresso */}
        <div className="flex mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex-1 text-center py-2 ${currentStep === step
                ? 'bg-primary-500 text-white'
                : currentStep > step
                  ? 'bg-primary-700 text-white'
                  : 'bg-gray-700 text-gray-400'
                } ${step === 1 ? 'rounded-l-lg' : ''} ${step === 5 ? 'rounded-r-lg' : ''}`}
            >
              Etapa {step}
            </div>
          ))}
        </div>

        {/* Mensagem de sucesso */}
        {isSubmitted && (
          <div className="bg-green-800 text-white p-4 rounded mb-6 text-center">
            Formulário enviado com sucesso!
          </div>
        )}

        {/* Formulário */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(currentStep === 5 ? onSubmit : nextStep)}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Voltar
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors ml-auto"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-lg transition-colors ml-auto ${isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                    } text-white flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    'Cadastrar Membro'
                  )}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default App;
