import { request } from '@/http/request'
import { useFormData } from '@/hooks/useFormData'

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

  const onSubmitLogin = async () => {
    console.log(`output->formData`,formData)
  }

  return {
    formData, 
    formDataRef,
    formDataRules, 
    onSubmitLogin
  }
}