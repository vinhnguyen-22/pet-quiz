export const CURRENT_USER_LMS = 'current_user_lms';
export const CURRENT_USER_CMS = 'current_user_cms';

export const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy HH:mm';
export const DATE_FORMAT = 'dd/MM/yyyy';
export const GENERAL_ERROR_MESSAGE = 'Đã có lỗi xảy ra. Vui lòng liên hệ quản trị hệ thống.';

export const AKITA_STORE = {
  PROVINCE: 0,
  ROLE: 1,
  GRADE: 2,
  YEAR: 3,
  DOCUMENT_TYPE: 4,
  POSITION: 5,
  GAME_TYPE: 6,
  NEW_TYPE: 7,
  FEEDBACK_TYPE: 8,
  TICKET_TYPE: 9,
  NOTIFICATION_TYPE: 10,
  ACCOUNT_TYPE: 11,
  PACKAGE: 12,
  COUNTRY: 13,
};

export const HTTP_RESPONSE_TYPE = {
  ERROR: 'Error',
  SUCCESS: 'Success',
};

export const STUDENT_STATUS = {
  0: 'Chưa kích hoạt',
  1: 'Đã kích hoạt',
  2: 'Hết hạn',
};

export const STATUSES = [
  {
    key: 1,
    value: 'Đang hoạt động',
  },
  {
    key: 2,
    value: 'Tạm ngưng',
  },
]; 
export const VIETEC_ID = 1;
export const SCHOOL_TYPE = 2; 

export const PREFIX_DESCRIPTION = '@#$';
 
export const AVATAR_CLASS = {
  1: '018-girl-9.svg',
  2: '035-boy-15.svg',
  3: '014-girl-7.svg',
};
export const REGEX_PN = '(0([3|5|7|8|9]|21|22|23|24|25|26|27|28|29|2))+([0-9]{8})\\b';

export const REGEX_NUMBER_LARGER_THAN_0 = '^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$';
 

export const ROLE = {
  ADMIN: 1,
  STAFF: 2, 
};
 
export const generateCode = (str: string, idx: number) => {
  const arr1 = str.split(' ').reverse();
  const index = (1000000 + idx).toString();
  const result = (arr1[1] ? arr1[1].charAt(0) : '') + arr1[0].charAt(0) + index.slice(1);
  return result;
};
 
export const MODAL_TYPE = {
  default: 0,
  deleteConfirmation: 1,
  confirmation: 2,
};

export const MODAL_STYLE = {
  default: 'modal-style-primary',
  deleteConfirmation: 'modal-style-danger',
  confirmation: 'modal-style-primary',
};

export const MODAL_BUTTON_STYLE = {
  default: 'btn-primary',
  deleteConfirmation: 'btn-danger',
  confirmation: 'btn-primary',
};
 
export const STATUS_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  ERROR: 500,
};
