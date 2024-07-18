//ICONS

import sideBarIcon from "./sideBarIcon";
import ImageCommon from "../components/imagecomponent/ImageCommon";

//----------------------------------------------------------------MODULES----------------------------------------------------------------
//DASHBOARD
export const _dashboard = "Dashboard";

//CASES
export const _cases = "Cases";
export const _reviewCases = "Review-Cases";
export const _retrivalCases = "Retrieval-Cases";
export const _sortingCases = "Sorting-Cases";
export const _insuranceCases = "Insurance-Cases";

//CRMS
export const _crm = "CRM";
export const _leads = "Leads";
export const _company = "Companies";
export const _clients = "Clients";
export const _divisions = "Divisions";

//BILLING
export const _billing = "Billing";
export const _invoice = "Invoice";
export const _estimate = "Estimate";
export const _generateInvoice = "Generate-Invoice";
export const _customerAdvance = "Customer-Advance";

//DRIVE
export const _drive = "Drive";
export const _myDrive = "My-Drive";
export const _sharedFiles = "Shared-Files";
export const _fileRequest = "File-Requests";
export const _archieved = "Archieved";
export const _bin = "Bin";
export const _caseDrive = "Case-Drive";

//Contracts
export const _contracts = "Contracts";

//TASKS
export const _tasks = "Tasks";
export const _taskList = "Task-List";
export const _taskType = "Task-type";

//NOTES
export const _notes = "Notes";

//MESSAGES
export const _messages = "Messages";
export const _caseQueries = "Case-Queries";
export const _billingQueries = "Billing-Queries";
export const _technicalQueries = "Technical-Queries";
export const _otherQueries = "Other-Queries";
//AUDIT
export const _audit = "Audit";
export const _errorManagement = "Error-Management";
export const _auditType = "Audit-Type";

//SURVEY
export const _survey = "Survey";

//LOYALITY
export const _loyalty = "Loyalty";

//REWARDS
export const _rewards = "Rewards";
export const _summary = "Summary";
export const _feeds = "Feeds";
export const _details = "Details";

//REPORTS
export const _reports = "Reports";
export const _caseReport = "Case";
export const _revenueReport = "Revenue";
export const _billingReport = "Billing";
export const _clientStatistics = "Client-Statistics";
export const _employeeStatistics = "Employee-Statistics";
export const _partnerStatistics = "Partner-Statistics";

//TIMESHEET
export const _timesheet = "Timesheet";
export const _entries = "Entries";
export const _approvals = "Approval";

// DATABASE
export const _database = "Database";

// RESOURCES
export const _resources = "Resources";
export const _productSample = "Product-Samples";
export const _marketingMaterial = "Marketing-Material";
export const _faqSupport = "FAQ-and-Support";

// PARTNERS
export const _partners = "Partners";
//----------------------------------------------------------------MenuLinks----------------------------------------------------------------

