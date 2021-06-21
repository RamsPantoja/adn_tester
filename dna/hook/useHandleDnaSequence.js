import { useCallback, useEffect, useState } from "react"

export const stateSchema = {
    dna: { value: '', errorfield: 'success', error: ''}
}

export const validationSchema = {
    dna: {
        required: true,
        validator: {
            regEx: /^[ATCG]{3,}[ATCG,]*[ATCG]$/m,
            error: 'The DNA just must include A, T, C, or G characters.'
        }
    }
}

export const disableSchema = {
    status: true,
    error: ''
}

export const useHandleDnaSequence = (stateSchema, validationSchema = {}, disableSchema) => {
    const [state, setState] = useState(stateSchema);
    const [disable, setDisable] = useState(disableSchema);
    const [isDirty, setIsDirty] = useState(false);

    const validateState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema).some( key => {
            const isInputRequired = validationSchema[key].required;
            const stateValue = state[key].value;
            const stateError = state[key].error;

            return (isInputRequired && !stateValue) || stateError;
        })

        return hasErrorInState;
    }, [validationSchema, state]);

    useEffect(() => {
        setDisable(() => ({
            ...disableSchema,
            status: true
        }));
    },[disableSchema]);

    useEffect(() => {
        if (isDirty) {
            setDisable(() => ({
                ...disableSchema,
                status: validateState(),
            }))
        }

        if (validateState()) {
            setDisable(() => ({
                ...disableSchema,
                error: 'Todos los campos son obligatorios'
            }))
        }
    }, [isDirty, disableSchema, validateState]);

    const handleOnChange = useCallback((e) => {
        setIsDirty(true);
        const name = e.target.name;
        const value = e.target.value.toUpperCase();
        const valueSplitted = value.split(',');
        let error = '';
        let errorfield = 'success'

        if (validationSchema[name].required) {
            if (!value) {
                errorfield = 'failed'
            }
        }

        //Valida la expresion regular de la propiedad password en el objeto de validacion.
        if (validationSchema[name].validator !== null && typeof(validationSchema[name].validator) === 'object') {
            if (value && !validationSchema[name].validator.regEx.test(value)) {
                error = validationSchema[name].validator.error;
                errorfield = 'failed';
            }
        }

        setState((prevState) => ({
            ...prevState,
            [name]: { value, errorfield, error}
        }))

    }, [validationSchema]);

    return [state, disable, handleOnChange];
}
