import React, { useState } from "react";
import { TabState } from "../../utils/enum";
import Accepted from "../job/accepted";
import Invited from "../job/invited";
import styles from "./tab.module.css";

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState(TabState.INVITED);

  return (
    <div>
      
        <div className={styles.mainContainer}>
          <div className={styles.buttonGroup}>
            <div
              onClick={() => setSelectedTab(TabState.INVITED)}
              className={
                selectedTab === TabState.INVITED
                  ? styles.selectedBtn
                  : styles.navButton
              }>
              Invited
            </div>
            <div
              onClick={() => setSelectedTab(TabState.ACCEPTED)}
              className={
                selectedTab === TabState.ACCEPTED
                  ? styles.selectedBtn
                  : styles.navButton
              }>
              Accepted
            </div>
          </div>
          {selectedTab === TabState.INVITED ? <Invited /> : <Accepted />}
        </div>
    
    </div>
  );
};

export default TabComponent;
