import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IMaskInput } from "react-imask";

const Step1 = () => {
  const { register, formState: { errors }, setValue, watch, getValues } = useFormContext();
  
  // Observar mudanças no campo CEP
  const cepValue = watch("cep");
  
  // Função para buscar CEP usando fetch
  const buscaCep = async (cep) => {
    // Remover caracteres não numéricos
    cep = cep?.replace(/\D/g, "");
    
    // Verificar se o CEP tem 8 dígitos
    if (!cep || cep.length !== 8) {
      return;
    }
    
    try {
      // Indicar carregamento
      setValue("loadingCep", true);
      
      // Fazer requisição para a API ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      // Verificar se a resposta é válida
      if (!data.erro) {
        console.log("Dados do CEP:", data);
        
        // Preencher os campos com os dados retornados
        setValue("address", data.logradouro || "", { shouldValidate: true, shouldDirty: true });
        setValue("district", data.bairro || "", { shouldValidate: true, shouldDirty: true });
        setValue("city", data.localidade || "", { shouldValidate: true, shouldDirty: true });
        setValue("state", data.uf || "", { shouldValidate: true, shouldDirty: true });
        
        // Focar no campo número após preenchimento automático
        setTimeout(() => {
          document.getElementById("number")?.focus();
        }, 100);
      } else {
        console.log("CEP não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setValue("loadingCep", false);
    }
  };
  
  // Efeito para monitorar mudanças no CEP
  useEffect(() => {
    // Verificar se o CEP tem o formato completo (XXXXX-XXX)
    if (cepValue && cepValue.length === 9) {
      buscaCep(cepValue);
    }
  }, [cepValue]);

  // Função para teste manual do CEP
  const testeCep = () => {
    const cep = getValues("cep");
    if (cep) {
      buscaCep(cep);
    }
  };

  return (
    <div className="form-step">
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="form-label">Nome Completo</label>
          <input
            id="name"
            type="text"
            className="form-input w-full"
            placeholder="Digite o seu nome"
            {...register("name")}
          />
          {errors.name && (
            <p className="form-error">{errors.name.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="mothersname" className="form-label">Nome da Mãe</label>
          <input
            id="mothersname"
            type="text"
            className="form-input w-full"
            placeholder="Nome da Mãe"
            {...register("mothersname")}
          />
          {errors.mothersname && (
            <p className="form-error">{errors.mothersname.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="fathersname" className="form-label">Nome do Pai</label>
          <input
            id="fathersname"
            type="text"
            className="form-input w-full"
            placeholder="Nome do Pai"
            {...register("fathersname")}
          />
          {errors.fathersname && (
            <p className="form-error">{errors.fathersname.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="dateBirth" className="form-label">Data de nascimento</label>
          <IMaskInput
            id="dateBirth"
            className="form-input w-full"
            type="text"
            placeholder="DD/MM/AAAA"
            mask="00/00/0000"
            {...register("dateBirth")}
            onAccept={(value) => setValue("dateBirth", value, { shouldValidate: true })}
          />
          {errors.dateBirth && (
            <p className="form-error">{errors.dateBirth.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="sex" className="form-label">Sexo</label>
          <select
            id="sex"
            className="form-input w-full"
            {...register("sex")}
          >
            <option value="">Escolha</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          {errors.sex && (
            <p className="form-error">{errors.sex.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="telone" className="form-label">Telefone 1</label>
          <IMaskInput
            id="telone"
            className="form-input w-full"
            type="text"
            mask="(00) 00000-0000"
            placeholder="(00) 00000-0000"
            {...register("telone")}
            onAccept={(value) => setValue("telone", value, { shouldValidate: true })}
          />
          {errors.telone && (
            <p className="form-error">{errors.telone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="teltwo" className="form-label">Telefone 2</label>
          <IMaskInput
            id="teltwo"
            className="form-input w-full"
            type="text"
            mask="(00) 00000-0000"
            placeholder="(00) 00000-0000"
            {...register("teltwo")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            id="email"
            type="email"
            className="form-input w-full"
            placeholder="email@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="national" className="form-label">Nacionalidade</label>
          <input
            id="national"
            type="text"
            className="form-input w-full"
            placeholder="Nacionalidade"
            {...register("national")}
          />
          {errors.national && (
            <p className="form-error">{errors.national.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="natural" className="form-label">Naturalidade</label>
          <input
            id="natural"
            type="text"
            className="form-input w-full"
            placeholder="Naturalidade"
            {...register("natural")}
          />
          {errors.natural && (
            <p className="form-error">{errors.natural.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="profession" className="form-label">Profissão</label>
          <input
            id="profession"
            type="text"
            className="form-input w-full"
            placeholder="Sua profissão"
            {...register("profession")}
          />
          {errors.profession && (
            <p className="form-error">{errors.profession.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="companywork" className="form-label">Empresa que trabalha</label>
          <input
            id="companywork"
            type="text"
            className="form-input w-full"
            placeholder="Nome da empresa"
            {...register("companywork")}
          />
          {errors.companywork && (
            <p className="form-error">{errors.companywork.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="education" className="form-label">Grau de escolaridade</label>
          <select
            id="education"
            className="form-input w-full"
            {...register("education")}
          >
            <option value="">Escolha</option>
            <option value="Ensino Fundamental">Ensino Fundamental</option>
            <option value="Ensino Medio">Ensino Médio</option>
            <option value="Ensino Superior">Ensino Superior</option>
          </select>
          {errors.education && (
            <p className="form-error">{errors.education.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="cep" className="form-label">CEP</label>
          <div className="relative flex">
            <IMaskInput
              id="cep"
              className="form-input w-full"
              mask="00000-000"
              type="text"
              placeholder="CEP"
              {...register("cep")}
              onAccept={(value) => setValue("cep", value, { shouldValidate: true })}
            />
            <button 
              type="button" 
              onClick={testeCep}
              className="ml-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md"
            >
              Buscar
            </button>
            {watch("loadingCep") && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="animate-spin h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          {errors.cep && (
            <p className="form-error">{errors.cep.message}</p>
          )}
          <p className="text-xs text-gray-400 mt-1">Digite o CEP completo e clique em "Buscar" para preencher o endereço automaticamente. O número deverá ser preenchido manualmente.</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="form-label">Endereço</label>
          <input
            id="address"
            type="text"
            className="form-input w-full"
            placeholder="Seu endereço"
            {...register("address")}
          />
          {errors.address && (
            <p className="form-error">{errors.address.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="number" className="form-label">Número</label>
          <input
            id="number"
            type="text"
            className="form-input w-full"
            placeholder="Número"
            {...register("number")}
          />
          {errors.number && (
            <p className="form-error">{errors.number.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="complement" className="form-label">Complemento</label>
          <input
            id="complement"
            type="text"
            className="form-input w-full"
            placeholder="Complemento"
            {...register("complement")}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="district" className="form-label">Bairro</label>
          <input
            id="district"
            type="text"
            className="form-input w-full"
            placeholder="Bairro"
            {...register("district")}
          />
          {errors.district && (
            <p className="form-error">{errors.district.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="form-label">Cidade</label>
          <input
            id="city"
            type="text"
            className="form-input w-full"
            placeholder="Cidade"
            {...register("city")}
          />
          {errors.city && (
            <p className="form-error">{errors.city.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="form-label">Estado</label>
          <input
            id="state"
            type="text"
            className="form-input w-full"
            placeholder="Estado"
            {...register("state")}
          />
          {errors.state && (
            <p className="form-error">{errors.state.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="timeinresidence" className="form-label">Quanto tempo está no mesmo endereço?</label>
          <input
            id="timeinresidence"
            type="text"
            className="form-input w-full"
            placeholder="Tempo de residência"
            {...register("timeinresidence")}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
