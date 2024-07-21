document.addEventListener('DOMContentLoaded', function() {
    submitForm();
    addBlurEventListeners();
});

function submitForm(){
    document.getElementById('contactForm').addEventListener('submit', function(event){
        event.preventDefault();
        let isValid = true;

        const fields = ['name', 'email', 'phone', 'message'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/; // Asume un formato de 10 dígitos sin espacios ni guiones

        fields.forEach(field =>{
            const fieldValue = document.getElementById(field).value;
            let fieldIsValid = true;

            if(fieldValue === '') {
                fieldIsValid = false;
            } else if (field === 'email' && !emailRegex.test(fieldValue)) {
                fieldIsValid = false;
            } else if (field === 'phone' && !phoneRegex.test(fieldValue.replace(/\D/g, ''))) { // Elimina caracteres no numéricos antes de la prueba
                fieldIsValid = false;
            }

            if (!fieldIsValid) {
                toggleError(field, true);
                isValid = false;
            } else {
                toggleError(field, false);
            }
        });

        if (isValid) {
            alert('Formulario enviado correctamente');
            document.getElementById('contactForm').reset();
        } else {
            alert('Por favor, corrija los errores en el formulario.');
        }
    });
}

function toggleError(inputId, isError){
    const inputElement = document.getElementById(inputId);
    const errorElement = document.querySelector(`[data-sb-feedback="${inputId}:required"]`); // Asume que todos los errores son de tipo 'required'

    if (isError) {
        inputElement.classList.add("is-invalid");
        if (errorElement) errorElement.style.display = 'block';
    } else {
        inputElement.classList.remove("is-invalid");
        if (errorElement) errorElement.style.display = 'none';
    }
}

function addBlurEventListeners(){
    const fields = ['name', 'email', 'phone', 'message'];

    fields.forEach(field =>{
        document.getElementById(field).addEventListener('blur', function(){
            const fieldValue = this.value;
            let isInvalid = fieldValue === '';

            if (field === 'email') {
                isInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue);
            } else if (field === 'phone') {
                isInvalid = !/^\d{10}$/.test(fieldValue.replace(/\D/g, ''));
            }

            toggleError(field, isInvalid);
        });
    });
}