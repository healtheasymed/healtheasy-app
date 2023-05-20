import useSupabase from '@/boot/supabase';
import { profileEnum } from '@/enums/profileEnum';
import { populateTableColumnsForm } from '@/utils/tableUtils';
import useAuthUser from './useAuthUser';

const getPagination = (page, qtyPerPage) => {
  const from = page ? qtyPerPage : 0;
  const to = page ? from + qtyPerPage - 1 : qtyPerPage - 1;

  return { from, to };
};

export default function useAPI() {
  const { supabase } = useSupabase();
  const { userAuth, userAuthRole } = useAuthUser();
  const roleIdKey = `${userAuthRole}_id`;

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select('*');

    if (error) throw error;
    return data;
  };

  const listById = async (table, filter, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .order('id', { ascending: true })
      .eq(filter?.column, filter?.value);

    if (error) throw error;
    return data;
  };

  const listByIdForArray = async (table, filter, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .order('id', { ascending: true })
      .contains(filter?.column, [filter?.value]);

    if (error) throw error;
    return data;
  };

  const listByUserId = async (table, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .eq('user_id', userAuth.value.id);

    if (error) throw error;
    return data;
  };

  const listCountByUserId = async (table, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery, { count: 'exact' })
      .eq('user_id', userAuth.value.id);

    if (error) throw error;
    return data;
  };

  const filteredList = async (table, filter, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .order('id', { ascending: true })
      // .eq('user_id', userAuth.value.id)
      .ilike(filter?.column, `%${filter?.value}%`);

    if (error) throw error;
    return data;
  };

  const paginationList = async (table, page = 0, qtyPerPage = 50) => {
    const { from, to } = getPagination(page, qtyPerPage);

    const { data, error } = await supabase
      .from(table)
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      // .eq('user_id', userAuth.value.id)
      .range(from, to);

    if (error) throw error;
    return data;
  };

  const getById = async (table, id, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .eq('id', id);

    if (error) throw error;
    return data[0];
  };

  const getByUserId = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userAuth.value.id);

    if (error) throw error;
    return data[0];
  };

  const getByProfileId = async (table, id, selectQuery = '*') => {
    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .eq('profile_id', id);

    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { id, ...newForm } = form;

    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...newForm,
          user_id: userAuth.value.id,
        },
      ]);

    if (error) throw error;
    return data[0];
  };

  const publicPost = async (table, form) => {
    const { id, ...newForm } = form;

    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...newForm,
        },
      ]);

    if (error) throw error;
    return data[0];
  };

  const update = async (table, form) => {
    const match = form.id
      ? { id: form.id }
      : { user_id: userAuth.value.id };

    const { data, error } = await supabase
      .from(table)
      .update(form)
      .match(match);

    if (error) throw error;
    return data[0];
  };

  const upsert = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .upsert({
        id: form.id,
        ...form,
        user_id: userAuth.value.id,
      }, { onConflict: 'id' });

    if (error) throw error;
    return data[0];
  };

  const getPublicImgURL = async (storage, fileName) => {
    const { publicURL, error } = await supabase
      .storage
      .from(storage)
      .getPublicUrl(fileName);

    if (error) throw error;
    return publicURL;
  };

  const uploadImg = async (storage, file) => {
    const fileName = crypto.randomUUID();

    const { error } = await supabase
      .storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    const url = await getPublicImgURL(storage, fileName);

    if (error) throw error;
    return url;
  };

  const removeImgs = async (storage, filesNames) => {
    const { data, error } = await supabase
      .storage
      .from(storage)
      .remove(filesNames);

    if (error) throw error;
    return data;
  };

  const getUser = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userAuth.value.id)
      .eq('email', userAuth.value.email);

    let [profile] = data;

    if (userAuthRole && profileEnum[userAuthRole]?.table) {
      const { id, ...roleData } = await getByProfileId(
        profileEnum[userAuthRole]?.table,
        profile.id,
      );

      Object.assign(profile, roleData);

      // NOTE: atribuindo de forma dinamica o id da tabela especifica ao papel do usuario
      // Ex.: doctor -> doctor_id: id, pacient -> pacient_id
      profile = {
        ...profile,
        [roleIdKey]: id,
      };
    }

    console.log(profile);
    if (error) throw error;
    return profile;
  };

  const updateUser = async (form) => {
    // TODO: atualizar o phone com o formato => +5532999999999.
    await supabase.auth.update({ data: { name: form.name } });

    const profileColumns = populateTableColumnsForm(profileEnum.profileColumns, form);
    let profileData = await update('profiles', profileColumns);

    let roleColumns = null;

    if (userAuthRole) {
      roleColumns = populateTableColumnsForm(profileEnum[userAuthRole].columns, form);
    }

    if (roleColumns) {
      let roleDataByGet = await getByUserId(profileEnum[userAuthRole].table);

      if (!roleDataByGet) {
        roleDataByGet = await getByProfileId(profileEnum[userAuthRole].table, profileData.id);
      }

      roleColumns = { id: roleDataByGet?.id, user_id: userAuth.value.id, ...roleColumns };

      const {
        id,
        ...roleDataByUpsert
      } = await upsert(profileEnum[userAuthRole].table, roleColumns) || {};

      Object.assign(profileData, roleDataByUpsert);
      profileData = {
        ...profileData,
        [roleIdKey]: id,
      };
    }

    return profileData;
  };

  const removeProfileImg = async (fileName) => {
    const { error } = await removeImgs('profile-image', [fileName]);
    const { profileError } = await update('profiles', { avatar_url: null });

    if (error || profileError) throw error || profileError;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id });

    if (error) throw error;
    return data;
  };

  return {
    list,
    listById,
    listByIdForArray,
    listByUserId,
    listCountByUserId,
    filteredList,
    paginationList,
    getById,
    getByUserId,
    getByProfileId,
    post,
    publicPost,
    update,
    upsert,
    getUser,
    updateUser,
    getPublicImgURL,
    uploadImg,
    removeImgs,
    removeProfileImg,
    remove,
  };
}
