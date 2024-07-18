import { createSelector } from "reselect";

// Assuming these are the paths to your pieces of state
// const dropDataState = (state) => state.crm.otherSlice.commonSelect?.data?.data;
// const dropDataLoadingState = (state) =>
//   state.crm.otherSlice.commonSelect?.loading;
// const entriesState = (state) =>
//   state.timesheet.timeSheetSlice.getEntry?.data?.data;
// const createEntryLoadingState = (state) =>
//   state.timesheet.timeSheetSlice.createEntry?.loading;
// const updateEntryLoadingState = (state) =>
//   state.timesheet.timeSheetSlice.updateEntry?.loading;

const deleteState = (state) => [




  state.drive?.fileBinAndArchieve?.loading,
  state.drive?.folderBinAndArchieve?.loading,
  state.drive?.removeSubmitterAndChangeStatus?.loading,
  state.drive?.submitterDeleteFile?.loading,
  state.drive?.deleteFolder?.loading,
  state.drive?.deleteFile?.loading,
];

export const loadingSelector = createSelector(deleteState, (state) => state);

// export const mySelector = createSelector(
//   [
//     dropDataState,
//     dropDataLoadingState,
//     entriesState,
//     createEntryLoadingState,
//     updateEntryLoadingState,
//   ],
//   (
//     dropData,
//     dropDataLoading,
//     entries,
//     createEntryLoading,
//     updateEntryLoading
//   ) => ({
//     dropData,
//     dropDataLoading,
//     entries,
//     createEntryLoading,
//     updateEntryLoading,
//   })
// );

// Use this selector in your component
// const {
//   dropData,
//   dropDataLoading,
//   entries,
//   createEntryLoading,
//   updateEntryLoading,
// } = useSelector(mySelector);

// let actions = [
//   { name: "createEntry" },
//   { name: "getEntry" },
//   { name: "updateEntry" },
//   { name: "deleteEntry" },
//   { name: "changeStatusEntry" },
// ];

// const getLoadingState = (actionName) => (state) => state[actionName]?.loading;
// const getDataState = (actionName) => (state) => state[actionName]?.data?.data;

// const generateSelectors = (actions) => {
//   const loadingSelectors = actions.map(({ name }) => getLoadingState(name));
//   const dataSelectors = actions.map(({ name }) => getDataState(name));

//   return { loadingSelectors, dataSelectors };
// };

// const { loadingSelectors, dataSelectors } = generateSelectors(actions);

// const dynamicSelector = createSelector(
//   [...loadingSelectors, ...dataSelectors],
//   (...states) => {
//     const result = {};
//     actions.forEach((action, index) => {
//       result[`${action.name}Loading`] = states[index * 2];
//       result[`${action.name}Data`] = states[index * 2 + 1];
//     });
//     return result;
//   }
// );

// const stateProps = useSelector(dynamicSelector);
