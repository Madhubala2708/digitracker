import api from "./api";
import { API } from "../constant/service";

//  PROJECTS
export const getApprovedProjectsByEmployee = () =>
  api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);

//  STOCK INWARD
export const createStockInward = (payload) =>
  api.POST("/api/Inventory/create-stock-inward", payload);

export const getStockInwardsByProject = (projectId) =>
  api.GET(`/api/Inventory/get-stock-inwards/${projectId}`);

//  STOCK OUTWARD
export const createStockOutward = (payload) =>
  api.POST("/api/Inventory/create-stock-outward", payload);

export const getStockOutwardsByProject = (projectId) =>
  api.GET(`/api/Inventory/get-stock-outwards/${projectId}`);

//  VENDORS
export const getVendorsAndSubcontractors = () =>
  api.GET(API.GET_VENDORS_AND_SUBCONTRACTORS);

//  PROJECT TEAM
export const getProjectTeam = (projectId) =>
  api.GET(`/api/Inventory/project-team/${projectId}`);

export const getItemNames = (projectId) =>
  api.GET(`/api/Material/material-names/${projectId}`);


