import { adminDashboardI118En } from "./adminDashboardI18En";
import { homePageI18En } from "./homePageI18En";
import { userDashboardI118En } from "./userDashboardI18En";

export const en = {
  translation: {...homePageI18En() , ...adminDashboardI118En() , ...userDashboardI118En()}
};
