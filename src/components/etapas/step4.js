import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step4 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="text-xl font-semibold mb-4">Vida Espiritual</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="problema" className="form-label">Você tem algum problema com a liderança da igreja?</label>
          <select
            id="problema"
            className="form-input w-full"
            {...register("problema")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.problema && (
            <p className="form-error">{errors.problema.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="exortacao" className="form-label">Você aceita ser exortado quando necessário?</label>
          <select
            id="exortacao"
            className="form-input w-full"
            {...register("exortacao")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.exortacao && (
            <p className="form-error">{errors.exortacao.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="discipulo" className="form-label">Você está disposto a ser discipulado?</label>
          <select
            id="discipulo"
            className="form-input w-full"
            {...register("discipulo")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.discipulo && (
            <p className="form-error">{errors.discipulo.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="cultosdeoracao" className="form-label">Você participa dos cultos de oração?</label>
          <select
            id="cultosdeoracao"
            className="form-input w-full"
            {...register("cultosdeoracao")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.cultosdeoracao && (
            <p className="form-error">{errors.cultosdeoracao.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="participacaocultos" className="form-label">Você participa de todos os cultos?</label>
          <select
            id="participacaocultos"
            className="form-input w-full"
            {...register("participacaocultos")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.participacaocultos && (
            <p className="form-error">{errors.participacaocultos.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="habito" className="form-label">Você tem o hábito de orar e ler a Bíblia?</label>
          <select
            id="habito"
            className="form-input w-full"
            {...register("habito")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.habito && (
            <p className="form-error">{errors.habito.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="aconselhamentopastoral" className="form-label">Você está disposto a receber aconselhamento pastoral?</label>
          <select
            id="aconselhamentopastoral"
            className="form-input w-full"
            {...register("aconselhamentopastoral")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.aconselhamentopastoral && (
            <p className="form-error">{errors.aconselhamentopastoral.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="desenvolvimento" className="form-label">Você está disposto a se desenvolver na igreja?</label>
          <select
            id="desenvolvimento"
            className="form-input w-full"
            {...register("desenvolvimento")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.desenvolvimento && (
            <p className="form-error">{errors.desenvolvimento.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step4;
