import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2 = () => {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  
  // Observando os valores dos campos para controle condicional
  const watchEstadoCivil = watch("estadocivil");
  const watchFilhos = watch("filhos");
  const watchQtdFilhos = watch("qtdfilhos");
  const watchParceiroIgreja = watch("parceironaigreja");

  // Efeito para resetar campos quando o estado civil não for "Casado"
  React.useEffect(() => {
    if (watchEstadoCivil !== "Casado") {
      setValue("conjuge", "");
      setValue("optionprimeirocasamento", "");
      setValue("casamentocristao", "");
      setValue("parceironaigreja", "");
      setValue("justificativa", "");
    }
  }, [watchEstadoCivil, setValue]);

  // Efeito para resetar campos quando "Possui Filhos" for "Não"
  React.useEffect(() => {
    if (watchFilhos === "Nao") {
      setValue("qtdfilhos", "0");
      setValue("nomefilhoum", "");
      setValue("idadefilhoum", "");
      setValue("nomefilhodois", "");
      setValue("idadefilhodois", "");
      setValue("nomefilhotres", "");
      setValue("idadefilhotres", "");
      setValue("nomefilhoquatro", "");
      setValue("idadefilhoquatro", "");
    }
  }, [watchFilhos, setValue]);

  // Efeito para resetar campos de filhos com base na quantidade selecionada
  React.useEffect(() => {
    const qtdFilhos = parseInt(watchQtdFilhos, 10);
    
    // Resetar campos de filhos que não devem ser exibidos
    if (qtdFilhos < 2 || isNaN(qtdFilhos)) {
      setValue("nomefilhodois", "");
      setValue("idadefilhodois", "");
    }
    
    if (qtdFilhos < 3 || isNaN(qtdFilhos)) {
      setValue("nomefilhotres", "");
      setValue("idadefilhotres", "");
    }
    
    if (qtdFilhos < 4 || isNaN(qtdFilhos)) {
      setValue("nomefilhoquatro", "");
      setValue("idadefilhoquatro", "");
    }
    
    // Se for maior que 4, resetar todos os campos de filhos
    if (qtdFilhos > 4) {
      setValue("nomefilhoum", "");
      setValue("idadefilhoum", "");
      setValue("nomefilhodois", "");
      setValue("idadefilhodois", "");
      setValue("nomefilhotres", "");
      setValue("idadefilhotres", "");
      setValue("nomefilhoquatro", "");
      setValue("idadefilhoquatro", "");
    }
  }, [watchQtdFilhos, setValue]);

  // Efeito para resetar justificativa quando parceiro na igreja for "sim"
  React.useEffect(() => {
    if (watchParceiroIgreja !== "nao") {
      setValue("justificativa", "");
    }
  }, [watchParceiroIgreja, setValue]);

  return (
    <div className="form-step">
      <h2 className="text-xl font-semibold mb-4">Relacionamento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="estadocivil" className="form-label">Estado Civil</label>
          <select
            id="estadocivil"
            className="form-input w-full"
            {...register("estadocivil", { required: "Por favor, selecione seu estado civil." })}
          >
            <option value="">Selecione</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
          </select>
          {errors.estadocivil && (
            <p className="form-error">{errors.estadocivil.message}</p>
          )}
        </div>
        
        {/* Campo Nome do Cônjuge - exibido apenas se estado civil for "Casado" */}
        {watchEstadoCivil === "Casado" && (
          <div className="mb-4">
            <label htmlFor="conjuge" className="form-label">Nome do Cônjuge</label>
            <input
              id="conjuge"
              type="text"
              className="form-input w-full"
              placeholder="Digite o nome do cônjuge"
              {...register("conjuge", { 
                required: watchEstadoCivil === "Casado" ? "Por favor, digite o nome do seu cônjuge." : false 
              })}
            />
            {errors.conjuge && (
              <p className="form-error">{errors.conjuge.message}</p>
            )}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="filhos" className="form-label">Possui Filhos</label>
          <select
            id="filhos"
            className="form-input w-full"
            {...register("filhos", { required: "Por favor, selecione se possui filhos." })}
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Nao">Não</option>
          </select>
          {errors.filhos && (
            <p className="form-error">{errors.filhos.message}</p>
          )}
        </div>

        {/* Campo Quantidade de filhos - exibido apenas se possui filhos for "Sim" */}
        {watchFilhos === "Sim" && (
          <div className="mb-4">
            <label htmlFor="qtdfilhos" className="form-label">Quantidade de filhos</label>
            <select
              id="qtdfilhos"
              className="form-input w-full"
              {...register("qtdfilhos", { 
                required: watchFilhos === "Sim" ? "Por favor, selecione a quantidade de filhos." : false 
              })}
            >
              <option value="0">Selecione</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="acima de quatro">Acima de quatro</option>
            </select>
            {errors.qtdfilhos && (
              <p className="form-error">{errors.qtdfilhos.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Dados dos filhos - exibidos com base na quantidade selecionada */}
      {watchFilhos === "Sim" && parseInt(watchQtdFilhos, 10) > 0 && parseInt(watchQtdFilhos, 10) <= 4 && (
        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-white">Dados dos filhos</h3>
          
          {/* Dados do primeiro filho - exibido se quantidade >= 1 */}
          {parseInt(watchQtdFilhos, 10) >= 1 && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-white">Dados do primeiro filho</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="nomefilhoum" className="form-label text-white">Nome</label>
                  <input
                    id="nomefilhoum"
                    type="text"
                    className="form-input w-full"
                    placeholder="Digite o nome do filho"
                    {...register("nomefilhoum", { 
                      required: parseInt(watchQtdFilhos, 10) >= 1 ? "Por favor, digite o nome do primeiro filho." : false 
                    })}
                  />
                  {errors.nomefilhoum && (
                    <p className="form-error">{errors.nomefilhoum.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="idadefilhoum" className="form-label text-white">Idade</label>
                  <input
                    id="idadefilhoum"
                    type="number"
                    className="form-input w-full"
                    placeholder="Idade"
                    {...register("idadefilhoum", { 
                      required: parseInt(watchQtdFilhos, 10) >= 1 ? "Por favor, digite a idade do primeiro filho." : false 
                    })}
                  />
                  {errors.idadefilhoum && (
                    <p className="form-error">{errors.idadefilhoum.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Dados do segundo filho - exibido se quantidade >= 2 */}
          {parseInt(watchQtdFilhos, 10) >= 2 && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-white">Dados do segundo filho</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="nomefilhodois" className="form-label text-white">Nome</label>
                  <input
                    id="nomefilhodois"
                    type="text"
                    className="form-input w-full"
                    placeholder="Digite o nome do filho"
                    {...register("nomefilhodois", { 
                      required: parseInt(watchQtdFilhos, 10) >= 2 ? "Por favor, digite o nome do segundo filho." : false 
                    })}
                  />
                  {errors.nomefilhodois && (
                    <p className="form-error">{errors.nomefilhodois.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="idadefilhodois" className="form-label text-white">Idade</label>
                  <input
                    id="idadefilhodois"
                    type="number"
                    className="form-input w-full"
                    placeholder="Idade"
                    {...register("idadefilhodois", { 
                      required: parseInt(watchQtdFilhos, 10) >= 2 ? "Por favor, digite a idade do segundo filho." : false 
                    })}
                  />
                  {errors.idadefilhodois && (
                    <p className="form-error">{errors.idadefilhodois.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Dados do terceiro filho - exibido se quantidade >= 3 */}
          {parseInt(watchQtdFilhos, 10) >= 3 && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-white">Dados do terceiro filho</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="nomefilhotres" className="form-label text-white">Nome</label>
                  <input
                    id="nomefilhotres"
                    type="text"
                    className="form-input w-full"
                    placeholder="Digite o nome do filho"
                    {...register("nomefilhotres", { 
                      required: parseInt(watchQtdFilhos, 10) >= 3 ? "Por favor, digite o nome do terceiro filho." : false 
                    })}
                  />
                  {errors.nomefilhotres && (
                    <p className="form-error">{errors.nomefilhotres.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="idadefilhotres" className="form-label text-white">Idade</label>
                  <input
                    id="idadefilhotres"
                    type="number"
                    className="form-input w-full"
                    placeholder="Idade"
                    {...register("idadefilhotres", { 
                      required: parseInt(watchQtdFilhos, 10) >= 3 ? "Por favor, digite a idade do terceiro filho." : false 
                    })}
                  />
                  {errors.idadefilhotres && (
                    <p className="form-error">{errors.idadefilhotres.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Dados do quarto filho - exibido se quantidade >= 4 */}
          {parseInt(watchQtdFilhos, 10) >= 4 && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-white">Dados do quarto filho</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="nomefilhoquatro" className="form-label text-white">Nome</label>
                  <input
                    id="nomefilhoquatro"
                    type="text"
                    className="form-input w-full"
                    placeholder="Digite o nome do filho"
                    {...register("nomefilhoquatro", { 
                      required: parseInt(watchQtdFilhos, 10) >= 4 ? "Por favor, digite o nome do quarto filho." : false 
                    })}
                  />
                  {errors.nomefilhoquatro && (
                    <p className="form-error">{errors.nomefilhoquatro.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="idadefilhoquatro" className="form-label text-white">Idade</label>
                  <input
                    id="idadefilhoquatro"
                    type="number"
                    className="form-input w-full"
                    placeholder="Idade"
                    {...register("idadefilhoquatro", { 
                      required: parseInt(watchQtdFilhos, 10) >= 4 ? "Por favor, digite a idade do quarto filho." : false 
                    })}
                  />
                  {errors.idadefilhoquatro && (
                    <p className="form-error">{errors.idadefilhoquatro.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="jobChurch" className="form-label">Qual cargo exerce no ministério</label>
          <input
            id="jobChurch"
            type="text"
            className="form-input w-full"
            placeholder="Cargo"
            {...register("jobChurch")}
          />
          {errors.jobChurch && (
            <p className="form-error">{errors.jobChurch.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="jobChurchTemp" className="form-label">Exerce o cargo há quanto tempo?</label>
          <input
            id="jobChurchTemp"
            type="date"
            className="form-input w-full"
            {...register("jobChurchTemp")}
          />
          {errors.jobChurchTemp && (
            <p className="form-error">{errors.jobChurchTemp.message}</p>
          )}
        </div>
      </div>
      
      {/* Campos adicionais para casados */}
      {watchEstadoCivil === "Casado" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="optionprimeirocasamento" className="form-label">Primeiro Casamento?</label>
            <select
              id="optionprimeirocasamento"
              className="form-input w-full"
              {...register("optionprimeirocasamento", { 
                required: watchEstadoCivil === "Casado" ? "Por favor, selecione se é seu primeiro casamento." : false 
              })}
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
            {errors.optionprimeirocasamento && (
              <p className="form-error">{errors.optionprimeirocasamento.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="casamentocristao" className="form-label">Casaram-se em cerimônia cristã?</label>
            <select
              id="casamentocristao"
              className="form-input w-full"
              {...register("casamentocristao", { 
                required: watchEstadoCivil === "Casado" ? "Por favor, selecione se casou em cerimônia cristã." : false 
              })}
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
            {errors.casamentocristao && (
              <p className="form-error">{errors.casamentocristao.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="parceironaigreja" className="form-label">Nesse momento, seu cônjuge se tornará membro junto com você?</label>
            <select
              id="parceironaigreja"
              className="form-input w-full"
              {...register("parceironaigreja", { 
                required: watchEstadoCivil === "Casado" ? "Por favor, selecione se seu cônjuge se tornará membro." : false 
              })}
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
            {errors.parceironaigreja && (
              <p className="form-error">{errors.parceironaigreja.message}</p>
            )}
          </div>
          
          {/* Campo Justificativa - exibido apenas se parceiro na igreja for "nao" */}
          {watchParceiroIgreja === "nao" && (
            <div className="mb-4">
              <label htmlFor="justificativa" className="form-label">Justifique</label>
              <textarea
                id="justificativa"
                className="form-input w-full h-32"
                placeholder="Justifique sua resposta"
                {...register("justificativa", { 
                  required: watchParceiroIgreja === "nao" ? "Por favor, justifique sua resposta." : false 
                })}
              ></textarea>
              {errors.justificativa && (
                <p className="form-error">{errors.justificativa.message}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Step2;
