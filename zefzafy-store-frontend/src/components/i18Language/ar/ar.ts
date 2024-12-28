import {  adminDashboardI118Ar } from "./adminDashboardI18Ar.ts";
import { homePageI18Ar } from "./homePageI18Ar.ts";
import { userDashboardI118Ar } from "./userDashboardI18Ar.ts";

export const ar = {
    translation: {...homePageI18Ar() , ...adminDashboardI118Ar() , ...userDashboardI118Ar()}
}