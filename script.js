let LOGINvalidator = {
    handleSubmit:(event)=>{ //lidar com enviar
        event.preventDefault();//prevenção padrão(previnir o comportamento padrão, o comportamento padão é enviar)
        let send = true;//mandar(vou enviar o formulario? sim)

        let inputs = form.querySelectorAll('input'); //Estou criando uma variavel "let inputs" e chamando os input do HTML com o uso do querySelectorAll

        LOGINvalidator.clearErros();

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = LOGINvalidator.checkInput(input);
            if(check !== true){
                send = false;
                LOGINvalidator.showError(input, check);
            }
        }
        if(send){
            form.submit();
        }
    },
    
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');//serve para se colocar substrings em array e retorna o array, feito para busca um padrão
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case'required':
                    if(input.value == ''){
                        return 'Campo não pode ser vazio.';
                    }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Obrigatório mínimo '+rDetails[1]+' caracteres';
                        }
                    break;
                    case "email":
                        if (input.value != "") {
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!regex.test(input.value.toLowerCase())) {
                            return "E-mail digitado não é válido!";
                        }
                        }
                    break;
                } 
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

            input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErros:() => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.loginValidator');
form.addEventListener('submit', LOGINvalidator.handleSubmit);//vai monitorar quando houver algum submit 