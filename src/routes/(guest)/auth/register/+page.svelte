<script>
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import { registerUser } from "@api/auth";
  //import { app } from "@db/index";
  //console.log(app);
  //import { getUsers } from "@db/index";
  //getUsers();

  async function register(formData) {
    console.log("register page formdata:",formData);
    const user = await registerUser(formData);
    console.log("user:", user);
    //confirm registration successful at Firebase/authentication
  }
</script>

<AuthLayout title="Register Account">
  <RegisterForm onFormSubmit={register} />
</AuthLayout>
