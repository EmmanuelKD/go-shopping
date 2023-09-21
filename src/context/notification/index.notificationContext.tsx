"use client";

import { Component } from "react";
import { NotificationContext } from "./context";
import {
  NotificationContextProp,
  NotificationContextState,
  NotificationType,
} from "./types";
import toast, { Toaster } from "react-hot-toast";

class NotificationContextProvider extends Component<
  NotificationContextProp,
  NotificationContextState
> {
  constructor(props: NotificationContextProp) {
    super(props);
    this.state = {
      actionNeeded: false,
    };
  }
  componentDidMount() {}
  clearNotification = () => {
    this.setState((_: NotificationContextState) => ({
      Children: undefined,
      code: undefined,
      message: undefined,
      negativeAction: undefined,
      negativeActionText: undefined,
      notificationType: undefined,
      positiveAction: undefined,
      positiveActionText: undefined,
      title: undefined,
      actionNeeded: false,
    }));
  };

  isNotificationAvailable = () => {
    return (
      this.state.code !== undefined ||
      this.state.message !== undefined ||
      this.state.Children !== undefined ||
      this.state.title !== undefined
    );
  };

  addNotification = ({ message, variant }: NotificationType) => {
    switch (variant) {
      case "error":
        toast.error(message);
        break;
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.error(message);
        break;
    }
  };

  positiveAction = () => {
    this.state.negativeAction?.();
  };
  negativeAction = () => {
    this.state.positiveAction?.();
  };
  setPositiveAction = (action: () => void) => {
    this.setState((prev: NotificationContextState) => ({
      ...prev,
      positiveAction: action,
    }));
  };
  setNegativeAction = (action: () => void) => {
    this.setState((prev: NotificationContextState) => ({
      ...prev,
      negativeAction: action,
    }));
  };

  render() {
    return (
      <NotificationContext.Provider
        value={{
          addNotification: this.addNotification,
        }}
      >
        {this.props.children}
        <Toaster />
      </NotificationContext.Provider>
    );
  }
}
const NotificationContextConsumer = NotificationContext.Consumer;

export { NotificationContextProvider, NotificationContextConsumer };
