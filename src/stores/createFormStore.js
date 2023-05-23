//import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
import { writable } from "svelte/store";

export function createFormStore(initialData) {
  const form = writable(initialData);
  const errors = writable({});
  //make a new instance on different pages
  //console.log($form)

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
    node.onblur = checkValidity(node, validators);
    /*node.onblur = (e) => {
      checkValidity(e);
      console.log(`blur on ${e.target.name} called with value ${e.target.value}`);
    }

    node.oninput = (e) => {
      console.log(`onInput on ${e.target.name} called with value ${e.target.value}`);
    }*/
  }

  const checkValidity = (element, validators) => (e) => {
    //event will be given by node.onblur
    console.log(`checkValidity. targetName: ${e.target.name}, targetValue: ${e.target.value}`);
    //const errorMessage = maxLengthValidator(element, 3);
    //console.log(validators);

    //clear all errors in the beginning
    errors.update(_errors => {
      _errors[element.name] = [];
      return _errors;
    });

    for (const validator of validators) {
      const errorMessage = validator(element);
      if (errorMessage) {
        errors.update(_errors => {
          _errors[element.name].push(errorMessage);
          return _errors;
        })
      } 
    }
  };

  return {
    validate,
    form,
    errors: { subscribe: errors.subscribe }
  };
}

export function requiredValidator({name, value}) {
  return value.length === 0 ? `${name} is required` : "";
}

//HTMLInputElement
export function minLengthValidator(element, minLength = 7) {
  if (
    element.value.length === 0 ||
    element.value.length >= minLength
  ) { return ""; }

  return `${element.name} should have min ${minLength} characters`;
}

export function maxLengthValidator(element, maxLength = 7) {
  if (element.value.length === 0 || element.value.length <= maxLength) {
    return "";
  }
  return `${element.name} should have max ${maxLength} characters`;
  //return Math.floor(Math.random() * 2) === 0 ? false : true;
}
export function firstUppercaseLetter({value, name}) {
  if (value.length === 0) { return ""; }

  return value[0] === value[0].toUpperCase() ? 
    "" : 
    `${name} first letter should be uppercased`;
}


export function onEnterKeyUp(event, func) {
  if (event.key === "Enter") {
    event.preventDefault();
    // By using `preventDefault`, it tells the Browser not to handle the key stroke for its own shortcuts or text input.
    console.log("enter is detected");
    func();
  }
}