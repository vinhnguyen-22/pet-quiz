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
export const TYPE_LESSON = [
  {
    key: 1,
    value: 'Bài học thường',
  },
  {
    key: 2,
    value: 'Bài kiểm tra',
  },
];
export const DOCUMENT_USAGE_TYPE = {
  FOR_LESSON: 0,
  FOR_GAME: 1,
};

export const DOCUMENT_STORAGE_FOLDER = {
  FOR_LESSON: 'documents/lessons',
  FOR_GAME: 'documents/games',
};

export const VIETEC_ID = 1;
export const SCHOOL_TYPE = 2;
export const CENTER_TYPE = 1;

export const PREFIX_DESCRIPTION = '@#$';

export const FILE_TYPE = {
  GAME: '1',
  IMAGE: '3',
  AUDIO: '2',
  VIDEO: '4',
};
export const DOCUMENT_FILE_IMAGE = {
  1: './assets/icon-lesson/Game.svg',
  3: './assets/icon-lesson/Image.svg',
  2: './assets/icon-lesson/Audio.svg',
  4: './assets/icon-lesson/Video.svg',
};
export const DOCUMENT_FILE_TYPE_NAME = {
  GAME: 'Game',
  IMAGE: 'Image',
  AUDIO: 'Audio',
  VIDEO: 'Video',
};

export const AVATAR_CLASS = {
  1: '018-girl-9.svg',
  2: '035-boy-15.svg',
  3: '014-girl-7.svg',
};
export const REGEX_PN = '(0([3|5|7|8|9]|21|22|23|24|25|26|27|28|29|2))+([0-9]{8})\\b';

export const REGEX_NUMBER_LARGER_THAN_0 = '^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$';

export const LESSON_PER_WEEK = [
  { key: 2, value: '2 Tiết' },
  { key: 3, value: '3 Tiết' },
  { key: 4, value: '4 Tiết' },
  { key: 5, value: '5 Tiết' },
];

export const SCHOOL_IMPLEMENTATION_TYPE = {
  NOT_IMPLEMENTED: 0,
  ALL: 1,
  HIRING_TEACHER: 2,
};

export const IMPLEMENT_TYPE = [
  { key: 1, value: 'Trung tâm triển khai toàn bộ' },
  { key: 2, value: 'Trung tâm cho thuê giáo viên' },
];

export const ROLE = {
  ADMIN: 1,
  CMS_ADMIN: 2,
  CUSTOMER_CARE: 3,
  CONTENT_ADMIN: 4,
  // SUPPORT_ADMIN: 4,
  CENTER: 50,
  // BGH: 51,
  TEACHER: 52,
  PARENT: 53,
  ADMIN_SCHOOL: 51,
};

export const DATA_HEADER_CENTER = [
  {
    key: 'name',
    value: 'Tên trung tâm',
    width: '14%',
  },
  {
    key: 'email',
    value: 'Email đại diện',
    width: '10%',
  },
  {
    key: 'centerTypeId',
    value: 'Loại trung tâm',
    width: '10%',
  },
  {
    key: 'packageId',
    value: 'Gói tài khoản',
    width: '8%',
  },
  {
    key: 'createdDate',
    value: 'Ngày tạo',
    width: '10%',
  },
  {
    key: 'dateEnd',
    value: 'Ngày hết hạn',
    width: '10%',
  },
  {
    key: 'status',
    value: 'Trạng thái',
    width: '5%',
  },
];
export const DATA_HEADER_SCHOOL = [
  {
    key: 'name',
    value: 'Tên trường',
  },
  {
    key: 'code',
    value: 'Mã trường',
    width: '5%',
  },
  {
    key: 'createdDate',
    value: 'Ngày tạo',
    width: '10%',
  },
  {
    key: 'applyKidsenglish',
    value: 'Triển khai KIDSEnglish',
    width: '5%',
  },
];
export const DAYOFWEEK = [
  {
    key: 2,
    value: 'Thứ Hai',
  },
  {
    key: 3,
    value: 'Thứ Ba',
  },
  {
    key: 4,
    value: 'Thứ Tư',
  },
  {
    key: 5,
    value: 'Thứ Năm',
  },
  {
    key: 6,
    value: 'Thứ Sáu',
  },
  {
    key: 7,
    value: 'Thứ Bảy',
  },
  {
    key: 8,
    value: 'Chủ Nhật',
  },
];

export const generateCode = (str: string, idx: number) => {
  const arr1 = str.split(' ').reverse();
  const index = (1000000 + idx).toString();
  const result = (arr1[1] ? arr1[1].charAt(0) : '') + arr1[0].charAt(0) + index.slice(1);
  return result;
};

export const checkSchool = (organ: any, isCenter) => {
  if (organ?.type == SCHOOL_TYPE) {
    if (organ?.centerId == VIETEC_ID) {
      return true;
    } else {
      return isCenter ? organ?.implementType == SCHOOL_IMPLEMENTATION_TYPE.ALL : organ?.implementType == SCHOOL_IMPLEMENTATION_TYPE.HIRING_TEACHER;
    }
  }
};

export const GAME_TYPE = {
  flashcard1: 1,
  flashcard2: 2,
  flashcard3: 3,
  flashcard4: 4,
  flashcard5: 5,
  memoryGame: 6,
  multipleChoiceAudio: 7,
  multipleChoiceImage: 8,
  answeringImage: 9,
  answeringAudio: 10,
  matching: 11,
  sequencing: 12,
  classify2groups: 13,
  classify1groups: 14,
  finding: 15,
  findingDifferences: 16,
  colouring: 17,
  colouringAudio: 18,
  puzzle1: 19,
  puzzle02: 20,
  drawing: 21,
  unscramble: 22,
  tf: 23,
  tracing: 24,
  unscrambleImage: 25,
};

export const FOLDER_STORE_RESOURCE_GAME = {
  flashcard1: 'games/resources/Flashcards01',
  flashcard2: 'games/resources/Flashcards02',
  flashcard3: 'games/resources/Flashcards03',
  flashcard4: 'games/resources/FlashCard04',
  flashcard5: 'games/resources/FlashCard05',
  memoryGame: 'games/resources/Memory-Game',
  multipleChoicesAudio: 'games/resources/Multiple-choice-audio',
  multipleChoicesImage: 'games/resources/Multiple-choice-image',
  answeringImage: 'games/resources/Answering-Image',
  answeringAudio: 'games/resources/Answering-audio',
  matching: 'games/resources/Matching',
  sequencing: 'games/resources/Sequencing',
  classify2groups: 'games/resources/DataClassify02',
  classify1groups: 'games/resources/DataClassify01',
  finding: 'games/resources/Finding',
  findingDifferences: 'games/resources/FindingDifferent',
  colouring: 'games/resources/Colouring',
  colouringAudio: 'games/resources/Colouring_audio2',
  puzzle1: 'games/resources/Puzzle01',
  puzzle02: 'games/resources/Puzzle02',
  drawing: 'games/resources/Drawing',
  unscramble: 'games/resources/Unsramble',
  tf: 'games/resources/TF',
  tracing: 'games/resources/Tracing',
  unscrambleImage: 'games/resources/Unsramble2',
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

export const DEFAULTBG = {
  TRACING: 'https://cdn.kidsenglish.vn/static/games/defaultBGtracing.png',
  COLOURING: 'https://cdn.kidsenglish.vn/static/games/defaultBGColouring.png',
};
export const STATUS_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  ERROR: 500,
};
