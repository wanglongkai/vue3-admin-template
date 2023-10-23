const SYSTEM_NAME = "vue3-admin-template"

/** 缓存数据时用到的 Key */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
}

export default CacheKey
