module.exports = function GeneratecomponentJS(comp) {
  return `import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./${comp}.module.scss";
function ${comp}(props) {
  return (
    <>
      <main className={styles.mainWindow}>bla bla bla</main>
    </>
  );
}
export default ${comp};
${comp}.propTypes = {};
`;
};