export const menuData = () => ({
  // _add: {
  //   icon: (
  //     <ImageCommon
  //       // src={theme == "light" ? "/Gif/upload.gif" : "/Gif/upload_white.gif"}
  //       width="20"
  //       height="20"
  //       alt=""
  //     />
  //   ),
  //   name: "Add",
  // },
  [_dashboard]: {
    icon: sideBarIcon(_dashboard),
    name: "Dashboard",
    link: "/admin/dashboard",
  },
  [_cases]: {
    icon: sideBarIcon(_cases),
    [_reviewCases]: {
      link: "/admin/cases/review",
    },
    [_retrivalCases]: {
      link: "/admin/cases/retrieval",
    },
    [_sortingCases]: {
      link: "/admin/reviewcase",
    },
  },
  //CRM
  [_crm]: {
    icon: sideBarIcon(_crm),
    [_leads]: { link: "/admin/crm/leads" },
    [_company]: { link: "/admin/crm/companies" },
    [_clients]: { link: "/admin/crm/clients" },
    [_divisions]: { link: "/admin/crm/divisions" },
  },

  [_drive]: {
    icon: sideBarIcon(_drive),
    link: "/admin/drive",
    [_myDrive]: { link: "/admin/drive/my-drive" },
    [_caseDrive]: { link: "/admin/drive/case-drive" },
    [_sharedFiles]: { link: "/admin/drive/shared-files" },
    [_fileRequest]: { link: "/admin/drive/file-requests" },
    [_archieved]: { link: "/admin/drive/archieved" },
    [_bin]: { link: "/admin/drive/bin" },
  },

  [_billing]: {
    icon: sideBarIcon(_billing),
    name: "Billing",
    [_invoice]: { link: "/admin/billing/invoice" },
    [_estimate]: { link: "/admin/billing/estimate" },
    [_generateInvoice]: { link: "/admin/billing/generate-invoice" },
    [_customerAdvance]: { link: "/admin/billing/customer-advance" },
  },
  // CONTRACTS
  [_contracts]: {
    icon: sideBarIcon(_contracts),
    link: "/admin/contracts",
  },
  //TIME SHEET
  [_timesheet]: {
    icon: sideBarIcon(_contracts),
    link: "/admin/time-sheet",
    [_entries]: {
      link: "/admin/time-sheet/entries",
    },
    [_approvals]: {
      link: "/admin/time-sheet/approvals",
    },
  },
  [_tasks]: {
    icon: sideBarIcon(_tasks),
    link: "/admin/tasks/all",
    name: "Tasks",
  },
  [_notes]: {
    icon: sideBarIcon(_notes),
    link: "/admin/notes/",
  },
  [_messages]: {
    icon: sideBarIcon(_messages),
    name: "Messages",
    [_caseQueries]: { link: "/admin/messages/Case-Queries/all" },
    [_billingQueries]: { link: "/admin/messages/Billing-Queries/all" },
    [_technicalQueries]: { link: "/admin/messages/Technical-Queries/all" },
    [_otherQueries]: { link: "/admin/messages/Other-Queries/all" },
  },
  [_audit]: {
    icon: sideBarIcon(_audit),
    name: "Audit",
    link: "/admin/audit/audit",
  },
  [_survey]: {
    icon: sideBarIcon(_survey),
    name: "Survey",
  },
  [_loyalty]: {
    icon: sideBarIcon(_loyalty),
    name: "Loyalty",
    link: "/admin/loyalty/summary",
  },
  [_rewards]: {
    icon: sideBarIcon(_rewards),
    name: "Rewards",
    [_summary]: { link: "/admin/rewards/summary" },
    [_feeds]: { link: "/admin/rewards/feed" },
    [_details]: { link: "/admin/rewards/details" },
  },
  [_reports]: {
    icon: sideBarIcon(_reports),
    name: "Reports",
    [_caseReport]: { link: "/admin/reports/case-reports/review" },
    [_revenueReport]: { link: "/admin/reports/revenue-reports" },
    [_billingReport]: { link: "/admin/reports/billing-reports" },
    [_clientStatistics]: { link: "/admin/reports/client-reports" },
    [_employeeStatistics]: { link: "/admin/reports/employee-reports" },
    [_partnerStatistics]: { link: "/admin/reports/partner-reports" },
  },
  [_database]: {
    icon: sideBarIcon(_database),
    name: "Database",
    link: "/admin/database/hospitals",
  },
  [_resources]: {
    icon: sideBarIcon(_resources),
    name: "Resources",
    [_productSample]: { link: "/admin/resources/product-sample" },
    [_marketingMaterial]: { link: "/admin/resources/marketing-materials" },
    [_faqSupport]: { link: "/admin/resources/faq-support" },
  },
  [_partners]: {
    icon: sideBarIcon(_partners),
    name: "Partners",
    link: "/admin/partners/partners",
  },
});

// export const menuData = () => ({
//   //CRM
//   CRM: {
//     icon: <TbCirclesRelation size={20} />,
//   },
//   Leads: { link: "/admin/crm/leads" },
//   Company: { link: "/admin/crm/company" },
//   Clients: { link: "/admin/crm/clients" },
//   Divisions: { link: "/admin/crm/divisions" },

//   //Notes
//   Notes: {
//     icon: <FaRegNoteSticky size={20} />,
//     link: "/admin/notes",
//   },

//   // CONTRACTS
//   [_contracts]: {
//     icon: <LuFileSignature size={20} />,
//     link: "/admin/contracts/data",
//   },
//   //TIME SHEET
//   [_timesheet]: {
//     icon: <LuFileClock size={20} />,
//     link: "/admin/time-sheet",
//   },
//   [_entries]: {
//     link: "/admin/time-sheet/entries",
//   },
//   [_approvals]: {
//     link: "/admin/time-sheet/approvals",
//   },
//   //   [{
//   //     icon: <BsCashCoin size={20} />,
//   //     name: "Billing",
//   //   },
//   //   {
//   //     icon: <IoFolderOpenOutline size={20} strokeWidth={5} />,
//   //     name: "Drive",
//   //   },
//   //   {
//   //     icon: <LuFileSignature size={20} />,
//   //     name: "Contracts",
//   //     link: "/admin/contracts/data",
//   //   },
//   //   {
//   //     icon: <GoTasklist size={22} />,
//   //     name: "Tasks",
//   //   },
//   //   {
//   //     icon: <LuStickyNote size={18} />,
//   //     name: "Notes",
//   //   },
//   //   {
//   //     icon: <PiChatCenteredDots size={20} strokeWidth={5} />,
//   //     name: "Messages",
//   //   },
//   //   {
//   //     icon: <PiSealCheck size={20} strokeWidth={5} />,
//   //     name: "Audit",
//   //   },
//   //   {
//   //     icon: <MdOutlineHowToVote size={20} />,
//   //     name: "Survey",
//   //   },
//   //   {
//   //     icon: <TbUserStar size={20} />,
//   //     name: "Loyalty",
//   //   },
//   //   {
//   //     icon: <IoWalletOutline size={19} strokeWidth={5} />,
//   //     name: "Rewards",
//   //   },
//   //   {
//   //     icon: <LiaPollSolid size={20} />,
//   //     name: "Reports",
//   //   },
// });
