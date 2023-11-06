import { ref } from 'vue';
import useSupabase from 'boot/supabase';

const userAuth = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();
  const userAuthRole = userAuth?.value?.user_metadata.role || '';

  const isLoggedIn = () => !!userAuth.value;

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${process.env.BASE_URL}?fromEmail=emailVerified`,
      },
    );

    if (error) throw error;
    return user;
  };

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password });

    console.warn(`TODO: remover o link ${process.env.BASE_URL}?fromEmail=emailVerified`);

    if (error) throw error;
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn(provider);

    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  };

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);

    if (error) throw error;
    return user;
  };

  const sendPasswordResetEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${process.env.BASE_URL}?fromEmail=resetPassword`,
      },
    );

    if (error) throw error;
    return user;
  };

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword,
    });

    if (error) throw error;
    return user;
  };

  return {
    userAuth,
    userAuthRole,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
}
