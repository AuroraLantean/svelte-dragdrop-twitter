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

  function validate(node) {
    //console.log(node); // input html element
    //console.log(value); // validator
    node.onblur = checkValidity(node);
    /*node.onblur = (e) => {
      checkValidity(e);
      console.log(`blur on ${e.target.name} called with value ${e.target.value}`);
    }

    node.oninput = (e) => {
      console.log(`onInput on ${e.target.name} called with value ${e.target.value}`);
    }*/
  }

  const checkValidity = (element) => (e) => {
    //event will be given by node.onblur
    console.log(`targetName: ${e.target.name}, targetValue: ${e.target.value}`);
    const errorMessage = "ERROR ERROR ERROR!";
    const isValid = false;

    if (!isValid) {
      // errors.update((_errors) => {
      //   _errors[element.name] = errorMessage;
      //   return _errors;
      // })
      errors.update((_errors) => ({..._errors, [element.name]: errorMessage}));
    } else {
      alert("No Errors!");
    }
  }

  function onEnterKeyUp(event, func) {
    if (event.key === "Enter") {
      event.preventDefault();
      // By using `preventDefault`, it tells the Browser not to handle the key stroke for its own shortcuts or text input.
      console.log("enter is detected");
      func();
    }
  }
  return {
    validate,
    form,
    onEnterKeyUp,
    errors: {subscribe: errors.subscribe}
  };
}
