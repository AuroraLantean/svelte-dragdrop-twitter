<script>
  import AuthLayout from "@components/layouts/AuthLayout.svelte";
  import LoginForm from "@components/forms/LoginForm.svelte";
  import { createAuthStore } from "@stores/createAuthStore";

  const { authUser, loading } = createAuthStore("login");

  async function login(formData) {
    await authUser(formData);
  }
</script>

<AuthLayout title="Log In">
  <LoginForm onFormSubmit={login} loading={$loading} />
</AuthLayout>
