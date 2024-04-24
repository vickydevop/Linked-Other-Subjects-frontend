// const baseURL = 'http://localhost:3000/api/';
const baseURL = 'https://p17api.getwow.community/api/';
const baseURL_1 = 'https://cephapi.getwow.biz/api/';
const baseURL_2 = 'https://u34api.getwow.community/api/';
const baseURL_3 = 'https://p7api.getwow.community/api/';
const baseURL_4 = 'https://p15api.getwow.community/api/';

export const environment = {
  production: false,
  edit_global_popup:'https://p1.getwow.community',
  access_wow_flashcards:'https://p10.getwow.community',
  get_global_syllabus_details:baseURL_2+'your-wow-flashcards/get-all-relevant-syllabus-of-your-interest-from',
  get_tree_view_based_on_global_course_subjectId:baseURL_2+'your-wow-flashcards/get-tree-view-based-on-above-selected-id',
  WOW_Flashcards_Relevant_To_Syllabus:baseURL+'global-wow-flashcards/wow-flashcards-relevant-to-the-syllabus',
  link:baseURL+'global-wow-flashcards/link-the-list-of-flashcards',
  from_flashcard_token: baseURL_3+'access-wow-resource/wow-resource-monitization-app/create-token-wow-flashcards',
  get_app_administrator_list:baseURL_1 + 'wow-launch-app/user-login/get-app-administrator-list',
  ceph_URL:`https://cephapi.getwow.biz/api/storage`,

  // get_checked_tree_data:baseURL_2+'assign-wow-resource-to-students/wow-resource/tree-view-get',
  // get_tree_data:baseURL_4+'global-wow-resource/global-course-subject-id-syllabus-details',
  // getWowSyllabusCategory:baseURL+'global-wow-flashcards/get-wow-syllabus-category-name',

};
