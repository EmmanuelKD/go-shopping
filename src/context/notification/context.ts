"use client"
import React from "react";
import { NotificationContextType, NotificationType } from "./types";

export const NotificationContext = React.createContext<NotificationContextType>({
 
    addNotification: (_: NotificationType) => {},
 
});