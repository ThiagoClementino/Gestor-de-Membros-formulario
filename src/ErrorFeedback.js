// Componente para mostrar feedback de erro mais completo
import React from 'react';

const ErrorFeedback = ({ error, onClose }) => {
  return (
    <div className="bg-red-800 text-white p-4 rounded mb-6 relative">
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 text-white"
        aria-label="Fechar"
      >
        ×
      </button>
      <h3 className="font-bold text-lg mb-2">Erro ao cadastrar membro</h3>
      <p>{error}</p>
      <p className="mt-2 text-sm">
        Por favor, verifique os dados e tente novamente. Se o problema persistir, 
        entre em contato com o suporte técnico.
      </p>
    </div>
  );
};

export default ErrorFeedback;