import { AccessTokenPayload } from "./auth";

export interface DiaryType {
  title: string;
  content: string;
  drawing?: {
    displayUrl: string;
    deleteUrl: string;
  };
}

export interface DiaryWriteType extends DiaryType {
  weather?: number;
  lx?: number;
  ly?: number;
}

export interface DiaryDivType extends DiaryType {
  id: number;
  nickName: string;
  createdTime: string;
  weather: string;
  title: string;
  content: string;
  recommendCount: number;
  unlikeCount: number;
}

export interface InfinitiScrollDataType<T> {
  number: number;
  totalPages: number;
  data: T[];
}

export interface DiaryPageType {
  id: number;
  nickName: string;
  title: string;
  weather: string;
  content: string;
  recommendCount: number;
  createdTime: string;
  updatedTime: string;
  unlikeCount: number;
}

export interface MyInfoType {
  region: string;
  nickName: string;
  email: string;
}
