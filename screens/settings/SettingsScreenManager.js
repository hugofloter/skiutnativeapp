import React from "react";
import AdminView from "./adminView/AdminView";
import SettingsScreen from "./SettingsScreen";

const SettingsScreenManager = () => {
  const [admin, showAdmin] = React.useState(false);

  if(admin) {
    return <AdminView showAdmin={ showAdmin }/>
  }

  return <SettingsScreen showAdmin={showAdmin}/>
}

SettingsScreenManager.navigationOptions = {
  header: null,
}

export default SettingsScreenManager;
