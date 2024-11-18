import http from '@/lib/http';
import { BasicBodyType } from '@/schema-validations/system.setting.schema';
import { ISystemSetting } from '@/types/system-settings';
const systemSettingRequest = {
  getByKeyName: (keyName: string) =>
    http.get<ISystemSetting>(`/SystemSetting/${keyName}`, { noToken: false, next: { revalidate: 30 } }),
  configure: (body: BasicBodyType) => http.put('/SystemSetting', body),
};
export default systemSettingRequest;
