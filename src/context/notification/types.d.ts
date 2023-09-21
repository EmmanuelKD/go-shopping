"use client"
import { ReactElement, ReactNode } from "react";

export type NotificationContextProp = {
  children: ReactNode;
};

export type NotificationContextState = NotificationMessageType;

export type NotificationContextType = {
  addNotification: (_: NotificationType) => void;
};

export type NotificationType = {
  message: string;
  variant: "error" | "warning" | "success";
};
