document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const mensagensErro = document.getElementById('mensagensErro');

  // Carregar dados do localStorage se existirem
  function carregarDadosFormulario() {
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario'));
    if (dadosSalvos) {
      document.getElementById('idNome').value = dadosSalvos.nome || '';
      document.getElementById('idSobrenome').value = dadosSalvos.sobrenome || '';
      document.getElementById('idCpf').value = dadosSalvos.cpf || '';
      document.getElementById('sexo').value = dadosSalvos.sexo || '';
      document.getElementById('idEndereço').value = dadosSalvos.endereco || '';
      document.getElementById('idBairro').value = dadosSalvos.bairro || '';
      document.getElementById('idEstado').value = dadosSalvos.estado || '';
      document.getElementById('idCep').value = dadosSalvos.cep || '';
      document.getElementById('idCidade').value = dadosSalvos.cidade || '';
      document.getElementById('email').value = dadosSalvos.email || '';
      document.getElementById('telefone').value = dadosSalvos.telefone || '';
      document.getElementById('senha').value = dadosSalvos.senha || '';
      document.getElementById('confirmaSenha').value = dadosSalvos.confirmaSenha || '';
    };
  };
carregarDadosFormulario(); // Carregar os dados ao carregar a página


  // Máscaras de entrada
  document.getElementById('idCpf').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formato do CPF
  });

  document.getElementById('idCep').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{5})(\d{3})/, '$1-$2'); // Formato do CEP
  });

  document.getElementById('telefone').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Formato de telefone
  });

  // exibição de senha
  function exibirSenha (){
    var inputSenha = document.getElementById('senha');
    var btnshowPass = document.getElementById('btn-exibirSenha');

    if (inputSenha.type === 'password'){
      inputSenha.setAttribute('type', 'text');
      btnshowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
    else{
      inputSenha.setAttribute('type', 'password');
      btnshowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
  };
    var btnshowPass = document.getElementById('btn-exibirSenha');
    btnshowPass.addEventListener('click', exibirSenha);

  // exibição do confirmar senha
  function apresentarSenha (){ 
    var inputSenha = document.getElementById('confirmaSenha');
    var btnApresentarSenha = document.getElementById('btn-aparecerSenha');

    if (inputSenha.type === 'password'){
      inputSenha.setAttribute('type', 'text');
      btnApresentarSenha.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
    else{
      inputSenha.setAttribute('type', 'password');
      btnApresentarSenha.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
  };
    var btnApresentarSenha = document.getElementById('btn-aparecerSenha');
    btnApresentarSenha.addEventListener('click', apresentarSenha);

  // Função para validar o formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let errors = [];
    
    // Validação de nome (máximo 60 caracteres alfabéticos)
    const nome = document.getElementById('idNome').value;
    if (!/^[A-Za-z\s]{1,20}$/.test(nome)) {
      errors.push("O nome deve ter no máximo 20 caracteres alfabéticos.");
    }

    // Validação de senha (mínimo 8 caracteres)
    const senha = document.getElementById('senha').value;
    if (senha.length < 8) {
      errors.push("A senha deve ter pelo menos 8 caracteres.");
    }

    // Validação de senha e confirmação de senha
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    if (senha !== confirmaSenha) {
      errors.push("A senha e a confirmação de senha devem ser iguais.");
    }

    // Validação de CPF (formato: 123.456.789-00)
    const cpf = document.getElementById('idCpf').value;
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      errors.push("O CPF deve estar no formato 123.456.789-00.");
    }

    // Validação de CEP (formato: 12345-678)
    const cep = document.getElementById('idCep').value;
    if (!/^\d{5}-\d{3}$/.test(cep)) {
      errors.push("O CEP deve estar no formato 12345-678.");
    }

    // Validação de telefone (formato: (21) 99999-5555)
    const telefone = document.getElementById('telefone').value;
    if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone)) {
      errors.push("O telefone deve estar no formato (21) 99999-5555.");
    }

    // Exibição de erros
    if (errors.length > 0) {
      mensagensErro.classList.remove('d-none');
      mensagensErro.innerHTML = errors.join('<br>');
    } else {
      mensagensErro.classList.add('d-none');
      
      // Salvar os dados no localStorage
      const dadosFormulario = {
        nome: document.getElementById('idNome').value,
        sobrenome: document.getElementById('idSobrenome').value,
        cpf: document.getElementById('idCpf').value,
        sexo: document.getElementById('sexo').value,
        endereco: document.getElementById('idEndereço').value,
        bairro: document.getElementById('idBairro').value,
        estado: document.getElementById('idEstado').value,
        cep: document.getElementById('idCep').value,
        cidade: document.getElementById('idCidade').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value,
        confirmaSenha: document.getElementById('confirmaSenha').value
      };

      // Salvar os dados no localStorage
      localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));

      form.submit(); // Submete o formulário se não houver erros
      window.location.href = "login.html"
    }
  });
});