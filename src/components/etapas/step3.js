import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IMaskInput } from "react-imask";

const Step3 = () => {
  const { register, setValue, formState: { errors }, watch } = useFormContext();

  const watchCargoAnterior = watch("cargoanterior");
  const watchSeparadoAnterior = watch("separadoanterior");

  return (
    <div className="form-step">
      <h2 className="text-xl font-semibold mb-4">Histórico Eclesiástico</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        <div className="mb-4">
          <label htmlFor="dataconversao" className="form-label">Data de conversão</label>
          <IMaskInput
            id="dataconversao"
            className="form-input w-full"
            type="text"
            placeholder="DD/MM/AAAA"
            mask="00/00/0000"
            {...register("dataconversao")}
            onAccept={(value) => setValue("dataconversao", value, { shouldValidate: true })}
          />
          {errors.dataconversao && (
            <p className="form-error">{errors.dataconversao.message}</p>
          )}
        </div>

  

         <div className="mb-4">
          <label htmlFor="databatismo" className="form-label">Data de batismo nas águas</label>
          <IMaskInput
            id="databatismo"
            className="form-input w-full"
            type='text'
            placeholder="DD/MM/AAAA"
            mask="00/00/0000"
            {...register("databatismo")}
            onAccept={(value) => setValue("databatismo", value, { shouldValidate: true })}
          />
          {errors.databatismo && (
            <p className="form-error">{errors.databatismo.message}</p>
          )}
        </div>

        <div className="mb-4 md:col-span-2">
          <label htmlFor="lastchurch" className="form-label">Nome da última igreja</label>
          <input
            id="lastchurch"
            type="text"
            className="form-input w-full"
            placeholder="Nome da igreja"
            {...register("lastchurch")}
          />
          {errors.lastchurch && (
            <p className="form-error">{errors.lastchurch.message}</p>
          )}
        </div>

        <div className="mb-4 md:col-span-2">
          <label htmlFor="motivosaida" className="form-label">Motivo da saída</label>
          <textarea
            id="motivosaida"
            className="form-input w-full h-32"
            placeholder="Descreva o motivo da sua saída"
            {...register("motivosaida")}
          ></textarea>
          {errors.motivosaida && (
            <p className="form-error">{errors.motivosaida.message}</p>
          )}
        </div>

        <div className="mb-4 md:col-span-2">
          <label htmlFor="igrejasquefoimembro" className="form-label">Igrejas que você foi membro</label>
          <textarea
            id="igrejasquefoimembro"
            className="form-input w-full h-32"
            placeholder="Liste as igrejas"
            {...register("igrejasquefoimembro")}
          ></textarea>
          {errors.igrejasquefoimembro && (
            <p className="form-error">{errors.igrejasquefoimembro.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="dizimista" className="form-label">Você é dizimista fiel?</label>
          <select
            id="dizimista"
            className="form-input w-full"
            {...register("dizimista")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.dizimista && (
            <p className="form-error">{errors.dizimista.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="ofertante" className="form-label">Você é ofertante fiel?</label>
          <select
            id="ofertante"
            className="form-input w-full"
            {...register("ofertante")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.ofertante && (
            <p className="form-error">{errors.ofertante.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="cargoanterior" className="form-label">Exerceu algum cargo de liderança?</label>
          <select
            id="cargoanterior"
            className="form-input w-full"
            {...register("cargoanterior")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.cargoanterior && (
            <p className="form-error">{errors.cargoanterior.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="separadoanterior" className="form-label">Foi separado/consagrado?</label>
          <select
            id="separadoanterior"
            className="form-input w-full"
            {...register("separadoanterior")}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          {errors.separadoanterior && (
            <p className="form-error">{errors.separadoanterior.message}</p>
          )}
        </div>

        {(watchCargoAnterior === "sim" || watchSeparadoAnterior === "sim") && (
          <div className="mb-4 md:col-span-2">
            <label htmlFor="posicaoanterior" className="form-label">Qual era sua posição?</label>
            <input
              id="posicaoanterior"
              type="text"
              className="form-input w-full"
              placeholder="Descreva sua posição"
              {...register("posicaoanterior")}
            />
            {errors.posicaoanterior && (
              <p className="form-error">{errors.posicaoanterior.message}</p>
            )}
          </div>
        )}

        {watchCargoAnterior === "sim" && (
          <div className="mb-4 md:col-span-2">
            <label htmlFor="atividadeanterior" className="form-label">Descreva suas atividades</label>
            <textarea
              id="atividadeanterior"
              className="form-input w-full h-32"
              placeholder="Descreva suas atividades anteriores"
              {...register("atividadeanterior")}
            ></textarea>
            {errors.atividadeanterior && (
              <p className="form-error">{errors.atividadeanterior.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
