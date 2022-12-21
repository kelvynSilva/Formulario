class ValidForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.event();
    }
    event() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.validFields();
        const validPassword = this.validPassword();

        if (validFields && validPassword) {
            alert('formulario enviado');
            this.form.submit();
        }
    }

    validPassword() {
        let valid = true;
        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');

        if (password.value !== repeatPassword.value) {
            this.createError(password, 'O campo senha e repetir senha devem ser iguais!');
            this.createError(repeatPassword, 'O campo senha e repetir senha devem ser iguais!');
            valid = false;
        }

        if (password.value.length < 6 || password.value.length > 12) {
            this.createError(password, 'A senha deve conter entre 6 e 12 caracteres!');
            valid = false
        }

        return valid;
    }

    validFields() {
        let valid = true;
        for (let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        };

        for (let fields of this.form.querySelectorAll('.valid')) {
            const label = fields.previousElementSibling.innerText;

            if (!fields.value) {
                this.createError(fields, `O campo ${label} não pode estar em branco`);
                valid = false;
            }

            if (fields.classList.contains('user')) {
                if (!this.validUser(fields)) valid = false;
            }

            if (fields.classList.contains('cpf')) {
                if (!this.validCPF(fields)) valid = false;
            }
        }

        return valid;
    }


    validUser(fields) {
        const user = fields.value;
        let valid = true;
        if (user <= 3 || user >= 12) {
            this.createError(fields, 'O nome de usúario precisa ter entre 3 e 12 caracteres!');
            valid = false;
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(fields, 'O campo usúario só pode conter letras e números');
            valid = false;
        }

        return valid;
    }

    validCPF(fields) {
        const cpf = new ValidaCPF(fields.value);
        if (!cpf.valida()) {
            this.createError(fields, 'O CPF e inválido');
            return false;
        }

        return true;
    }

    createError(fields, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        fields.insertAdjacentElement('afterend', div);

    }

}

const valid = new ValidForm();
valid.event();