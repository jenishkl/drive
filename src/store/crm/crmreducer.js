import { combineReducers, createSelector } from "@reduxjs/toolkit";
import { leadsSlice } from "./leads/leadsSlice";
import { divisionSlice } from "./divisions/divisionSlice";
import { clientSlice, crmClientSelector } from "./clients/clientSlice";
import { employeeSlice } from "./employees/employeeSlice";
import { serviceSlice } from "./services/serviceSlice";
import { companySlice, crmCompanySelector } from "./company/companySlice";
import { tagSlice } from "./tags/tagSlice";
import { crmOtherSelector, otherSlice } from "./others/otherSlice";

const crm = combineReducers({
  leadsSlice: leadsSlice.reducer,
  divisionSlice: divisionSlice.reducer,
  clientSlice: clientSlice.reducer,
  employeeSlice: employeeSlice.reducer,
  companySlice: companySlice.reducer,
  serviceSlice: serviceSlice.reducer,
  tagSlice: tagSlice.reducer,
  otherSlice: otherSlice.reducer,
  //   essential: essentialSlice.reducer,
});

export default crm;

const selectors = [crmClientSelector, crmCompanySelector,crmOtherSelector];
export const crmSelectors = createSelector(selectors, (client,company,others) => ({
  ...client,
  ...company,
  ...others
}));
