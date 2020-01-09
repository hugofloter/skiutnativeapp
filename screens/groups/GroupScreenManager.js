import React from "react";
import Form from "./form";
import GroupScreen from "./GroupScreen";
import DetailedGroupScreen from "./DetailedGroupScreen";

const GroupScreenManager = () => {
  const [editer, showEditer] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  if(editer) {
    return <Form showEditer={ showEditer }/>
  }

  if(selectedGroup) {
    return <DetailedGroupScreen selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>
  }

  return <GroupScreen showEditer={showEditer} setSelectedGroup={setSelectedGroup}/>
}

GroupScreenManager.navigationOptions = {
  header: null,
};

export default GroupScreenManager;
