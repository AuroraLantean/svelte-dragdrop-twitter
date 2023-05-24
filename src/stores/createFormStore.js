//import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
import { get, writable } from "svelte/store";

// initialData makes a new instance on different pages
export function createFormStore(initialData) {
  const form = writable(initialData);
  //better not to expose this form because it exposes the subscribe, set, and update methods
  const errors = writable({});
  const validatorFields = {};

  /*function setForm(formData) {
    form.set(formData);
  }*/

  /*onMount(() => {
    console.log("createFormStore onMount called!");
  });

  onDestroy(() => {
    console.log("createFormStore onDestroy called!");
  });

  beforeUpdate(() => {
    console.log("createFormStore beforeUpdate called!");
  });

  afterUpdate(() => {
    console.log("createFormStore afterUpdate called!");
  });*/

  function validate(node, validators = []) {
    //console.log(node); // input html element
    //console.log(value); // validator
    let config;
    validatorFields[node.name] = config = { element: node, validators };
    node.onblur = checkValidity(config);

    //instant validation
    node.oninput = () => {
      if (!get(errors)[node.name]) { return; }
      checkValidity(config)();
    };
    //node.onblur = checkValidity(node, validators);
    /*node.onblur = (e) => {
      checkValidity(e);
      console.log(`blur on ${e.target.name} called with value ${e.target.value}`);
    }

    node.oninput = (e) => {
      console.log(`onInput on ${e.target.name} called with value ${e.target.value}`);
    }*/
  }

  function isValid() {
    const _errors = get(errors);
    const keys = Object.keys(_errors);

    if (keys.length === 0) {
      console.log("error object has no keys: " + JSON.stringify(_errors));
      return false;
    }

    return keys.every((errorKey) => {
      return _errors[errorKey].length === 0;
    });
  }

  const checkValidity =
    ({ element, validators }) =>
    () => {
      //event will be given by node.onblur
      //(e) ... console.log(`checkValidity. targetName: ${e.target.name}, targetValue: ${e.target.value}`);

      //clear all errors in the beginning
      errors.update((_errors) => {
        _errors[element.name] = [];
        return _errors;
      });

      for (const validator of validators) {
        const errorMessage = validator(element)(get(form));
        if (errorMessage) {
          errors.update((_errors) => {
            _errors[element.name].push(errorMessage);
            return _errors;
          });
        }
      }
    };

  const submitForm = (callback) => () => {
    for (const field in validatorFields) {
      const config = validatorFields[field];
      checkValidity(config)();
    }
    if (isValid()) {
      console.log("the form is valid");
      callback(get(form));
    } else {
      console.log("the form is invalid");
    }
  };

  return {
    submitForm,
    validate,
    setValue: (e) => {
      const { value, name } = e.target;
      form.update((_form) => {
        _form[name] = value;
        return _form;
      });
    },
    errors: { subscribe: errors.subscribe }
  };
}

// "myFullName" -> ["my", "full", "Name"]
function splitCamel(text) {
  const words = text.split(/(?=[A-Z])/);

  return words
    .map((word, i) => {
      if (i === 0) {
        return word[0].toUpperCase() + word.substring(1);
      }

      return word.toLowerCase();
    })
    .join(" ");
}

export const compareWithValidator = (element, compareToFieldName) => (form) => {
  if (element.value.length === 0) { return ""; }
  const compareToValue = form[compareToFieldName];

  return element.value === compareToValue ? 
    "" : 
    `${splitCamel(element.name)} should be same as ${splitCamel(compareToFieldName)}`;
}

export const requiredValidator =
  ({ name, value }) =>
  (form) => {
    console.log(form);
    return value.length === 0 ? `${splitCamel(name)} is required` : "";
  };

//HTMLInputElement
export const minLengthValidator =
  (element, minLength = 7) =>
  () => {
    if (element.value.length === 0 || element.value.length >= minLength) {
      return "";
    }

    return `${splitCamel(element.name)} should have min ${minLength} characters`;
  };

export const maxLengthValidator =
  (element, maxLength = 7) =>
  () => {
    if (element.value.length === 0 || element.value.length <= maxLength) {
      return "";
    }
    return `${splitCamel(element.name)} should have max ${maxLength} characters`;
    //return Math.floor(Math.random() * 2) === 0 ? false : true;
  };

export const firstUppercaseLetter =
  ({ value, name }) =>
  () => {
    if (value.length === 0) {
      return "";
    }

    return value[0] === value[0].toUpperCase()
      ? ""
      : `${splitCamel(name)} first letter should be uppercased`;
  };

export function onEnterKeyUp(event, func) {
  if (event.key === "Enter") {
    event.preventDefault();
    // By using `preventDefault`, it tells the Browser not to handle the key stroke for its own shortcuts or text input.
    console.log("enter is detected");
    func();
  }
}
