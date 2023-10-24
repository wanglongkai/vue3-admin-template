import { useFormData } from '@/hooks/useFormData'
import { userLogin } from '@/api/user'
import { useRouter } from "vue-router"

export function useLoginFetch(){
  const {formData, formDataRef, formDataRules} = useFormData(
    {
      username: 'admin',
      password: '123456',
    },
    {
      username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
      password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
    }
  )

  const router = useRouter();
  const onSubmitLogin = async () => {
    const res = await userLogin(formData);
    if(res.code === 200){
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('userId', res.userId)
      router.replace('/')
    }
  }

  return {
    formData, 
    formDataRef,
    formDataRules, 
    onSubmitLogin
  }
}