<script>
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import RegisterForm from "@components/forms/RegisterForm.svelte";
  import { createAuthStore } from "@stores/createAuthStore";
  const { authUser, loading } = createAuthStore("register");
  //import { app } from "@db/index";
  //console.log(app);
  //import { getUsers } from "@db/index";
  //getUsers();

  /* Avatar links
    https://thrangra.sirv.com/Avatar1.png
    https://thrangra.sirv.com/Avatar2.png
   */

  async function register(formData) {
    console.log("register page formdata:", formData);
    authUser(formData);
    //confirm registration successful at Firebase/authentication
  }
</script>

<AuthLayout title="Register Account">
  <RegisterForm onFormSubmit={register} loading={$loading} />
</AuthLayout>
