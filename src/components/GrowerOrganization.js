import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { AppContext } from '../context/AppContext.js';
import PropTypes from 'prop-types';
import { getOrganizationById } from 'utilities/index.js';
import SubOrgs from './SubOrgs.js';

/**
 * @function
 * @name GrowerOrganization
 * @description display organision associated with the grower
 *
 * @param {object} props
 * @param {string} props.organizationName name of organization grower belongs to
 * @param {number} props.assignedOrganizationId id of organization assigned to grower
 * @param {boolean} props.compact only show one value (assigned org takes priority)
 *
 * @returns {React.Component}
 */
const GrowerOrganization = (props) => {
  const appContext = useContext(AppContext);
  const { organizationName, assignedOrganizationId, compact } = props;

  const assignedOrganization = getOrganizationById(
    appContext.orgList,
    assignedOrganizationId
  );

  const renderGrowerOrganization = () => (
    <Typography variant="h6">{organizationName}</Typography>
  );
  const renderGrowerAssignedOrganization = (assignedOrganization) => {
    return (
      <SubOrgs name={assignedOrganization.name} id={assignedOrganization.id} />
    );
  };
  const orgNamesMatch =
    assignedOrganizationId &&
    organizationName &&
    (
      getOrganizationById(appContext.orgList, assignedOrganizationId)?.name ||
      ''
    ).toLowerCase() === organizationName.toLowerCase();

  return (
    <>
      {assignedOrganization &&
        renderGrowerAssignedOrganization(assignedOrganization)}
      {organizationName &&
        (!compact || !assignedOrganization) &&
        !orgNamesMatch &&
        renderGrowerOrganization()}
    </>
  );
};

GrowerOrganization.propTypes = {
  organizationName: PropTypes.string,
};
GrowerOrganization.defaultProps = {
  organizationName: null,
};

export default GrowerOrganization;
