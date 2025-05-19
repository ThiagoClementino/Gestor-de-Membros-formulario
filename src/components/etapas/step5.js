import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step5 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="text-xl font-semibold mb-4">Conhecimento Teológico</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="mb-4">
          <label htmlFor="conviccaodiscipulo" className="form-label">Qual sua convicção sobre ser discípulo de Jesus?</label>
          <textarea
            id="conviccaodiscipulo"
            className="form-input w-full h-32"
            placeholder="Descreva sua convicção"
            {...register("conviccaodiscipulo")}
          ></textarea>
          {errors.conviccaodiscipulo && (
            <p className="form-error">{errors.conviccaodiscipulo.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="definicaoevangelho" className="form-label">Como você define o evangelho?</label>
          <textarea
            id="definicaoevangelho"
            className="form-input w-full h-32"
            placeholder="Defina o evangelho"
            {...register("definicaoevangelho")}
          ></textarea>
          {errors.definicaoevangelho && (
            <p className="form-error">{errors.definicaoevangelho.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="frutosespirito" className="form-label">Quais são os frutos do Espírito?</label>
          <textarea
            id="frutosespirito"
            className="form-input w-full h-32"
            placeholder="Liste os frutos do Espírito"
            {...register("frutosespirito")}
          ></textarea>
          {errors.frutosespirito && (
            <p className="form-error">{errors.frutosespirito.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="desenvolvimentodafe" className="form-label">Como você cuida do desenvolvimento da sua fé?</label>
          <textarea
            id="desenvolvimentodafe"
            className="form-input w-full h-32"
            placeholder="Descreva como cuida da sua fé"
            {...register("desenvolvimentodafe")}
          ></textarea>
          {errors.desenvolvimentodafe && (
            <p className="form-error">{errors.desenvolvimentodafe.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="pecado" className="form-label">Você tem cometido algum pecado recentemente?</label>
          <textarea
            id="pecado"
            className="form-input w-full h-32"
            placeholder="Responda sobre pecados recentes"
            {...register("pecado")}
          ></textarea>
          {errors.pecado && (
            <p className="form-error">{errors.pecado.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="conviccaoteologica" className="form-label">Quais são suas convicções teológicas?</label>
          <textarea
            id="conviccaoteologica"
            className="form-input w-full h-32"
            placeholder="Liste suas convicções teológicas"
            {...register("conviccaoteologica")}
          ></textarea>
          {errors.conviccaoteologica && (
            <p className="form-error">{errors.conviccaoteologica.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="evangelizar" className="form-label">Você evangeliza?</label>
          <select
            id="evangelizar"
            className="form-input w-full"
            {...register("evangelizar")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.evangelizar && (
            <p className="form-error">{errors.evangelizar.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="jejuar" className="form-label">Você jejua?</label>
          <select
            id="jejuar"
            className="form-input w-full"
            {...register("jejuar")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.jejuar && (
            <p className="form-error">{errors.jejuar.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="leiturabiblica" className="form-label">Você lê a Bíblia regularmente?</label>
          <select
            id="leiturabiblica"
            className="form-input w-full"
            {...register("leiturabiblica")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.leiturabiblica && (
            <p className="form-error">{errors.leiturabiblica.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="mb-4">
          <label htmlFor="livros" className="form-label">Quais foram os últimos livros que você leu?</label>
          <textarea
            id="livros"
            className="form-input w-full h-32"
            placeholder="Liste os últimos livros lidos"
            {...register("livros")}
          ></textarea>
          {errors.livros && (
            <p className="form-error">{errors.livros.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="ultimasconsideracoes" className="form-label">Considerações finais</label>
          <textarea
            id="ultimasconsideracoes"
            className="form-input w-full h-32"
            placeholder="Adicione suas considerações finais"
            {...register("ultimasconsideracoes")}
          ></textarea>
          {errors.ultimasconsideracoes && (
            <p className="form-error">{errors.ultimasconsideracoes.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step5;
